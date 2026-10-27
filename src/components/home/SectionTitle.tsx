import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

export default function SectionTitle({ title, href = '#all', right }: { title: string; href?: string; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <h2 className="text-lg font-extrabold tracking-tight text-ink uppercase sm:text-xl">{title}</h2>
      <span className="h-5 w-px bg-line" />
      <a href={href} className="group flex items-center gap-0.5 text-sm font-medium text-blue">
        Xem tất cả <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
      {right && <div className="ml-auto">{right}</div>}
    </div>
  );
}
