import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronsUp, Headphones } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { cn } from '../../lib/format';

export default function FloatingButtons() {
  const { scrollY } = useScroll();
  const [showTop, setShowTop] = useState(false);
  const { toasts } = useShop();
  const onProductPage = useLocation().pathname.startsWith('/san-pham/');

  useMotionValueEvent(scrollY, 'change', (y) => setShowTop(y > 600));

  return (
    <>
      {/* product pages have a sticky buy bar at the bottom — sit above it */}
      <div className={cn('fixed right-4 z-30 flex flex-col items-end gap-2 transition-[bottom] duration-300', onProductPage ? 'bottom-20 sm:bottom-24' : 'bottom-4')}>
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lift hover:bg-ink/90"
            >
              Lên đầu <ChevronsUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
        <a
          href="tel:18002044"
          className="relative flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lift shadow-primary/30 hover:bg-primary-dark"
        >
          <span className="absolute -inset-1 animate-pulse rounded-full ring-2 ring-primary/40" />
          <span className="relative">Liên hệ</span>
          <Headphones className="relative h-4 w-4" />
        </a>
      </div>

      {/* Toasts */}
      <div className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex flex-col items-center gap-2 px-4" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              className="max-w-sm rounded-xl bg-ink/90 px-4 py-2.5 text-center text-sm font-medium text-white shadow-lift backdrop-blur"
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
