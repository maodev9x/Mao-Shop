import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/format';

/** `center` = modal dialog */
type Side = 'left' | 'right' | 'bottom' | 'center';

type Props = {
  open: boolean;
  onClose: () => void;
  /** Accessible name of the dialog */
  label: string;
  side?: Side;
  /** Becomes a bottom sheet below the `sm` breakpoint */
  bottomOnMobile?: boolean;
  /** Classes of the sliding panel (width, layout) */
  className?: string;
  /** Classes of the fixed wrapper, e.g. `lg:hidden` */
  wrapperClassName?: string;
  children: ReactNode;
};

const offscreen: Record<Side, { x?: string | number; y?: string | number; opacity?: number; scale?: number }> = {
  left: { x: '-100%' },
  right: { x: '100%' },
  bottom: { y: '100%' },
  center: { y: 40, opacity: 0, scale: 0.97 },
};

const placement: Record<Side, string> = {
  left: 'inset-y-0 left-0',
  right: 'inset-y-0 right-0',
  bottom: 'inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl',
  center: 'inset-0 m-auto h-fit max-h-[90vh] overflow-y-auto rounded-2xl',
};

function isMobile() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;
}

/**
 * Overlay + sliding panel (or centred modal) with Esc / backdrop close and body scroll lock.
 * Rendered in a portal so ancestors with transforms (Reveal) cannot break `position: fixed`.
 */
export default function Drawer({ open, onClose, label, side = 'right', bottomOnMobile, className, wrapperClassName, children }: Props) {
  const [mobile, setMobile] = useState(isMobile);
  const actualSide: Side = bottomOnMobile && mobile ? 'bottom' : side;

  useEffect(() => {
    if (!open) return;
    setMobile(isMobile());
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={cn('fixed inset-0 z-50', wrapperClassName)} role="dialog" aria-modal="true" aria-label={label}>
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={offscreen[actualSide]}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            exit={offscreen[actualSide]}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className={cn('absolute flex flex-col bg-white shadow-2xl', placement[actualSide], actualSide === 'bottom' ? 'w-full' : className)}
          >
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
