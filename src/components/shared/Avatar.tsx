import { cn } from '../../lib/format';

const tones = ['bg-blue', 'bg-primary', 'bg-emerald-600', 'bg-violet-600', 'bg-amber-600', 'bg-slate-700'];

/** Initial-letter avatar with a colour derived from the name. */
export default function Avatar({ name, className }: { name: string; className?: string }) {
  const tone = tones[[...name].reduce((n, ch) => n + ch.charCodeAt(0), 0) % tones.length];
  return (
    <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white', tone, className)} aria-hidden="true">
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
