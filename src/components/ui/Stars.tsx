import { Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/format';

type Props = {
  value: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** When set, the stars become a 1–5 rating input */
  onChange?: (value: number) => void;
  className?: string;
};

const sizes = { xs: 'h-3 w-3', sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-8 w-8' };
export const ratingLabels = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

export default function Stars({ value, size = 'sm', onChange, className }: Props) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  if (!onChange) {
    return (
      <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} trên 5 sao`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={cn(sizes[size], i <= Math.round(value) ? 'fill-star text-star' : 'fill-line text-line')} />
        ))}
      </span>
    );
  }

  return (
    <span className={cn('inline-flex items-center gap-1', className)} role="radiogroup" aria-label="Chọn số sao" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} sao - ${ratingLabels[i]}`}
          onMouseEnter={() => setHover(i)}
          onClick={() => onChange(i)}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Star className={cn(sizes[size], i <= shown ? 'fill-star text-star' : 'fill-line text-line')} />
        </button>
      ))}
    </span>
  );
}
