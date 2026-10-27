import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Rocket, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { products } from '../../data/products';
import type { ProductTag } from '../../types';
import { cn } from '../../lib/format';
import ProductCarousel from '../product/ProductCarousel';
import { FilterChips } from '../ui/Tabs';
import Reveal from '../ui/Reveal';

const tabs: { value: ProductTag; label: string; icon: typeof Flame }[] = [
  { value: 'deal', label: 'Deal sốc mỗi ngày', icon: Flame },
  { value: 'hot', label: 'Sản phẩm hot trend', icon: Rocket },
  { value: 'new', label: 'Hàng mới về', icon: Sparkles },
];

const categoryChips = [
  { value: 'all', label: 'Tất cả' },
  { value: 'accessory', label: 'Phụ kiện' },
  { value: 'watch,audio', label: 'Đồng hồ, âm thanh' },
  { value: 'phone', label: 'Điện thoại' },
  { value: 'tablet', label: 'Máy tính bảng' },
  { value: 'laptop', label: 'Laptop' },
  { value: 'monitor', label: 'Màn hình, PC' },
  { value: 'tv,appliance', label: 'Điện máy, gia dụng' },
];

export default function DealTabs() {
  const [tab, setTab] = useState<ProductTag>('deal');
  const [category, setCategory] = useState('all');

  const list = useMemo(() => {
    const cats = category === 'all' ? null : category.split(',');
    return products.filter((p) => p.tags?.includes(tab) && (!cats || cats.includes(p.categoryId)));
  }, [tab, category]);

  return (
    <Reveal as="section" className="container-page mt-8">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-blue-soft to-white ring-2 ring-blue/25">
        <div role="tablist" className="grid grid-cols-3">
          {tabs.map(({ value, label, icon: Icon }) => {
            const active = value === tab;
            return (
              <button
                key={value}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(value)}
                className={cn(
                  'relative flex items-center justify-center gap-1.5 px-2 py-3 text-xs font-black uppercase transition-colors sm:py-4 sm:text-lg',
                  active ? 'text-white' : 'bg-white/70 text-blue hover:bg-white',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="deal-tab"
                    className="absolute inset-0 bg-gradient-to-r from-blue to-sky-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <Icon className="relative hidden h-5 w-5 sm:block" />
                <span className="relative text-center">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-3 sm:p-5">
          <FilterChips options={categoryChips} value={category} onChange={setCategory} tone="blue" className="mb-3 sm:justify-center" />
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCarousel products={list} filterKey={`${tab}-${category}`} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}
