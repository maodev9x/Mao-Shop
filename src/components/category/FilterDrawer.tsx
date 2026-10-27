import { PackageCheck, Sparkles, X } from 'lucide-react';
import type { CategoryFilters } from '../../hooks/useCategoryFilters';
import type { CategoryConfig } from '../../types';
import Drawer from '../ui/Drawer';
import { FilterChips } from '../ui/Tabs';
import { PriceRange } from './PriceFilter';

type Props = {
  open: boolean;
  onClose: () => void;
  config: CategoryConfig;
  filters: CategoryFilters;
};

/** Every facet at once — right drawer on desktop, bottom sheet on mobile. */
export default function FilterDrawer({ open, onClose, config, filters }: Props) {
  const { state, options, results, bounds } = filters;

  return (
    <Drawer open={open} onClose={onClose} label="Bộ lọc" side="right" bottomOnMobile className="w-full max-w-md">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="text-lg font-bold">Bộ lọc</h2>
        <button type="button" onClick={onClose} aria-label="Đóng bộ lọc" className="rounded-lg p-1.5 hover:bg-page">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-4">
        <section>
          <p className="mb-2 text-sm font-bold">Tình trạng</p>
          <FilterChips
            multiple
            size="sm"
            className="flex-wrap"
            options={[
              { value: 'inStock', label: 'Sẵn hàng' },
              { value: 'isNew', label: 'Hàng mới về' },
            ]}
            value={[state.inStock && 'inStock', state.isNew && 'isNew'].filter(Boolean) as string[]}
            onChange={(v) => {
              if (v.includes('inStock') !== state.inStock) filters.setFlag('inStock', v.includes('inStock'));
              else filters.setFlag('isNew', v.includes('isNew'));
            }}
          />
          <p className="mt-1 flex gap-3 text-[11px] text-muted">
            <span className="flex items-center gap-1">
              <PackageCheck className="h-3.5 w-3.5" /> Còn hàng tại cửa hàng
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Mới cập bến
            </span>
          </p>
        </section>

        <section>
          <p className="mb-2 text-sm font-bold">Khoảng giá</p>
          <PriceRange bounds={bounds} presets={config.pricePresets} value={state.price} onApply={filters.setPrice} />
        </section>

        {config.facets.map((facet) => (
          <section key={facet.key}>
            <p className="mb-2 text-sm font-bold">{facet.label}</p>
            <FilterChips
              multiple
              size="sm"
              className="flex-wrap"
              options={options[facet.key].map((o) => ({ value: o.value, label: `${o.label} (${o.count})` }))}
              value={state.selected[facet.key] ?? []}
              onChange={(v) => filters.setValues(facet.key, v)}
            />
          </section>
        ))}
      </div>

      <div className="flex gap-2 border-t border-line bg-white px-5 py-3">
        <button
          type="button"
          onClick={filters.clear}
          disabled={!filters.active}
          className="flex-1 rounded-xl border border-primary py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary-soft disabled:opacity-40"
        >
          Bỏ chọn tất cả
        </button>
        <button type="button" onClick={onClose} className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
          Xem {results.length} kết quả
        </button>
      </div>
    </Drawer>
  );
}
