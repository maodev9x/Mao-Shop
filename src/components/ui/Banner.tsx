import type { ReactNode } from 'react';
import type { DeviceKind } from '../../types';
import { cn } from '../../lib/format';
import DeviceImage from '../product/DeviceImage';

type Props = {
  /** Tailwind aspect-ratio class, e.g. "aspect-[23/10]" — keeps the slot ready for a real image */
  aspect: string;
  from: string;
  to: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: string;
  device?: { kind: DeviceKind; color: string };
  size?: 'sm' | 'md' | 'lg';
  layout?: 'row' | 'column';
  className?: string;
  children?: ReactNode;
};

/**
 * Placeholder promo banner. Swap the gradient + illustration for an <img>
 * of the same aspect ratio when real artwork is available.
 */
export default function Banner({
  aspect,
  from,
  to,
  eyebrow,
  title,
  subtitle,
  cta,
  device,
  size = 'md',
  layout = 'row',
  className,
  children,
}: Props) {
  const titleSize = { sm: 'text-sm sm:text-base', md: 'text-lg sm:text-2xl', lg: 'text-2xl sm:text-4xl' }[size];
  return (
    <a
      href="#promo"
      className={cn('group relative block overflow-hidden rounded-xl text-white', aspect, className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {/* decorative shapes */}
      <span className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-125" />
      <span className="absolute -bottom-16 left-1/3 h-44 w-44 rounded-full bg-white/5" />

      <div className={cn('relative flex h-full gap-2 p-3 sm:p-5', layout === 'row' ? 'items-center' : 'flex-col justify-between')}>
        <div className={cn('z-10 min-w-0', layout === 'row' ? 'flex-1' : '')}>
          {eyebrow && (
            <span className="mb-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase backdrop-blur sm:text-xs">
              {eyebrow}
            </span>
          )}
          <p className={cn('leading-tight font-extrabold drop-shadow-sm', titleSize)}>{title}</p>
          {subtitle && <p className="mt-1 line-clamp-2 text-[11px] text-white/85 sm:text-sm">{subtitle}</p>}
          {cta && (
            <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold text-primary shadow transition-transform group-hover:scale-105 sm:mt-3 sm:px-4 sm:py-1.5 sm:text-xs">
              {cta}
            </span>
          )}
          {children}
        </div>
        {device && (
          <DeviceImage
            kind={device.kind}
            color={device.color}
            className={cn(
              'shrink-0 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2',
              layout === 'row' ? 'h-full max-h-full w-auto' : 'mx-auto w-4/5',
            )}
          />
        )}
      </div>
    </a>
  );
}
