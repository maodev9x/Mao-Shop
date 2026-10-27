---
paths:
  - "src/**/*.tsx"
  - "src/index.css"
---

# Responsive

- Thiết kế gốc là desktop, nhưng phải hoạt động tốt ở mobile (≥ 360px), tablet và desktop.
- Breakpoint (mặc định Tailwind): `sm 640`, `md 768`, `lg 1024`, `xl 1280`.

## Mobile

- Ẩn sidebar danh mục và cột ưu đãi bên phải của hero; thay bằng menu trượt (`MobileMenu`).
- Lưới sản phẩm 2 cột; carousel cho phép vuốt.
- Hiệu ứng chỉ có khi hover (ví dụ nút "Thêm vào giỏ" trên ảnh) phải có lựa chọn thay thế luôn hiển thị trên màn hình cảm ứng.
- Không để trang bị cuộn ngang.

## Trang chi tiết sản phẩm trên mobile

- Thứ tự khối: gallery → khung mua (giá, phiên bản, màu, khuyến mãi, nút mua...) → cam kết + thông số → phần dưới. Làm bằng grid-template-areas, không render khối hai lần.
- `StickyBuyBar` rộng toàn màn hình, ẩn chữ phụ (thông tin trả góp theo tháng).
- Bảng so sánh nhiều cột chỉ cuộn ngang bên trong khối của nó (`overflow-x-auto`).

## Trang danh mục trên mobile

- Tab danh mục, lưới thương hiệu, ô nhu cầu, thanh lọc và thanh sắp xếp cuộn ngang được.
- Dropdown từng facet ẩn trên mobile. Mọi bộ lọc mở bằng nút "Bộ lọc" (bottom sheet), có nút "Xem N kết quả" cố định ở đáy sheet.
- Lưới sản phẩm: 2 cột (mobile), 3 (`sm`), 4 (`lg`), 5 (`xl`).
- Hàng nội dung giới thiệu + tin tức xếp thành 1 cột.

## Kiểm tra

- Chrome headless không thu cửa sổ nhỏ hơn ~500px. Để kiểm tra đúng viewport 390px, nhúng trang vào một `<iframe>` rộng 390px, phục vụ cùng origin với server preview.
