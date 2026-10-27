---
paths:
  - "src/pages/CategoryPage.tsx"
  - "src/components/category/**"
---

# Bố cục trang danh mục

Thiết kế tham chiếu: [UI_Category_Page.jpg](../../UI_Category_Page.jpg). Một trang dùng chung cho cả 9 danh mục (route `/danh-muc/:slug`, xem rule routing). Trang ráp ở `src/pages/CategoryPage.tsx`, các khối riêng nằm trong `src/components/category/`.

## Thứ tự khối

| # | Khối | Component |
|---|---|---|
| 1 | Breadcrumb | `ui/Breadcrumb` |
| 2 | Tab các danh mục cùng nhóm | `ui/Tabs` → `FilterChips`, `onChange` điều hướng tới danh mục khác |
| 3 | 2 banner khuyến mãi | `ui/Banner` ×2 |
| 4 | Tiêu đề (`config.title`) + lưới thương hiệu | `FilterChips multiple`, bật/tắt tham số `hang` |
| 5 | Ưu đãi & voucher | `category/VoucherList` |
| 6 | Chọn theo nhu cầu | `product/SubCategoryTiles` (`layout="stack"`), bật/tắt `nhucau` |
| 7 | Sản phẩm nổi bật (khung nền đỏ) | `product/ProductCarousel`, lấy theo `popularity` cao nhất |
| 8 | Chọn theo tiêu chí | `category/FilterBar` (nút "Bộ lọc" → `category/FilterDrawer`), rồi `category/ActiveFilters` |
| 9 | Sắp xếp theo + số kết quả | `FilterChips` + `ui/AnimatedNumber` |
| 10 | Lưới sản phẩm | `product/ProductGrid` (20 sản phẩm mỗi lần, "Xem thêm N sản phẩm") |
| 11 | Nội dung giới thiệu (trái) + Tin tức (phải, sticky) | `shared/DescriptionContent` trong `ui/Expandable` + `shared/ProductNews` |
| 12 | Câu hỏi thường gặp | `ui/Accordion` |
| 13 | Hỏi và đáp | `shared/QASection` + `useFeedback` (khóa `category-<id>`) |

- Chuyển sang danh mục khác thì reset toàn bộ trạng thái: trang render `key={config.id}`, bộ lọc nằm trên URL nên tự đổi theo.
- Không có kết quả thì `ProductGrid` hiện `EmptyResults` kèm nút "Xóa bộ lọc".
- Lọc hoặc sắp xếp lại thì danh sách quay về 20 sản phẩm đầu.

## Chưa làm

Trang "Build PC", "Linh kiện", "Máy in". Phân trang bằng URL. So sánh nhiều sản phẩm. Áp mã voucher khi thanh toán (voucher chỉ được lưu lại).
