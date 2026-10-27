import { AnimatePresence, motion } from 'framer-motion';
import type { DeviceKind } from '../../types';
import { cn } from '../../lib/format';
import DeviceImage from './DeviceImage';

export type SubCategoryTile = { key: string; label: string; kind: DeviceKind; color: string };

type Props = {
  tiles: SubCategoryTile[];
  /** Keys currently selected */
  selected: string[];
  onToggle: (key: string) => void;
  /** row: image beside the label (home sections) · stack: square image above the label (category page) */
  layout?: 'row' | 'stack';
  /** Changing it replays the enter animation (e.g. when the parent tab changes) */
  animationKey?: string;
};

/** Toggleable sub-category / need tiles with a device image. */
export default function SubCategoryTiles({ tiles, selected, onToggle, layout = 'row', animationKey = '' }: Props) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto p-0.5">
      <AnimatePresence mode="popLayout" initial={false}>
        {tiles.map((t, i) => {
          const active = selected.includes(t.key);
          return (
            <motion.button
              key={`${animationKey}-${t.key}`}
              type="button"
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04 } }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -2 }}
              onClick={() => onToggle(t.key)}
              aria-pressed={active}
              className={cn(
                'shrink-0 rounded-xl text-sm font-medium ring-1 transition-colors',
                layout === 'row' ? 'flex items-center gap-2 px-3 py-2 text-left' : 'flex w-24 flex-col items-center gap-1.5 p-2 text-center sm:w-28',
                active ? 'bg-primary-soft text-primary ring-primary' : 'bg-white ring-line hover:ring-ink/20',
              )}
            >
              <DeviceImage
                kind={t.kind}
                color={t.color}
                className={layout === 'row' ? 'h-9 w-9' : 'aspect-square w-16 rounded-lg bg-page p-1 sm:w-20'}
              />
              <span className={layout === 'row' ? 'w-20 leading-tight' : 'text-xs leading-tight'}>{t.label}</span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
