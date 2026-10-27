import { AnimatePresence, motion } from 'framer-motion';
import type { Product } from '../../types';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
  variant?: 'default' | 'flash';
  itemClassName?: string;
  /** Index from which the stagger delay starts counting (so "Xem thêm" items stagger from 0) */
  staggerFrom?: number;
};

/**
 * Card items that animate when the list changes: removed cards shrink/fade out,
 * the rest glide to their new slot, new cards pop in with a staggered fade.
 * Render it directly inside a grid / carousel track.
 */
export default function AnimatedProductList({ products, variant = 'default', itemClassName, staggerFrom = 0 }: Props) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, delay: Math.min(Math.max(index - staggerFrom, 0), 10) * 0.04 } }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
          className={itemClassName}
        >
          <ProductCard product={product} variant={variant} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
