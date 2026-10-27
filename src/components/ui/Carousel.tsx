import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/format';

type Props = {
  children: ReactNode;
  /** Tailwind grid-auto-columns classes, e.g. "auto-cols-[45%] lg:auto-cols-[calc((100%-48px)/5)]" */
  colsClassName: string;
  rows?: 1 | 2;
  gapClassName?: string;
  className?: string;
  arrowTone?: 'light' | 'dark';
};

export type CarouselHandle = { reset: () => void };

/** Scroll-snap carousel with arrow buttons; supports 1 or 2 rows. */
const Carousel = forwardRef<CarouselHandle, Props>(function Carousel(
  { children, colsClassName, rows = 1, gapClassName = 'gap-3', className, arrowTone = 'light' },
  ref,
) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useImperativeHandle(ref, () => ({
    reset: () => trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' }),
  }));

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const mo = new MutationObserver(() => requestAnimationFrame(update));
    mo.observe(el, { childList: true, subtree: false });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };

  const arrow =
    arrowTone === 'light'
      ? 'bg-white/95 text-ink shadow-lift hover:bg-white'
      : 'bg-black/40 text-white hover:bg-black/60 backdrop-blur';

  return (
    <div className={cn('group/carousel relative', className)}>
      <div
        ref={trackRef}
        onScroll={update}
        className={cn(
          'no-scrollbar grid snap-x snap-mandatory grid-flow-col overflow-x-auto scroll-smooth py-1',
          rows === 2 ? 'grid-rows-2' : 'grid-rows-1',
          colsClassName,
          gapClassName,
        )}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Trước"
        onClick={() => scrollBy(-1)}
        className={cn(
          'absolute top-1/2 -left-3 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 md:flex',
          arrow,
          canPrev ? 'opacity-0 group-hover/carousel:opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Tiếp"
        onClick={() => scrollBy(1)}
        className={cn(
          'absolute top-1/2 -right-3 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 md:flex',
          arrow,
          canNext ? 'opacity-70 group-hover/carousel:opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
});

export default Carousel;
