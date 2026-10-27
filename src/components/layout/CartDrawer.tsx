import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { formatPrice, productPath } from '../../lib/format';
import DeviceImage from '../product/DeviceImage';
import Drawer from '../ui/Drawer';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, cartTotal, updateQuantity, removeFromCart } = useShop();
  const close = useCallback(() => setCartOpen(false), [setCartOpen]);

  return (
    <Drawer open={cartOpen} onClose={close} label="Giỏ hàng" side="right" className="w-full max-w-md">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="text-lg font-bold">Giỏ hàng của bạn</h2>
        <button type="button" onClick={() => setCartOpen(false)} aria-label="Đóng" className="rounded-lg p-1.5 hover:bg-page">
          <X className="h-5 w-5" />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-full bg-primary-soft p-6">
            <ShoppingBag className="h-12 w-12 text-primary" />
          </motion.div>
          <p className="font-semibold">Giỏ hàng đang trống</p>
          <p className="text-sm text-muted">Hãy chọn thêm sản phẩm để mua sắm nhé!</p>
          <button type="button" onClick={() => setCartOpen(false)} className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <>
          <ul className="flex-1 space-y-3 overflow-y-auto p-4">
            <AnimatePresence initial={false}>
              {cart.map(({ lineId, product, options, unitPrice, quantity }) => (
                <motion.li
                  key={lineId}
                  layout
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40, height: 0, marginTop: 0 }}
                  className="flex gap-3 rounded-xl border border-line p-3"
                >
                  <div className="h-20 w-20 shrink-0 rounded-lg bg-page">
                    <DeviceImage kind={product.kind} color={product.color} className="h-full w-full" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link to={productPath(product)} onClick={() => setCartOpen(false)} className="line-clamp-2 text-sm font-medium hover:text-primary">
                      {product.name}
                    </Link>
                    {(options?.variant || options?.color) && (
                      <p className="mt-0.5 text-xs text-muted">{[options.variant, options.color].filter(Boolean).join(' · ')}</p>
                    )}
                    <p className="mt-1 text-sm font-bold text-primary">{formatPrice(unitPrice)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-lg border border-line">
                        <button type="button" aria-label="Giảm" onClick={() => updateQuantity(lineId, quantity - 1)} className="p-1.5 hover:bg-page">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                        <button type="button" aria-label="Tăng" onClick={() => updateQuantity(lineId, quantity + 1)} className="p-1.5 hover:bg-page">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button type="button" aria-label="Xóa" onClick={() => removeFromCart(lineId)} className="rounded-lg p-1.5 text-muted hover:bg-primary-soft hover:text-primary">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="border-t border-line p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted">Tạm tính</span>
              <span className="text-xl font-extrabold text-primary">{formatPrice(cartTotal)}</span>
            </div>
            <button type="button" className="w-full rounded-xl bg-gradient-to-r from-primary-light to-primary py-3 font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.01] active:scale-[0.99]">
              Tiến hành đặt hàng
            </button>
          </div>
        </>
      )}
    </Drawer>
  );
}
