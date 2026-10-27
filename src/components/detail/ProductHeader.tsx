import { motion } from 'framer-motion';
import { Heart, MessageSquareText, Settings2, CirclePlus } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { cn } from '../../lib/format';
import type { Product } from '../../types';
import Stars from '../ui/Stars';

type Props = { product: Product; reviewCount: number; average: number };

export default function ProductHeader({ product, reviewCount, average }: Props) {
  const { wishlist, toggleWishlist } = useShop();
  const liked = wishlist.has(product.id);

  const links = [
    { href: '#hoi-dap', label: 'Hỏi đáp', icon: MessageSquareText },
    { href: '#thong-so', label: 'Thông số', icon: Settings2 },
    { href: '#so-sanh', label: 'So sánh', icon: CirclePlus },
  ];

  return (
    <div>
      <h1 className="text-lg leading-snug font-bold text-ink sm:text-xl">{product.name}</h1>
      <a href="#danh-gia" className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink/70 hover:text-primary">
        <Stars value={average} size="sm" />
        <b className="text-ink">{average.toFixed(1)}</b> ({reviewCount} đánh giá)
      </a>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleWishlist(product)}
          aria-pressed={liked}
          className="flex items-center gap-1 text-blue hover:underline"
        >
          <Heart className={cn('h-4 w-4', liked && 'fill-primary text-primary')} /> {liked ? 'Đã thích' : 'Yêu thích'}
        </motion.button>
        {links.map(({ href, label, icon: Icon }) => (
          <a key={href} href={href} className="flex items-center gap-1 text-blue hover:underline">
            <Icon className="h-4 w-4" /> {label}
          </a>
        ))}
      </div>
    </div>
  );
}
