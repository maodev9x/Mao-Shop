import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Home,
  Cable,
  Monitor,
  Tv,
  RefreshCcw,
  Package,
  BadgePercent,
  Newspaper,
  type LucideIcon,
} from 'lucide-react';

export type MenuCategory = {
  id: string;
  name: string;
  icon: LucideIcon;
  groups: { title: string; items: string[] }[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'phone',
    name: 'Điện thoại, Tablet',
    icon: Smartphone,
    groups: [
      { title: 'Hãng điện thoại', items: ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'HONOR', 'TECNO', 'Nubia', 'Sony'] },
      { title: 'Mức giá', items: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Trên 20 triệu'] },
      { title: 'Máy tính bảng', items: ['iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad', 'Lenovo Tab'] },
      { title: 'Sản phẩm hot', items: ['iPhone 17 Pro Max', 'Galaxy S25 Ultra', 'Galaxy Z Fold7', 'Redmi Note 15'] },
    ],
  },
  {
    id: 'laptop',
    name: 'Laptop',
    icon: Laptop,
    groups: [
      { title: 'Thương hiệu', items: ['MacBook', 'ASUS', 'Lenovo', 'Dell', 'HP', 'Acer', 'MSI'] },
      { title: 'Nhu cầu', items: ['Văn phòng', 'Gaming', 'Mỏng nhẹ', 'Đồ họa - kỹ thuật', 'Sinh viên'] },
      { title: 'Mức giá', items: ['Dưới 15 triệu', '15 - 20 triệu', '20 - 25 triệu', 'Trên 25 triệu'] },
    ],
  },
  {
    id: 'audio',
    name: 'Âm thanh, Mic thu âm',
    icon: Headphones,
    groups: [
      { title: 'Tai nghe', items: ['Tai nghe Bluetooth', 'Tai nghe chụp tai', 'Tai nghe gaming', 'AirPods'] },
      { title: 'Loa', items: ['Loa Bluetooth', 'Loa karaoke', 'Loa soundbar', 'Loa thông minh'] },
      { title: 'Mic', items: ['Mic cài áo', 'Mic livestream', 'Mic karaoke'] },
    ],
  },
  {
    id: 'watch',
    name: 'Đồng hồ, Camera',
    icon: Watch,
    groups: [
      { title: 'Đồng hồ thông minh', items: ['Apple Watch', 'Galaxy Watch', 'Xiaomi Watch', 'Garmin', 'Huawei Watch'] },
      { title: 'Camera', items: ['Camera an ninh', 'Camera hành trình', 'Action camera', 'Gimbal'] },
    ],
  },
  {
    id: 'appliance',
    name: 'Đồ gia dụng, Làm đẹp',
    icon: Home,
    groups: [
      { title: 'Điện gia dụng', items: ['Máy lọc không khí', 'Robot hút bụi', 'Nồi chiên không dầu', 'Máy lọc nước'] },
      { title: 'Làm đẹp', items: ['Máy sấy tóc', 'Máy cạo râu', 'Bàn chải điện'] },
    ],
  },
  {
    id: 'accessory',
    name: 'Phụ kiện',
    icon: Cable,
    groups: [
      { title: 'Phụ kiện di động', items: ['Củ sạc', 'Cáp sạc', 'Sạc dự phòng', 'Ốp lưng', 'Miếng dán'] },
      { title: 'Phụ kiện laptop', items: ['Chuột', 'Bàn phím', 'Balo, túi', 'Hub chuyển đổi'] },
    ],
  },
  {
    id: 'monitor',
    name: 'PC, Màn hình, Máy in',
    icon: Monitor,
    groups: [
      { title: 'Màn hình', items: ['Màn hình gaming', 'Màn hình đồ họa', 'Màn hình văn phòng'] },
      { title: 'PC', items: ['PC lắp ráp', 'PC gaming', 'Mac mini', 'iMac'] },
      { title: 'Máy in', items: ['Máy in laser', 'Máy in phun', 'Mực in'] },
    ],
  },
  {
    id: 'tv',
    name: 'Tivi, Điện máy',
    icon: Tv,
    groups: [
      { title: 'Tivi', items: ['Tivi Samsung', 'Tivi LG', 'Tivi Sony', 'Tivi Xiaomi', 'Tivi TCL'] },
      { title: 'Điện máy', items: ['Tủ lạnh', 'Máy giặt', 'Điều hòa', 'Máy sấy quần áo'] },
    ],
  },
  { id: 'tradein', name: 'Thu cũ đổi mới', icon: RefreshCcw, groups: [{ title: 'Thu cũ', items: ['Thu cũ iPhone', 'Thu cũ Samsung', 'Thu cũ laptop', 'Định giá máy'] }] },
  { id: 'used', name: 'Hàng cũ', icon: Package, groups: [{ title: 'Hàng cũ', items: ['Điện thoại cũ', 'Laptop cũ', 'Máy tính bảng cũ', 'Đồng hồ cũ'] }] },
  { id: 'promo', name: 'Khuyến mãi', icon: BadgePercent, groups: [{ title: 'Ưu đãi', items: ['Flash sale', 'Ưu đãi sinh viên', 'Ưu đãi thanh toán', 'Trả góp 0%'] }] },
  { id: 'news', name: 'Tin công nghệ', icon: Newspaper, groups: [{ title: 'Chuyên mục', items: ['Tin mới', 'Đánh giá', 'Thủ thuật', 'Khuyến mãi'] }] },
];

export type HeroSlide = {
  id: string;
  tab: string;
  tabSub: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  from: string;
  to: string;
  kind: 'phone' | 'laptop' | 'foldable' | 'watch' | 'tv';
  deviceColor: string;
};

export const heroSlides: HeroSlide[] = [
  { id: 'h1', tab: 'iPhone 17 Pro', tabSub: 'Mua ngay', eyebrow: 'Mới ra mắt', title: 'iPhone 17 Pro Max', subtitle: 'Thu cũ trợ giá đến 5 triệu · Trả góp 0%', cta: 'Mua ngay', from: '#1e293b', to: '#f97316', kind: 'phone', deviceColor: '#f97316' },
  { id: 'h2', tab: 'Galaxy Z Fold7', tabSub: 'Gập mở đẳng cấp', eyebrow: 'Siêu phẩm gập', title: 'Galaxy Z Fold7', subtitle: 'Tặng bảo hành màn hình 12 tháng', cta: 'Đặt ngay', from: '#0f172a', to: '#2563eb', kind: 'foldable', deviceColor: '#1e3a8a' },
  { id: 'h3', tab: 'Laptop AI', tabSub: 'Giảm đến 5 triệu', eyebrow: 'Mùa tựu trường', title: 'Laptop AI thế hệ mới', subtitle: 'Sinh viên giảm thêm đến 1 triệu', cta: 'Khám phá', from: '#4c1d95', to: '#db2777', kind: 'laptop', deviceColor: '#94a3b8' },
  { id: 'h4', tab: 'Tivi giá rẻ', tabSub: 'Giảm đến 50%', eyebrow: 'Xả kho tivi', title: 'Tivi 4K giảm đến 50%', subtitle: 'Miễn phí lắp đặt toàn quốc', cta: 'Xem ưu đãi', from: '#7f1d1d', to: '#d70018', kind: 'tv', deviceColor: '#f43f5e' },
  { id: 'h5', tab: 'Apple Watch', tabSub: 'Ưu đãi cực khủng', eyebrow: 'Sống khỏe mỗi ngày', title: 'Apple Watch Series 11', subtitle: 'Giảm thêm 300K khi thanh toán online', cta: 'Mua ngay', from: '#064e3b', to: '#10b981', kind: 'watch', deviceColor: '#f43f5e' },
];

export const news = [
  { id: 'n1', title: 'Đánh giá iPhone 17 Pro Max sau 1 tháng: pin trâu, camera zoom ấn tượng', from: '#0f172a', to: '#f97316', date: '20/10/2026' },
  { id: 'n2', title: 'Top 5 laptop sinh viên đáng mua nhất mùa tựu trường 2026', from: '#312e81', to: '#6366f1', date: '19/10/2026' },
  { id: 'n3', title: 'So sánh Galaxy Z Fold7 và Z Flip7: nên chọn mẫu gập nào?', from: '#1e3a8a', to: '#38bdf8', date: '18/10/2026' },
  { id: 'n4', title: 'Mẹo chọn tivi 4K phù hợp với diện tích phòng khách', from: '#7f1d1d', to: '#fb7185', date: '17/10/2026' },
  { id: 'n5', title: 'Sạc nhanh GaN là gì? Có an toàn cho điện thoại không?', from: '#064e3b', to: '#34d399', date: '16/10/2026' },
];

export const accessoryTiles = [
  { name: 'Phụ kiện Apple', kind: 'earbuds' as const, color: '#f8fafc' },
  { name: 'Dán màn hình', kind: 'phone' as const, color: '#93c5fd' },
  { name: 'Ốp lưng', kind: 'phone' as const, color: '#f472b6' },
  { name: 'Cáp, sạc', kind: 'charger' as const, color: '#f8fafc' },
  { name: 'Pin dự phòng', kind: 'powerbank' as const, color: '#0f172a' },
  { name: 'Chuột', kind: 'mouse' as const, color: '#1f2937' },
  { name: 'Bàn phím', kind: 'keyboard' as const, color: '#ef4444' },
  { name: 'Tai nghe', kind: 'headphones' as const, color: '#78350f' },
  { name: 'Loa', kind: 'speaker' as const, color: '#2563eb' },
  { name: 'Camera', kind: 'camera' as const, color: '#334155' },
  { name: 'Đồng hồ', kind: 'watch' as const, color: '#f43f5e' },
  { name: 'Màn hình', kind: 'monitor' as const, color: '#7c3aed' },
];
