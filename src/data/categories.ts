import type { CategoryConfig, FacetConfig } from '../types';
import { categoryPath, slugify } from '../lib/format';

const M = 1_000_000;
const brand: FacetConfig = { key: 'hang', label: 'Hãng sản xuất', type: 'brand' };
const need = (label = 'Nhu cầu sử dụng'): FacetConfig => ({ key: 'nhucau', label, type: 'attr' });
const attr = (key: string, label: string): FacetConfig => ({ key, label, type: 'attr' });

const commonVouchers = (name: string) => [
  { id: 'v1', title: `Voucher ${name} 6%`, detail: `Tối đa 500K, áp dụng toàn bộ ${name}`, discount: '6%', expires: '31/10/2026' },
  { id: 'v2', title: 'Giảm không giới hạn', detail: 'Áp dụng khi thanh toán qua VNPAY-QR', discount: '5%', expires: '31/10/2026' },
  { id: 'v3', title: 'Sinh viên giảm thêm', detail: 'Xác thực S-Student để nhận ưu đãi', discount: '300K', expires: '30/11/2026' },
];

const commonFaq = (name: string) => [
  { q: `Làm sao để chọn mua ${name} đúng nhu cầu?`, a: `Hãy xác định nhu cầu chính (học tập, làm việc, giải trí), mức ngân sách, sau đó dùng bộ lọc "Nhu cầu sử dụng" và "Xem theo giá" để thu hẹp lựa chọn. Nhân viên MaoShop luôn sẵn sàng tư vấn miễn phí.` },
  { q: `MaoShop có thu cũ đổi mới khi mua ${name} không?`, a: 'Có. Bạn mang máy cũ tới cửa hàng hoặc dùng công cụ "Định giá máy chuyên sâu" để biết giá thu, trợ giá lên đời đến 3 triệu.' },
  { q: `Chính sách trả góp 0% khi mua ${name} như thế nào?`, a: 'Trả góp 0% qua thẻ tín dụng kỳ hạn 3–12 tháng, hoặc qua công ty tài chính chỉ cần CCCD, duyệt hồ sơ trong 5 phút.' },
  { q: 'Sản phẩm được bảo hành bao lâu?', a: 'Sản phẩm chính hãng được bảo hành 12 tháng, 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.' },
  { q: 'Bao lâu thì nhận được hàng?', a: 'Nội thành Hà Nội và TP.HCM giao nhanh trong 2 giờ. Các tỉnh khác giao trong 1–3 ngày, miễn phí cho đơn từ 300.000đ.' },
];

const seo = (title: string, intro: string, featured: string[], topics: string[]) => ({
  featured,
  intro,
  toc: [
    { title: `${title} là gì?` },
    { title: `Giá ${title.toLowerCase()} bao nhiêu tiền?`, children: ['Bảng giá theo nhu cầu', 'Bảng giá theo thương hiệu', 'Bảng giá theo phân khúc', 'Cập nhật giá các mẫu mới'] },
    ...topics.map((t) => ({ title: t })),
    { title: `Mua ${title.toLowerCase()} chính hãng giá tốt ở đâu?` },
  ],
  paragraphs: [
    intro,
    `Tại MaoShop, ${title.toLowerCase()} được phân phối chính hãng với đầy đủ hóa đơn VAT, bảo hành 12 tháng và chính sách 1 đổi 1 trong 30 ngày. Khách hàng có thể so sánh cấu hình, lọc theo hãng, theo nhu cầu và mức giá để tìm được sản phẩm phù hợp nhất.`,
    'Ngoài giá bán cạnh tranh, MaoShop thường xuyên có chương trình thu cũ đổi mới, trả góp 0% và ưu đãi riêng cho học sinh, sinh viên. Đặt hàng online để được giao nhanh trong 2 giờ tại nội thành.',
  ],
});

export const categories: CategoryConfig[] = [
  {
    id: 'phone',
    slug: 'dien-thoai',
    name: 'Điện thoại',
    title: 'Điện thoại',
    group: 'mobile',
    facets: [brand, need(), attr('ram', 'Dung lượng RAM'), attr('bonho', 'Bộ nhớ trong'), attr('manhinh', 'Kích thước màn hình'), attr('tinhnang', 'Tính năng đặc biệt')],
    needs: [
      { label: 'Chụp ảnh đẹp', kind: 'camera', color: '#334155' },
      { label: 'Điện thoại 5G', kind: 'phone', color: '#93c5fd' },
      { label: 'Điện thoại chơi game', kind: 'phone', color: '#111827' },
      { label: 'Điện thoại pin trâu', kind: 'powerbank', color: '#22c55e' },
      { label: 'Điện thoại gập', kind: 'foldable', color: '#1e3a8a' },
    ],
    pricePresets: [[0, 4 * M], [4 * M, 7 * M], [7 * M, 13 * M], [13 * M, 20 * M], [20 * M, 60 * M]],
    banners: [
      { title: 'Lên đời iPhone 17 Series', subtitle: 'Thu cũ trợ giá đến 5 triệu', from: '#1f2937', to: '#f97316', kind: 'phone', color: '#f97316' },
      { title: 'Galaxy AI - Giảm đến 6 triệu', subtitle: 'Tặng bảo hành màn hình 12 tháng', from: '#1e3a8a', to: '#38bdf8', kind: 'foldable', color: '#1e3a8a' },
    ],
    vouchers: commonVouchers('điện thoại'),
    seo: seo('Điện thoại', 'Điện thoại thông minh là thiết bị không thể thiếu trong cuộc sống hiện đại, giúp liên lạc, làm việc, học tập và giải trí mọi lúc mọi nơi. Thị trường hiện có rất nhiều lựa chọn từ phổ thông đến cao cấp.', ['iPhone 17 Pro Max', 'Galaxy S25 Ultra', 'Xiaomi 15T', 'OPPO Find X9'], ['Nên chọn điện thoại hãng nào?', 'Thông số cần biết khi mua điện thoại']),
    faq: commonFaq('điện thoại'),
  },
  {
    id: 'tablet',
    slug: 'may-tinh-bang',
    name: 'Máy tính bảng',
    title: 'Máy tính bảng',
    group: 'mobile',
    facets: [brand, need(), attr('ram', 'Dung lượng RAM'), attr('bonho', 'Bộ nhớ trong'), attr('manhinh', 'Kích thước màn hình'), attr('ketnoi', 'Kết nối')],
    needs: [
      { label: 'Học tập', kind: 'tablet', color: '#fbbf24' },
      { label: 'Giải trí', kind: 'tablet', color: '#a5b4fc' },
      { label: 'Đồ họa', kind: 'tablet', color: '#6b7280' },
      { label: 'Làm việc', kind: 'keyboard', color: '#475569' },
    ],
    pricePresets: [[0, 5 * M], [5 * M, 10 * M], [10 * M, 20 * M], [20 * M, 60 * M]],
    banners: [
      { title: 'iPad mùa tựu trường', subtitle: 'Giảm thêm 400K cho sinh viên', from: '#4c1d95', to: '#a78bfa', kind: 'tablet', color: '#a5b4fc' },
      { title: 'Galaxy Tab S10 Series', subtitle: 'Tặng bút S Pen và bao da', from: '#0f172a', to: '#475569', kind: 'tablet', color: '#94a3b8' },
    ],
    vouchers: commonVouchers('máy tính bảng'),
    seo: seo('Máy tính bảng', 'Máy tính bảng có màn hình lớn, gọn nhẹ, phù hợp cho học tập online, đọc sách, xem phim và làm việc sáng tạo với bút cảm ứng.', ['iPad Air M3', 'iPad Pro M5', 'Galaxy Tab S10 FE', 'Xiaomi Pad 7'], ['Nên mua iPad hay máy tính bảng Android?']),
    faq: commonFaq('máy tính bảng'),
  },
  {
    id: 'laptop',
    slug: 'laptop',
    name: 'Laptop',
    title: 'Máy tính laptop',
    group: 'computer',
    facets: [
      brand,
      need(),
      attr('cpu', 'CPU'),
      attr('ram', 'Dung lượng RAM'),
      attr('ocung', 'Ổ cứng'),
      attr('gpu', 'Card đồ họa'),
      attr('manhinh', 'Kích thước màn hình'),
      attr('dophangiai', 'Độ phân giải'),
      attr('tinhnang', 'Tính năng đặc biệt'),
      attr('ai', 'Công nghệ AI'),
    ],
    needs: [
      { label: 'Văn phòng', kind: 'laptop', color: '#94a3b8' },
      { label: 'Gaming', kind: 'laptop', color: '#111827' },
      { label: 'Mỏng nhẹ', kind: 'laptop', color: '#cbd5e1' },
      { label: 'Đồ họa', kind: 'laptop', color: '#475569' },
      { label: 'Sinh viên', kind: 'laptop', color: '#1e3a8a' },
    ],
    pricePresets: [[0, 15 * M], [15 * M, 20 * M], [20 * M, 25 * M], [25 * M, 30 * M], [30 * M, 80 * M]],
    banners: [
      { title: 'Lap xịn quà slay - Học hăng say', subtitle: 'Tặng bộ quà đến 1 triệu', from: '#4c1d95', to: '#db2777', kind: 'laptop', color: '#94a3b8' },
      { title: 'Laptop Gaming giá từ 17.99 triệu', subtitle: 'Sinh viên giảm thêm đến 3 triệu + balo', from: '#111827', to: '#be123c', kind: 'laptop', color: '#1f2937' },
    ],
    vouchers: commonVouchers('laptop'),
    seo: seo('Laptop', 'Máy tính laptop là thiết bị công nghệ được rất nhiều người dùng yêu thích nhờ sự tiện lợi, đáp ứng tốt nhu cầu học tập, làm việc và giải trí. Các thương hiệu không ngừng cải tiến để mang lại dòng laptop mỏng nhẹ, hiệu năng mạnh mẽ với mức giá hợp lý.', ['MacBook Air M4', 'ASUS Vivobook', 'Lenovo LOQ', 'Dell Inspiron'], ['Laptop phục vụ công việc, học tập, giải trí', 'Lợi ích khi sử dụng máy tính laptop', 'Một số thông số kỹ thuật cần biết về laptop']),
    faq: [
      { q: 'Nên chọn mua laptop bao nhiêu RAM là đủ?', a: '8GB đủ cho học tập, văn phòng cơ bản. 16GB phù hợp đa nhiệm, lập trình, chỉnh sửa ảnh. 32GB dành cho đồ họa 3D, dựng video và gaming nặng.' },
      { q: 'Sinh viên nên mua laptop nào?', a: 'Ưu tiên laptop mỏng nhẹ, pin tốt, RAM 16GB trong tầm 15–20 triệu. Lọc theo nhu cầu "Sinh viên" để xem các mẫu phù hợp và nhận thêm ưu đãi S-Student.' },
      ...commonFaq('laptop'),
    ],
  },
  {
    id: 'monitor',
    slug: 'man-hinh',
    name: 'Màn hình',
    title: 'Màn hình máy tính',
    group: 'computer',
    facets: [brand, need(), attr('kichthuoc', 'Kích thước'), attr('dophangiai', 'Độ phân giải'), attr('tanso', 'Tần số quét'), attr('tamnen', 'Tấm nền')],
    needs: [
      { label: 'Gaming', kind: 'monitor', color: '#7c3aed' },
      { label: 'Đồ họa', kind: 'monitor', color: '#0f766e' },
      { label: 'Văn phòng', kind: 'monitor', color: '#0284c7' },
    ],
    pricePresets: [[0, 3 * M], [3 * M, 5 * M], [5 * M, 8 * M], [8 * M, 30 * M]],
    banners: [
      { title: 'Màn hình gaming 180Hz', subtitle: 'Chỉ từ 2.99 triệu', from: '#4c1d95', to: '#7c3aed', kind: 'monitor', color: '#7c3aed' },
      { title: 'Màn hình đồ họa chuẩn màu', subtitle: 'Giảm đến 1.5 triệu', from: '#064e3b', to: '#14b8a6', kind: 'monitor', color: '#0f766e' },
    ],
    vouchers: commonVouchers('màn hình'),
    seo: seo('Màn hình máy tính', 'Màn hình máy tính quyết định trực tiếp trải nghiệm làm việc và giải trí. Lựa chọn đúng kích thước, độ phân giải và tần số quét giúp bạn làm việc hiệu quả và chơi game mượt mà hơn.', ['Odyssey G5', 'UltraGear 27GS', 'Dell UltraSharp'], ['Nên chọn màn hình bao nhiêu inch?', 'Tần số quét bao nhiêu là đủ?']),
    faq: commonFaq('màn hình'),
  },
  {
    id: 'watch',
    slug: 'dong-ho',
    name: 'Đồng hồ',
    title: 'Đồng hồ thông minh',
    group: 'wearable',
    facets: [brand, need(), attr('kichthuoc', 'Kích thước mặt'), attr('tinhnang', 'Tính năng'), attr('pin', 'Thời lượng pin')],
    needs: [
      { label: 'Thể thao', kind: 'watch', color: '#f97316' },
      { label: 'Sức khỏe', kind: 'watch', color: '#f43f5e' },
      { label: 'Thời trang', kind: 'watch', color: '#a16207' },
    ],
    pricePresets: [[0, 2 * M], [2 * M, 5 * M], [5 * M, 10 * M], [10 * M, 40 * M]],
    banners: [
      { title: 'Apple Watch Series 11', subtitle: 'Giảm thêm 300K khi thanh toán online', from: '#064e3b', to: '#10b981', kind: 'watch', color: '#f43f5e' },
      { title: 'Đồng hồ thể thao Garmin', subtitle: 'Trả góp 0%, tặng dây đeo', from: '#0c4a6e', to: '#0891b2', kind: 'watch', color: '#0891b2' },
    ],
    vouchers: commonVouchers('đồng hồ'),
    seo: seo('Đồng hồ thông minh', 'Đồng hồ thông minh giúp theo dõi sức khỏe, luyện tập, nhận thông báo và thanh toán ngay trên cổ tay.', ['Apple Watch Series 11', 'Galaxy Watch8', 'Garmin Forerunner'], ['Nên chọn đồng hồ thông minh hãng nào?']),
    faq: commonFaq('đồng hồ thông minh'),
  },
  {
    id: 'audio',
    slug: 'am-thanh',
    name: 'Âm thanh',
    title: 'Tai nghe, loa',
    group: 'wearable',
    facets: [brand, need(), attr('loai', 'Loại sản phẩm'), attr('tinhnang', 'Tính năng')],
    needs: [
      { label: 'Nghe nhạc', kind: 'headphones', color: '#78350f' },
      { label: 'Chơi game', kind: 'headphones', color: '#111827' },
      { label: 'Thể thao', kind: 'earbuds', color: '#f8fafc' },
      { label: 'Làm việc', kind: 'earbuds', color: '#cbd5e1' },
    ],
    pricePresets: [[0, M], [M, 3 * M], [3 * M, 6 * M], [6 * M, 20 * M]],
    banners: [
      { title: 'AirPods Pro 3', subtitle: 'Chống ồn chủ động thế hệ mới', from: '#1f2937', to: '#64748b', kind: 'earbuds', color: '#f8fafc' },
      { title: 'Loa Bluetooth giảm đến 40%', subtitle: 'JBL, Sony, Marshall chính hãng', from: '#1e3a8a', to: '#2563eb', kind: 'speaker', color: '#2563eb' },
    ],
    vouchers: commonVouchers('âm thanh'),
    seo: seo('Tai nghe, loa', 'Tai nghe và loa Bluetooth mang lại trải nghiệm âm thanh không dây tiện lợi cho nghe nhạc, xem phim, chơi game và làm việc.', ['AirPods Pro 3', 'Sony WH-1000XM5', 'JBL Flip 6'], ['Tai nghe chống ồn ANC là gì?']),
    faq: commonFaq('tai nghe, loa'),
  },
  {
    id: 'tv',
    slug: 'tivi',
    name: 'Tivi',
    title: 'Tivi',
    group: 'home',
    facets: [brand, need('Không gian, nhu cầu'), attr('kichthuoc', 'Kích thước'), attr('loai', 'Loại tivi'), attr('dophangiai', 'Độ phân giải'), attr('hedieuhanh', 'Hệ điều hành')],
    needs: [
      { label: 'Phòng khách lớn', kind: 'tv', color: '#6366f1' },
      { label: 'Phòng ngủ', kind: 'tv', color: '#14b8a6' },
      { label: 'Xem phim', kind: 'tv', color: '#ec4899' },
      { label: 'Chơi game', kind: 'tv', color: '#f97316' },
    ],
    pricePresets: [[0, 8 * M], [8 * M, 15 * M], [15 * M, 25 * M], [25 * M, 80 * M]],
    banners: [
      { title: 'Tivi 4K giảm đến 50%', subtitle: 'Miễn phí lắp đặt toàn quốc', from: '#7f1d1d', to: '#d70018', kind: 'tv', color: '#f43f5e' },
      { title: 'OLED - Đen tuyệt đối', subtitle: 'Trả góp 0%, bảo hành 2 năm', from: '#111827', to: '#4c1d95', kind: 'tv', color: '#ec4899' },
    ],
    vouchers: commonVouchers('tivi'),
    seo: seo('Tivi', 'Tivi thông minh 4K với kho ứng dụng phong phú là trung tâm giải trí của mọi gia đình.', ['OLED evo C4', 'QLED Q60D', 'Bravia 7'], ['Nên chọn tivi bao nhiêu inch cho phòng khách?', 'OLED, QLED và Mini LED khác nhau thế nào?']),
    faq: commonFaq('tivi'),
  },
  {
    id: 'appliance',
    slug: 'dien-may',
    name: 'Điện máy',
    title: 'Điện máy, gia dụng',
    group: 'home',
    facets: [brand, need('Loại sản phẩm'), attr('tinhnang', 'Tính năng')],
    needs: [
      { label: 'Tủ lạnh', kind: 'fridge', color: '#9ca3af' },
      { label: 'Máy giặt', kind: 'washer', color: '#e5e7eb' },
      { label: 'Máy lọc không khí', kind: 'airpurifier', color: '#f1f5f9' },
    ],
    pricePresets: [[0, 5 * M], [5 * M, 10 * M], [10 * M, 20 * M], [20 * M, 60 * M]],
    banners: [
      { title: 'Tủ lạnh Inverter từ 4.79 triệu', subtitle: 'Giao lắp miễn phí', from: '#374151', to: '#9ca3af', kind: 'fridge', color: '#9ca3af' },
      { title: 'Máy giặt AI giảm đến 30%', subtitle: 'Trả góp 0%', from: '#0c4a6e', to: '#38bdf8', kind: 'washer', color: '#e5e7eb' },
    ],
    vouchers: commonVouchers('điện máy'),
    seo: seo('Điện máy, gia dụng', 'Thiết bị điện máy gia dụng như tủ lạnh, máy giặt, máy lọc không khí giúp cuộc sống gia đình tiện nghi và tiết kiệm thời gian.', ['Tủ lạnh Samsung Inverter', 'Máy giặt LG AI DD', 'Xiaomi Air Purifier 4'], ['Công nghệ Inverter tiết kiệm điện như thế nào?']),
    faq: commonFaq('điện máy'),
  },
  {
    id: 'accessory',
    slug: 'phu-kien',
    name: 'Phụ kiện',
    title: 'Phụ kiện',
    group: 'accessory',
    facets: [brand, need('Loại phụ kiện'), attr('tinhnang', 'Tính năng')],
    needs: [
      { label: 'Củ cáp', kind: 'charger', color: '#f8fafc' },
      { label: 'Chuột, bàn phím', kind: 'keyboard', color: '#ef4444' },
      { label: 'Sạc dự phòng', kind: 'powerbank', color: '#0f172a' },
      { label: 'Camera', kind: 'camera', color: '#334155' },
    ],
    pricePresets: [[0, 500_000], [500_000, M], [M, 3 * M], [3 * M, 15 * M]],
    banners: [
      { title: 'Phụ kiện chính hãng giảm 50%', subtitle: 'Anker, Ugreen, Baseus', from: '#0f766e', to: '#34d399', kind: 'charger', color: '#f8fafc' },
      { title: 'Gaming gear', subtitle: 'Chuột, bàn phím giảm đến 40%', from: '#111827', to: '#ef4444', kind: 'keyboard', color: '#ef4444' },
    ],
    vouchers: commonVouchers('phụ kiện'),
    seo: seo('Phụ kiện', 'Phụ kiện công nghệ chính hãng giúp thiết bị của bạn hoạt động hiệu quả, bền bỉ và tiện lợi hơn.', ['Củ sạc GaN 65W', 'Logitech MX Master 3S', 'Pin dự phòng 20000mAh'], ['Sạc nhanh GaN là gì?']),
    faq: commonFaq('phụ kiện'),
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): CategoryConfig | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryGroup(config: CategoryConfig): CategoryConfig[] {
  return categories.filter((c) => c.group === config.group);
}

// ---------- navigation menu → category links ----------

/** Mega-menu ids (data/site.ts) → category id */
const menuToCategory: Record<string, string> = {
  phone: 'phone',
  laptop: 'laptop',
  audio: 'audio',
  watch: 'watch',
  appliance: 'appliance',
  accessory: 'accessory',
  monitor: 'monitor',
  tv: 'tv',
};

/** Menu groups that point to a different category than their menu entry */
const groupToCategory: Record<string, string> = {
  'Máy tính bảng': 'tablet',
  'Màn hình': 'monitor',
  Tivi: 'tv',
  'Điện máy': 'appliance',
  'Đồng hồ thông minh': 'watch',
  Camera: 'accessory',
};

const brandAliases: Record<string, string> = {
  iphone: 'Apple',
  ipad: 'Apple',
  macbook: 'Apple',
  'apple watch': 'Apple',
  airpods: 'Apple',
  'galaxy tab': 'Samsung',
  'galaxy watch': 'Samsung',
  'xiaomi pad': 'Xiaomi',
  'xiaomi watch': 'Xiaomi',
  'huawei watch': 'Huawei',
  'lenovo tab': 'Lenovo',
};

const KNOWN_BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'HONOR', 'TECNO', 'Nubia', 'Sony', 'ASUS', 'Lenovo', 'Dell', 'HP', 'Acer', 'MSI', 'LG', 'TCL', 'Garmin', 'Huawei'];

/** "Dưới 2 triệu" / "Từ 2 - 4 triệu" / "15 - 20 triệu" / "Trên 25 triệu" → "min-max" */
function priceParam(label: string): string | null {
  const nums = label.match(/\d+/g)?.map((n) => Number(n) * M);
  if (!nums || !/triệu/.test(label)) return null;
  if (/Dưới/i.test(label)) return `0-${nums[0]}`;
  if (/Trên/i.test(label)) return `${nums[0]}-${200 * M}`;
  return nums.length >= 2 ? `${nums[0]}-${nums[1]}` : null;
}

/** Category link for a mega-menu entry, or null when the entry is not a category (Thu cũ, Tin tức...). */
export function menuLink(menuId: string, groupTitle?: string, item?: string): string | null {
  const categoryId = (groupTitle && groupToCategory[groupTitle]) || menuToCategory[menuId];
  const config = categoryId ? getCategoryById(categoryId) : undefined;
  if (!config) return null;
  if (!item) return categoryPath(config);

  const lower = item.toLowerCase().replace(/^(tivi|tai nghe|loa) /, '');
  const aliased = Object.entries(brandAliases).find(([alias]) => lower.startsWith(alias))?.[1];
  const brandName = aliased ?? KNOWN_BRANDS.find((b) => lower.startsWith(b.toLowerCase()));
  if (brandName) return categoryPath(config, { hang: slugify(brandName) });

  const price = priceParam(item);
  if (price) return categoryPath(config, { gia: price });

  const needMatch = config.needs.find((n) => slugify(n.label).includes(slugify(item)) || slugify(item).includes(slugify(n.label)));
  if (needMatch) return categoryPath(config, { nhucau: slugify(needMatch.label) });

  return categoryPath(config);
}
