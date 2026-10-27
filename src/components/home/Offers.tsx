import Banner from '../ui/Banner';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import SectionTitle from './SectionTitle';

const education = [
  { title: 'Laptop sinh viên giảm đến 5 triệu', from: '#1d4ed8', to: '#38bdf8', kind: 'laptop' as const, color: '#cbd5e1' },
  { title: 'Trả góp 0% - duyệt 5 phút', from: '#7c3aed', to: '#c084fc', kind: 'tablet' as const, color: '#a5b4fc' },
];
const payment = [
  { title: 'Giảm đến 800K qua thẻ tín dụng', from: '#047857', to: '#34d399', kind: 'phone' as const, color: '#93c5fd' },
  { title: 'Ví điện tử hoàn tiền 10%', from: '#be185d', to: '#f472b6', kind: 'watch' as const, color: '#f59e0b' },
];
const brands = [
  { title: 'Apple', subtitle: 'Đại lý ủy quyền', from: '#111827', to: '#4b5563', kind: 'phone' as const, color: '#e5e7eb' },
  { title: 'Samsung', subtitle: 'Sản phẩm cực khủng', from: '#1e3a8a', to: '#3b82f6', kind: 'foldable' as const, color: '#1e3a8a' },
  { title: 'Xiaomi', subtitle: 'Giá tốt mỗi ngày', from: '#c2410c', to: '#fb923c', kind: 'tv' as const, color: '#22c55e' },
  { title: 'Sony', subtitle: 'Âm thanh đỉnh cao', from: '#0f172a', to: '#334155', kind: 'headphones' as const, color: '#1f2937' },
];

export default function Offers() {
  return (
    <>
      <section className="container-page mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal direction="right">
          <SectionTitle title="Ưu đãi sinh viên" />
          <div className="grid grid-cols-2 gap-3">
            {education.map((b) => (
              <Banner key={b.title} aspect="aspect-[2/1]" size="sm" from={b.from} to={b.to} title={b.title} cta="Xem ngay" device={{ kind: b.kind, color: b.color }} />
            ))}
          </div>
        </Reveal>
        <Reveal direction="left">
          <SectionTitle title="Ưu đãi thanh toán" />
          <div className="grid grid-cols-2 gap-3">
            {payment.map((b) => (
              <Banner key={b.title} aspect="aspect-[2/1]" size="sm" from={b.from} to={b.to} title={b.title} cta="Xem ngay" device={{ kind: b.kind, color: b.color }} />
            ))}
          </div>
        </Reveal>
      </section>

      <Reveal as="section" className="container-page mt-10">
        <SectionTitle title="Chuyên trang thương hiệu" />
        <RevealGroup className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {brands.map((b) => (
            <RevealItem key={b.title}>
              <Banner aspect="aspect-[16/9]" from={b.from} to={b.to} eyebrow="Chính hãng" title={b.title} subtitle={b.subtitle} device={{ kind: b.kind, color: b.color }} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>
    </>
  );
}
