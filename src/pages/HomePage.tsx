import { useEffect } from 'react';
import AccessoryGrid from '../components/home/AccessoryGrid';
import CategorySection from '../components/home/CategorySection';
import DealTabs from '../components/home/DealTabs';
import FlashSale from '../components/home/FlashSale';
import Hero from '../components/home/Hero';
import News from '../components/home/News';
import Offers from '../components/home/Offers';
import PromoStrip from '../components/home/PromoStrip';
import Reviews from '../components/home/Reviews';

export default function HomePage() {
  useEffect(() => {
    document.title = 'MaoShop - Điện thoại, Laptop, Tivi chính hãng';
  }, []);

  return (
    <>
      <Hero />
      <PromoStrip />
      <FlashSale />
      <DealTabs />

      <CategorySection
        id="phone"
        tabs={[
          { value: 'phone', label: 'Điện thoại', categories: ['phone'] },
          { value: 'tablet', label: 'Máy tính bảng', categories: ['tablet'] },
        ]}
        banner={{ eyebrow: 'Mới ra mắt', title: 'Nâng cấp lên iPhone 17', highlight: '-3 triệu', subtitle: 'Thu cũ trợ giá, trả góp 0%', from: '#1f2937', to: '#f97316', device: { kind: 'phone', color: '#f97316' } }}
      />

      <AccessoryGrid />

      <CategorySection
        id="laptop"
        tabs={[
          { value: 'laptop', label: 'Laptop', categories: ['laptop'] },
          { value: 'monitor', label: 'Màn hình, PC', categories: ['monitor'] },
        ]}
        banner={{ eyebrow: 'Laptop AI', title: 'Giảm thêm đến', highlight: '2 triệu', subtitle: 'Ưu đãi riêng cho học sinh, sinh viên', from: '#1e1b4b', to: '#7c3aed', device: { kind: 'laptop', color: '#94a3b8' } }}
      />

      <CategorySection
        id="watch"
        tabs={[
          { value: 'watch', label: 'Đồng hồ', categories: ['watch'] },
          { value: 'audio', label: 'Âm thanh', categories: ['audio'] },
        ]}
        rows={1}
        banner={{ eyebrow: 'Đồng hồ', title: 'Chỉ từ', highlight: '690K', subtitle: 'Đồng hồ thông minh chính hãng', from: '#064e3b', to: '#10b981', device: { kind: 'watch', color: '#f43f5e' } }}
      />

      <CategorySection
        id="tv"
        tabs={[{ value: 'tv', label: 'Tivi', categories: ['tv'] }]}
        rows={1}
        banner={{ eyebrow: 'Tivi giá rẻ', title: 'Giảm đến', highlight: '50%', subtitle: 'Miễn phí lắp đặt, bảo hành 2 năm', from: '#0c4a6e', to: '#0ea5e9', device: { kind: 'tv', color: '#6366f1' } }}
      />

      <CategorySection
        id="appliance"
        tabs={[{ value: 'appliance', label: 'Tủ lạnh, Máy giặt, Gia dụng', categories: ['appliance'] }]}
        banner={{ eyebrow: 'Điện máy', title: 'Tủ lạnh từ', highlight: '2.39 tr', subtitle: 'Giao lắp miễn phí, trả góp 0%', from: '#374151', to: '#9ca3af', device: { kind: 'fridge', color: '#9ca3af' } }}
      />

      <Reviews />
      <Offers />
      <News />
    </>
  );
}
