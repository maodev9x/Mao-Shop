import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { byCategory } from '../../data/products';
import { formatPrice, productPath } from '../../lib/format';
import DeviceImage from '../product/DeviceImage';
import Carousel from '../ui/Carousel';

export default function AccessoryUpsell() {
  const { addToCart } = useShop();
  const items = byCategory('accessory').slice(0, 8);

  return (
    <div className="rounded-xl bg-white p-3 ring-1 ring-line">
      <p className="mb-2 text-sm font-bold">Phụ kiện mua cùng</p>
      <Carousel rows={2} colsClassName="auto-cols-[85%] sm:auto-cols-[calc((100%-12px)/2)]" gapClassName="gap-3">
        {items.map((p) => (
          <div key={p.id} className="flex snap-start gap-2 rounded-lg border border-line p-2">
            <Link to={productPath(p)} className="h-14 w-14 shrink-0 rounded-md bg-page">
              <DeviceImage kind={p.kind} color={p.color} className="h-full w-full" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <Link to={productPath(p)} className="line-clamp-2 text-[11px] leading-snug font-medium hover:text-primary">
                {p.name}
              </Link>
              {!!p.memberDiscount && <span className="text-[10px] text-muted">Smember giảm thêm đến {formatPrice(p.memberDiscount)}</span>}
              <div className="mt-auto flex items-end justify-between gap-1 pt-1">
                <span className="text-xs font-bold text-primary">{formatPrice(p.price)}</span>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(p)}
                  className="flex shrink-0 items-center gap-0.5 rounded-md bg-primary-soft px-1.5 py-1 text-[11px] font-medium text-primary hover:bg-primary hover:text-white"
                >
                  Thêm vào giỏ <Plus className="h-3 w-3" />
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
