import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, CircleDollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { cn, formatPrice } from '../../lib/format';
import { FilterChips } from '../ui/Tabs';

const STEP = 500_000;

function presetLabel([min, max]: [number, number]) {
  const m = (n: number) => `${n / 1_000_000 >= 1 ? n / 1_000_000 : n / 1000} ${n >= 1_000_000 ? 'triệu' : 'nghìn'}`;
  if (min === 0) return `Dưới ${m(max)}`;
  if (max >= 50_000_000 || max === Infinity) return `Trên ${m(min)}`;
  return `${m(min)} - ${m(max)}`;
}

type RangeProps = {
  bounds: [number, number];
  presets: [number, number][];
  value: [number, number] | null;
  onApply: (price: [number, number] | null) => void;
};

/** Preset chips + dual-handle slider. Used by the price popover and the filter drawer. */
export function PriceRange({ bounds, presets, value, onApply }: RangeProps) {
  const [range, setRange] = useState<[number, number]>(value ?? bounds);
  useEffect(() => setRange(value ?? bounds), [value, bounds]);

  const span = Math.max(bounds[1] - bounds[0], STEP);
  const pct = (n: number) => ((n - bounds[0]) / span) * 100;
  const presetValue = value ? presets.findIndex((p) => p[0] === value[0] && p[1] === value[1]) : -1;

  return (
    <div>
      <FilterChips
        size="sm"
        className="flex-wrap"
        options={presets.map((p, i) => ({ value: String(i), label: presetLabel(p) }))}
        value={presetValue >= 0 ? String(presetValue) : ''}
        onChange={(v) => onApply(presetValue === Number(v) ? null : presets[Number(v)])}
      />
      <div className="mt-4 px-1">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="rounded-md border border-line px-2 py-1">{formatPrice(range[0])}</span>
          <span className="text-muted">—</span>
          <span className="rounded-md border border-line px-2 py-1">{formatPrice(range[1])}</span>
        </div>
        {/* two native range inputs stacked on one track */}
        <div className="relative h-6">
          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-line" />
          <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary" style={{ left: `${pct(range[0])}%`, right: `${100 - pct(range[1])}%` }} />
          {[0, 1].map((i) => (
            <input
              key={i}
              type="range"
              aria-label={i === 0 ? 'Giá thấp nhất' : 'Giá cao nhất'}
              min={bounds[0]}
              max={bounds[1]}
              step={STEP}
              value={range[i]}
              onChange={(e) => {
                const n = Number(e.target.value);
                setRange((r) => (i === 0 ? [Math.min(n, r[1] - STEP), r[1]] : [r[0], Math.max(n, r[0] + STEP)]));
              }}
              className="price-thumb pointer-events-none absolute inset-0 w-full appearance-none bg-transparent"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onApply(range[0] <= bounds[0] && range[1] >= bounds[1] ? null : range)}
          className="mt-3 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Áp dụng khoảng giá
        </button>
      </div>
    </div>
  );
}

/** "Xem theo giá" button with a popover (desktop). */
export default function PriceFilter(props: RangeProps) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          'flex items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-sm whitespace-nowrap transition-colors',
          props.value ? 'border-primary bg-primary-soft/50 text-primary' : 'border-line hover:border-ink/30',
        )}
      >
        <CircleDollarSign className="h-4 w-4" /> Xem theo giá
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
            className="absolute top-12 left-0 z-30 w-80 rounded-xl bg-white p-4 shadow-lift ring-1 ring-black/5"
          >
            <PriceRange
              {...props}
              onApply={(p) => {
                props.onApply(p);
                setOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
