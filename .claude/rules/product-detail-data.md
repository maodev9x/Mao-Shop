---
paths:
  - "src/types/**"
  - "src/data/productDetails.ts"
  - "src/data/feedback.ts"
  - "src/hooks/**"
  - "src/context/**"
---

# Dữ liệu trang chi tiết sản phẩm

## ProductDetail

- Kiểu `ProductDetail` (gallery, variants, colors, specs, highlights, commitments, description, compareIds) khai báo trong `src/types/index.ts`.
- Lấy chi tiết bằng `getProductDetail(product)` trong `src/data/productDetails.ts`. Hàm này **sinh mặc định theo `DeviceKind`**: mẫu thông số, phiên bản dung lượng/kích thước, 3–4 màu dựa trên `product.color`.
- Thông số và phiên bản **ưu tiên giá trị trong `product.attrs`** (CPU, RAM, ổ cứng, kích thước...), để khớp với bộ lọc ở trang danh mục.
- Chỉ viết tay chi tiết (object `overrides`) cho vài sản phẩm nổi bật. Không viết tay chi tiết cho toàn bộ danh sách sản phẩm.
- Giá theo lựa chọn = `variant.price + (color.priceDelta ?? 0)`. Phiên bản đầu tiên luôn có giá bằng `product.price`.

## Giỏ hàng

- Mỗi dòng giỏ hàng (`CartItem`) có `lineId = productId|variant|color` và `options?: { variant?, color? }`. Cùng sản phẩm khác phiên bản/màu là hai dòng riêng.
- Giá của dòng là `CartItem.unitPrice` (giá theo lựa chọn lúc thêm), không đọc lại `product.price`.
- `updateQuantity` / `removeFromCart` nhận `lineId`.

## Đánh giá và hỏi đáp

- Dữ liệu mẫu sinh trong `src/data/feedback.ts`: theo sản phẩm (`getSampleReviews`, `getSampleQuestions`) và theo danh mục (`getCategoryQuestions`).
- Nội dung người dùng gửi (đánh giá, câu hỏi, phản hồi) quản lý qua hook dùng chung `useFeedback(storageId, samples)` trong `src/hooks/useProductFeedback.ts`, lưu `localStorage` khóa `maoshop.feedback.<storageId>`. Nội dung người dùng gửi đứng trước dữ liệu mẫu.
  - Trang chi tiết: `useProductFeedback(product)`, `storageId = product.id`.
  - Trang danh mục: `storageId = category-<categoryId>`.
- Mọi truy cập `localStorage` bọc `try/catch` (dùng `readStorage` / `writeStorage` trong `src/lib/storage.ts`).
