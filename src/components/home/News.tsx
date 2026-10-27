import { CalendarDays, ImageIcon } from 'lucide-react';
import { news } from '../../data/site';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import SectionTitle from './SectionTitle';

export default function News() {
  return (
    <Reveal as="section" className="container-page mt-10">
      <SectionTitle title="Tin tức công nghệ" />
      <RevealGroup className="no-scrollbar grid auto-cols-[70%] grid-flow-col gap-3 overflow-x-auto sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-3 lg:grid-cols-5">
        {news.map((n) => (
          <RevealItem key={n.id}>
            <a href="#news" className="group block h-full overflow-hidden rounded-xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              {/* 16:9 thumbnail placeholder */}
              <div className="relative aspect-video overflow-hidden" style={{ backgroundImage: `linear-gradient(135deg, ${n.from}, ${n.to})` }}>
                <ImageIcon className="absolute inset-0 m-auto h-10 w-10 text-white/40 transition-transform duration-500 group-hover:scale-125" />
              </div>
              <div className="p-3">
                <p className="line-clamp-3 text-sm leading-5 font-medium transition-colors group-hover:text-primary">{n.title}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                  <CalendarDays className="h-3.5 w-3.5" /> {n.date}
                </p>
              </div>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </Reveal>
  );
}
