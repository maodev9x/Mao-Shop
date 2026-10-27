export type DeviceKind =
  | 'phone'
  | 'foldable'
  | 'tablet'
  | 'laptop'
  | 'tv'
  | 'watch'
  | 'earbuds'
  | 'headphones'
  | 'speaker'
  | 'keyboard'
  | 'mouse'
  | 'charger'
  | 'powerbank'
  | 'camera'
  | 'fridge'
  | 'washer'
  | 'airpurifier'
  | 'monitor';

export type ProductTag = 'deal' | 'hot' | 'new';

export type Product = {
  id: string;
  slug: string;
  name: string;
  kind: DeviceKind;
  /** Main colour of the device illustration */
  color: string;
  price: number;
  originalPrice?: number;
  installment0?: boolean;
  memberDiscount?: number;
  studentDiscount?: number;
  promoText?: string;
  rating?: number;
  fastDelivery?: boolean;
  preorder?: boolean;
  specs?: string[];
  categoryId: string;
  subCategory?: string;
  brand: string;
  tags?: ProductTag[];
  /** Filterable attributes; keys match `FacetConfig.key` (and the URL parameter) */
  attrs?: Record<string, string | string[]>;
  /** Defaults to true */
  inStock?: boolean;
  isNew?: boolean;
  /** 0–100, drives the "Phổ biến" sort and the featured block */
  popularity?: number;
  /** Flash sale stock */
  sold?: number;
  stock?: number;
};

// ---------- Category page ----------

export type FacetConfig = {
  /** Attribute key in `product.attrs` and URL parameter name (`hang` for brand) */
  key: string;
  label: string;
  type: 'brand' | 'attr';
};

export type CategoryNeed = { label: string; kind: DeviceKind; color: string };

export type Voucher = { id: string; title: string; detail: string; discount: string; expires: string };

export type CategoryConfig = {
  /** Same as `product.categoryId` */
  id: string;
  slug: string;
  /** Short label for tabs / breadcrumb */
  name: string;
  /** Page heading, e.g. "Máy tính laptop" */
  title: string;
  /** Categories sharing a group are shown together in the tab bar */
  group: string;
  facets: FacetConfig[];
  /** "Chọn theo nhu cầu" tiles; labels are values of `attrs.nhucau` */
  needs: CategoryNeed[];
  pricePresets: [number, number][];
  banners: { title: string; subtitle: string; from: string; to: string; kind: DeviceKind; color: string }[];
  vouchers: Voucher[];
  seo: { featured: string[]; intro: string; toc: { title: string; children?: string[] }[]; paragraphs: string[] };
  faq: { q: string; a: string }[];
};

export type CartOptions = { variant?: string; color?: string };

export type CartItem = {
  /** productId|variant|color — same product with different options is a separate line */
  lineId: string;
  product: Product;
  options?: CartOptions;
  /** Price for the chosen options at the time it was added */
  unitPrice: number;
  quantity: number;
};

// ---------- Product detail ----------

export type ProductVariant = { label: string; price: number; originalPrice?: number };

export type ProductColor = { name: string; color: string; priceDelta?: number };

export type SpecRow = { label: string; value: string };

export type GalleryItem = { id: string; kind: DeviceKind; color: string; label: string };

export type ProductDetail = {
  gallery: GalleryItem[];
  variants: ProductVariant[];
  colors: ProductColor[];
  specs: SpecRow[];
  /** Bullet points of the "Tính năng nổi bật" card */
  highlights: string[];
  /** Feature tiles of the dark marketing block */
  features: { title: string; value: string }[];
  description: string[];
  /** Products shown in the "Which one fits you?" comparison */
  compareIds: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  content: string;
  createdAt: number;
  verified?: boolean;
  hasImage?: boolean;
  tags?: string[];
};

export type Reply = {
  id: string;
  author: string;
  isAdmin?: boolean;
  content: string;
  createdAt: number;
};

export type Question = {
  id: string;
  author: string;
  content: string;
  createdAt: number;
  replies: Reply[];
};
