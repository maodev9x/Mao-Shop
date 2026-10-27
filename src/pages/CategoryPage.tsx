import { Flame } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FilterBar from '../components/category/FilterBar';
import VoucherList from '../components/category/VoucherList';
import SectionTitle from '../components/home/SectionTitle';
import ProductCarousel from '../components/product/ProductCarousel';
import ProductGrid from '../components/product/ProductGrid';
import SubCategoryTiles from '../components/product/SubCategoryTiles';
import DescriptionContent from '../components/shared/DescriptionContent';
import ProductNews from '../components/shared/ProductNews';
import QASection from '../components/shared/QASection';
import Accordion from '../components/ui/Accordion';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import Banner from '../components/ui/Banner';
import Breadcrumb from '../components/ui/Breadcrumb';
import Expandable from '../components/ui/Expandable';
import Reveal from '../components/ui/Reveal';
import { FilterChips } from '../components/ui/Tabs';
import { getCategoryBySlug, getCategoryGroup } from '../data/categories';
import { getCategoryQuestions } from '../data/feedback';
import { useCategoryFilters } from '../hooks/useCategoryFilters';
import { useFeedback } from '../hooks/useProductFeedback';
import type { SortKey } from '../lib/filters';
import { categoryPath, productPath, slugify } from '../lib/format';
import type { CategoryConfig } from '../types';
import NotFoundPage from './NotFoundPage';

const sorts: { value: SortKey; label: string }[] = [
  { value: 'pho-bien', label: 'Phổ biến' },
  { value: 'khuyen-mai', label: 'Khuyến mãi HOT' },
  { value: 'gia-tang', label: 'Giá thấp - cao' },
  { value: 'gia-giam', label: 'Giá cao - thấp' },
];

export default function CategoryPage() {
  const { slug = '' } = useParams();
  const config = getCategoryBySlug(slug);
  if (!config) return <NotFoundPage message="Danh mục bạn tìm không tồn tại." />;
  // key: reset local state (featured carousel, "Xem thêm", Q&A) when switching category
  return <CategoryView key={config.id} config={config} />;
}

function CategoryView({ config }: { config: CategoryConfig }) {
  const navigate = useNavigate();
  const filters = useCategoryFilters(config);
  const { state, results, options, filterKey } = filters;

  const featured = useMemo(() => [...filters.all].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)).slice(0, 10), [filters.all]);
  const questionSamples = useMemo(() => ({ reviews: [], questions: getCategoryQuestions(config) }), [config]);
  const { questions, addQuestion, addReply } = useFeedback(`category-${config.id}`, questionSamples);
  const group = getCategoryGroup(config);

  useEffect(() => {
    document.title = `${config.title} chính hãng, giá tốt - MaoShop`;
  }, [config.title]);

  return (
    <div className="container-page pb-16">
      <Breadcrumb items={[{ label: config.name }]} />

      {/* 2. categories of the same group */}
      {group.length > 1 && (
        <Reveal className="rounded-xl bg-white p-2 shadow-card">
          <FilterChips
            options={group.map((c) => ({ value: c.slug, label: c.name }))}
            value={config.slug}
            onChange={(s) => s !== config.slug && navigate(categoryPath({ slug: s }))}
          />
        </Reveal>
      )}

      {/* 3. banners */}
      <Reveal className="mt-4 grid gap-3 sm:grid-cols-2">
        {config.banners.map((b) => (
          <Banner key={b.title} aspect="aspect-[3/1] sm:aspect-[6/1]" size="sm" from={b.from} to={b.to} title={b.title} subtitle={b.subtitle} device={{ kind: b.kind, color: b.color }} />
        ))}
      </Reveal>

      {/* 4. title + brands */}
      <Reveal as="section" className="mt-6">
        <h1 className="mb-2 text-xl font-bold">{config.title}</h1>
        <FilterChips
          multiple
          className="sm:flex-wrap"
          options={options.hang.map((o) => ({ value: o.value, label: o.label }))}
          value={state.selected.hang ?? []}
          onChange={(v) => filters.setValues('hang', v)}
        />
      </Reveal>

      {/* 5. vouchers */}
      <Reveal as="section" className="mt-6">
        <SectionTitle title="Ưu đãi & voucher" href="#voucher" />
        <VoucherList vouchers={config.vouchers} scope={config.id} />
      </Reveal>

      {/* 6. needs */}
      <Reveal as="section" className="mt-6">
        <h2 className="mb-3 text-lg font-bold">Chọn theo nhu cầu</h2>
        <SubCategoryTiles
          layout="stack"
          tiles={config.needs.map((n) => ({ key: slugify(n.label), label: n.label, kind: n.kind, color: n.color }))}
          selected={state.selected.nhucau ?? []}
          onToggle={(key) => filters.toggle('nhucau', key)}
        />
      </Reveal>

      {/* 7. featured */}
      <Reveal as="section" className="mt-8">
        <div className="rounded-2xl bg-gradient-to-br from-primary-light to-primary p-3 shadow-xl sm:p-5">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-black text-white uppercase italic sm:text-3xl">
            <Flame className="h-7 w-7 fill-amber-300 text-amber-300" /> Sản phẩm <span className="text-amber-300">nổi bật</span>
          </h2>
          <ProductCarousel products={featured} filterKey={config.id} />
        </div>
      </Reveal>

      {/* 8–10. filters, sort, grid — above later sections so dropdowns are not covered */}
      <Reveal as="section" className="relative z-20 mt-8">
        <h2 className="mb-3 text-lg font-bold">Chọn theo tiêu chí</h2>
        <FilterBar config={config} filters={filters} />
      </Reveal>

      <section className="mt-6">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-baseline gap-2 text-lg font-bold">
            Sắp xếp theo
            <span className="text-sm font-normal text-muted">
              (<AnimatedNumber value={results.length} /> sản phẩm)
            </span>
          </h2>
          <FilterChips tone="blue" size="sm" options={sorts} value={state.sort} onChange={(v) => filters.setSort(v as SortKey)} />
        </div>
        <ProductGrid products={results} filterKey={filterKey} onClearFilters={filters.clear} />
      </section>

      {/* 11. SEO content + news */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Reveal className="min-w-0">
          <Expandable collapsedHeight={420} fadeClassName="from-page">
            <DescriptionContent
              title={`${config.title} chính hãng, giá tốt tại MaoShop`}
              featured={{
                label: `${config.name} nổi bật:`,
                links: config.seo.featured.map((f) => {
                  const match = filters.all.find((p) => p.name.toLowerCase().includes(f.toLowerCase()));
                  return { label: f, to: match ? productPath(match) : categoryPath(config) };
                }),
              }}
              paragraphs={config.seo.paragraphs}
              toc={config.seo.toc}
            />
          </Expandable>
        </Reveal>
        <aside>
          <div className="lg:sticky lg:top-20">
            <ProductNews />
          </div>
        </aside>
      </div>

      {/* 12. FAQ */}
      <Reveal as="section" className="mt-8 lg:max-w-[calc(100%-344px)]">
        <h2 className="mb-3 text-lg font-bold">Câu hỏi thường gặp</h2>
        <Accordion
          className="space-y-2"
          itemClassName="overflow-hidden rounded-xl bg-white shadow-card"
          buttonClassName="px-4 py-3 text-sm font-semibold"
          items={config.faq.map((f, i) => ({
            id: String(i),
            title: f.q,
            content: <p className="px-4 pb-4 text-sm leading-relaxed text-ink/75">{f.a}</p>,
          }))}
        />
      </Reveal>

      {/* 13. Q&A */}
      <QASection questions={questions} onAsk={addQuestion} onReply={addReply} />
    </div>
  );
}
