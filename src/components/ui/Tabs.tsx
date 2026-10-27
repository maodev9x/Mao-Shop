import { motion } from 'framer-motion';
import { useId } from 'react';
import { cn } from '../../lib/format';

type Option = { value: string; label: string };

type TabsProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/** Underlined section tabs; the red indicator slides between tabs. */
export function UnderlineTabs({ options, value, onChange, className }: TabsProps) {
  const group = useId();
  return (
    <div role="tablist" className={cn('no-scrollbar flex overflow-x-auto border-b border-line', className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'relative flex-1 shrink-0 px-4 py-3 text-sm font-bold whitespace-nowrap uppercase transition-colors sm:text-base',
              active ? 'text-primary' : 'text-ink/70 hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId={`${group}-bg`}
                className="absolute inset-0 rounded-t-lg bg-gradient-to-b from-transparent to-primary-soft/70"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{o.label}</span>
            {active && (
              <motion.span
                layoutId={`${group}-line`}
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

type ChipsBase = { options: Option[]; className?: string; size?: 'sm' | 'md'; tone?: 'red' | 'blue' };
type SingleChips = ChipsBase & { multiple?: false; value: string; onChange: (value: string) => void };
type MultiChips = ChipsBase & { multiple: true; value: string[]; onChange: (value: string[]) => void };

/**
 * Pill filter chips. Single mode: the highlighted pill glides to the selected chip.
 * `multiple` mode: each chip toggles on/off independently.
 */
export function FilterChips(props: SingleChips | MultiChips) {
  const { options, className, size = 'md', tone = 'red' } = props;
  const group = useId();
  const activeText = tone === 'red' ? 'text-primary' : 'text-blue';
  const pill = tone === 'red' ? 'border-primary bg-primary-soft/60' : 'border-blue bg-blue-soft';

  const isActive = (v: string) => (props.multiple ? props.value.includes(v) : props.value === v);
  const select = (v: string) => {
    if (props.multiple) props.onChange(props.value.includes(v) ? props.value.filter((x) => x !== v) : [...props.value, v]);
    else props.onChange(v);
  };

  return (
    <div className={cn('no-scrollbar flex gap-2 overflow-x-auto py-1', className)}>
      {options.map((o) => {
        const active = isActive(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => select(o.value)}
            aria-pressed={active}
            className={cn(
              'relative shrink-0 rounded-lg border border-line bg-white font-medium whitespace-nowrap transition-colors',
              size === 'sm' ? 'px-3 py-1.5 text-xs sm:text-sm' : 'px-4 py-2 text-sm',
              active ? activeText : 'text-ink/80 hover:border-ink/30',
            )}
          >
            {active &&
              (props.multiple ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn('absolute -inset-px rounded-lg border', pill)}
                />
              ) : (
                <motion.span
                  layoutId={`${group}-pill`}
                  className={cn('absolute -inset-px rounded-lg border', pill)}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              ))}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
