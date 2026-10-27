import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/format';

export default function Logo({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <Link to="/" className={cn('flex shrink-0 items-center gap-1.5', className)} aria-label="MaoShop - Trang chủ">
      <span
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg',
          tone === 'light' ? 'bg-white text-primary' : 'bg-primary text-white',
        )}
      >
        <Zap className="h-5 w-5 fill-current" />
      </span>
      <span className={cn('text-xl font-extrabold tracking-tight', tone === 'light' ? 'text-white' : 'text-ink')}>
        Mao<span className={tone === 'light' ? 'text-white/80' : 'text-primary'}>Shop</span>
      </span>
    </Link>
  );
}
