import type { DeviceKind, Product } from '../types';
import { formatPrice, slugify } from '../lib/format';
import { generatedProducts, inferAttrs } from './catalog';

function p(
  id: string,
  name: string,
  kind: DeviceKind,
  color: string,
  brand: string,
  categoryId: string,
  price: number,
  originalPrice?: number,
  extra: Partial<Product> = {},
): Product {
  return {
    id,
    slug: slugify(name),
    name,
    kind,
    color,
    brand,
    categoryId,
    price,
    originalPrice,
    memberDiscount: Math.round((price * 0.01) / 1000) * 1000,
    rating: 5,
    fastDelivery: true,
    ...extra,
  };
}

const PROMO_PAY = 'Ưu đãi thanh toán giảm đến 2 triệu qua thẻ tín dụng';
const PROMO_INSTALL = 'Trả góp 0% lãi suất, tối đa 12 tháng, trả trước từ 10%';

/** Hand-written products used by the home page blocks; filter attributes are inferred below. */
const handwritten: Product[] = [
  // ---------- Điện thoại ----------
  p('ph1', 'iPhone 17 Pro Max 256GB', 'phone', '#f97316', 'Apple', 'phone', 34990000, 37990000, { installment0: true, promoText: PROMO_PAY, tags: ['hot', 'new'], subCategory: 'Chụp ảnh đẹp' }),
  p('ph2', 'iPhone 17 Pro 256GB', 'phone', '#7f1d1d', 'Apple', 'phone', 31990000, 34990000, { installment0: true, promoText: PROMO_INSTALL, tags: ['hot'], subCategory: 'Chụp ảnh đẹp' }),
  p('ph3', 'iPhone 17 128GB', 'phone', '#93c5fd', 'Apple', 'phone', 22490000, 24990000, { installment0: true, studentDiscount: 500000, promoText: PROMO_PAY, subCategory: 'Điện thoại 5G' }),
  p('ph4', 'iPhone Air 256GB', 'phone', '#e5e7eb', 'Apple', 'phone', 27990000, 29990000, { installment0: true, preorder: false, tags: ['new'], subCategory: 'Điện thoại 5G' }),
  p('ph5', 'Samsung Galaxy S25 Ultra 12GB 256GB', 'phone', '#475569', 'Samsung', 'phone', 27490000, 33990000, { installment0: true, studentDiscount: 500000, promoText: 'Thu cũ lên đời trợ giá đến 5 triệu', rating: 4.9, tags: ['hot', 'deal'], subCategory: 'Chụp ảnh đẹp' }),
  p('ph6', 'Samsung Galaxy Z Fold7 12GB 256GB', 'foldable', '#1e3a8a', 'Samsung', 'phone', 41990000, 46990000, { installment0: true, promoText: 'Tặng gói bảo hành màn hình 12 tháng', tags: ['new'], subCategory: 'Điện thoại gập' }),
  p('ph7', 'Samsung Galaxy A57 5G 8GB 128GB', 'phone', '#a78bfa', 'Samsung', 'phone', 11890000, 13490000, { installment0: true, studentDiscount: 500000, promoText: PROMO_INSTALL, subCategory: 'Điện thoại 5G' }),
  p('ph8', 'Xiaomi 15T Pro 12GB 512GB', 'phone', '#0f766e', 'Xiaomi', 'phone', 16990000, 19990000, { installment0: true, rating: 4.8, tags: ['deal'], subCategory: 'Điện thoại chơi game' }),
  p('ph9', 'Xiaomi Redmi Note 15 Pro 8GB 256GB', 'phone', '#22c55e', 'Xiaomi', 'phone', 7990000, 8990000, { installment0: true, promoText: 'Bảo hành pin 18 tháng', subCategory: 'Điện thoại pin trâu' }),
  p('ph10', 'OPPO Find X9 Pro 16GB 512GB', 'phone', '#a16207', 'OPPO', 'phone', 26990000, 28990000, { installment0: true, tags: ['new'], subCategory: 'Chụp ảnh đẹp' }),
  p('ph11', 'OPPO Reno15 5G 12GB 256GB', 'phone', '#ec4899', 'OPPO', 'phone', 12990000, 14990000, { installment0: true, rating: 4.9, subCategory: 'Điện thoại 5G' }),
  p('ph12', 'TECNO POVA 7 Pro 8GB 256GB', 'phone', '#111827', 'TECNO', 'phone', 5490000, 6290000, { subCategory: 'Điện thoại chơi game' }),
  p('ph13', 'HONOR Magic7 Pro 12GB 512GB', 'phone', '#64748b', 'HONOR', 'phone', 18990000, 22990000, { installment0: true, rating: 4.8, subCategory: 'Điện thoại pin trâu' }),
  p('ph14', 'Samsung Galaxy Z Flip7 12GB 256GB', 'foldable', '#db2777', 'Samsung', 'phone', 22990000, 26990000, { installment0: true, tags: ['hot'], subCategory: 'Điện thoại gập' }),

  // ---------- Máy tính bảng ----------
  p('tb1', 'iPad Pro M5 11 inch WiFi 256GB', 'tablet', '#6b7280', 'Apple', 'tablet', 28990000, 30990000, { installment0: true, tags: ['new'] }),
  p('tb2', 'iPad Air M3 11 inch WiFi 128GB', 'tablet', '#a5b4fc', 'Apple', 'tablet', 15990000, 16990000, { installment0: true, studentDiscount: 400000, tags: ['hot'] }),
  p('tb3', 'iPad 11 WiFi 128GB', 'tablet', '#fbbf24', 'Apple', 'tablet', 9490000, 9990000, { installment0: true, studentDiscount: 300000 }),
  p('tb4', 'Samsung Galaxy Tab S10 FE 8GB 128GB', 'tablet', '#94a3b8', 'Samsung', 'tablet', 10490000, 12990000, { installment0: true, tags: ['deal'] }),
  p('tb5', 'Xiaomi Pad 7 8GB 256GB', 'tablet', '#0ea5e9', 'Xiaomi', 'tablet', 8790000, 9990000, { rating: 4.9 }),
  p('tb6', 'Lenovo Legion Tab Gen 3 12GB 256GB', 'tablet', '#1f2937', 'Lenovo', 'tablet', 11150000, 15990000, { installment0: true, tags: ['deal'] }),

  // ---------- Laptop ----------
  p('lt1', 'MacBook Air M4 13 inch 16GB 256GB', 'laptop', '#cbd5e1', 'Apple', 'laptop', 24990000, 26990000, { installment0: true, studentDiscount: 1000000, specs: ['Apple M4', '16GB', '256GB'], tags: ['hot'], subCategory: 'Văn phòng' }),
  p('lt2', 'MacBook Pro 14 M5 16GB 512GB', 'laptop', '#475569', 'Apple', 'laptop', 39990000, 42990000, { installment0: true, specs: ['Apple M5', '16GB', '512GB'], tags: ['new'], subCategory: 'Đồ họa' }),
  p('lt3', 'Laptop ASUS TUF Gaming A16 FA607NUQ', 'laptop', '#374151', 'ASUS', 'laptop', 32390000, 44490000, { installment0: true, specs: ['R7-7735HS', 'RTX 4050', '16GB'], tags: ['deal'], subCategory: 'Gaming' }),
  p('lt4', 'Laptop Dell 15 DC15250 i7-1355U', 'laptop', '#9ca3af', 'Dell', 'laptop', 22940000, 26990000, { installment0: true, specs: ['i7-1355U', '16GB', '512GB'], subCategory: 'Văn phòng' }),
  p('lt5', 'Laptop Lenovo Legion 5 15AHP10', 'laptop', '#1f2937', 'Lenovo', 'laptop', 38990000, 42990000, { installment0: true, specs: ['R7-8745H', 'RTX 5060', '32GB'], rating: 4.9, subCategory: 'Gaming' }),
  p('lt6', 'Laptop HP Pavilion 15-eg3098TU', 'laptop', '#d1d5db', 'HP', 'laptop', 16490000, 19990000, { specs: ['i5-1335U', '16GB', '512GB'], subCategory: 'Văn phòng' }),
  p('lt7', 'Laptop Acer Nitro V 15 ANV15-51', 'laptop', '#111827', 'Acer', 'laptop', 19990000, 24990000, { installment0: true, specs: ['i5-13420H', 'RTX 4050', '16GB'], tags: ['hot'], subCategory: 'Gaming' }),
  p('lt8', 'Laptop MSI Modern 15 B13M', 'laptop', '#6b7280', 'MSI', 'laptop', 12490000, 14990000, { specs: ['i5-1335U', '8GB', '512GB'], subCategory: 'Mỏng nhẹ' }),
  p('lt9', 'Laptop ASUS Zenbook 14 OLED UX3405', 'laptop', '#1e3a8a', 'ASUS', 'laptop', 24490000, 27990000, { installment0: true, specs: ['Ultra 7 155H', '16GB', '1TB'], subCategory: 'Mỏng nhẹ' }),
  p('lt10', 'Laptop Lenovo IdeaPad Slim 5 14IRH10', 'laptop', '#94a3b8', 'Lenovo', 'laptop', 18990000, 20990000, { specs: ['i5-13420H', '16GB', '512GB'], subCategory: 'Mỏng nhẹ' }),

  // ---------- Màn hình / PC ----------
  p('mn1', 'Màn hình Samsung Odyssey G5 27 inch 2K 180Hz', 'monitor', '#7c3aed', 'Samsung', 'monitor', 5990000, 7490000, { tags: ['deal'] }),
  p('mn2', 'Màn hình LG UltraGear 24GS65F 24 inch 180Hz', 'monitor', '#dc2626', 'LG', 'monitor', 3290000, 3990000, { rating: 4.9 }),
  p('mn3', 'Màn hình Dell UltraSharp U2724D 27 inch', 'monitor', '#0284c7', 'Dell', 'monitor', 8990000, 10490000, {}),
  p('mn4', 'Màn hình ASUS ProArt PA278QV 27 inch', 'monitor', '#0f766e', 'ASUS', 'monitor', 7490000, 8990000, { tags: ['new'] }),

  // ---------- Đồng hồ ----------
  p('wt1', 'Apple Watch Series 11 GPS 42mm', 'watch', '#f43f5e', 'Apple', 'watch', 10490000, 11990000, { installment0: true, tags: ['new'] }),
  p('wt2', 'Apple Watch Ultra 3 49mm', 'watch', '#f59e0b', 'Apple', 'watch', 22990000, 23990000, { installment0: true, tags: ['hot'] }),
  p('wt3', 'Samsung Galaxy Watch8 44mm', 'watch', '#334155', 'Samsung', 'watch', 6490000, 7990000, { tags: ['deal'] }),
  p('wt4', 'Xiaomi Watch S4 47mm', 'watch', '#16a34a', 'Xiaomi', 'watch', 3190000, 3990000, { rating: 4.8 }),
  p('wt5', 'Huawei Watch GT 5 46mm', 'watch', '#78350f', 'Huawei', 'watch', 4990000, 5990000, {}),
  p('wt6', 'Garmin Forerunner 265', 'watch', '#0891b2', 'Garmin', 'watch', 9990000, 11490000, {}),

  // ---------- Âm thanh ----------
  p('au1', 'Tai nghe AirPods Pro 3', 'earbuds', '#f8fafc', 'Apple', 'audio', 6290000, 6990000, { installment0: true, tags: ['hot', 'new'] }),
  p('au2', 'Tai nghe Samsung Galaxy Buds3 Pro', 'earbuds', '#cbd5e1', 'Samsung', 'audio', 3990000, 5490000, { tags: ['deal'] }),
  p('au3', 'Tai nghe Sony WH-1000XM6', 'headphones', '#1f2937', 'Sony', 'audio', 8990000, 9990000, { installment0: true, rating: 4.9 }),
  p('au4', 'Loa Bluetooth JBL Flip 7', 'speaker', '#2563eb', 'JBL', 'audio', 2990000, 3490000, { tags: ['deal'] }),
  p('au5', 'Tai nghe Marshall Major V', 'headphones', '#78350f', 'Marshall', 'audio', 3490000, 3990000, {}),
  p('au6', 'Loa Marshall Emberton III', 'speaker', '#292524', 'Marshall', 'audio', 4290000, 4990000, { rating: 4.8 }),

  // ---------- Tivi ----------
  p('tv1', 'Smart Tivi Samsung QLED 4K 55 inch QA55Q7F', 'tv', '#6366f1', 'Samsung', 'tv', 11990000, 16990000, { installment0: true, tags: ['deal'], subCategory: '55 inch' }),
  p('tv2', 'Google Tivi Sony 4K 65 inch K-65S30', 'tv', '#0ea5e9', 'Sony', 'tv', 18990000, 23990000, { installment0: true, tags: ['hot'], subCategory: '65 inch' }),
  p('tv3', 'Smart Tivi LG OLED evo 4K 55 inch OLED55C5', 'tv', '#ec4899', 'LG', 'tv', 29990000, 36990000, { installment0: true, tags: ['new'], subCategory: '55 inch' }),
  p('tv4', 'Google Tivi Xiaomi A Pro 4K 43 inch', 'tv', '#22c55e', 'Xiaomi', 'tv', 6490000, 8490000, { subCategory: '43 inch' }),
  p('tv5', 'Google Tivi TCL QLED 4K 65 inch 65C7K', 'tv', '#f97316', 'TCL', 'tv', 13990000, 19990000, { installment0: true, tags: ['deal'], subCategory: '65 inch' }),
  p('tv6', 'Smart Tivi Samsung Crystal UHD 4K 43 inch', 'tv', '#14b8a6', 'Samsung', 'tv', 7290000, 8990000, { subCategory: '43 inch' }),
  p('tv7', 'Smart Tivi LG NanoCell 4K 65 inch', 'tv', '#8b5cf6', 'LG', 'tv', 15990000, 19990000, { installment0: true, subCategory: '65 inch' }),
  p('tv8', 'Google Tivi Sony Bravia 7 4K 75 inch', 'tv', '#e11d48', 'Sony', 'tv', 39990000, 46990000, { installment0: true, subCategory: '75 inch' }),

  // ---------- Gia dụng ----------
  p('ap1', 'Tủ lạnh Samsung Inverter 348 lít RT35CG5544B1SV', 'fridge', '#9ca3af', 'Samsung', 'appliance', 9490000, 12490000, { installment0: true, tags: ['deal'], subCategory: 'Tủ lạnh' }),
  p('ap2', 'Tủ lạnh LG Inverter 519 lít Side by Side', 'fridge', '#4b5563', 'LG', 'appliance', 16990000, 21990000, { installment0: true, subCategory: 'Tủ lạnh' }),
  p('ap3', 'Tủ lạnh Panasonic Inverter 255 lít NR-TV261', 'fridge', '#d1d5db', 'Panasonic', 'appliance', 7990000, 9490000, { subCategory: 'Tủ lạnh' }),
  p('ap4', 'Máy giặt LG Inverter 10kg FV1410S4P', 'washer', '#e5e7eb', 'LG', 'appliance', 8990000, 11990000, { installment0: true, tags: ['hot'], subCategory: 'Máy giặt' }),
  p('ap5', 'Máy giặt Samsung AI Inverter 9kg WW90T', 'washer', '#cbd5e1', 'Samsung', 'appliance', 7490000, 9990000, { subCategory: 'Máy giặt' }),
  p('ap6', 'Máy lọc không khí Xiaomi Smart Air Purifier 4', 'airpurifier', '#f1f5f9', 'Xiaomi', 'appliance', 2690000, 3490000, { tags: ['deal'], subCategory: 'Máy lọc không khí' }),
  p('ap7', 'Máy lọc không khí Sharp FP-J40E-W', 'airpurifier', '#e2e8f0', 'Sharp', 'appliance', 2990000, 3690000, { subCategory: 'Máy lọc không khí' }),
  p('ap8', 'Máy giặt Electrolux Inverter 11kg EWF1142', 'washer', '#f8fafc', 'Electrolux', 'appliance', 10490000, 13990000, { installment0: true, subCategory: 'Máy giặt' }),

  // ---------- Phụ kiện ----------
  p('ac1', 'Bàn phím cơ gaming E-Dra EK398X', 'keyboard', '#ef4444', 'E-Dra', 'accessory', 690000, 890000, { tags: ['deal'], subCategory: 'Chuột, bàn phím' }),
  p('ac2', 'Chuột Gaming Logitech G502 Hero', 'mouse', '#1f2937', 'Logitech', 'accessory', 920000, 1390000, { rating: 4.9, studentDiscount: 92000, tags: ['deal', 'hot'], subCategory: 'Chuột, bàn phím' }),
  p('ac3', 'Củ sạc nhanh Anker 65W GaN', 'charger', '#f8fafc', 'Anker', 'accessory', 790000, 1090000, { tags: ['deal'], subCategory: 'Củ cáp' }),
  p('ac4', 'Pin sạc dự phòng Xiaomi 20000mAh 33W', 'powerbank', '#0f172a', 'Xiaomi', 'accessory', 590000, 790000, { tags: ['hot'], subCategory: 'Sạc dự phòng' }),
  p('ac5', 'DJI Osmo Pocket 3 Creator Combo', 'camera', '#334155', 'DJI', 'accessory', 11281000, 17990000, { installment0: true, rating: 4.9, tags: ['deal', 'new'], subCategory: 'Camera' }),
  p('ac6', 'Camera an ninh Imou Ranger 2C 4MP', 'camera', '#f1f5f9', 'Imou', 'accessory', 490000, 690000, { tags: ['new'], subCategory: 'Camera' }),
  p('ac7', 'Đế sạc không dây Aukey MagFusion 25W', 'charger', '#64748b', 'Aukey', 'accessory', 550000, 990000, { tags: ['deal'], subCategory: 'Củ cáp' }),
  p('ac8', 'Bàn phím Mchose Ace68 Magnetic HE', 'keyboard', '#60a5fa', 'Mchose', 'accessory', 1490000, 1890000, { tags: ['hot', 'new'], subCategory: 'Chuột, bàn phím' }),
  p('ac9', 'Pin sạc dự phòng Anker MagGo 10000mAh', 'powerbank', '#38bdf8', 'Anker', 'accessory', 1190000, 1590000, { tags: ['new'], subCategory: 'Sạc dự phòng' }),
];

/** Full catalogue: hand-written products first (higher popularity), then the generated ones. */
export const products: Product[] = [
  ...handwritten.map((x, i) => ({ ...x, attrs: inferAttrs(x), popularity: 100 - (i % 20), isNew: x.tags?.includes('new') })),
  ...generatedProducts,
];

export const flashSaleProducts: Product[] = [
  { ...products.find((x) => x.id === 'lt4')!, id: 'fs1', price: 20990000, sold: 7, stock: 10 },
  { ...products.find((x) => x.id === 'lt3')!, id: 'fs2', price: 29990000, sold: 4, stock: 10 },
  { ...products.find((x) => x.id === 'tb6')!, id: 'fs3', price: 10490000, sold: 21, stock: 30 },
  { ...products.find((x) => x.id === 'ac7')!, id: 'fs4', price: 450000, sold: 38, stock: 50 },
  { ...products.find((x) => x.id === 'au2')!, id: 'fs5', price: 2990000, sold: 12, stock: 40 },
  { ...products.find((x) => x.id === 'tv4')!, id: 'fs6', price: 5490000, sold: 18, stock: 20 },
  { ...products.find((x) => x.id === 'wt4')!, id: 'fs7', price: 2490000, sold: 9, stock: 25 },
];

export function byCategory(...ids: string[]): Product[] {
  return products.filter((x) => ids.includes(x.categoryId));
}

export function getProductById(id: string): Product | undefined {
  return products.find((x) => x.id === id);
}

/** Flash-sale copies share the slug of their base product, so this always returns the base product. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((x) => x.slug === slug);
}

/** Same category, closest price first. */
export function getRelated(product: Product, limit = 10): Product[] {
  return products
    .filter((x) => x.categoryId === product.categoryId && x.id !== product.id)
    .sort((a, b) => Math.abs(a.price - product.price) - Math.abs(b.price - product.price))
    .slice(0, limit);
}

/** "Hàng cũ" suggestions derived from similar products (≈10% cheaper, activated units). */
export function getUsedAlternatives(product: Product, limit = 6): Product[] {
  return [product, ...getRelated(product, limit - 1)].map((p) => {
    const price = Math.round((p.price * 0.9) / 10000) * 10000;
    return {
      ...p,
      id: `used-${p.id}`,
      name: `${p.name} - Đã kích hoạt`,
      originalPrice: p.price,
      price,
      promoText: `Tiết kiệm ${formatPrice(p.price - price)} so với máy mới`,
      tags: [],
    };
  });
}
