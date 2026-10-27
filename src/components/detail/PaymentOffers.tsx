import { CreditCard } from 'lucide-react';
import Carousel from '../ui/Carousel';

const offers = [
  { brand: 'VNPAY', text: 'Giảm tối đa 1 triệu khi thanh toán qua thẻ tín dụng', tone: 'bg-blue-soft text-blue' },
  { brand: 'MoMo', text: 'Giảm đến 500.000đ cho đơn hàng từ 10 triệu', tone: 'bg-primary-soft text-primary' },
  { brand: 'ZaloPay', text: 'Hoàn tiền 5% tối đa 300.000đ cho khách hàng mới', tone: 'bg-blue-soft text-blue' },
  { brand: 'Kredivo', text: 'Trả sau 0% lãi trong 30 ngày đầu tiên', tone: 'bg-violet-soft text-violet-700' },
  { brand: 'Thẻ Visa', text: 'Giảm 3% tối đa 800.000đ qua thẻ Visa quốc tế', tone: 'bg-page text-ink' },
];

export default function PaymentOffers() {
  return (
    <div className="rounded-xl bg-white p-3 ring-1 ring-line">
      <p className="mb-2 flex items-center gap-2 text-sm font-bold">
        <CreditCard className="h-4 w-4 text-primary" /> Ưu đãi thanh toán
      </p>
      <Carousel colsClassName="auto-cols-[78%] sm:auto-cols-[calc((100%-12px)/2)]" gapClassName="gap-3">
        {offers.map((o) => (
          <a key={o.brand} href="#payment" className="flex snap-start gap-2 rounded-lg border border-line p-2.5 transition-colors hover:border-blue">
            <span className={`flex h-9 w-12 shrink-0 items-center justify-center rounded-md text-[10px] font-black ${o.tone}`}>{o.brand}</span>
            <span className="min-w-0">
              <span className="line-clamp-2 text-[11px] leading-snug text-ink/85">{o.text}</span>
              <span className="mt-1 flex items-center gap-2 text-[10px]">
                <span className="rounded bg-page px-1.5 py-0.5 text-ink/70">Kết thúc sau 70 ngày</span>
                <span className="text-blue">Chi tiết</span>
              </span>
            </span>
          </a>
        ))}
      </Carousel>
    </div>
  );
}
