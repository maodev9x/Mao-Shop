---
paths:
  - "src/main.tsx"
  - "src/App.tsx"
  - "src/pages/**"
  - "src/components/**/*.tsx"
---

# Routing

Dùng **react-router-dom v6** (`BrowserRouter` bọc app trong `src/main.tsx`, `<Routes>` trong `src/App.tsx`).

## Bảng route

| Route | Trang | File |
|---|---|---|
| `/` | Trang chủ | `src/pages/HomePage.tsx` |
| `/danh-muc/:slug` | Danh mục (dùng chung cho 9 danh mục, bộ lọc nằm trên query string) | `src/pages/CategoryPage.tsx` |
| `/san-pham/:slug` | Chi tiết sản phẩm | `src/pages/ProductDetailPage.tsx` |
| `*` | Không tìm thấy | `src/pages/NotFoundPage.tsx` |

- `App.tsx` chỉ chứa khung dùng chung (TopBar, Header, MobileMenu, Footer, FloatingButtons, CartDrawer) và `<Routes>`. Nội dung từng trang nằm trong `src/pages/`.
- Slug sản phẩm lấy từ `product.slug` (tiếng Việt không dấu, gạch nối). Tìm sản phẩm bằng `getProductBySlug()` trong `src/data/products.ts`. Slug không tồn tại thì hiện `NotFoundPage`.
- Sản phẩm Flash Sale (`id` dạng `fs*`) dùng chung slug với sản phẩm gốc, nên mở ra trang của sản phẩm gốc.

## Link

- Link nội bộ dùng `<Link to>` hoặc `useNavigate()`. **Không** dùng `href="#slug"` cho sản phẩm.
- Đường dẫn sản phẩm luôn tạo bằng `productPath(product)`, đường dẫn danh mục bằng `categoryPath(config, params?)` (ví dụ `categoryPath(laptop, { hang: 'asus' })`). Cả hai nằm trong `src/lib/format.ts`. Không ghép chuỗi tay.
- Link tới danh mục **không** dùng anchor trang chủ (`/#phone`) nữa. Menu danh mục, nút "Xem tất cả" và breadcrumb đều dẫn tới `/danh-muc/...`.
- Anchor trong trang (`#thong-so`, `#danh-gia`, `#hoi-dap`) và các link giả (`#promo`, `#policy`...) giữ dạng `href="#..."`.
- Đổi route thì cuộn về đầu trang (`ScrollToTop` trong `App.tsx`).

## Deploy

Đây là SPA, nên host phải chuyển mọi route về `index.html` (Vercel: rewrite trong `vercel.json`; Netlify: `_redirects`; Cloudflare Workers: `not_found_handling: "single-page-application"`). `vite preview` đã tự làm việc này.
