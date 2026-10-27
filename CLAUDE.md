# CLAUDE.md

Website thương mại điện tử bán thiết bị điện tử (React 18 + TypeScript + Vite + Tailwind CSS v4 + framer-motion). Giao diện tiếng Việt, thiết kế tham chiếu [UI.png](UI.png), tên website là **MaoShop**.

## Quy tắc bắt buộc

- **Không tự ý xóa bất kỳ file hoặc thư mục nào nằm ngoài thư mục dự án này** (`D:\Claude Code\Clone Website 2`). Quy tắc này áp dụng cho mọi cách xóa: `rm`, `Remove-Item`, `del`, ghi đè bằng file rỗng, và lệnh của công cụ khác. Nếu thật sự cần xóa, phải hỏi và chờ chủ dự án đồng ý trước khi thực hiện. Khi hỏi, nêu rõ đường dẫn chính xác và lý do.

Hướng dẫn chi tiết được tách thành các rule trong [.claude/rules/](.claude/rules/). Claude Code tự nạp các rule này; rule có frontmatter `paths` chỉ được nạp khi làm việc với file khớp đường dẫn.

| Rule | Nội dung | Phạm vi |
|---|---|---|
| [project-overview.md](.claude/rules/project-overview.md) | Mục tiêu, ngôn ngữ, tiền tệ, quy định thương hiệu và bản quyền | Luôn nạp |
| [tech-stack.md](.claude/rules/tech-stack.md) | Thư viện và công cụ đang dùng | Luôn nạp |
| [dev-environment.md](.claude/rules/dev-environment.md) | Lệnh npm, phiên bản Node, Windows | Luôn nạp |
| [project-structure.md](.claude/rules/project-structure.md) | Cấu trúc thư mục `src/`, quy tắc tái sử dụng trước khi tạo mới, danh sách primitive có sẵn | Luôn nạp |
| [workflow.md](.claude/rules/workflow.md) | Thứ tự làm việc, điều kiện hoàn thành | Luôn nạp |
| [design-system.md](.claude/rules/design-system.md) | Token màu, typography, bo góc, shadow | `src/**/*.tsx`, `src/index.css` |
| [routing.md](.claude/rules/routing.md) | Bảng route, cách tạo link, SPA fallback khi deploy | `main.tsx`, `App.tsx`, `pages/`, `components/` |
| [homepage-layout.md](.claude/rules/homepage-layout.md) | Thứ tự và nội dung các khối trang chủ | `pages/HomePage.tsx`, `home/`, `layout/`, `data/site.ts` |
| [category-layout.md](.claude/rules/category-layout.md) | Thứ tự 13 khối trang danh mục, component dùng cho từng khối | `pages/CategoryPage.tsx`, `category/` |
| [category-data.md](.claude/rules/category-data.md) | `CategoryConfig`, facet, `product.attrs`, catalog sinh tự động, tham số URL của bộ lọc | `data/categories.ts`, `data/catalog.ts`, `data/products.ts`, `lib/filters.ts`, `hooks/useCategoryFilters.ts`, `types/` |
| [product-detail-layout.md](.claude/rules/product-detail-layout.md) | Bố cục 2 cột, thứ tự khối, thanh mua dính đáy của trang chi tiết | `pages/ProductDetailPage.tsx`, `detail/` |
| [product-detail-data.md](.claude/rules/product-detail-data.md) | `ProductDetail`, giá theo lựa chọn, dòng giỏ hàng, đánh giá/hỏi đáp | `types/`, `data/productDetails.ts`, `data/feedback.ts`, `hooks/`, `context/` |
| [product-card.md](.claude/rules/product-card.md) | Thành phần ProductCard và kiểu dữ liệu `Product` | `product/`, `types/`, `data/products.ts` |
| [images-placeholders.md](.claude/rules/images-placeholders.md) | Ảnh placeholder và tỉ lệ từng slot | `src/components/**`, `src/data/**` |
| [animation.md](.claude/rules/animation.md) | Fade khi cuộn, animation lọc/tab, reduced motion | `src/components/**/*.tsx`, entry files |
| [code-conventions.md](.claude/rules/code-conventions.md) | Đặt tên, state, định dạng giá, accessibility | `src/**/*.{ts,tsx}` |
| [responsive.md](.claude/rules/responsive.md) | Breakpoint, hành vi mobile, cách kiểm tra | `src/**/*.tsx`, `src/index.css` |

Khi thay đổi quy ước của dự án, sửa đúng file rule tương ứng, không thêm lại nội dung vào file này.
