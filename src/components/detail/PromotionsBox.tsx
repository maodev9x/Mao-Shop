import { ChevronRight, Gift, RefreshCcw, ScanSearch, Smartphone } from 'lucide-react';
import { formatPrice } from '../../lib/format';

type Props = { price: number };

export default function PromotionsBox({ price }: Props) {
  const tradeInSupport = price >= 20_000_000 ? 3_000_000 : 1_000_000;
  const promotions = [
    'Ưu đãi thanh toán giảm đến 2 triệu qua thẻ tín dụng',
    'Chi thêm 30K nhận Sim/eSim 5G, có ngay 3GB data/ngày + 500 phút gọi, miễn phí 30 ngày đầu',
    'Tặng phiếu mua hàng 200.000đ cho đơn tiếp theo',
  ];

  return (
    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-blue/25">
      <p className="flex items-center gap-2 bg-blue-soft/60 px-3 py-2.5 text-sm font-bold">
        <Gift className="h-4 w-4 text-primary" /> Khuyến mãi đi kèm
      </p>
      <ol className="space-y-2 px-3 py-3 text-xs sm:text-[13px]">
        {promotions.map((text, i) => (
          <li key={text} className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue text-[11px] font-bold text-white">{i + 1}</span>
            <span className="text-ink/85">
              {text}{' '}
              <a href="#promo" className="text-blue hover:underline">
                Xem chi tiết
              </a>
            </span>
          </li>
        ))}
      </ol>
      {price >= 5_000_000 && (
      <div className="space-y-2 border-t border-line px-3 py-3 text-xs sm:text-[13px]">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="flex items-center gap-1.5">
            <RefreshCcw className="h-4 w-4 text-primary" /> Lên đời chỉ từ <b className="text-primary">{formatPrice(price - tradeInSupport * 2)}</b>
          </span>
          <span className="text-ink/70">
            Trợ giá đến <b className="text-primary">{formatPrice(tradeInSupport)}</b>
          </span>
        </p>
        <a href="#tradein" className="flex items-center gap-3 rounded-lg bg-blue-soft px-3 py-2 transition-colors hover:bg-blue-soft/70">
          <Smartphone className="h-6 w-6 text-blue" />
          <span className="flex-1">
            <span className="flex items-center gap-1.5 font-semibold">
              Định giá máy chuyên sâu <span className="rounded-full bg-blue px-1.5 text-[10px] text-white">Mới</span>
            </span>
            <span className="text-[11px] text-muted">Miễn phí • Chỉ 2 phút</span>
          </span>
          <ChevronRight className="h-4 w-4 text-ink/50" />
        </a>
        <a href="#tradein" className="flex items-center gap-2 rounded-lg px-1 py-1 text-ink/80 hover:text-primary">
          <ScanSearch className="h-4 w-4 text-blue" /> Định giá nhanh theo tình trạng máy
          <ChevronRight className="ml-auto h-4 w-4 text-ink/50" />
        </a>
      </div>
      )}
    </div>
  );
}
