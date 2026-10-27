import { motion } from 'framer-motion';
import { Check, Info, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { cn, formatPrice } from '../../lib/format';

/** Package prices scale with the product price. */
function packages(price: number) {
  const p = (ratio: number) => Math.max(99_000, Math.round((price * ratio) / 10_000) * 10_000 - 10_000);
  return [
    { id: 'buyback24', name: 'S-BuyBack: Gói cam kết giá thu sau 24 tháng', price: p(0.065), featured: true },
    { id: 'buyback15', name: 'S-BuyBack: Gói cam kết giá thu sau 15 tháng', price: p(0.045), featured: true },
    { id: 'vip12', name: '1 đổi 1 VIP 12 tháng: Đổi máy mới tương đương khi lỗi', price: p(0.058) },
    { id: 'vip6', name: '1 đổi 1 VIP 6 tháng: Đổi máy mới tương đương khi lỗi', price: p(0.04) },
    { id: 'vip24', name: '1 đổi 1 VIP 24 tháng: Đổi máy mới tương đương khi lỗi', price: p(0.12) },
    { id: 'drop24', name: 'Rơi vỡ rớt nước 24 tháng: Đổi mới tương đương khi hư hỏng', price: p(0.18) },
  ];
}

export default function WarrantyPicker({ price }: { price: number }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="rounded-xl bg-white p-3 ring-1 ring-line">
      <p className="mb-2 flex items-center gap-1.5 text-sm font-bold">
        <ShieldCheck className="h-5 w-5 text-primary" /> Chọn gói dịch vụ bảo hành
        <Info className="h-4 w-4 text-muted" aria-label="Gói bảo hành mở rộng, thanh toán cùng sản phẩm" />
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {packages(price).map((pkg) => {
          const active = selected === pkg.id;
          return (
            <motion.button
              key={pkg.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(active ? null : pkg.id)}
              aria-pressed={active}
              className={cn(
                'relative rounded-lg border p-2 text-left transition-colors',
                active ? 'border-primary bg-primary-soft/40' : 'border-line hover:border-ink/30',
              )}
            >
              {pkg.featured && <span className="absolute -top-2 left-2 rounded bg-primary px-1 text-[9px] font-bold text-white">Nổi bật</span>}
              <span className="line-clamp-2 text-[11px] leading-snug">{pkg.name}</span>
              <span className="mt-1 flex items-center justify-between">
                <span className="text-xs font-bold text-primary">{formatPrice(pkg.price)}</span>
                {active && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </motion.span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
