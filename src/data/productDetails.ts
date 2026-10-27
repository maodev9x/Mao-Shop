import type { DeviceKind, GalleryItem, Product, ProductColor, ProductDetail, ProductVariant, SpecRow } from '../types';
import { formatPrice } from '../lib/format';
import { products } from './products';

// ---------- helpers ----------

/** Round to a retail-looking price, e.g. 41.990.000đ */
function retail(value: number): number {
  if (value < 1_000_000) return Math.round(value / 10_000) * 10_000;
  return Math.round(value / 500_000) * 500_000 - 10_000;
}

const NAMED_COLORS: ProductColor[] = [
  { name: 'Đen', color: '#1f2937' },
  { name: 'Bạc', color: '#e5e7eb' },
  { name: 'Trắng', color: '#f8fafc' },
  { name: 'Xanh dương', color: '#93c5fd' },
  { name: 'Xanh lá', color: '#22c55e' },
  { name: 'Cam vũ trụ', color: '#f97316' },
  { name: 'Đỏ Burgundy', color: '#7f1d1d' },
  { name: 'Hồng', color: '#ec4899' },
  { name: 'Tím', color: '#a78bfa' },
  { name: 'Xám titan', color: '#64748b' },
  { name: 'Vàng', color: '#f59e0b' },
  { name: 'Nâu', color: '#78350f' },
];

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function nearestColorName(hex: string): string {
  const [r, g, b] = rgb(hex);
  let best = NAMED_COLORS[0];
  let bestDist = Infinity;
  for (const c of NAMED_COLORS) {
    const [r2, g2, b2] = rgb(c.color);
    const d = (r - r2) ** 2 + (g - g2) ** 2 + (b - b2) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return best.name;
}

/** Product colour first (with its nearest name), then up to three distinct alternatives. */
function buildColors(product: Product, count: number): ProductColor[] {
  const firstName = nearestColorName(product.color);
  const others = NAMED_COLORS.filter((c) => c.name !== firstName && c.name !== 'Trắng');
  // pick alternatives spread across the palette, deterministic per product
  const seed = product.id.split('').reduce((n, ch) => n + ch.charCodeAt(0), 0);
  const picked: ProductColor[] = [];
  for (let i = 0; picked.length < count - 1 && i < others.length; i++) {
    picked.push(others[(seed + i * 3) % others.length]);
  }
  return [{ name: firstName, color: product.color }, ...picked.filter((c, i, a) => a.findIndex((x) => x.name === c.name) === i)];
}

/** Builds a ladder of options starting at the size/capacity found in the product name. */
function ladder(name: string, steps: string[], pattern: RegExp, take: number): string[] | null {
  const found = name.match(pattern)?.[0]?.replace(/\s+/g, ' ');
  if (!found) return null;
  const start = steps.findIndex((s) => s.toLowerCase() === found.toLowerCase());
  if (start < 0) return [found];
  return steps.slice(start, start + take);
}

function buildVariants(product: Product): ProductVariant[] {
  const { name, kind, price, originalPrice } = product;
  let labels: string[] | null = null;
  let step = 0.15;

  switch (kind) {
    case 'phone':
    case 'foldable':
    case 'tablet': {
      const storage = ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'];
      // names like "12GB 256GB" — the last capacity is the storage
      const caps = name.match(/\d+(GB|TB)/g);
      const last = caps?.[caps.length - 1];
      const start = last ? storage.indexOf(last) : -1;
      labels = start >= 0 ? storage.slice(start, start + (price >= 30_000_000 ? 4 : 3)) : null;
      break;
    }
    case 'laptop': {
      // start from the configuration in attrs so it matches the category filters
      const ram = (product.attrs?.ram as string | undefined) ?? '16GB';
      const disk = (product.attrs?.ocung as string | undefined) ?? '512GB';
      const nextDisk = disk === '256GB' ? '512GB' : '1TB';
      const nextRam = ram === '8GB' ? '16GB' : ram === '16GB' ? '32GB' : ram;
      labels = [...new Set([`${ram} / ${disk}`, `${ram} / ${nextDisk}`, `${nextRam} / ${nextDisk}`])];
      step = 0.12;
      break;
    }
    case 'tv':
      labels = ladder(name, ['43 inch', '50 inch', '55 inch', '65 inch', '75 inch', '85 inch'], /\d+ inch/, 3);
      step = 0.3;
      break;
    case 'monitor':
      labels = ladder(name, ['24 inch', '27 inch', '32 inch'], /\d+ inch/, 2);
      step = 0.25;
      break;
    case 'watch':
      labels = ladder(name, ['40mm', '41mm', '42mm', '44mm', '45mm', '46mm', '47mm', '49mm'], /\d+mm/, 2);
      step = 0.08;
      break;
  }

  if (!labels || labels.length === 0) return [{ label: 'Tiêu chuẩn', price, originalPrice }];
  return labels.map((label, i) => ({
    label,
    price: i === 0 ? price : retail(price * (1 + step * i)),
    originalPrice: originalPrice ? (i === 0 ? originalPrice : retail(originalPrice * (1 + step * i))) : undefined,
  }));
}

const extraShots: Partial<Record<DeviceKind, { kind: DeviceKind; label: string }[]>> = {
  phone: [{ kind: 'camera', label: 'Camera' }, { kind: 'charger', label: 'Phụ kiện' }],
  foldable: [{ kind: 'phone', label: 'Màn hình ngoài' }, { kind: 'charger', label: 'Phụ kiện' }],
  tablet: [{ kind: 'keyboard', label: 'Bàn phím' }],
  laptop: [{ kind: 'keyboard', label: 'Bàn phím' }, { kind: 'mouse', label: 'Phụ kiện' }],
  tv: [{ kind: 'speaker', label: 'Âm thanh' }],
  watch: [{ kind: 'phone', label: 'Kết nối' }],
};

function buildGallery(product: Product, colors: ProductColor[]): GalleryItem[] {
  return [
    { id: 'highlight', kind: product.kind, color: product.color, label: 'Tính năng nổi bật' },
    ...colors.map((c) => ({ id: `color-${c.name}`, kind: product.kind, color: c.color, label: c.name })),
    ...(extraShots[product.kind] ?? []).map((s, i) => ({ id: `extra-${i}`, kind: s.kind, color: product.color, label: s.label })),
  ];
}

// ---------- spec templates per device kind ----------

/** Filter attribute as display text, so specs match what the category filters show. */
function attrText(p: Product, key: string, fallback: string): string {
  const v = p.attrs?.[key];
  return v === undefined || (Array.isArray(v) && !v.length) ? fallback : Array.isArray(v) ? v.join(', ') : v;
}

function buildSpecs(p: Product, variants: ProductVariant[]): SpecRow[] {
  const v = variants[0].label;
  switch (p.kind) {
    case 'phone':
    case 'foldable':
      return [
        { label: 'Kích thước màn hình', value: p.kind === 'foldable' ? '7.6 inches (màn hình chính)' : attrText(p, 'manhinh', '6.7 inches') },
        { label: 'Công nghệ màn hình', value: 'AMOLED / OLED' },
        { label: 'Độ phân giải màn hình', value: '2796 x 1290 pixels' },
        { label: 'Tính năng màn hình', value: 'Tần số quét 120Hz\nĐộ sáng tối đa 3000 nits\nHDR10+\nKính cường lực' },
        { label: 'Camera sau', value: 'Chính 50 MP, f/1.8\nGóc siêu rộng 12 MP\nTele 12 MP, zoom quang 3x' },
        { label: 'Camera trước', value: '12 MP, f/1.9' },
        { label: 'Chipset', value: 'Chip hiệu năng cao thế hệ mới' },
        { label: 'Bộ nhớ trong', value: v },
        { label: 'Dung lượng RAM', value: attrText(p, 'ram', '8GB') },
        { label: 'Pin', value: '5000 mAh, sạc nhanh 45W' },
        { label: 'Hệ điều hành', value: p.brand === 'Apple' ? 'iOS 26' : 'Android 16' },
        { label: 'Hỗ trợ mạng', value: '5G' },
        { label: 'Thẻ SIM', value: 'Nano-SIM + eSIM' },
        { label: 'Công nghệ NFC', value: 'Có' },
        { label: 'Chống nước, bụi', value: 'IP68' },
      ];
    case 'tablet':
      return [
        { label: 'Kích thước màn hình', value: attrText(p, 'manhinh', '11 inch') },
        { label: 'Công nghệ màn hình', value: 'IPS LCD / OLED' },
        { label: 'Chipset', value: 'Chip hiệu năng cao' },
        { label: 'Bộ nhớ trong', value: v },
        { label: 'Camera sau', value: '12 MP' },
        { label: 'Camera trước', value: '12 MP góc siêu rộng' },
        { label: 'Pin', value: 'Lên đến 10 giờ sử dụng' },
        { label: 'Kết nối', value: 'Wi-Fi 6E, Bluetooth 5.3, USB-C' },
        { label: 'Hệ điều hành', value: p.brand === 'Apple' ? 'iPadOS 26' : 'Android 16' },
      ];
    case 'laptop':
      return [
        { label: 'CPU', value: attrText(p, 'cpu', p.specs?.[0] ?? 'Intel Core i5 thế hệ mới') },
        { label: 'Card đồ họa', value: attrText(p, 'gpu', p.specs?.find((s) => s.startsWith('RTX')) ?? 'Card đồ họa tích hợp') },
        { label: 'RAM', value: v.split(' / ')[0] },
        { label: 'Ổ cứng', value: `SSD ${v.split(' / ')[1] ?? '512GB'}` },
        { label: 'Kích thước màn hình', value: attrText(p, 'manhinh', '15.6 inches') },
        { label: 'Độ phân giải', value: attrText(p, 'dophangiai', 'Full HD') },
        { label: 'Công nghệ AI', value: attrText(p, 'ai', 'Không có') },
        { label: 'Cổng kết nối', value: 'USB-C, USB-A, HDMI, jack 3.5mm' },
        { label: 'Pin', value: '70 Wh' },
        { label: 'Trọng lượng', value: '1.8 kg' },
        { label: 'Hệ điều hành', value: p.brand === 'Apple' ? 'macOS' : 'Windows 11 Home' },
      ];
    case 'tv':
    case 'monitor':
      return [
        { label: 'Kích thước màn hình', value: v },
        { label: 'Độ phân giải', value: attrText(p, 'dophangiai', p.kind === 'tv' ? '4K Ultra HD' : '2K') },
        { label: 'Tấm nền', value: attrText(p, p.kind === 'tv' ? 'loai' : 'tamnen', 'LED / IPS') },
        { label: 'Tần số quét', value: attrText(p, 'tanso', p.kind === 'tv' ? '120Hz' : '180Hz') },
        { label: 'HDR', value: 'HDR10, HLG' },
        { label: 'Cổng kết nối', value: 'HDMI x3, USB x2, LAN, Wi-Fi' },
        { label: 'Hệ điều hành', value: p.kind === 'tv' ? attrText(p, 'hedieuhanh', 'Google TV') : 'Không' },
      ];
    case 'watch':
      return [
        { label: 'Kích thước mặt', value: v },
        { label: 'Màn hình', value: 'AMOLED, luôn hiển thị' },
        { label: 'Tính năng sức khỏe', value: 'Đo nhịp tim, SpO2, theo dõi giấc ngủ, ECG' },
        { label: 'Chống nước', value: '5 ATM' },
        { label: 'Thời lượng pin', value: 'Lên đến 36 giờ' },
        { label: 'Kết nối', value: 'Bluetooth 5.3, GPS, NFC' },
      ];
    case 'earbuds':
    case 'headphones':
    case 'speaker':
      return [
        { label: 'Loại', value: p.kind === 'speaker' ? 'Loa Bluetooth' : p.kind === 'earbuds' ? 'Tai nghe không dây' : 'Tai nghe chụp tai' },
        { label: 'Chống ồn', value: 'Chống ồn chủ động (ANC)' },
        { label: 'Thời lượng pin', value: p.kind === 'speaker' ? 'Lên đến 14 giờ' : 'Lên đến 30 giờ (kèm hộp sạc)' },
        { label: 'Kết nối', value: 'Bluetooth 5.3' },
        { label: 'Chống nước', value: 'IP54' },
      ];
    default:
      return [
        { label: 'Thương hiệu', value: p.brand },
        { label: 'Bảo hành', value: '12 tháng chính hãng' },
        { label: 'Xuất xứ', value: 'Chính hãng, đầy đủ hóa đơn VAT' },
      ];
  }
}

const featureTemplates: Partial<Record<DeviceKind, { title: string; value: string }[]>> = {
  phone: [
    { title: 'Camera chính', value: '50MP' },
    { title: 'Chip thế hệ mới', value: 'Nhanh hơn 40%' },
    { title: 'Xem video', value: 'Đến 30 giờ' },
    { title: 'Sạc nhanh', value: '50% / 15 phút' },
    { title: 'Camera trước', value: '12MP' },
    { title: 'Trợ lý AI', value: 'Tích hợp sẵn' },
  ],
  laptop: [
    { title: 'Hiệu năng', value: 'Đa nhiệm mượt' },
    { title: 'Màn hình', value: '144Hz' },
    { title: 'Pin', value: 'Đến 10 giờ' },
    { title: 'Sạc nhanh', value: '50% / 30 phút' },
    { title: 'Tản nhiệt', value: 'Kép' },
    { title: 'Copilot AI', value: 'Tích hợp' },
  ],
  tv: [
    { title: 'Độ phân giải', value: '4K' },
    { title: 'Tần số quét', value: '120Hz' },
    { title: 'Âm thanh', value: 'Dolby Atmos' },
    { title: 'Hình ảnh', value: 'HDR10+' },
    { title: 'Điều khiển', value: 'Giọng nói' },
    { title: 'Ứng dụng', value: 'Hàng nghìn app' },
  ],
  watch: [
    { title: 'Pin', value: 'Đến 36 giờ' },
    { title: 'Chống nước', value: '5 ATM' },
    { title: 'Sức khỏe', value: 'ECG, SpO2' },
    { title: 'Màn hình', value: 'Luôn bật' },
    { title: 'Định vị', value: 'GPS kép' },
    { title: 'Thanh toán', value: 'NFC' },
  ],
};

const defaultFeatures = [
  { title: 'Chính hãng', value: '100%' },
  { title: 'Bảo hành', value: '12 tháng' },
  { title: 'Đổi trả', value: '30 ngày' },
  { title: 'Giao nhanh', value: '2 giờ' },
  { title: 'Trả góp', value: '0%' },
  { title: 'Thu cũ', value: 'Trợ giá cao' },
];

function buildCompareIds(product: Product): string[] {
  const near = products
    .filter((x) => x.categoryId === product.categoryId && x.id !== product.id)
    .sort((a, b) => Math.abs(a.price - product.price) - Math.abs(b.price - product.price))
    .slice(0, 2)
    .map((x) => x.id);
  return near.length === 2 ? [near[0], product.id, near[1]] : [product.id, ...near];
}

// ---------- hand-written overrides for featured products ----------

const overrides: Record<string, Partial<ProductDetail>> = {
  ph1: {
    specs: [
      { label: 'Hệ điều hành khi ra mắt', value: 'iOS 26' },
      { label: 'Chipset', value: 'Apple A19 Pro' },
      { label: 'Bộ nhớ trong', value: '256 GB' },
      { label: 'Loại CPU', value: 'CPU 6 lõi với 2 lõi hiệu năng và 4 lõi tiết kiệm điện' },
      { label: 'GPU', value: 'GPU 6 lõi' },
      { label: 'Kích thước màn hình', value: '6.9 inches' },
      { label: 'Công nghệ màn hình', value: 'Super Retina XDR' },
      { label: 'Độ phân giải màn hình', value: '2868 x 1320 pixels' },
      { label: 'Tính năng màn hình', value: 'Tần số quét 120 Hz\nĐộ sáng tối đa 3000 nits ngoài trời\nDynamic Island\nMàn hình Luôn Bật\nProMotion\nTrue Tone\nHaptic Touch' },
      { label: 'Camera sau', value: '48 MP Fusion Main, f/1.78\n48 MP Ultra Wide, f/2.2\n48 MP Telephoto, f/2.8\nZoom quang học 8x' },
      { label: 'Camera trước', value: '18 MP Center Stage, f/1.9\nTự động lấy nét theo pha' },
      { label: 'Pin', value: 'Pin lithium-ion tích hợp' },
      { label: 'Hỗ trợ mạng', value: '5G' },
      { label: 'Thẻ SIM', value: 'Nano-SIM + eSIM' },
      { label: 'Công nghệ NFC', value: 'Có' },
      { label: 'Thời điểm ra mắt', value: '09/2025' },
    ],
    features: [
      { title: 'Camera 48MP Fusion', value: 'Zoom quang 8x' },
      { title: 'Chip A19 Pro', value: 'Nhanh hơn đến 40%' },
      { title: 'Xem video', value: 'Dài hơn 11 giờ' },
      { title: 'Sạc nhanh', value: '50% / 20 phút' },
      { title: 'Camera trước 18MP', value: 'Center Stage' },
      { title: 'Apple Intelligence', value: 'Tích hợp sẵn' },
    ],
  },
};

// ---------- public API ----------

const cache = new Map<string, ProductDetail>();

export function getProductDetail(product: Product): ProductDetail {
  const hit = cache.get(product.id);
  if (hit) return hit;

  const variants = buildVariants(product);
  const colors = buildColors(product, ['phone', 'foldable', 'tablet', 'watch', 'earbuds', 'headphones', 'speaker'].includes(product.kind) ? 4 : 3);
  const minPrice = variants[0].price;
  const maxPrice = variants[variants.length - 1].price;

  const detail: ProductDetail = {
    gallery: buildGallery(product, colors),
    variants,
    colors,
    specs: buildSpecs(product, variants),
    highlights: [
      variants.length > 1
        ? `${product.name} có giá từ ${formatPrice(minPrice)} đến ${formatPrice(maxPrice)}, với ${variants.length} phiên bản: ${variants.map((v) => v.label).join(', ')}.`
        : `${product.name} có giá ${formatPrice(minPrice)}, hàng chính hãng, xuất VAT đầy đủ.`,
      `Có ${colors.length} màu sắc: ${colors.map((c) => c.name).join(', ')}.`,
      product.promoText ?? 'Giao nhanh trong 2 giờ, miễn phí cho đơn từ 300.000đ.',
      'Trả góp 0% lãi suất qua thẻ tín dụng, thu cũ đổi mới trợ giá cao.',
    ],
    features: featureTemplates[product.kind] ?? defaultFeatures,
    description: [
      `${product.name} là sản phẩm ${product.brand} chính hãng, phân phối tại MaoShop với đầy đủ hóa đơn VAT và bảo hành 12 tháng.`,
      'Thiết kế hoàn thiện cao cấp, vật liệu bền bỉ và tối ưu trải nghiệm sử dụng hằng ngày. Hiệu năng mạnh mẽ đáp ứng tốt từ công việc, học tập đến giải trí.',
      'Khi mua tại MaoShop, khách hàng được hỗ trợ trả góp 0%, thu cũ đổi mới trợ giá, giao nhanh 2 giờ tại nội thành và đổi mới trong 30 ngày nếu có lỗi từ nhà sản xuất.',
    ],
    compareIds: buildCompareIds(product),
    ...overrides[product.id],
  };

  cache.set(product.id, detail);
  return detail;
}

export function optionPrice(variant: ProductVariant, color?: ProductColor): number {
  return variant.price + (color?.priceDelta ?? 0);
}
