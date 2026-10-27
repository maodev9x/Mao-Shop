---
paths:
  - "src/data/categories.ts"
  - "src/data/catalog.ts"
  - "src/data/products.ts"
  - "src/lib/filters.ts"
  - "src/hooks/useCategoryFilters.ts"
  - "src/types/**"
---

# Dữ liệu và bộ lọc trang danh mục

## Cấu hình danh mục (`src/data/categories.ts`)

- Mỗi danh mục là một `CategoryConfig`:
  - `id`: trùng `product.categoryId`;
  - `slug`, `name`, `title`, `group` (các danh mục cùng `group` hiện chung một thanh tab);
  - `facets`, `needs`, `pricePresets`, `banners`, `vouchers`, `seo`, `faq`.
- Slug: `dien-thoai`, `may-tinh-bang`, `laptop`, `man-hinh`, `dong-ho`, `am-thanh`, `tivi`, `dien-may`, `phu-kien`.
- Tra cứu bằng `getCategoryBySlug` / `getCategoryById` / `getCategoryGroup`. Link tạo bằng `categoryPath()` trong `src/lib/format.ts`.
- Thêm danh mục mới = thêm một `CategoryConfig` và một mục trong `catalogSpecs` (`src/data/catalog.ts`). Không viết trang riêng.

## Thuộc tính lọc

- `product.attrs: Record<string, string | string[]>`. Khóa của `attrs` trùng `FacetConfig.key` và cũng là **tên tham số URL**.
- Facet `type: 'brand'` đọc `product.brand`, tham số URL là `hang`. Facet nhu cầu có khóa `nhucau`.
- Sản phẩm viết tay (`products.ts`) không khai báo `attrs` trực tiếp: `inferAttrs()` trong `catalog.ts` suy ra từ tên, `specs` và `subCategory`. Sản phẩm sinh tự động có `attrs` đầy đủ.

## Catalog sinh tự động (`src/data/catalog.ts`)

- Sinh khoảng 26 sản phẩm mỗi danh mục bằng PRNG có seed, nên kết quả luôn giống nhau giữa các lần chạy.
- `id` dạng `g-<categoryId>-<n>`. Slug luôn duy nhất.
- **Không gán `tags`**, để khối Deal ở trang chủ chỉ hiện sản phẩm viết tay. Hàng mới đánh dấu bằng `isNew`.
- Khoảng 10% sản phẩm có `inStock: false`.
- `popularity` 0–100; sản phẩm viết tay có `popularity` cao hơn.

## Tham số URL

| Tham số | Ý nghĩa | Ví dụ |
|---|---|---|
| `hang` | Hãng, nhiều giá trị cách nhau bằng dấu phẩy | `hang=asus,dell` |
| `<facet.key>` | Giá trị thuộc tính (dạng slug) | `ram=16gb`, `nhucau=gaming` |
| `gia` | Khoảng giá VND `min-max` | `gia=15000000-25000000` |
| `sapxep` | `khuyen-mai`, `gia-tang`, `gia-giam`. Bỏ trống = phổ biến | `sapxep=gia-tang` |
| `sanhang` | `1` = chỉ hàng còn | `sanhang=1` |
| `moi` | `1` = chỉ hàng mới về | `moi=1` |

- Đổi bộ lọc dùng `setSearchParams(..., { replace: true })` để không làm đầy lịch sử trình duyệt.
- Giá trị trên URL là `slugify(value)`, so khớp bằng slug.

## Logic lọc (`src/lib/filters.ts`)

- Toàn bộ là hàm thuần: `parseFilters`, `serializeFilters`, `applyFilters`, `sortProducts`, `facetOptions`.
- `facetOptions` đếm số kết quả của từng lựa chọn khi đã áp dụng **các bộ lọc khác**, không tính bộ lọc của chính facet đó. Nhờ vậy chọn thêm một hãng không làm các hãng còn lại về 0.
- React chỉ dùng qua hook `useCategoryFilters(config)`.
