import { useEffect, useRef } from 'react';
import type { Product } from '../../types';
import Carousel, { type CarouselHandle } from '../ui/Carousel';
import AnimatedProductList from './AnimatedProductList';
import EmptyResults from './EmptyResults';

type Props = {
  products: Product[];
  /** Changes whenever the active filter changes — scrolls back to the start */
  filterKey: string;
  rows?: 1 | 2;
  columns?: 4 | 5;
  variant?: 'default' | 'flash';
};

const COLS = {
  4: 'auto-cols-[calc((100%-12px)/2)] sm:auto-cols-[calc((100%-24px)/3)] lg:auto-cols-[calc((100%-36px)/4)]',
  5: 'auto-cols-[calc((100%-12px)/2)] sm:auto-cols-[calc((100%-24px)/3)] lg:auto-cols-[calc((100%-48px)/5)]',
};

/** Scroll-snap product carousel with filter animations (see AnimatedProductList). */
export default function ProductCarousel({ products, filterKey, rows = 1, columns = 5, variant = 'default' }: Props) {
  const carousel = useRef<CarouselHandle>(null);

  useEffect(() => {
    carousel.current?.reset();
  }, [filterKey]);

  if (products.length === 0) return <EmptyResults />;

  return (
    <Carousel ref={carousel} rows={rows} colsClassName={COLS[columns]}>
      <AnimatedProductList products={products} variant={variant} itemClassName="snap-start" />
    </Carousel>
  );
}
