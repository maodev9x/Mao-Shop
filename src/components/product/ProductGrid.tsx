import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '../../types';
import AnimatedProductList from './AnimatedProductList';
import EmptyResults from './EmptyResults';

type Props = {
  products: Product[];
  /** Changes whenever filters/sort change — resets the list to the first page */
  filterKey: string;
  pageSize?: number;
  onClearFilters?: () => void;
};

/** Responsive product grid (2/3/4/5 columns) with filter animations and a "Xem thêm" button. */
export default function ProductGrid({ products, filterKey, pageSize = 20, onClearFilters }: Props) {
  const [visible, setVisible] = useState(pageSize);
  const [pageStart, setPageStart] = useState(0);

  useEffect(() => {
    setVisible(pageSize);
    setPageStart(0);
  }, [filterKey, pageSize]);

  if (products.length === 0) {
    return <EmptyResults message="Không tìm thấy sản phẩm phù hợp. Hãy thử bỏ bớt bộ lọc." actionLabel={onClearFilters ? 'Xóa bộ lọc' : undefined} onAction={onClearFilters} />;
  }

  const rest = products.length - visible;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <AnimatedProductList products={products.slice(0, visible)} staggerFrom={pageStart} />
      </div>
      {rest > 0 && (
        <div className="mt-6 flex justify-center">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setPageStart(visible);
              setVisible((v) => v + pageSize);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-white px-6 py-2.5 text-sm font-medium text-blue shadow-card ring-1 ring-blue/20 transition-colors hover:bg-blue-soft"
          >
            Xem thêm {rest} sản phẩm <ChevronDown className="h-4 w-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
