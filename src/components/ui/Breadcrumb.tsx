import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export type Crumb = { label: string; to?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-scrollbar overflow-x-auto py-3">
      <ol className="flex items-center gap-1.5 text-xs whitespace-nowrap text-ink/70">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-primary">
            <Home className="h-3.5 w-3.5" /> Trang chủ
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-ink/40" />
            {c.to ? (
              <Link to={c.to} className="hover:text-primary">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink/50">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
