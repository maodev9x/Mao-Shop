import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clock, ImageIcon, MessageSquarePlus, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { experienceCriteria } from '../../data/feedback';
import { timeAgo } from '../../lib/format';
import type { Product, Review } from '../../types';
import { FilterChips } from '../ui/Tabs';
import Reveal from '../ui/Reveal';
import Stars, { ratingLabels } from '../ui/Stars';
import Avatar from '../shared/Avatar';
import ReviewForm from './ReviewForm';

type Props = {
  product: Product;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
};

const filters = [
  { value: 'all', label: 'Tất cả' },
  { value: 'image', label: 'Có hình ảnh' },
  { value: 'verified', label: 'Đã mua hàng' },
  ...[5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} sao` })),
];

const PAGE = 5;

export function averageRating(reviews: Review[]): number {
  return reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : 0;
}

export default function ReviewsSection({ product, reviews, onAddReview }: Props) {
  const [filter, setFilter] = useState('all');
  const [visible, setVisible] = useState(PAGE);
  const [formOpen, setFormOpen] = useState(false);

  const average = averageRating(reviews);
  const counts = [5, 4, 3, 2, 1].map((star) => reviews.filter((r) => r.rating === star).length);

  const list = useMemo(
    () =>
      reviews.filter((r) =>
        filter === 'all' ? true : filter === 'image' ? r.hasImage : filter === 'verified' ? r.verified : r.rating === Number(filter),
      ),
    [reviews, filter],
  );

  return (
    <Reveal as="section" className="mt-10">
      <div id="danh-gia" className="scroll-mt-24 rounded-2xl bg-white p-4 shadow-card sm:p-6">
        <h2 className="mb-4 text-lg font-bold">Đánh giá {product.name}</h2>

        {/* Summary */}
        <div className="grid gap-6 rounded-xl ring-1 ring-line md:grid-cols-[180px_1fr_1.2fr] md:items-center md:p-5 max-md:p-4">
          <div className="text-center">
            <p className="text-4xl font-extrabold">
              {average.toFixed(1)}
              <span className="text-xl font-semibold text-muted">/5</span>
            </p>
            <Stars value={average} size="md" className="mt-1" />
            <p className="mt-1 text-sm text-ink/70">{reviews.length} lượt đánh giá</p>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <MessageSquarePlus className="h-4 w-4" /> Viết đánh giá
            </button>
          </div>

          <ul className="space-y-1.5">
            {counts.map((count, i) => {
              const star = 5 - i;
              const ratio = reviews.length ? count / reviews.length : 0;
              return (
                <li key={star} className="flex items-center gap-2 text-xs">
                  <span className="flex w-7 items-center gap-0.5 font-medium">
                    {star} <Star className="h-3 w-3 fill-star text-star" />
                  </span>
                  <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-line">
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ratio * 100}%` }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.8, delay: i * 0.06, ease: 'easeOut' }}
                    />
                  </span>
                  <span className="w-16 text-right text-muted">{count} đánh giá</span>
                </li>
              );
            })}
          </ul>

          <div>
            <p className="mb-2 font-semibold">Đánh giá theo trải nghiệm</p>
            <ul className="space-y-1.5 text-sm">
              {experienceCriteria(product.kind).map((c) => (
                <li key={c} className="flex items-center gap-3">
                  <span className="flex-1 text-ink/80">{c}</span>
                  <Stars value={average} size="xs" />
                  <span className="w-28 text-xs text-muted">
                    {average.toFixed(1)}/5 ({reviews.length} đánh giá)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <p className="shrink-0 font-semibold">Lọc đánh giá theo</p>
          <FilterChips
            options={filters}
            value={filter}
            onChange={(v) => {
              setFilter(v);
              setVisible(PAGE);
            }}
            size="sm"
            tone="blue"
            className="min-w-0"
          />
        </div>

        {/* List */}
        <ul className="mt-3 divide-y divide-line">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.slice(0, visible).map((r) => (
              <motion.li
                key={r.id}
                layout
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
                className="grid gap-2 py-4 sm:grid-cols-[180px_1fr]"
              >
                <div className="flex items-center gap-2 sm:items-start">
                  <Avatar name={r.author} />
                  <span className="text-sm font-semibold">{r.author}</span>
                </div>
                <div>
                  <p className="flex flex-wrap items-center gap-2 text-xs">
                    <Stars value={r.rating} size="xs" />
                    <span className="text-ink/70">{ratingLabels[r.rating]}</span>
                  </p>
                  {r.verified && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Đã mua tại MaoShop
                    </p>
                  )}
                  {r.tags && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {r.tags.map((t) => (
                        <span key={t} className="rounded-md bg-page px-2 py-0.5 text-[11px] text-ink/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-ink/85">{r.content}</p>
                  {r.hasImage && (
                    <span className="mt-2 flex aspect-square w-16 items-center justify-center rounded-lg bg-page" aria-label="Ảnh đánh giá">
                      <ImageIcon className="h-5 w-5 text-muted" />
                    </span>
                  )}
                  <p className="mt-2 flex items-center gap-1 text-[11px] text-muted">
                    <Clock className="h-3 w-3" /> Đánh giá đã đăng vào {timeAgo(r.createdAt)}
                  </p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {list.length === 0 && <p className="py-8 text-center text-sm text-muted">Chưa có đánh giá phù hợp với bộ lọc này.</p>}
        {list.length > visible && (
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE)}
              className="rounded-lg border border-line px-5 py-2 text-sm font-medium hover:border-primary hover:text-primary"
            >
              Xem thêm {list.length - visible} đánh giá
            </button>
          </div>
        )}
      </div>

      <ReviewForm product={product} open={formOpen} onClose={() => setFormOpen(false)} onSubmit={onAddReview} />
    </Reveal>
  );
}
