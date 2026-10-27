import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/format';

type Props = {
  children: ReactNode;
  /** Height in px while collapsed */
  collapsedHeight: number;
  moreLabel?: string;
  lessLabel?: string;
  /** Colour class of the fade overlay, matching the background behind the content */
  fadeClassName?: string;
  className?: string;
};

/** Collapses long content to a fixed height with a fade, and animates open/closed. */
export default function Expandable({
  children,
  collapsedHeight,
  moreLabel = 'Xem thêm',
  lessLabel = 'Thu gọn',
  fadeClassName = 'from-white',
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <motion.div
        className="relative overflow-hidden"
        initial={false}
        animate={{ height: open ? 'auto' : collapsedHeight }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
        <motion.div
          className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent', fadeClassName)}
          initial={false}
          animate={{ opacity: open ? 0 : 1 }}
        />
      </motion.div>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-1 rounded-lg border border-line bg-white px-5 py-2 text-sm font-medium text-ink shadow-card transition-colors hover:border-primary hover:text-primary"
        >
          {open ? lessLabel : moreLabel}
          <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')} />
        </button>
      </div>
    </div>
  );
}
