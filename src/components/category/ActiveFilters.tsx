import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { CategoryFilters } from '../../hooks/useCategoryFilters';
import { formatPrice } from '../../lib/format';
import type { CategoryConfig } from '../../types';

type Chip = { id: string; label: string; remove: () => void };

/** Removable chips for every active filter, plus "Bỏ chọn tất cả". */
export default function ActiveFilters({ config, filters }: { config: CategoryConfig; filters: CategoryFilters }) {
  const { state, options } = filters;

  const chips: Chip[] = [
    ...config.facets.flatMap((facet) =>
      (state.selected[facet.key] ?? []).map((value) => ({
        id: `${facet.key}-${value}`,
        label: options[facet.key].find((o) => o.value === value)?.label ?? value,
        remove: () => filters.toggle(facet.key, value),
      })),
    ),
    ...(state.price ? [{ id: 'gia', label: `${formatPrice(state.price[0])} - ${formatPrice(state.price[1])}`, remove: () => filters.setPrice(null) }] : []),
    ...(state.inStock ? [{ id: 'sanhang', label: 'Sẵn hàng', remove: () => filters.setFlag('inStock', false) }] : []),
    ...(state.isNew ? [{ id: 'moi', label: 'Hàng mới về', remove: () => filters.setFlag('isNew', false) }] : []),
  ];

  return (
    <AnimatePresence initial={false}>
      {chips.length > 0 && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <span className="text-sm text-ink/70">Đang lọc theo:</span>
            <AnimatePresence initial={false}>
              {chips.map((c) => (
                <motion.button
                  key={c.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={c.remove}
                  aria-label={`Bỏ lọc ${c.label}`}
                  className="flex items-center gap-1 rounded-full border border-primary bg-primary-soft/50 px-3 py-1 text-xs font-medium text-primary hover:bg-primary-soft"
                >
                  {c.label} <X className="h-3.5 w-3.5" />
                </motion.button>
              ))}
            </AnimatePresence>
            <motion.button layout type="button" onClick={filters.clear} className="text-xs font-medium text-blue hover:underline">
              Bỏ chọn tất cả
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
