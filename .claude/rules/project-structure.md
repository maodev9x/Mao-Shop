# Cấu trúc thư mục

```
src/
  main.tsx                  # entry; BrowserRouter, MotionConfig, ShopProvider
  App.tsx                   # khung dùng chung + <Routes>
  index.css                 # Tailwind + design token (@theme) + utility no-scrollbar, container-page
  pages/                    # HomePage, CategoryPage, ProductDetailPage, NotFoundPage
  context/ShopContext.tsx   # giỏ hàng, yêu thích, toast, tỉnh/thành, trạng thái mở drawer
  hooks/                    # useFeedback / useProductFeedback, useCategoryFilters, useClickOutside
  components/
    layout/                 # TopBar, Header, SearchBox, CategoryMenu (mega menu), MobileMenu, CartDrawer, Footer, FloatingButtons, Logo
    home/                   # Hero, PromoStrip, FlashSale, DealTabs, CategorySection, AccessoryGrid, Reviews, Offers, News, SectionTitle
    detail/                 # khối chỉ dùng ở trang chi tiết (xem rule product-detail-layout)
    category/               # khối chỉ dùng ở trang danh mục (xem rule category-layout)
    shared/                 # khối dùng ở nhiều trang: QASection, Avatar, ProductNews, DescriptionContent
    product/                # DeviceImage, ProductCard, ProductCarousel, ProductGrid, AnimatedProductList, EmptyResults, SubCategoryTiles
    ui/                     # Reveal, Carousel, Tabs (UnderlineTabs, FilterChips), Countdown, Banner, Breadcrumb, Stars, Expandable, Drawer, Accordion, AnimatedNumber
  data/                     # products.ts, catalog.ts, categories.ts, site.ts, productDetails.ts, feedback.ts
  lib/                      # format.ts (formatPrice, discountPercent, productPath, categoryPath, slugify, timeAgo, cn), storage.ts, filters.ts, random.ts (seeded PRNG)
  types/index.ts            # Product, CategoryConfig, ProductDetail, CartItem, Review, Question...
```

## Tái sử dụng trước khi tạo mới (bắt buộc)

Trước khi tạo một component, hook hoặc hàm mới:

1. Tìm trong `ui/`, `product/`, `shared/`, `hooks/`, `lib/` và trong component của các trang khác.
2. Nếu đã có thứ phù hợp: dùng lại. Nếu gần phù hợp: **mở rộng bằng prop**, giữ nguyên hành vi ở các chỗ đang dùng.
3. Nếu có đoạn code tương tự đang viết inline trong một component khác: **tách ra** thành primitive dùng chung, cho chỗ cũ dùng lại. Không viết bản thứ hai.
4. Khối ban đầu chỉ thuộc một trang (`detail/`, `category/`) mà nay trang khác cũng cần thì chuyển sang `shared/`.

Primitive hiện có, kiểm tra trước khi viết mới:

| Cần | Dùng |
|---|---|
| Drawer / bottom sheet / modal (overlay, Esc, khóa cuộn, portal) | `ui/Drawer` (`side`: `left`, `right`, `bottom`, `center`; `bottomOnMobile`) |
| Dữ liệu mẫu ngẫu nhiên nhưng cố định | `lib/random` → `seeded(seed)` |
| Accordion một mục mở | `ui/Accordion` |
| Thu gọn nội dung dài | `ui/Expandable` |
| Số/giá đổi có animation | `ui/AnimatedNumber` |
| Tab gạch chân / chip lọc (đơn hoặc `multiple`) | `ui/Tabs` (`UnderlineTabs`, `FilterChips`) |
| Đóng khi bấm ra ngoài | `hooks/useClickOutside` |
| Danh sách card có animation khi lọc | `product/AnimatedProductList` (trong `ProductCarousel`, `ProductGrid`) |
| Không có kết quả | `product/EmptyResults` |
| Ô danh mục con / nhu cầu có ảnh | `product/SubCategoryTiles` |
| Đọc/ghi localStorage | `lib/storage` |

Component mới đặt theo nhóm:
- khối trang chủ vào `home/`;
- khối chỉ của trang chi tiết vào `detail/`;
- khối chỉ của trang danh mục vào `category/`;
- khối của nhiều trang vào `shared/`;
- khung trang dùng chung vào `layout/`;
- thành phần sản phẩm vào `product/`;
- primitive vào `ui/`;
- trang mới vào `pages/` và thêm route (xem rule routing).
