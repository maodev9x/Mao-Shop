import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { forwardRef } from 'react';

type Props = {
  onBuyNow: () => void;
  onAddToCart: () => void;
  onInstallment: () => void;
};

/** Main purchase buttons; the page observes this element to toggle the sticky buy bar. */
const BuyActions = forwardRef<HTMLDivElement, Props>(function BuyActions({ onBuyNow, onAddToCart, onInstallment }, ref) {
  return (
    <div ref={ref} className="grid grid-cols-[auto_1fr_auto] gap-2">
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={onInstallment}
        className="rounded-xl border-2 border-blue px-3 text-sm leading-tight font-bold text-blue transition-colors hover:bg-blue-soft"
      >
        Trả góp
        <br />
        0%
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onBuyNow}
        className="rounded-xl bg-gradient-to-b from-primary-light to-primary px-3 py-2 text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.01]"
      >
        <span className="block text-base font-extrabold uppercase">Mua ngay</span>
        <span className="block text-[11px] text-white/90">Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng</span>
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        onClick={onAddToCart}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-primary px-3 text-[11px] font-semibold text-primary transition-colors hover:bg-primary-soft sm:flex-row sm:gap-1.5 sm:text-sm"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Thêm vào giỏ</span>
      </motion.button>
    </div>
  );
});

export default BuyActions;
