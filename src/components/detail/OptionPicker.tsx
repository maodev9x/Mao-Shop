import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useId, type ReactNode } from 'react';
import { cn } from '../../lib/format';

export type Option = { key: string; label: string; sub?: string; media?: ReactNode };

type Props = {
  title: string;
  options: Option[];
  value: number;
  onChange: (index: number) => void;
  columns?: 2 | 3;
};

/** Selectable option tiles; the red frame with its corner tick slides to the chosen tile. */
export default function OptionPicker({ title, options, value, onChange, columns = 3 }: Props) {
  const group = useId();
  return (
    <div>
      <p className="mb-2 text-sm font-bold">{title}</p>
      <div role="radiogroup" aria-label={title} className={cn('grid gap-2', columns === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2')}>
        {options.map((o, i) => {
          const active = i === value;
          return (
            <button
              key={o.key}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(i)}
              className={cn(
                'relative flex min-h-11 items-center gap-2 rounded-lg border bg-white px-2.5 py-1.5 text-left transition-colors',
                active ? 'border-transparent' : 'border-line hover:border-ink/30',
                !o.media && 'justify-center text-center',
              )}
            >
              {o.media && <span className="h-9 w-9 shrink-0">{o.media}</span>}
              <span className="min-w-0">
                <span className={cn('block truncate text-xs font-semibold sm:text-[13px]', active && 'text-primary')}>{o.label}</span>
                {o.sub && <span className="block truncate text-[11px] text-ink/70">{o.sub}</span>}
              </span>
              {active && (
                <motion.span
                  layoutId={`${group}-frame`}
                  className="pointer-events-none absolute -inset-px rounded-lg border-2 border-primary"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                >
                  <span className="absolute -top-px -right-px flex h-4 w-4 items-center justify-center rounded-tr-md rounded-bl-md bg-primary">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </span>
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
