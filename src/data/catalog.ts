import type { DeviceKind, Product } from '../types';
import { slugify } from '../lib/format';
import { seeded } from '../lib/random';

/**
 * Generated catalogue so category pages have enough products for filters, sorting and "Xem thêm".
 * Everything is derived from a seeded PRNG, so the catalogue is identical on every load.
 * Attribute keys must match the facet keys in `categories.ts`.
 */

type Attrs = Record<string, string | string[]>;
type Rand = () => number;

function pick<T>(rand: Rand, list: readonly T[]): T {
  return list[Math.floor(rand() * list.length)];
}
const pickIndex = (rand: Rand, length: number) => Math.floor(rand() * length);
function pickSome<T>(rand: Rand, list: readonly T[], min: number, max: number): T[] {
  const n = min + Math.floor(rand() * (max - min + 1));
  return [...list].sort(() => rand() - 0.5).slice(0, n);
}
const code = (rand: Rand, letters = 2) =>
  Array.from({ length: letters }, () => String.fromCharCode(65 + Math.floor(rand() * 26))).join('') + (100 + Math.floor(rand() * 900));

const PALETTE = ['#1f2937', '#475569', '#94a3b8', '#e5e7eb', '#1e3a8a', '#0f766e', '#7c3aed', '#be123c', '#f97316', '#0ea5e9', '#a16207', '#22c55e'];

type Draft = {
  name: string;
  brand: string;
  kind: DeviceKind;
  price: number;
  attrs: Attrs;
  specs?: string[];
  subCategory?: string;
};

type Spec = { categoryId: string; count: number; make: (rand: Rand) => Draft };

// ---------- per-category generators ----------

const laptopBrands: { brand: string; series: string[]; base: number }[] = [
  { brand: 'ASUS', series: ['Vivobook 14', 'Vivobook 16', 'Zenbook 14 OLED', 'TUF Gaming F15', 'ROG Strix G16'], base: 14_000_000 },
  { brand: 'Lenovo', series: ['IdeaPad Slim 3', 'IdeaPad Slim 5', 'ThinkPad E14', 'LOQ 15', 'Legion 5'], base: 13_500_000 },
  { brand: 'Dell', series: ['Inspiron 15', 'Vostro 14', 'XPS 13', 'G15 Gaming'], base: 15_000_000 },
  { brand: 'HP', series: ['Pavilion 14', 'Victus 15', 'Envy x360 14', 'ProBook 440'], base: 14_500_000 },
  { brand: 'Acer', series: ['Aspire 7', 'Swift Go 14', 'Nitro V 15'], base: 13_000_000 },
  { brand: 'MSI', series: ['Modern 14', 'Cyborg 15', 'Katana 15'], base: 14_000_000 },
  { brand: 'Apple', series: ['Air 13 inch', 'Air 15 inch', 'Pro 14 inch'], base: 25_000_000 },
];
const GAMING = /TUF|ROG|LOQ|Legion|G15|Victus|Nitro|Cyborg|Katana/;

const laptop: Spec = {
  categoryId: 'laptop',
  count: 28,
  make: (rand) => {
    const b = pick(rand, laptopBrands);
    const series = pick(rand, b.series);
    const gaming = GAMING.test(series);
    const apple = b.brand === 'Apple';
    const cpu = apple ? pick(rand, ['Apple M4', 'Apple M5']) : pick(rand, ['Intel Core i5', 'Intel Core i7', 'Intel Core Ultra 7', 'AMD Ryzen 5', 'AMD Ryzen 7']);
    const ram = apple ? pick(rand, ['16GB', '24GB']) : pick(rand, gaming ? ['16GB', '32GB'] : ['8GB', '16GB', '16GB', '32GB']);
    const ocung = pick(rand, ['256GB', '512GB', '512GB', '1TB']);
    const gpu = gaming ? pick(rand, ['RTX 4050', 'RTX 4060', 'RTX 5060']) : 'Card tích hợp';
    const small = /13|14/.test(series) || (!gaming && rand() < 0.4);
    const oled = /OLED/.test(series) || rand() < 0.15;
    const need = gaming ? ['Gaming'] : pickSome(rand, ['Văn phòng', 'Mỏng nhẹ', 'Đồ họa', 'Sinh viên'], 1, 2);
    const price =
      b.base +
      ['8GB', '16GB', '24GB', '32GB'].indexOf(ram) * 1_500_000 +
      ['256GB', '512GB', '1TB'].indexOf(ocung) * 1_200_000 +
      (gaming ? 6_000_000 + ['RTX 4050', 'RTX 4060', 'RTX 5060'].indexOf(gpu) * 3_000_000 : 0) +
      (/i7|Ryzen 7|Ultra|M5/.test(cpu) ? 3_500_000 : 0) +
      (/XPS|Zenbook|Envy|Pro 14/.test(series) ? 6_000_000 : 0);
    const shortCpu = cpu.replace('Intel Core ', '').replace('AMD ', '');
    return {
      name: apple ? `MacBook ${series} ${cpu.replace('Apple ', '')} ${ram} ${ocung}` : `Laptop ${b.brand} ${series} ${code(rand)}`,
      brand: b.brand,
      kind: 'laptop',
      price,
      specs: [shortCpu, gaming ? gpu : ram, ocung],
      subCategory: need[0],
      attrs: {
        nhucau: need,
        cpu,
        ram,
        ocung,
        gpu,
        manhinh: small ? '13 - 14 inch' : '15 - 16 inch',
        dophangiai: oled ? '2.8K OLED' : pick(rand, ['Full HD', 'Full HD', '2K']),
        tinhnang: [...(gaming ? ['Màn hình 144Hz', 'Bàn phím LED'] : []), ...pickSome(rand, ['Cảm ứng', 'Vân tay', 'Webcam Full HD'], 0, 2)],
        ai: /Ultra|M4|M5|Ryzen 7/.test(cpu) ? 'Có NPU AI' : 'Không có',
      },
    };
  },
};

const phoneBrands: { brand: string; series: string[]; base: number }[] = [
  { brand: 'Apple', series: ['iPhone 16', 'iPhone 16 Plus', 'iPhone 15', 'iPhone 16e'], base: 16_000_000 },
  { brand: 'Samsung', series: ['Galaxy A36 5G', 'Galaxy A56 5G', 'Galaxy S25', 'Galaxy S25 FE', 'Galaxy M55'], base: 7_000_000 },
  { brand: 'Xiaomi', series: ['Redmi 15C', 'Redmi Note 15', 'Xiaomi 15T', 'POCO X7 Pro'], base: 4_000_000 },
  { brand: 'OPPO', series: ['A6 Pro', 'Reno14 5G', 'Find X9'], base: 6_000_000 },
  { brand: 'vivo', series: ['Y39', 'V50', 'X200 FE'], base: 5_500_000 },
  { brand: 'realme', series: ['C75', '14 Pro+'], base: 4_500_000 },
  { brand: 'HONOR', series: ['X9c', '400 Pro'], base: 6_500_000 },
  { brand: 'TECNO', series: ['Spark 40', 'Camon 40 Pro'], base: 3_000_000 },
];

const phone: Spec = {
  categoryId: 'phone',
  count: 26,
  make: (rand) => {
    const b = pick(rand, phoneBrands);
    const series = pick(rand, b.series);
    const apple = b.brand === 'Apple';
    const ramIdx = apple ? 2 : pickIndex(rand, 5);
    const ram = ['4GB', '6GB', '8GB', '12GB', '16GB'][ramIdx];
    const storeIdx = pickIndex(rand, 3);
    const bonho = ['128GB', '256GB', '512GB'][storeIdx];
    const need = pickSome(rand, ['Chụp ảnh đẹp', 'Điện thoại 5G', 'Điện thoại chơi game', 'Điện thoại pin trâu'], 1, 2);
    const big = /Plus|Ultra|Pro\+|Note|M55|X9c/.test(series);
    return {
      name: apple ? `${series} ${bonho}` : `${b.brand} ${series} ${ram} ${bonho}`,
      brand: b.brand,
      kind: 'phone',
      price: Math.round(b.base * (1 + storeIdx * 0.14 + ramIdx * 0.06 + (/S25|Find|X200|400|15T|Reno/.test(series) ? 1.2 : 0))),
      subCategory: need[0],
      attrs: {
        nhucau: need,
        ram,
        bonho,
        manhinh: big ? 'Trên 6.8 inch' : pick(rand, ['Dưới 6.5 inch', '6.5 - 6.8 inch', '6.5 - 6.8 inch']),
        tinhnang: pickSome(rand, ['Sạc nhanh', 'Chống nước', 'Hỗ trợ eSIM', 'NFC'], 1, 3),
      },
    };
  },
};

const tabletBrands = [
  { brand: 'Apple', series: ['iPad 11', 'iPad Air M3 11 inch', 'iPad mini 7', 'iPad Pro M5 13 inch'], base: 9_000_000 },
  { brand: 'Samsung', series: ['Galaxy Tab A9+', 'Galaxy Tab S10 FE', 'Galaxy Tab S10+'], base: 5_000_000 },
  { brand: 'Xiaomi', series: ['Redmi Pad 2', 'Xiaomi Pad 7 Pro'], base: 4_500_000 },
  { brand: 'Lenovo', series: ['Tab M11', 'Idea Tab Pro'], base: 4_000_000 },
  { brand: 'Huawei', series: ['MatePad 11.5', 'MatePad Pro 12.2'], base: 6_000_000 },
];

const tablet: Spec = {
  categoryId: 'tablet',
  count: 24,
  make: (rand) => {
    const b = pick(rand, tabletBrands);
    const series = pick(rand, b.series);
    const storeIdx = pickIndex(rand, 4);
    const bonho = ['64GB', '128GB', '256GB', '512GB'][storeIdx];
    const ketnoi = rand() < 0.65 ? 'WiFi' : 'WiFi + 5G';
    const manhinh = /mini/.test(series) ? '8 - 10 inch' : /13|12/.test(series) ? '12 - 13 inch' : '11 inch';
    return {
      name: `${series} ${ketnoi === 'WiFi' ? 'WiFi' : '5G'} ${bonho}`,
      brand: b.brand,
      kind: 'tablet',
      price: Math.round(b.base * (1 + storeIdx * 0.18 + (ketnoi === 'WiFi' ? 0 : 0.2) + (/Pro|S10\+|Air/.test(series) ? 1 : 0))),
      attrs: {
        nhucau: pickSome(rand, ['Học tập', 'Giải trí', 'Đồ họa', 'Làm việc'], 1, 2),
        ram: pick(rand, ['4GB', '6GB', '8GB', '12GB']),
        bonho,
        manhinh,
        ketnoi,
      },
    };
  },
};

const monitorBrands = [
  { brand: 'Samsung', series: ['Odyssey G3', 'Odyssey G5', 'ViewFinity S6'] },
  { brand: 'LG', series: ['UltraGear 24GS', 'UltraGear 27GS', 'UltraFine 27'] },
  { brand: 'Dell', series: ['S2725H', 'P2425H', 'Alienware AW2725'] },
  { brand: 'ASUS', series: ['TUF VG27', 'ProArt PA24', 'ROG Strix XG27'] },
  { brand: 'MSI', series: ['MAG 274', 'PRO MP243'] },
  { brand: 'ViewSonic', series: ['VX2479', 'VA2432'] },
  { brand: 'AOC', series: ['24G4', 'Q27G4'] },
];

const monitor: Spec = {
  categoryId: 'monitor',
  count: 24,
  make: (rand) => {
    const b = pick(rand, monitorBrands);
    const series = pick(rand, b.series);
    const gaming = /Odyssey|UltraGear|Alienware|TUF|ROG|MAG|G4/.test(series);
    const pro = /ProArt|UltraFine|ViewFinity/.test(series);
    const size = pick(rand, ['24 inch', '27 inch', '27 inch', '32 inch']);
    const res = pro ? pick(rand, ['2K', '4K']) : pick(rand, ['Full HD', 'Full HD', '2K']);
    const hz = gaming ? pick(rand, ['144Hz', '180Hz', '240Hz']) : pick(rand, ['75Hz', '100Hz']);
    return {
      name: `Màn hình ${b.brand} ${series} ${size} ${res} ${hz}`,
      brand: b.brand,
      kind: 'monitor',
      price:
        2_200_000 +
        ['24 inch', '27 inch', '32 inch'].indexOf(size) * 1_300_000 +
        ['Full HD', '2K', '4K'].indexOf(res) * 2_000_000 +
        ['75Hz', '100Hz', '144Hz', '180Hz', '240Hz'].indexOf(hz) * 700_000 +
        (/Alienware|ROG/.test(series) ? 6_000_000 : 0),
      attrs: {
        nhucau: gaming ? ['Gaming'] : pro ? ['Đồ họa'] : ['Văn phòng'],
        kichthuoc: size,
        dophangiai: res,
        tanso: hz,
        tamnen: /Alienware/.test(series) ? 'OLED' : pick(rand, ['IPS', 'IPS', 'VA']),
      },
    };
  },
};

const watchBrands = [
  { brand: 'Apple', series: ['Watch Series 11', 'Watch SE 3', 'Watch Ultra 3'], base: 6_500_000 },
  { brand: 'Samsung', series: ['Galaxy Watch8', 'Galaxy Watch8 Classic', 'Galaxy Fit3'], base: 3_500_000 },
  { brand: 'Xiaomi', series: ['Watch S4', 'Redmi Watch 5', 'Smart Band 9 Pro'], base: 1_200_000 },
  { brand: 'Huawei', series: ['Watch GT 5', 'Watch Fit 4'], base: 2_800_000 },
  { brand: 'Garmin', series: ['Forerunner 165', 'Venu 3', 'Instinct 2X'], base: 6_000_000 },
  { brand: 'Amazfit', series: ['Balance', 'GTR 4', 'Active 2'], base: 2_000_000 },
];

const watch: Spec = {
  categoryId: 'watch',
  count: 24,
  make: (rand) => {
    const b = pick(rand, watchBrands);
    const series = pick(rand, b.series);
    const bucket = /Ultra|Instinct/.test(series) ? 2 : pickIndex(rand, 2);
    const mm = [['40mm', '41mm', '42mm'], ['44mm', '45mm', '46mm'], ['47mm', '49mm']][bucket];
    const size = pick(rand, mm);
    const sporty = /Garmin|Amazfit/.test(b.brand) || /Ultra|Fit/.test(series);
    return {
      name: `${b.brand === 'Apple' ? 'Apple' : b.brand} ${series} ${size}`,
      brand: b.brand,
      kind: 'watch',
      price: Math.round(b.base * (1 + bucket * 0.12 + (/Ultra|Classic|Venu|Instinct/.test(series) ? 0.9 : 0))),
      attrs: {
        nhucau: sporty ? ['Thể thao', ...(rand() < 0.5 ? ['Sức khỏe'] : [])] : pickSome(rand, ['Sức khỏe', 'Thời trang'], 1, 2),
        kichthuoc: ['40 - 42mm', '44 - 46mm', '47 - 49mm'][bucket],
        tinhnang: pickSome(rand, ['GPS', 'ECG', 'eSIM', 'Chống nước 5ATM', 'Nghe gọi'], 1, 3),
        pin: b.brand === 'Apple' ? 'Dưới 2 ngày' : b.brand === 'Garmin' ? 'Trên 7 ngày' : pick(rand, ['2 - 7 ngày', 'Trên 7 ngày']),
      },
    };
  },
};

type AudioSeries = { name: string; type: 'buds' | 'over' | 'speaker' };
const audioBrands: { brand: string; series: AudioSeries[]; base: number }[] = [
  { brand: 'Apple', series: [{ name: 'Tai nghe AirPods 4', type: 'buds' }, { name: 'Tai nghe AirPods Max', type: 'over' }], base: 3_500_000 },
  {
    brand: 'Sony',
    series: [
      { name: 'Tai nghe WF-1000XM5', type: 'buds' },
      { name: 'Tai nghe WH-1000XM5', type: 'over' },
      { name: 'Loa ULT Field 1', type: 'speaker' },
      { name: 'Loa SRS-XB100', type: 'speaker' },
    ],
    base: 1_500_000,
  },
  {
    brand: 'JBL',
    series: [
      { name: 'Tai nghe Tune 520BT', type: 'over' },
      { name: 'Tai nghe Live Beam 3', type: 'buds' },
      { name: 'Loa Flip 6', type: 'speaker' },
      { name: 'Loa Charge 5', type: 'speaker' },
      { name: 'Loa Go 4', type: 'speaker' },
    ],
    base: 900_000,
  },
  { brand: 'Samsung', series: [{ name: 'Tai nghe Galaxy Buds3', type: 'buds' }, { name: 'Tai nghe Galaxy Buds FE', type: 'buds' }], base: 1_500_000 },
  { brand: 'Marshall', series: [{ name: 'Tai nghe Minor IV', type: 'buds' }, { name: 'Loa Willen II', type: 'speaker' }], base: 2_500_000 },
  { brand: 'Soundpeats', series: [{ name: 'Tai nghe Air4 Pro', type: 'buds' }, { name: 'Tai nghe Capsule3 Pro', type: 'buds' }], base: 600_000 },
  { brand: 'Xiaomi', series: [{ name: 'Tai nghe Redmi Buds 6', type: 'buds' }, { name: 'Loa Bluetooth Sound Pocket', type: 'speaker' }], base: 500_000 },
];

const audio: Spec = {
  categoryId: 'audio',
  count: 26,
  make: (rand) => {
    const b = pick(rand, audioBrands);
    const s = pick(rand, b.series);
    const loai = { buds: 'Tai nghe không dây', over: 'Tai nghe chụp tai', speaker: 'Loa Bluetooth' }[s.type];
    const kind: DeviceKind = { buds: 'earbuds', over: 'headphones', speaker: 'speaker' }[s.type] as DeviceKind;
    const colorName = pick(rand, ['Đen', 'Trắng', 'Xanh', 'Hồng', 'Be']);
    return {
      name: `${s.name.replace(/^(Tai nghe|Loa) /, `$1 ${b.brand} `)} ${colorName}`,
      brand: b.brand,
      kind,
      price: Math.round(b.base * (s.type === 'over' ? 2.4 : 1) * (0.9 + rand() * 0.6)),
      attrs: {
        nhucau: pickSome(rand, ['Nghe nhạc', 'Chơi game', 'Thể thao', 'Làm việc'], 1, 2),
        loai,
        tinhnang: pickSome(rand, s.type === 'speaker' ? ['Chống nước', 'Kết nối đa điểm', 'Sạc nhanh'] : ['Chống ồn ANC', 'Chống nước', 'Sạc không dây', 'Kết nối đa điểm'], 1, 2),
      },
    };
  },
};

const tvBrands: { brand: string; series: { name: string; type: string }[]; os: string; prefix: string }[] = [
  {
    brand: 'Samsung',
    series: [{ name: 'Crystal UHD DU7000', type: 'LED' }, { name: 'QLED Q60D', type: 'QLED' }, { name: 'Neo QLED QN90D', type: 'Mini LED' }, { name: 'OLED S90D', type: 'OLED' }],
    os: 'Tizen',
    prefix: 'Smart Tivi',
  },
  {
    brand: 'LG',
    series: [{ name: 'UHD UT8050', type: 'LED' }, { name: 'NanoCell NANO81', type: 'NanoCell' }, { name: 'OLED evo C4', type: 'OLED' }, { name: 'QNED 80', type: 'Mini LED' }],
    os: 'webOS',
    prefix: 'Smart Tivi',
  },
  { brand: 'Sony', series: [{ name: 'Bravia 2 II', type: 'LED' }, { name: 'Bravia 7', type: 'Mini LED' }, { name: 'Bravia 8', type: 'OLED' }], os: 'Google TV', prefix: 'Google Tivi' },
  { brand: 'TCL', series: [{ name: 'P755', type: 'LED' }, { name: 'C755 QLED', type: 'QLED' }, { name: 'C855 Mini LED', type: 'Mini LED' }], os: 'Google TV', prefix: 'Google Tivi' },
  { brand: 'Xiaomi', series: [{ name: 'TV A 2025', type: 'LED' }, { name: 'TV A Pro', type: 'QLED' }, { name: 'TV S Pro Mini LED', type: 'Mini LED' }], os: 'Google TV', prefix: 'Google Tivi' },
  { brand: 'Casper', series: [{ name: 'Google TV UG6100', type: 'LED' }], os: 'Google TV', prefix: 'Google Tivi' },
  { brand: 'Toshiba', series: [{ name: 'C350NP', type: 'LED' }, { name: 'Z670 QLED', type: 'QLED' }], os: 'VIDAA', prefix: 'Smart Tivi' },
];
const tvTypePremium: Record<string, number> = { LED: 0, QLED: 0.35, NanoCell: 0.3, 'Mini LED': 0.8, OLED: 1.4 };

const tv: Spec = {
  categoryId: 'tv',
  count: 26,
  make: (rand) => {
    const b = pick(rand, tvBrands);
    const s = pick(rand, b.series);
    const sizeIdx = pickIndex(rand, 5);
    const size = ['43 inch', '50 inch', '55 inch', '65 inch', '75 inch'][sizeIdx];
    return {
      name: `${b.prefix} ${b.brand} ${s.name} 4K ${size}`,
      brand: b.brand,
      kind: 'tv',
      price: Math.round((5_500_000 + sizeIdx * 3_200_000) * (1 + tvTypePremium[s.type]) * (/Sony|LG|Samsung/.test(b.brand) ? 1.2 : 1)),
      subCategory: size,
      attrs: {
        nhucau: [...(sizeIdx >= 3 ? ['Phòng khách lớn'] : sizeIdx <= 1 ? ['Phòng ngủ'] : []), ...pickSome(rand, ['Xem phim', 'Chơi game'], 1, 1)],
        kichthuoc: size,
        dophangiai: '4K',
        loai: s.type,
        hedieuhanh: b.os,
      },
    };
  },
};

const applianceTypes: { label: string; kind: DeviceKind; items: { brand: string; model: string; price: number }[] }[] = [
  {
    label: 'Tủ lạnh',
    kind: 'fridge',
    items: [
      { brand: 'Samsung', model: 'Inverter 236 lít RT22M4032BY', price: 6_190_000 },
      { brand: 'Samsung', model: 'Bespoke Inverter 599 lít', price: 24_990_000 },
      { brand: 'LG', model: 'Inverter 335 lít GN-D332BL', price: 9_490_000 },
      { brand: 'LG', model: 'Side by Side Inverter 635 lít', price: 18_990_000 },
      { brand: 'Panasonic', model: 'Inverter 290 lít NR-BV320', price: 9_990_000 },
      { brand: 'Toshiba', model: 'Inverter 253 lít GR-RT325', price: 6_990_000 },
      { brand: 'Aqua', model: 'Inverter 189 lít AQR-T219', price: 4_790_000 },
      { brand: 'Hitachi', model: 'Inverter 349 lít R-FVY480', price: 12_490_000 },
    ],
  },
  {
    label: 'Máy giặt',
    kind: 'washer',
    items: [
      { brand: 'Samsung', model: 'AI Inverter 10kg WW10T', price: 8_490_000 },
      { brand: 'Samsung', model: 'Bespoke AI 12kg', price: 15_990_000 },
      { brand: 'LG', model: 'AI DD Inverter 9kg FV1409', price: 8_990_000 },
      { brand: 'Electrolux', model: 'UltimateCare Inverter 10kg', price: 9_990_000 },
      { brand: 'Toshiba', model: 'Inverter 8.5kg TW-BK95', price: 6_290_000 },
      { brand: 'Panasonic', model: 'Inverter 9.5kg NA-V95', price: 9_290_000 },
    ],
  },
  {
    label: 'Máy lọc không khí',
    kind: 'airpurifier',
    items: [
      { brand: 'Xiaomi', model: 'Smart Air Purifier 4 Lite', price: 2_290_000 },
      { brand: 'Xiaomi', model: 'Smart Air Purifier 4 Pro', price: 4_490_000 },
      { brand: 'Sharp', model: 'KC-G40EV-W', price: 4_990_000 },
      { brand: 'Coway', model: 'Storm AP-1019C', price: 3_990_000 },
      { brand: 'Philips', model: 'AC0820/20', price: 2_690_000 },
      { brand: 'Panasonic', model: 'F-PXV55A', price: 6_490_000 },
    ],
  },
];

let applianceCursor = 0;
const appliance: Spec = {
  categoryId: 'appliance',
  count: 20,
  make: (rand) => {
    const all = applianceTypes.flatMap((t) => t.items.map((it) => ({ ...it, type: t })));
    const it = all[applianceCursor++ % all.length];
    return {
      name: `${it.type.label} ${it.brand} ${it.model}`,
      brand: it.brand,
      kind: it.type.kind,
      price: it.price,
      subCategory: it.type.label,
      attrs: {
        nhucau: [it.type.label],
        tinhnang: [...(/Inverter/.test(it.model) ? ['Inverter tiết kiệm điện'] : []), ...pickSome(rand, ['Kết nối WiFi', 'Khử khuẩn', 'Điều khiển qua app'], 0, 2)],
      },
    };
  },
};

const accessoryTypes: { label: string; kind: DeviceKind; items: { brand: string; model: string; price: number; features: string[] }[] }[] = [
  {
    label: 'Củ cáp',
    kind: 'charger',
    items: [
      { brand: 'Anker', model: 'Củ sạc Nano 30W', price: 390_000, features: ['Sạc nhanh'] },
      { brand: 'Anker', model: 'Củ sạc 735 GaN 65W', price: 1_090_000, features: ['Sạc nhanh'] },
      { brand: 'Ugreen', model: 'Củ sạc Nexode 45W', price: 490_000, features: ['Sạc nhanh'] },
      { brand: 'Ugreen', model: 'Củ sạc Nexode 100W 4 cổng', price: 1_290_000, features: ['Sạc nhanh'] },
      { brand: 'Baseus', model: 'Củ sạc GaN5 Pro 65W', price: 690_000, features: ['Sạc nhanh'] },
      { brand: 'Apple', model: 'Củ sạc USB-C 20W', price: 490_000, features: ['Sạc nhanh'] },
      { brand: 'Belkin', model: 'Đế sạc không dây BoostCharge 15W', price: 890_000, features: ['Không dây'] },
    ],
  },
  {
    label: 'Chuột, bàn phím',
    kind: 'mouse',
    items: [
      { brand: 'Logitech', model: 'Chuột MX Master 3S', price: 2_390_000, features: ['Không dây', 'Kết nối Bluetooth'] },
      { brand: 'Logitech', model: 'Chuột Gaming G304', price: 690_000, features: ['Không dây'] },
      { brand: 'Logitech', model: 'Bàn phím K380', price: 790_000, features: ['Kết nối Bluetooth'] },
      { brand: 'Razer', model: 'Chuột DeathAdder V3', price: 1_490_000, features: ['RGB'] },
      { brand: 'Akko', model: 'Bàn phím cơ 3068B Plus', price: 1_590_000, features: ['Không dây', 'RGB'] },
      { brand: 'DareU', model: 'Bàn phím cơ EK87', price: 490_000, features: ['RGB'] },
    ],
  },
  {
    label: 'Sạc dự phòng',
    kind: 'powerbank',
    items: [
      { brand: 'Anker', model: 'Pin sạc dự phòng PowerCore 10000mAh', price: 590_000, features: ['Sạc nhanh'] },
      { brand: 'Xiaomi', model: 'Pin sạc dự phòng Redmi 20000mAh 18W', price: 450_000, features: ['Sạc nhanh'] },
      { brand: 'Baseus', model: 'Pin sạc dự phòng Blade 20000mAh 100W', price: 1_390_000, features: ['Sạc nhanh'] },
      { brand: 'Ugreen', model: 'Pin sạc dự phòng 25000mAh 145W', price: 1_690_000, features: ['Sạc nhanh'] },
    ],
  },
  {
    label: 'Camera',
    kind: 'camera',
    items: [
      { brand: 'Imou', model: 'Camera an ninh Cruiser SE 4MP', price: 990_000, features: ['Chống nước', 'Không dây'] },
      { brand: 'Ezviz', model: 'Camera an ninh C6N 2MP', price: 550_000, features: ['Không dây'] },
      { brand: 'Xiaomi', model: 'Camera an ninh C500 Pro', price: 790_000, features: ['Không dây'] },
      { brand: 'TP-Link', model: 'Camera Tapo C200', price: 490_000, features: ['Không dây'] },
      { brand: 'DJI', model: 'Osmo Action 5 Pro', price: 9_490_000, features: ['Chống nước'] },
      { brand: 'GoPro', model: 'HERO13 Black', price: 10_490_000, features: ['Chống nước'] },
    ],
  },
];

let accessoryCursor = 0;
const accessory: Spec = {
  categoryId: 'accessory',
  count: 23,
  make: () => {
    const all = accessoryTypes.flatMap((t) => t.items.map((it) => ({ ...it, type: t })));
    const it = all[accessoryCursor++ % all.length];
    return {
      name: `${it.model} ${it.brand}`,
      brand: it.brand,
      kind: /Bàn phím/.test(it.model) ? 'keyboard' : it.type.kind,
      price: it.price,
      subCategory: it.type.label,
      attrs: { nhucau: [it.type.label], tinhnang: it.features },
    };
  },
};

export const catalogSpecs: Spec[] = [phone, tablet, laptop, monitor, watch, audio, tv, appliance, accessory];

const promoPool = [
  'Trả góp 0% lãi suất, tối đa 12 tháng, trả trước từ 10%',
  'Ưu đãi thanh toán giảm đến 2 triệu qua thẻ tín dụng',
  'Thu cũ đổi mới trợ giá đến 2 triệu',
  'Tặng balo / phụ kiện chính hãng khi mua online',
  undefined,
  undefined,
];

function buildCatalog(): Product[] {
  const out: Product[] = [];
  const used = new Set<string>();
  for (const spec of catalogSpecs) {
    const rand = seeded(`catalog-${spec.categoryId}`);
    for (let i = 0; i < spec.count; i++) {
      let draft = spec.make(rand);
      // retry a few times on duplicate names, then disambiguate
      for (let t = 0; t < 4 && used.has(slugify(draft.name)); t++) draft = spec.make(rand);
      let slug = slugify(draft.name);
      if (used.has(slug)) slug = `${slug}-${i + 2}`;
      used.add(slug);

      const price = Math.round(draft.price / 10_000) * 10_000 - 10_000;
      const discount = rand() < 0.75 ? 0.04 + rand() * 0.22 : 0;
      out.push({
        id: `g-${spec.categoryId}-${i}`,
        slug,
        name: draft.name,
        kind: draft.kind,
        color: pick(rand, PALETTE),
        brand: draft.brand,
        categoryId: spec.categoryId,
        subCategory: draft.subCategory,
        price,
        originalPrice: discount ? Math.round((price * (1 + discount)) / 10_000) * 10_000 : undefined,
        installment0: price >= 3_000_000 && rand() < 0.7,
        memberDiscount: Math.round((price * 0.01) / 1000) * 1000,
        studentDiscount: ['laptop', 'tablet'].includes(spec.categoryId) && rand() < 0.5 ? 500_000 : undefined,
        promoText: pick(rand, promoPool),
        rating: rand() < 0.7 ? Math.round((4.5 + rand() * 0.5) * 10) / 10 : undefined,
        fastDelivery: rand() < 0.85,
        specs: draft.specs,
        attrs: draft.attrs,
        inStock: rand() > 0.1,
        isNew: rand() < 0.15,
        popularity: Math.round(10 + rand() * 75),
      });
    }
  }
  return out;
}

export const generatedProducts: Product[] = buildCatalog();

// ---------- attributes for the hand-written products ----------

function capacities(name: string): string[] {
  return name.match(/\d+(GB|TB)/g) ?? [];
}

/** Derives filter attributes for hand-written products from their name, specs and sub-category. */
export function inferAttrs(p: Product): Attrs {
  const name = p.name;
  const sub = p.subCategory ? [p.subCategory] : [];
  switch (p.categoryId) {
    case 'phone': {
      const caps = capacities(name);
      return {
        nhucau: sub,
        ram: caps.length > 1 ? caps[0] : '8GB',
        bonho: caps[caps.length - 1] ?? '256GB',
        manhinh: /Max|Ultra|Plus|Fold/.test(name) ? 'Trên 6.8 inch' : '6.5 - 6.8 inch',
        tinhnang: ['Sạc nhanh', 'NFC', ...(p.price > 15_000_000 ? ['Chống nước', 'Hỗ trợ eSIM'] : [])],
      };
    }
    case 'tablet': {
      const caps = capacities(name);
      return {
        nhucau: [p.price > 15_000_000 ? 'Đồ họa' : 'Học tập', 'Giải trí'],
        ram: caps.length > 1 ? caps[0] : '8GB',
        bonho: caps[caps.length - 1] ?? '128GB',
        manhinh: name.match(/1[23] inch/) ? '12 - 13 inch' : '11 inch',
        ketnoi: /5G/.test(name) ? 'WiFi + 5G' : 'WiFi',
      };
    }
    case 'laptop': {
      const specs = p.specs ?? [];
      const cpuSpec = specs[0] ?? '';
      const cpu = /Apple M5/.test(cpuSpec)
        ? 'Apple M5'
        : /Apple M/.test(cpuSpec)
          ? 'Apple M4'
          : /Ultra/.test(cpuSpec)
            ? 'Intel Core Ultra 7'
            : /i7/.test(cpuSpec)
              ? 'Intel Core i7'
              : /i5/.test(cpuSpec)
                ? 'Intel Core i5'
                : /R7/.test(cpuSpec)
                  ? 'AMD Ryzen 7'
                  : 'AMD Ryzen 5';
      const gb = specs.filter((s) => /^\d+(GB|TB)$/.test(s));
      const gaming = p.subCategory === 'Gaming';
      return {
        nhucau: sub,
        cpu,
        ram: gb.find((s) => parseInt(s, 10) <= 64 && s.endsWith('GB')) ?? '16GB',
        ocung: gb.find((s) => s.endsWith('TB') || parseInt(s, 10) >= 128) ?? '512GB',
        gpu: specs.find((s) => s.startsWith('RTX')) ?? 'Card tích hợp',
        manhinh: /13|14/.test(name) ? '13 - 14 inch' : '15 - 16 inch',
        dophangiai: /OLED/.test(name) ? '2.8K OLED' : 'Full HD',
        tinhnang: gaming ? ['Màn hình 144Hz', 'Bàn phím LED'] : [],
        ai: /Ultra|M4|M5|Ryzen 7/.test(cpu) ? 'Có NPU AI' : 'Không có',
      };
    }
    case 'monitor':
      return {
        nhucau: /Odyssey|UltraGear/.test(name) ? ['Gaming'] : /ProArt|UltraSharp/.test(name) ? ['Đồ họa'] : ['Văn phòng'],
        kichthuoc: name.match(/\d+ inch/)?.[0] ?? '27 inch',
        dophangiai: /2K/.test(name) ? '2K' : /4K/.test(name) ? '4K' : 'Full HD',
        tanso: name.match(/\d+Hz/)?.[0] ?? '75Hz',
        tamnen: 'IPS',
      };
    case 'watch': {
      const mm = parseInt(name.match(/(\d+)mm/)?.[1] ?? '44', 10);
      return {
        nhucau: p.brand === 'Garmin' || /Ultra/.test(name) ? ['Thể thao'] : ['Sức khỏe'],
        kichthuoc: mm <= 42 ? '40 - 42mm' : mm <= 46 ? '44 - 46mm' : '47 - 49mm',
        tinhnang: ['GPS', 'Chống nước 5ATM'],
        pin: p.brand === 'Apple' ? 'Dưới 2 ngày' : p.brand === 'Garmin' ? 'Trên 7 ngày' : '2 - 7 ngày',
      };
    }
    case 'audio':
      return {
        nhucau: ['Nghe nhạc'],
        loai: p.kind === 'speaker' ? 'Loa Bluetooth' : p.kind === 'headphones' ? 'Tai nghe chụp tai' : 'Tai nghe không dây',
        tinhnang: /Pro|XM|Buds3/.test(name) ? ['Chống ồn ANC'] : ['Chống nước'],
      };
    case 'tv': {
      const size = parseInt(name.match(/(\d+) inch/)?.[1] ?? '55', 10);
      return {
        nhucau: [size >= 65 ? 'Phòng khách lớn' : size <= 50 ? 'Phòng ngủ' : 'Xem phim'],
        kichthuoc: `${size} inch`,
        dophangiai: '4K',
        loai: /OLED/.test(name) ? 'OLED' : /QLED/.test(name) ? 'QLED' : /NanoCell/.test(name) ? 'NanoCell' : 'LED',
        hedieuhanh: /Google/.test(name) ? 'Google TV' : p.brand === 'Samsung' ? 'Tizen' : p.brand === 'LG' ? 'webOS' : 'Google TV',
      };
    }
    case 'appliance':
      return { nhucau: sub, tinhnang: /Inverter/.test(name) ? ['Inverter tiết kiệm điện'] : ['Khử khuẩn'] };
    case 'accessory':
      return { nhucau: sub, tinhnang: p.kind === 'charger' || p.kind === 'powerbank' ? ['Sạc nhanh'] : p.kind === 'keyboard' || p.kind === 'mouse' ? ['RGB'] : ['Không dây'] };
    default:
      return {};
  }
}
