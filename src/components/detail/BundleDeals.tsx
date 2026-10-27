import { motion } from 'framer-motion';
import { Flame, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { byCategory } from '../../data/products';
import { formatPrice, productPath } from '../../lib/format';
import type { Product } from '../../types';
import DeviceImage from '../product/DeviceImage';
import Carousel from '../ui/Carousel';

const BUNDLE_DISCOUNT = 0.15;

/** Accessories and audio sold at a bundle discount with the main product. */
export default function BundleDeals({ product }: { product: Product }) {
  const { addToCart } = useShop();
  const items = byCategory('audio', 'accessory')
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  return (
    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-line">
      <div className="flex items-center justify-between bg-gradient-to-r from-amber-100 to-amber-50 px-3 py-2.5">
        <p className="flex items-center gap-1.5 text-sm font-bold">
          <Flame className="h-5 w-5 fill-amber-400 text-primary" /> Mua kèm giá sốc
        </p>
        <a href="#bundle" className="text-xs font-medium text-blue">
          Xem tất cả
        </a>
      </div>
      <div className="p-3">
        <Carousel rows={2} colsClassName="auto-cols-[85%] sm:auto-cols-[calc((100%-12px)/2)]" gapClassName="gap-3">
          {items.map((p) => {
            const price = Math.round((p.price * (1 - BUNDLE_DISCOUNT)) / 1000) * 1000;
            return (
              <div key={p.id} className="flex snap-start gap-2 rounded-lg border border-line p-2">
                <Link to={productPath(p)} className="h-14 w-14 shrink-0 rounded-md bg-page">
                  <DeviceImage kind={p.kind} color={p.color} className="h-full w-full" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link to={productPath(p)} className="line-clamp-2 text-[11px] leading-snug font-medium hover:text-primary">
                    Giảm {BUNDLE_DISCOUNT * 100}% khi mua kèm {p.name}
                  </Link>
                  <div className="mt-auto flex items-end justify-between gap-1 pt-1">
                    <span className="text-xs font-bold text-primary">{formatPrice(price)}</span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(p, { variant: 'Mua kèm' }, price)}
                      className="flex shrink-0 items-center gap-0.5 rounded-md bg-blue-soft px-1.5 py-1 text-[11px] font-medium text-blue hover:bg-blue hover:text-white"
                    >
                      Chọn thêm <Plus className="h-3 w-3" />
                    </motion.button>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
