import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/format';
import type { GalleryItem, Product } from '../../types';
import DeviceImage from '../product/DeviceImage';

type Props = {
  product: Product;
  items: GalleryItem[];
  highlights: string[];
  index: number;
  onIndexChange: (index: number) => void;
};

export default function ProductGallery({ product, items, highlights, index, onIndexChange }: Props) {
  const [direction, setDirection] = useState(1);
  const thumbs = useRef<HTMLDivElement>(null);
  const item = items[index];

  const go = (next: number) => {
    const target = (next + items.length) % items.length;
    setDirection(target > index ? 1 : -1);
    onIndexChange(target);
  };

  // keep the active thumbnail visible inside its own scroller
  useEffect(() => {
    const strip = thumbs.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (strip && thumb) strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'smooth' });
  }, [index]);

  return (
    <div>
      {/* Main slot — 11:6 placeholder */}
      <div className="group relative aspect-[11/6] overflow-hidden rounded-2xl shadow-card">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={item.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              else if (info.offset.x > 60) go(index - 1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {item.id === 'highlight' ? (
              <div
                className="flex h-full items-center gap-3 p-3 text-white sm:gap-5 sm:p-5"
                style={{ backgroundImage: `linear-gradient(120deg, ${product.color}, #fb7185 70%, #fdba74)` }}
              >
                <div className="flex aspect-square h-full shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-lg">
                  <DeviceImage kind={product.kind} color={product.color} className="h-full w-full" />
                </div>
                <div className="max-h-full min-w-0 overflow-hidden">
                  <p className="mb-1.5 flex items-center gap-1 text-xs font-extrabold tracking-wide uppercase sm:text-base">
                    <Sparkles className="h-4 w-4 shrink-0" /> Tính năng nổi bật
                  </p>
                  <ul className="space-y-1 text-[10px] leading-snug sm:text-xs">
                    {highlights.map((h, i) => (
                      // small screens only have room for the first two points
                      <li key={h} className={cn('line-clamp-3 flex gap-1.5', i >= 2 && 'max-sm:hidden')}>
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="relative flex h-full items-center justify-center bg-gradient-to-br from-page to-white">
                <DeviceImage kind={item.kind} color={item.color} className="h-[88%] w-auto drop-shadow-xl" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink shadow">{item.label}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Ảnh trước"
          onClick={() => go(index - 1)}
          className="absolute top-1/2 left-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:bg-black/40 max-md:opacity-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Ảnh tiếp"
          onClick={() => go(index + 1)}
          className="absolute top-1/2 right-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:bg-black/40 max-md:opacity-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="absolute top-3 right-3 z-10 rounded-full bg-black/35 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
          {index + 1}/{items.length}
        </span>
      </div>

      {/* Thumbnails — 1:1 */}
      <div ref={thumbs} className="no-scrollbar mt-3 flex gap-2 overflow-x-auto p-0.5">
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            onClick={() => go(i)}
            aria-label={it.label}
            aria-current={i === index}
            className={cn(
              'relative flex aspect-square w-14 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg bg-white p-1 ring-1 ring-line transition-transform hover:-translate-y-0.5 sm:w-16',
            )}
          >
            {it.id === 'highlight' ? (
              <>
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="mt-0.5 text-center text-[9px] leading-tight text-ink/70">Tính năng nổi bật</span>
              </>
            ) : (
              <DeviceImage kind={it.kind} color={it.color} className="h-full w-full" />
            )}
            {i === index && (
              <motion.span
                layoutId={`gallery-thumb-${product.id}`}
                className="absolute inset-0 rounded-lg ring-2 ring-primary"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
