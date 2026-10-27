import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { CartItem, CartOptions, Product } from '../types';
import { readStorage, writeStorage } from '../lib/storage';

type Toast = { id: number; message: string };

type ShopContextValue = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  /** `unitPrice` defaults to `product.price` when no options change the price */
  addToCart: (product: Product, options?: CartOptions, unitPrice?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeFromCart: (lineId: string) => void;
  wishlist: Set<string>;
  toggleWishlist: (product: Product) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  province: string;
  setProvince: (province: string) => void;
  notify: (message: string) => void;
  toasts: Toast[];
};

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = 'maoshop.cart';
const WISHLIST_KEY = 'maoshop.wishlist';
const PROVINCE_KEY = 'maoshop.province';

export const provinces = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Nghệ An', 'Lào Cai'];

function lineIdOf(productId: string, options?: CartOptions) {
  return [productId, options?.variant ?? '', options?.color ?? ''].join('|');
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    // drop lines saved by older versions that had no lineId
    readStorage<CartItem[]>(CART_KEY, []).filter((i) => i.lineId && typeof i.unitPrice === 'number'),
  );
  const [wishlist, setWishlist] = useState<Set<string>>(() => new Set(readStorage<string[]>(WISHLIST_KEY, [])));
  const [province, setProvince] = useState<string>(() => readStorage(PROVINCE_KEY, provinces[0]));
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => writeStorage(CART_KEY, cart), [cart]);
  useEffect(() => writeStorage(WISHLIST_KEY, [...wishlist]), [wishlist]);
  useEffect(() => writeStorage(PROVINCE_KEY, province), [province]);

  const notify = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addToCart = useCallback(
    (product: Product, options?: CartOptions, unitPrice = product.price) => {
      const lineId = lineIdOf(product.id, options);
      setCart((items) => {
        if (items.some((i) => i.lineId === lineId)) {
          return items.map((i) => (i.lineId === lineId ? { ...i, quantity: i.quantity + 1 } : i));
        }
        return [...items, { lineId, product, options, unitPrice, quantity: 1 }];
      });
      notify(`Đã thêm "${product.name}" vào giỏ hàng`);
    },
    [notify],
  );

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setCart((items) =>
      quantity <= 0 ? items.filter((i) => i.lineId !== lineId) : items.map((i) => (i.lineId === lineId ? { ...i, quantity } : i)),
    );
  }, []);

  const removeFromCart = useCallback((lineId: string) => {
    setCart((items) => items.filter((i) => i.lineId !== lineId));
  }, []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      const liked = wishlist.has(product.id);
      setWishlist((prev) => {
        const next = new Set(prev);
        if (liked) next.delete(product.id);
        else next.add(product.id);
        return next;
      });
      notify(liked ? 'Đã bỏ khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích');
    },
    [wishlist, notify],
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      cart,
      cartCount: cart.reduce((n, i) => n + i.quantity, 0),
      cartTotal: cart.reduce((n, i) => n + i.quantity * i.unitPrice, 0),
      addToCart,
      updateQuantity,
      removeFromCart,
      wishlist,
      toggleWishlist,
      cartOpen,
      setCartOpen,
      province,
      setProvince,
      notify,
      toasts,
    }),
    [cart, addToCart, updateQuantity, removeFromCart, wishlist, toggleWishlist, cartOpen, province, notify, toasts],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>');
  return ctx;
}
