import { Play } from 'lucide-react';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';
import { formatPrice, productPath } from '../../lib/format';
import DeviceImage from '../product/DeviceImage';
import Carousel from '../ui/Carousel';
import Reveal from '../ui/Reveal';
import SectionTitle from './SectionTitle';

const reviews = [
  { id: 'ph5', title: 'Galaxy S25 Ultra sau 6 tháng', from: '#0f172a', to: '#475569' },
  { id: 'lt1', title: 'MacBook Air M4: đáng mua nhất?', from: '#1e293b', to: '#94a3b8' },
  { id: 'wt1', title: 'Apple Watch S11 có gì mới', from: '#4c0519', to: '#f43f5e' },
  { id: 'tv3', title: 'OLED C5: màn hình đỉnh cao', from: '#312e81', to: '#ec4899' },
  { id: 'ph1', title: 'Mở hộp iPhone 17 Pro Max', from: '#431407', to: '#f97316' },
];

export default function Reviews() {
  return (
    <Reveal as="section" className="container-page mt-10">
      <SectionTitle title="Review sản phẩm" />
      <Carousel colsClassName="auto-cols-[calc((100%-12px)/2)] sm:auto-cols-[calc((100%-24px)/3)] lg:auto-cols-[calc((100%-48px)/5)]">
        {reviews.map((r) => {
          const p = products.find((x) => x.id === r.id)!;
          return (
            <div key={r.id} className="group snap-start overflow-hidden rounded-xl bg-white shadow-card">
              {/* 3:4 video thumbnail slot */}
              <a href="#review" className="relative block aspect-[3/4] overflow-hidden" style={{ backgroundImage: `linear-gradient(160deg, ${r.from}, ${r.to})` }}>
                <DeviceImage kind={p.kind} color={p.color} className="absolute inset-0 m-auto h-3/5 w-3/5 transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent p-3 text-sm font-bold text-white">{r.title}</span>
                <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/25 backdrop-blur transition-transform group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-white text-white" />
                </span>
              </a>
              <Link to={productPath(p)} className="flex items-center gap-2 p-2.5 transition-colors hover:bg-page">
                <DeviceImage kind={p.kind} color={p.color} className="h-10 w-10 shrink-0" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{p.name}</p>
                  <p className="text-sm font-bold text-primary">{formatPrice(p.price)}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </Reveal>
  );
}
