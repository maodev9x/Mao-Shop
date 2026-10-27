import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { byCategory } from '../data/products';
import {
  activeCount,
  applyFilters,
  facetOptions,
  parseFilters,
  priceBounds,
  serializeFilters,
  sortProducts,
  type FilterState,
  type SortKey,
} from '../lib/filters';
import type { CategoryConfig } from '../types';

/** Filter state of a category page, stored in the URL query string (see rule category-data). */
export function useCategoryFilters(config: CategoryConfig) {
  const [params, setParams] = useSearchParams();
  const all = useMemo(() => byCategory(config.id), [config.id]);
  const state = useMemo(() => parseFilters(params, config), [params, config]);

  const update = useCallback(
    (change: (s: FilterState) => FilterState) => setParams(serializeFilters(change(parseFilters(params, config))), { replace: true }),
    [params, setParams, config],
  );

  const results = useMemo(() => sortProducts(applyFilters(all, state, config), state.sort), [all, state, config]);

  const options = useMemo(
    () => Object.fromEntries(config.facets.map((f) => [f.key, facetOptions(all, state, config, f)])),
    [all, state, config],
  );

  const toggle = useCallback(
    (key: string, value: string) =>
      update((s) => {
        const current = s.selected[key] ?? [];
        const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
        return { ...s, selected: { ...s.selected, [key]: next } };
      }),
    [update],
  );

  const setValues = useCallback((key: string, values: string[]) => update((s) => ({ ...s, selected: { ...s.selected, [key]: values } })), [update]);
  const setPrice = useCallback((price: [number, number] | null) => update((s) => ({ ...s, price })), [update]);
  const setSort = useCallback((sort: SortKey) => update((s) => ({ ...s, sort })), [update]);
  const setFlag = useCallback((flag: 'inStock' | 'isNew', on: boolean) => update((s) => ({ ...s, [flag]: on })), [update]);
  const clear = useCallback(() => update((s) => ({ selected: {}, price: null, sort: s.sort, inStock: false, isNew: false })), [update]);

  return {
    all,
    state,
    results,
    options,
    bounds: useMemo(() => priceBounds(all), [all]),
    active: activeCount(state),
    /** Changes whenever the result set changes — drives list animations and resets "Xem thêm" */
    filterKey: params.toString(),
    toggle,
    setValues,
    setPrice,
    setSort,
    setFlag,
    clear,
  };
}

export type CategoryFilters = ReturnType<typeof useCategoryFilters>;
