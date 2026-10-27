import { motion } from 'framer-motion';
import { BatteryCharging, Camera, Cpu, Sparkles, Zap, Smile, type LucideIcon } from 'lucide-react';
import type { Product, ProductDetail } from '../../types';
import DeviceImage from '../product/DeviceImage';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const tileIcons: LucideIcon[] = [Camera, Cpu, BatteryCharging, Zap, Smile, Sparkles];

const lovables = [
  { eyebrow: 'Phụ kiện', title: 'Kết hợp hoàn hảo.', text: 'Ốp lưng, bộ sạc, dây đeo và nhiều phụ kiện chính hãng đầy màu sắc.', kind: 'charger' as const, color: '#38bdf8' },
  { eyebrow: 'Âm nhạc', title: 'Mua tai nghe, tặng 3 tháng nghe nhạc miễn phí.', text: 'Hàng triệu bài hát chất lượng cao, không quảng cáo.', kind: 'earbuds' as const, color: '#f8fafc' },
  { eyebrow: 'Bảo hành', title: 'Được chăm sóc chu đáo.', text: 'Sửa chữa nhanh khi rơi vỡ, vào nước và thay pin tại trung tâm chính hãng.', kind: 'phone' as const, color: '#1f2937' },
  { eyebrow: 'Hệ sinh thái', title: 'Đồng hồ đo. Điện thoại phân tích.', text: 'Kết hợp đồng hồ thông minh để theo dõi sức khỏe, giấc ngủ và luyện tập.', kind: 'watch' as const, color: '#f43f5e' },
];

/** Dark marketing block ("Thông tin nổi bật") built from placeholders with fixed aspect ratios. */
export default function HighlightContent({ product, detail }: { product: Product; detail: ProductDetail }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="bg-ink text-white">
        {/* hero — 3:2 slot */}
        <div className="relative flex aspect-[3/2] flex-col items-center overflow-hidden px-6 pt-10 text-center">
          <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/10 to-transparent" />
          <p className="relative text-sm font-semibold text-white/70">{product.brand}</p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="relative mt-1 text-3xl font-black tracking-tight sm:text-5xl"
          >
            Mạnh hơn hẳn.
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-4 flex-1"
          >
            <DeviceImage kind={product.kind} color={product.color} className="h-full w-auto drop-shadow-[0_30px_60px_rgba(255,255,255,0.15)]" />
          </motion.div>
        </div>

        {/* feature tiles — 1:1 */}
        <RevealGroup className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:p-8">
          {detail.features.map((f, i) => {
            const Icon = tileIcons[i % tileIcons.length];
            return (
              <RevealItem key={f.title}>
                <div className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-white/[0.06] p-3 text-center ring-1 ring-white/10 transition-colors hover:bg-white/10">
                  <Icon className="mb-2 h-7 w-7 text-amber-300" />
                  <p className="text-xs text-white/70 sm:text-sm">{f.title}</p>
                  <p className="mt-1 text-lg leading-tight font-extrabold sm:text-2xl">{f.value}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      <div className="bg-page px-4 py-10 sm:px-8">
        <h3 className="mb-6 text-center text-2xl font-extrabold">Vẫn còn nhiều món đáng yêu.</h3>
        <RevealGroup className="mx-auto max-w-3xl space-y-4">
          {lovables.map((l) => (
            <RevealItem key={l.title}>
              <div className="grid items-center gap-4 rounded-2xl bg-white p-5 sm:aspect-[5/2] sm:grid-cols-[1fr_40%] sm:p-8">
                <div>
                  <p className="text-xs font-semibold text-ink/60">{l.eyebrow}</p>
                  <p className="mt-1 text-xl leading-tight font-extrabold sm:text-2xl">{l.title}</p>
                  <p className="mt-2 text-sm text-ink/70">{l.text}</p>
                </div>
                <DeviceImage kind={l.kind} color={l.color} className="mx-auto h-32 w-32 sm:h-full sm:w-full" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
