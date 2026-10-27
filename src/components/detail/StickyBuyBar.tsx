import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { createPortal } from 'react-dom';
import { formatPrice } from '../../lib/format';
import type { Product } from '../../types';
import DeviceImage from '../product/DeviceImage';
import { monthlyInstallment } from './PriceBox';

type Props = {
  visible: boolean;
  product: Product;
  optionLabel: string;
  color: string;
  price: number;
  onBuyNow: () => void;
  onAddToCart: () => void;
  onInstallment: () => void;
};

/** Bottom purchase bar shown once the main buy buttons have scrolled out of view. */
export default function StickyBuyBar({ visible, product, optionLabel, color, price, onBuyNow, onAddToCart, onInstallment }: Props) {
  // portal: page sections use transforms, which would break `position: fixed`
  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 sm:bottom-3 sm:mx-auto sm:max-w-3xl sm:px-4"
        >
          <div className="flex items-center gap-2 border-t border-line bg-white/95 px-3 py-2 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur sm:gap-3 sm:rounded-2xl sm:border sm:px-4">
            <DeviceImage kind={product.kind} color={color} className="h-11 w-11 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold sm:text-sm">
                {product.name}
                {optionLabel && <span className="font-normal text-ink/60"> - {optionLabel}</span>}
              </p>
              <p className="text-sm font-extrabold text-primary sm:hidden">{formatPrice(price)}</p>
            </div>
            <p className="hidden text-lg font-extrabold text-primary sm:block">{formatPrice(price)}</p>
            <button
              type="button"
              onClick={onInstallment}
              className="relative hidden rounded-lg border border-blue px-3 py-1 text-center text-blue transition-colors hover:bg-blue-soft md:block"
            >
              <span className="absolute -top-2 right-1 rounded bg-blue px-1 text-[9px] font-semibold text-white">12 tháng</span>
              <span className="block text-xs font-bold">Trả góp 0%</span>
              <span className="block text-[10px]">{formatPrice(monthlyInstallment(price))}/tháng</span>
            </button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={onBuyNow}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-bold whitespace-nowrap text-white hover:bg-primary-dark sm:px-4"
            >
              Mua ngay
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={onAddToCart}
              aria-label="Thêm vào giỏ"
              className="rounded-lg border border-primary p-2 text-primary hover:bg-primary-soft"
            >
              <ShoppingCart className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
