import type { CategoryConfig, FacetConfig, Product } from '../types';
import { discountPercent, slugify } from './format';

/** Pure filtering helpers for category pages; React state lives in `useCategoryFilters`. */

export type SortKey = 'pho-bien' | 'khuyen-mai' | 'gia-tang' | 'gia-giam';

export type FilterState = {
  /** facet key → selected value slugs */
  selected: Record<string, string[]>;
  price: [number, number] | null;
  sort: SortKey;
  inStock: boolean;
  isNew: boolean;
};

export type FacetOption = { value: string; label: string; count: number };

const SORTS: SortKey[] = ['pho-bien', 'khuyen-mai', 'gia-tang', 'gia-giam'];

export function productValues(product: Product, facet: FacetConfig): string[] {
  if (facet.type === 'brand') return [product.brand];
  const v = product.attrs?.[facet.key];
  return v === undefined ? [] : Array.isArray(v) ? v : [v];
}

export function parseFilters(params: URLSearchParams, config: CategoryConfig): FilterState {
  const selected: Record<string, string[]> = {};
  for (const facet of config.facets) {
    const raw = params.get(facet.key);
    if (raw) selected[facet.key] = raw.split(',').filter(Boolean);
  }
  const [min, max] = (params.get('gia') ?? '').split('-').map(Number);
  const sort = params.get('sapxep') as SortKey | null;
  return {
    selected,
    price: Number.isFinite(min) && Number.isFinite(max) && max > min ? [min, max] : null,
    sort: sort && SORTS.includes(sort) ? sort : 'pho-bien',
    inStock: params.get('sanhang') === '1',
    isNew: params.get('moi') === '1',
  };
}

export function serializeFilters(state: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, values] of Object.entries(state.selected)) if (values.length) params.set(key, values.join(','));
  if (state.price) params.set('gia', `${state.price[0]}-${state.price[1]}`);
  if (state.sort !== 'pho-bien') params.set('sapxep', state.sort);
  if (state.inStock) params.set('sanhang', '1');
  if (state.isNew) params.set('moi', '1');
  return params;
}

function matches(product: Product, state: FilterState, config: CategoryConfig, skipFacet?: string): boolean {
  if (state.inStock && product.inStock === false) return false;
  if (state.isNew && !(product.isNew || product.tags?.includes('new'))) return false;
  if (state.price && (product.price < state.price[0] || product.price > state.price[1])) return false;
  for (const facet of config.facets) {
    if (facet.key === skipFacet) continue;
    const wanted = state.selected[facet.key];
    if (!wanted?.length) continue;
    const values = productValues(product, facet).map(slugify);
    if (!wanted.some((w) => values.includes(w))) return false;
  }
  return true;
}

export function applyFilters(products: Product[], state: FilterState, config: CategoryConfig): Product[] {
  return products.filter((p) => matches(p, state, config));
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const sorted = [...list];
  switch (sort) {
    case 'gia-tang':
      return sorted.sort((a, b) => a.price - b.price);
    case 'gia-giam':
      return sorted.sort((a, b) => b.price - a.price);
    case 'khuyen-mai':
      return sorted.sort((a, b) => discountPercent(b.price, b.originalPrice) - discountPercent(a.price, a.originalPrice));
    default:
      return sorted.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
  }
}

/**
 * Options of one facet with result counts. Counts apply every *other* active filter,
 * so ticking one brand does not drop the other brands to zero.
 */
export function facetOptions(products: Product[], state: FilterState, config: CategoryConfig, facet: FacetConfig): FacetOption[] {
  const labels = new Map<string, string>();
  for (const p of products) for (const v of productValues(p, facet)) labels.set(slugify(v), v);
  const pool = products.filter((p) => matches(p, state, config, facet.key));
  return [...labels.entries()]
    .map(([value, label]) => ({ value, label, count: pool.filter((p) => productValues(p, facet).some((v) => slugify(v) === value)).length }))
    .sort((a, b) => (facet.key === 'hang' ? b.count - a.count : a.label.localeCompare(b.label, 'vi', { numeric: true })));
}

export function activeCount(state: FilterState): number {
  return Object.values(state.selected).reduce((n, v) => n + v.length, 0) + (state.price ? 1 : 0) + (state.inStock ? 1 : 0) + (state.isNew ? 1 : 0);
}

export function priceBounds(products: Product[]): [number, number] {
  if (!products.length) return [0, 0];
  const prices = products.map((p) => p.price);
  const step = 500_000;
  return [Math.floor(Math.min(...prices) / step) * step, Math.ceil(Math.max(...prices) / step) * step];
}
