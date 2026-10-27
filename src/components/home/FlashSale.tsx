import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import { flashSaleProducts } from '../../data/products';
import { cn } from '../../lib/format';
import ProductCarousel from '../product/ProductCarousel';
import Countdown from '../ui/Countdown';
import Reveal from '../ui/Reveal';

function slotsFromToday() {
  const today = new Date();
  return [0, 1].map((offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    d.setHours(20, 0, 0, 0);
    return { id: String(offset), label: `20-22h ${d.getDate()}/${d.getMonth() + 1}`, start: d.getTime() };
  });
}

export default function FlashSale() {
  const slots = useMemo(slotsFromToday, []);
  const [active, setActive] = useState(slots[0].id);
  const slot = slots.find((s) => s.id === active)!;
  const items = active === '0' ? flashSaleProducts : [...flashSaleProducts].reverse();

  return (
    <Reveal as="section" className="container-page mt-6">
      <div className="relative">
        {/* Ribbon title */}
        <div className="relative z-10 mx-auto -mb-3 w-fit">
          <div className="flex items-center gap-2 rounded-t-2xl bg-gradient-to-b from-primary-light to-primary px-5 py-2.5 shadow-lg shadow-primary/30 sm:px-16">
            <Zap className="h-5 w-5 animate-pulse fill-amber-300 text-amber-300" />
            <h2 className="text-base font-black tracking-wide whitespace-nowrap text-white uppercase italic sm:text-2xl">Flash Sale tựu trường</h2>
            <Zap className="h-5 w-5 animate-pulse fill-amber-300 text-amber-300" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-primary p-3 shadow-xl ring-4 ring-amber-200/60 sm:p-5">
          <span className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_30%,rgb(255_255_255/0.08)_50%,transparent_70%)] bg-[length:200%_100%]" />

          <div className="relative mb-4 flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {slots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s.id)}
                  className={cn('relative rounded-full px-4 py-2 text-sm font-bold transition-colors', active === s.id ? 'text-primary' : 'text-white ring-1 ring-white/60 hover:bg-white/10')}
                >
                  {active === s.id && (
                    <motion.span layoutId="flash-slot" className="absolute inset-0 rounded-full bg-white shadow" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold whitespace-nowrap text-white uppercase sm:text-base">{slot.start > Date.now() ? 'Bắt đầu sau' : 'Kết thúc sau'}</span>
              <Countdown target={slot.start > Date.now() ? slot.start : slot.start + 2 * 3600 * 1000} />
            </div>
          </div>

          <div className="relative">
            <ProductCarousel products={items} filterKey={active} variant="flash" />
          </div>

          <p className="relative mt-4 text-center text-xs font-medium text-white/90 sm:text-sm">
            Áp dụng cho hạng thành viên S-TEACHER, S-STUDENT — Chỉ áp dụng thanh toán online thành công — Mỗi SĐT chỉ được mua 1 sản phẩm cùng loại.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
