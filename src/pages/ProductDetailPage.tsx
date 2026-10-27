import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccessoryUpsell from '../components/detail/AccessoryUpsell';
import BundleDeals from '../components/detail/BundleDeals';
import BuyActions from '../components/detail/BuyActions';
import CommitmentCards from '../components/detail/CommitmentCards';
import CompareProducts from '../components/detail/CompareProducts';
import OptionPicker from '../components/detail/OptionPicker';
import PaymentOffers from '../components/detail/PaymentOffers';
import PriceBox from '../components/detail/PriceBox';
import ProductGallery from '../components/detail/ProductGallery';
import ProductHeader from '../components/detail/ProductHeader';
import ProductInfoTabs from '../components/detail/ProductInfoTabs';
import ProductNews from '../components/shared/ProductNews';
import PromotionsBox from '../components/detail/PromotionsBox';
import QASection from '../components/shared/QASection';
import RelatedProducts from '../components/detail/RelatedProducts';
import ReviewsSection, { averageRating } from '../components/detail/ReviewsSection';
import ShippingInfo from '../components/detail/ShippingInfo';
import SpecsTable from '../components/detail/SpecsTable';
import StickyBuyBar from '../components/detail/StickyBuyBar';
import WarrantyPicker from '../components/detail/WarrantyPicker';
import DeviceImage from '../components/product/DeviceImage';
import Banner from '../components/ui/Banner';
import Breadcrumb from '../components/ui/Breadcrumb';
import { useShop } from '../context/ShopContext';
import { getProductBySlug } from '../data/products';
import { getProductDetail, optionPrice } from '../data/productDetails';
import { useProductFeedback } from '../hooks/useProductFeedback';
import { getCategoryById } from '../data/categories';
import { categoryPath, formatPrice, slugify } from '../lib/format';
import type { Product } from '../types';
import NotFoundPage from './NotFoundPage';

export default function ProductDetailPage() {
  const { slug = '' } = useParams();
  const product = getProductBySlug(slug);
  if (!product) return <NotFoundPage message="Sản phẩm bạn tìm không tồn tại hoặc đã ngừng kinh doanh." />;
  // key: reset selections and feedback state when navigating to another product
  return <ProductDetailView key={product.id} product={product} />;
}

function ProductDetailView({ product }: { product: Product }) {
  const { addToCart, setCartOpen, notify } = useShop();
  const detail = useMemo(() => getProductDetail(product), [product]);
  const { reviews, questions, addReview, addQuestion, addReply } = useProductFeedback(product);

  const [variantIndex, setVariantIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);

  const variant = detail.variants[variantIndex];
  const color = detail.colors[colorIndex];
  const price = optionPrice(variant, color);
  const hasVariants = detail.variants.length > 1;
  const optionLabel = [hasVariants ? variant.label : '', color.name].filter(Boolean).join(' ');
  const category = getCategoryById(product.categoryId);

  useEffect(() => {
    document.title = `${product.name} - MaoShop`;
  }, [product.name]);

  // sticky bar only after the main buttons have scrolled *above* the viewport.
  // A scroll listener (not IntersectionObserver) so jumps past the buttons — anchors, fast flicks — are caught too.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = buyRef.current;
      if (el) setShowBar(el.getBoundingClientRect().bottom < 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const selectColor = (i: number) => {
    setColorIndex(i);
    const at = detail.gallery.findIndex((g) => g.id === `color-${detail.colors[i].name}`);
    if (at >= 0) setGalleryIndex(at);
  };

  const options = { variant: hasVariants ? variant.label : undefined, color: color.name };
  const add = () => addToCart(product, options, price);
  const buyNow = () => {
    add();
    setCartOpen(true);
  };
  const installment = () => {
    add();
    setCartOpen(true);
    notify('Chọn "Tiến hành đặt hàng" để đăng ký trả góp 0%');
  };

  return (
    <div className="container-page pb-24">
      <Breadcrumb
        items={[
          ...(category ? [{ label: category.name, to: categoryPath(category) }] : []),
          { label: product.brand, to: category ? categoryPath(category, { hang: slugify(product.brand) }) : undefined },
          { label: product.name },
        ]}
      />

      {/* desktop: "gallery buy" / "info buy" — mobile: gallery, buy, info.
          Rows auto/1fr so the tall buy column's extra height goes below the info block, not under the gallery. */}
      <div className="grid items-start gap-6 [grid-template-areas:'gallery'_'buy'_'info'] lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:[grid-template-areas:'gallery_buy'_'info_buy']">
        <div className="min-w-0 space-y-4 [grid-area:gallery]">
          <ProductHeader product={product} reviewCount={reviews.length} average={averageRating(reviews)} />
          <ProductGallery product={product} items={detail.gallery} highlights={detail.highlights} index={galleryIndex} onIndexChange={setGalleryIndex} />
        </div>

        <div className="min-w-0 space-y-4 [grid-area:buy]">
          <PriceBox price={price} originalPrice={variant.originalPrice} memberDiscount={product.memberDiscount} />
          {hasVariants && (
            <OptionPicker
              title="Phiên bản"
              options={detail.variants.map((v) => ({ key: v.label, label: v.label }))}
              value={variantIndex}
              onChange={setVariantIndex}
            />
          )}
          <OptionPicker
            title="Màu sắc"
            options={detail.colors.map((c) => ({
              key: c.name,
              label: c.name,
              sub: formatPrice(optionPrice(variant, c)),
              media: <DeviceImage kind={product.kind} color={c.color} className="h-full w-full" />,
            }))}
            value={colorIndex}
            onChange={selectColor}
          />
          <PromotionsBox price={price} />
          <Banner
            aspect="aspect-[3/1] sm:aspect-[5/1]"
            size="sm"
            from="#b5001a"
            to="#e11d48"
            eyebrow="Học sinh - Sinh viên"
            title="Tưng bừng deal khủng · Quà tặng giới hạn"
            cta="Nhận quà ngay"
          />
          <PaymentOffers />
          <ShippingInfo />
          <BuyActions ref={buyRef} onBuyNow={buyNow} onAddToCart={add} onInstallment={installment} />
          <BundleDeals product={product} />
          <AccessoryUpsell />
          <WarrantyPicker price={price} />
        </div>

        <div className="min-w-0 space-y-6 [grid-area:info]">
          <CommitmentCards />
          <SpecsTable specs={detail.specs} />
        </div>
      </div>

      <RelatedProducts product={product} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <ProductInfoTabs product={product} detail={detail} />
          <CompareProducts ids={detail.compareIds} current={product} />
        </div>
        <aside className="lg:pt-14">
          <div className="lg:sticky lg:top-20">
            <ProductNews />
          </div>
        </aside>
      </div>

      <ReviewsSection product={product} reviews={reviews} onAddReview={addReview} />
      <QASection questions={questions} onAsk={addQuestion} onReply={addReply} />

      <StickyBuyBar
        visible={showBar}
        product={product}
        optionLabel={optionLabel}
        color={color.color}
        price={price}
        onBuyNow={buyNow}
        onAddToCart={add}
        onInstallment={installment}
      />
    </div>
  );
}
