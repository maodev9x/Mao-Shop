import { ChevronRight, ImageIcon } from 'lucide-react';
import { news } from '../../data/site';
import Reveal from '../ui/Reveal';

export default function ProductNews() {
  return (
    <Reveal direction="left">
      <div className="rounded-2xl bg-white p-4 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold">Tin tức sản phẩm</h2>
          <a href="#news" className="flex items-center text-xs font-medium text-blue">
            Xem tất cả <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <ul className="space-y-3">
          {news.map((n) => (
            <li key={n.id}>
              <a href="#news" className="group flex gap-3 rounded-lg p-1 transition-colors hover:bg-page">
                {/* 16:9 thumbnail slot */}
                <span
                  className="relative flex aspect-video w-24 shrink-0 items-center justify-center overflow-hidden rounded-md"
                  style={{ backgroundImage: `linear-gradient(135deg, ${n.from}, ${n.to})` }}
                >
                  <ImageIcon className="h-5 w-5 text-white/50 transition-transform group-hover:scale-125" />
                </span>
                <span className="line-clamp-3 text-xs leading-snug text-ink/85 group-hover:text-primary">{n.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
