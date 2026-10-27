import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { cn } from '../../lib/format';
import type { FacetOption } from '../../lib/filters';
import { FilterChips } from '../ui/Tabs';

type Props = {
  label: string;
  options: FacetOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  resultCount: number;
};

/** One facet as a dropdown of multi-select chips with result counts (desktop filter bar). */
export default function FacetDropdown({ label, options, selected, onChange, resultCount }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          'flex items-center gap-1 rounded-lg border bg-white px-3 py-2 text-sm whitespace-nowrap transition-colors',
          selected.length ? 'border-primary bg-primary-soft/50 text-primary' : 'border-line hover:border-ink/30',
        )}
      >
        {label}
        {selected.length > 0 && <span className="rounded-full bg-primary px-1.5 text-[11px] font-bold text-white">{selected.length}</span>}
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            style={{ transformOrigin: 'top left' }}
            className="absolute top-12 left-0 z-30 w-[min(420px,80vw)] rounded-xl bg-white p-4 shadow-lift ring-1 ring-black/5"
          >
            <FilterChips
              multiple
              size="sm"
              className="max-h-60 flex-wrap overflow-y-auto"
              options={options.map((o) => ({ value: o.value, label: `${o.label} (${o.count})` }))}
              value={selected}
              onChange={onChange}
            />
            <div className="mt-3 flex gap-2 border-t border-line pt-3">
              <button
                type="button"
                onClick={() => onChange([])}
                disabled={!selected.length}
                className="flex-1 rounded-lg border border-primary py-2 text-sm font-medium text-primary transition-colors hover:bg-primary-soft disabled:opacity-40"
              >
                Bỏ chọn
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg bg-primary py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Xem {resultCount} kết quả
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
