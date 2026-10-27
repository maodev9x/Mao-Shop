import { Crown } from 'lucide-react';
import { formatPrice } from '../../lib/format';
import AnimatedNumber from '../ui/AnimatedNumber';

type Props = { price: number; originalPrice?: number; memberDiscount?: number };

/** Monthly amount for 12-month 0% installment, rounded to hundreds. */
export function monthlyInstallment(price: number) {
  return Math.round(price / 12 / 100) * 100;
}

export default function PriceBox({ price, originalPrice, memberDiscount }: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-blue-soft to-white ring-1 ring-blue/25">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-3 sm:p-4">
        <div className="text-center">
          <AnimatedNumber value={price} format={formatPrice} className="text-xl font-extrabold text-ink sm:text-2xl" />
          {originalPrice && originalPrice > price && (
            <p className="text-xs text-muted line-through">{formatPrice(originalPrice)}</p>
          )}
        </div>
        <span className="text-xs text-muted">Hoặc</span>
        <div className="text-center">
          <p className="text-sm font-bold text-ink sm:text-base">
            <AnimatedNumber value={monthlyInstallment(price)} format={formatPrice} />
            <span className="font-normal">/tháng</span>
          </p>
          <p className="text-[11px] text-blue">12 tháng, lãi suất 0%</p>
        </div>
      </div>
      {!!memberDiscount && (
        <div className="flex items-center justify-center gap-2 border-t border-blue/15 bg-white/70 px-3 py-2 text-xs">
          <Crown className="h-4 w-4 text-primary" />
          <span className="font-semibold">Smember</span>
          <span className="text-ink/70">
            Giảm thêm đến <b className="text-blue">{formatPrice(memberDiscount)}</b>
          </span>
          <a href="#member" className="font-medium text-primary hover:underline">
            Kiểm tra
          </a>
        </div>
      )}
    </div>
  );
}
