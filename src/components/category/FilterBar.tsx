import { Filter, PackageCheck, Sparkles } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import type { CategoryFilters } from '../../hooks/useCategoryFilters';
import { cn } from '../../lib/format';
import type { CategoryConfig } from '../../types';
import ActiveFilters from './ActiveFilters';
import FacetDropdown from './FacetDropdown';
import FilterDrawer from './FilterDrawer';
import PriceFilter from './PriceFilter';

function ToggleButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: ReactNode; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex shrink-0 items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-sm whitespace-nowrap transition-colors',
        active ? 'border-primary bg-primary-soft/50 text-primary' : 'border-line hover:border-ink/30',
      )}
    >
      {icon}
      {children}
    </button>
  );
}

/** "Chọn theo tiêu chí": filter drawer button, quick toggles, price popover and one dropdown per facet. */
export default function FilterBar({ config, filters }: { config: CategoryConfig; filters: CategoryFilters }) {
  const [drawer, setDrawer] = useState(false);
  const { state, options, results } = filters;

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
        <button
          type="button"
          onClick={() => setDrawer(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-primary bg-white px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary-soft"
        >
          <Filter className="h-4 w-4" /> Bộ lọc
          {filters.active > 0 && <span className="rounded-full bg-primary px-1.5 text-[11px] font-bold text-white">{filters.active}</span>}
        </button>
        <ToggleButton active={state.inStock} onClick={() => filters.setFlag('inStock', !state.inStock)} icon={<PackageCheck className="h-4 w-4" />}>
          Sẵn hàng
        </ToggleButton>
        <ToggleButton active={state.isNew} onClick={() => filters.setFlag('isNew', !state.isNew)} icon={<Sparkles className="h-4 w-4" />}>
          Hàng mới về
        </ToggleButton>
        {/* dropdowns need room for their popovers — desktop only; mobile uses the drawer */}
        <div className="hidden lg:contents">
          <PriceFilter bounds={filters.bounds} presets={config.pricePresets} value={state.price} onApply={filters.setPrice} />
          {config.facets.map((facet) => (
            <FacetDropdown
              key={facet.key}
              label={facet.label}
              options={options[facet.key]}
              selected={state.selected[facet.key] ?? []}
              onChange={(v) => filters.setValues(facet.key, v)}
              resultCount={results.length}
            />
          ))}
        </div>
      </div>
      <ActiveFilters config={config} filters={filters} />
      <FilterDrawer open={drawer} onClose={() => setDrawer(false)} config={config} filters={filters} />
    </div>
  );
}
