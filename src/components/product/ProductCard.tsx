import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Truck, Flame } from 'lucide-react';
import type { Product } from '../../types';
import { Link } from 'react-router-dom';
import { cn, discountPercent, formatPrice, productPath } from '../../lib/format';
import { useShop } from '../../context/ShopContext';
import DeviceImage from './DeviceImage';

type Props = {
  product: Product;
  variant?: 'default' | 'flash';
};

export default function ProductCard({ product, variant = 'default' }: Props) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const percent = discountPercent(product.price, product.originalPrice);
  const liked = wishlist.has(product.id);
  const isFlash = variant === 'flash';

  return (
    <article className="group/card relative flex h-full snap-start flex-col overflow-hidden rounded-xl bg-white p-3 shadow-card ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      {/* Badges */}
      {percent > 0 && !isFlash && (
        <span className="absolute top-0 left-0 z-10 rounded-tl-xl rounded-br-xl bg-gradient-to-r from-primary to-primary-light px-2.5 py-1 text-[11px] font-bold text-white">
          Giảm {percent}%
        </span>
      )}
      {product.installment0 && !isFlash && (
        <span className="absolute top-2 right-2 z-10 rounded-md border border-blue/30 bg-blue-soft px-1.5 py-0.5 text-[10px] font-semibold text-blue">
          Trả góp 0%
        </span>
      )}

      {/* Image (1:1 placeholder) */}
      <div className="relative mt-4 mb-2 aspect-square overflow-hidden rounded-lg">
        <Link to={productPath(product)} className="block h-full w-full" aria-label={product.name}>
          <DeviceImage
            kind={product.kind}
            color={product.color}
            className="h-full w-full transition-transform duration-500 ease-out group-hover/card:scale-[1.07]"
          />
        </Link>
        {product.specs && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden flex-wrap justify-center gap-1 sm:flex">
            {product.specs.map((s) => (
              <span key={s} className="rounded bg-ink/5 px-1.5 py-0.5 text-[10px] font-semibold text-ink/70">
                {s}
              </span>
            ))}
          </div>
        )}
        {/* Quick add — slides up over the image on hover (desktop) */}
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="absolute inset-x-4 bottom-2 hidden translate-y-4 items-center justify-center gap-1.5 rounded-lg bg-primary/95 py-2 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100 hover:bg-primary-dark focus-visible:translate-y-0 focus-visible:opacity-100 md:flex"
        >
          <ShoppingCart className="h-4 w-4" /> Thêm vào giỏ
        </button>
      </div>

      <h3 className="line-clamp-2 min-h-[2.5rem] text-sm leading-5 font-semibold text-ink">
        <Link to={productPath(product)} className="hover:text-primary">
          {product.name}
        </Link>
      </h3>

      {/* Price */}
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
        {product.preorder ? (
          <span className="rounded bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">Hàng đặt trước</span>
        ) : product.inStock === false ? (
          <span className="rounded bg-page px-2 py-0.5 text-xs font-medium text-muted">Tạm hết hàng</span>
        ) : product.isNew && !isFlash ? (
          <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">Hàng mới về</span>
        ) : null}
        <span className="text-base font-bold text-primary sm:text-[17px]">{formatPrice(product.price)}</span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
        )}
      </div>

      {isFlash ? (
        <>
          <FlashStock sold={product.sold ?? 0} stock={product.stock ?? 1} />
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="mt-2 rounded-lg bg-primary py-1.5 text-xs font-semibold text-white md:hidden"
          >
            Mua ngay
          </button>
        </>
      ) : (
        <>
          {!!product.memberDiscount && (
            <p className="mt-2 rounded-md bg-blue-soft px-2 py-1 text-[11px] text-blue">
              Smember giảm đến {formatPrice(product.memberDiscount)}
            </p>
          )}
          {!!product.studentDiscount && (
            <p className="mt-1 rounded-md bg-violet-soft px-2 py-1 text-[11px] text-violet-700">
              S-Student giảm thêm {formatPrice(product.studentDiscount)}
            </p>
          )}
          {product.promoText && (
            <p className="mt-2 line-clamp-2 rounded-md bg-page px-2 py-1.5 text-xs leading-4 text-ink/75">{product.promoText}</p>
          )}

          <div className="mt-auto flex items-center gap-1.5 pt-3 sm:gap-2">
            {product.fastDelivery && (
              <span className="flex items-center gap-1 rounded bg-blue px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white">
                <Truck className="h-3 w-3" /> 2 Giờ
              </span>
            )}
            {product.rating && (
              <span className="flex items-center gap-0.5 text-xs font-medium text-ink/80">
                <Star className="h-3.5 w-3.5 fill-star text-star" /> {product.rating}
              </span>
            )}
            <button
              type="button"
              onClick={() => addToCart(product)}
              aria-label="Thêm vào giỏ"
              className="ml-auto rounded-full p-0.5 text-primary transition-colors hover:bg-primary-soft md:hidden"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.8 }}
              onClick={() => toggleWishlist(product)}
              aria-label={liked ? 'Bỏ yêu thích' : 'Yêu thích'}
              aria-pressed={liked}
              className="rounded-full p-0.5 text-blue transition-colors hover:bg-blue-soft md:ml-auto md:p-1"
            >
              <Heart className={cn('h-5 w-5 transition-all', liked && 'fill-primary text-primary')} />
            </motion.button>
          </div>
        </>
      )}
    </article>
  );
}

function FlashStock({ sold, stock }: { sold: number; stock: number }) {
  const ratio = Math.min(1, sold / stock);
  const label = `Đã bán ${sold}/${stock} suất`;
  // Two label layers: red text on the empty track, white text clipped to the filled part.
  return (
    <div className="relative mt-3 mb-1 h-5 overflow-hidden rounded-full bg-primary-soft">
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-primary">{label}</span>
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-light to-primary"
        initial={{ clipPath: 'inset(0 100% 0 0 round 999px)' }}
        whileInView={{ clipPath: `inset(0 ${100 - ratio * 100}% 0 0 round 999px)` }}
        viewport={{ once: false }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-white">{label}</span>
      </motion.div>
      <Flame className="absolute top-1/2 left-1.5 h-3.5 w-3.5 -translate-y-1/2 fill-amber-300 text-amber-400" />
    </div>
  );
}
