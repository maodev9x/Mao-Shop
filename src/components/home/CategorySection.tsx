import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryById } from '../../data/categories';
import { byCategory } from '../../data/products';
import type { DeviceKind } from '../../types';
import { categoryPath, slugify } from '../../lib/format';
import DeviceImage from '../product/DeviceImage';
import ProductCarousel from '../product/ProductCarousel';
import SubCategoryTiles, { type SubCategoryTile } from '../product/SubCategoryTiles';
import { FilterChips, UnderlineTabs } from '../ui/Tabs';
import Reveal from '../ui/Reveal';

type Tab = { value: string; label: string; categories: string[] };

type SideBanner = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  from: string;
  to: string;
  device: { kind: DeviceKind; color: string };
};

type Props = {
  id: string;
  tabs: Tab[];
  banner: SideBanner;
  rows?: 1 | 2;
};

const ALL = 'all';
/** The catalogue has 30–40 products per category; the home page shows a preview only */
const MAX_ITEMS = 20;

export default function CategorySection({ id, tabs, banner, rows = 2 }: Props) {
  const [tab, setTab] = useState(tabs[0].value);
  const [brand, setBrand] = useState(ALL);
  const [sub, setSub] = useState<string | null>(null);

  const current = tabs.find((t) => t.value === tab)!;
  const tabProducts = useMemo(() => byCategory(...current.categories), [current]);

  const brands = useMemo(() => [ALL, ...new Set(tabProducts.map((p) => p.brand))], [tabProducts]);
  const tiles = useMemo(() => {
    const map = new Map<string, SubCategoryTile>();
    tabProducts.forEach((p) => p.subCategory && !map.has(p.subCategory) && map.set(p.subCategory, { key: p.subCategory, label: p.subCategory, kind: p.kind, color: p.color }));
    return [...map.values()];
  }, [tabProducts]);

  const list = tabProducts.filter((p) => (brand === ALL || p.brand === brand) && (!sub || p.subCategory === sub)).slice(0, MAX_ITEMS);

  const config = getCategoryById(current.categories[0]);
  const seeAll = config ? categoryPath(config, brand === ALL ? undefined : { hang: slugify(brand) }) : '/';

  const changeTab = (value: string) => {
    setTab(value);
    setBrand(ALL);
    setSub(null);
  };

  return (
    <Reveal as="section" className="container-page mt-10">
      <div id={id} className="grid scroll-mt-24 gap-4 lg:grid-cols-[225px_minmax(0,1fr)]">
        {/* Vertical banner — 9:20 placeholder slot */}
        <Reveal direction="right" className="hidden lg:block">
          <a
            href="#promo"
            className="group flex aspect-[9/20] flex-col overflow-hidden rounded-2xl p-5 text-white shadow-card"
            style={{ backgroundImage: `linear-gradient(170deg, ${banner.from}, ${banner.to})` }}
          >
            <span className="w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase backdrop-blur">{banner.eyebrow}</span>
            <p className="mt-3 text-2xl leading-tight font-black">{banner.title}</p>
            <p className="mt-1 text-4xl font-black text-amber-300 drop-shadow">{banner.highlight}</p>
            <p className="mt-2 text-sm text-white/85">{banner.subtitle}</p>
            <div className="relative mt-auto">
              <span className="absolute inset-0 m-auto h-40 w-40 rounded-full bg-white/15 blur-2xl" />
              <DeviceImage kind={banner.device.kind} color={banner.device.color} className="relative w-full animate-float drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" />
            </div>
            <span className="mx-auto mt-3 rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-lg transition-transform group-hover:scale-105">Mua ngay</span>
          </a>
        </Reveal>

        <div className="min-w-0">
          <UnderlineTabs options={tabs} value={tab} onChange={changeTab} className="mb-3" />

          {tiles.length > 0 && (
            <div className="mb-3">
              <SubCategoryTiles tiles={tiles} selected={sub ? [sub] : []} onToggle={(key) => setSub(sub === key ? null : key)} animationKey={tab} />
            </div>
          )}

          <div className="mb-3 flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="min-w-0 flex-1">
                <FilterChips
                  size="sm"
                  options={brands.map((b) => ({ value: b, label: b === ALL ? 'Tất cả' : b }))}
                  value={brand}
                  onChange={setBrand}
                />
              </motion.div>
            </AnimatePresence>
            <Link to={seeAll} className="group hidden shrink-0 items-center text-sm font-medium text-blue sm:flex">
              Xem tất cả <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ProductCarousel products={list} filterKey={`${tab}-${brand}-${sub}`} rows={list.length > 4 ? rows : 1} columns={4} />
        </div>
      </div>
    </Reveal>
  );
}
