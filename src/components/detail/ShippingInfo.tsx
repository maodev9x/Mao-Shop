import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MapPin, Truck } from 'lucide-react';
import { useState } from 'react';
import { provinces, useShop } from '../../context/ShopContext';
import { cn } from '../../lib/format';

export default function ShippingInfo() {
  const { province, setProvince } = useShop();
  const [open, setOpen] = useState(false);
  const fast = province === 'Hà Nội' || province === 'Hồ Chí Minh';

  return (
    <div className="rounded-xl bg-white p-3 text-xs ring-1 ring-line sm:text-[13px]">
      <p className="mb-1.5 text-sm font-bold">Thông tin vận chuyển</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={province}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="flex items-center gap-2"
        >
          <span className="flex items-center gap-1 rounded bg-blue px-1.5 py-0.5 text-[11px] font-semibold text-white">
            <Truck className="h-3.5 w-3.5" /> {fast ? '2 Giờ' : '1-2 ngày'}
          </span>
          <span className="text-ink/80">
            {fast ? 'Áp dụng một số khu vực tại' : 'Giao tiêu chuẩn tới'} <b>{province}</b>
          </span>
        </motion.p>
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-2 flex items-center gap-1 text-blue hover:underline"
      >
        <MapPin className="h-4 w-4" /> Chọn địa chỉ giao hàng để nhận ưu đãi
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="flex flex-wrap gap-1.5 pt-2">
              {provinces.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setProvince(p);
                    setOpen(false);
                  }}
                  className={cn('rounded-full border px-2.5 py-1', p === province ? 'border-primary bg-primary-soft text-primary' : 'border-line hover:border-ink/30')}
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
