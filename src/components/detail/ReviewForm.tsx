import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { Product, Review } from '../../types';
import DeviceImage from '../product/DeviceImage';
import Drawer from '../ui/Drawer';
import Stars, { ratingLabels } from '../ui/Stars';

type Props = {
  product: Product;
  open: boolean;
  onClose: () => void;
  onSubmit: (review: Omit<Review, 'id' | 'createdAt'>) => void;
};

const MIN_LENGTH = 15;

export default function ReviewForm({ product, open, onClose, onSubmit }: Props) {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim()) return setError('Vui lòng nhập họ tên.');
    if (content.trim().length < MIN_LENGTH) return setError(`Nội dung đánh giá tối thiểu ${MIN_LENGTH} ký tự.`);
    onSubmit({ author: author.trim(), rating, content: content.trim(), verified });
    setAuthor('');
    setContent('');
    setRating(5);
    setVerified(false);
    setError('');
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} label="Viết đánh giá" side="center" bottomOnMobile className="w-[calc(100%-2rem)] max-w-lg">
      <form onSubmit={submit} className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Đánh giá & nhận xét</h2>
          <button type="button" onClick={onClose} aria-label="Đóng" className="rounded-lg p-1.5 hover:bg-page">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-page p-2">
          <DeviceImage kind={product.kind} color={product.color} className="h-12 w-12 shrink-0" />
          <p className="text-sm font-medium">{product.name}</p>
        </div>
        <p className="text-sm font-semibold">Đánh giá chung</p>
        <div className="mt-2 flex flex-col items-center gap-1">
          <Stars value={rating} onChange={setRating} size="lg" />
          <span className="text-sm font-medium text-primary">{ratingLabels[rating]}</span>
        </div>
        <label className="mt-4 block text-sm font-medium">
          Họ tên
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Nhập họ tên"
            className="mt-1 h-10 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Nhận xét
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (tối thiểu 15 ký tự)"
            className="mt-1 w-full resize-none rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} className="h-4 w-4 accent-primary" />
          Tôi đã mua sản phẩm này tại MaoShop
        </label>
        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 text-sm text-primary">
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <button type="submit" className="mt-4 h-11 w-full rounded-xl bg-primary font-bold text-white transition-colors hover:bg-primary-dark">
          Gửi đánh giá
        </button>
      </form>
    </Drawer>
  );
}
