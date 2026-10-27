import { BadgeCheck, PackageCheck, ReceiptText } from 'lucide-react';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';

const commitments = [
  { icon: PackageCheck, text: 'Mới, đầy đủ phụ kiện từ nhà sản xuất.' },
  {
    icon: BadgeCheck,
    text: '1 đổi 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng.',
  },
  { icon: ReceiptText, text: 'Giá sản phẩm đã bao gồm thuế VAT, hỗ trợ hoàn thuế VAT - Tax Refund cho khách du lịch.' },
];

export default function CommitmentCards() {
  return (
    <Reveal>
      <h2 className="mb-3 text-base font-bold">Cam kết sản phẩm</h2>
      <RevealGroup className="grid gap-3 sm:grid-cols-2" stagger={0.05}>
        {commitments.map(({ icon: Icon, text }) => (
          <RevealItem key={text} className="h-full">
            <div className="h-full rounded-xl bg-white p-3.5 shadow-card ring-1 ring-black/[0.03]">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <p className="text-xs leading-relaxed text-ink/75">{text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Reveal>
  );
}
