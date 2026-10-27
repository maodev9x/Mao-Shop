---
paths:
  - "src/components/product/**"
  - "src/types/**"
  - "src/data/products.ts"
---

# ProductCard — thành phần chuẩn

Mọi khối hiển thị sản phẩm dùng chung một component `ProductCard`; không tạo card sản phẩm riêng cho từng khối. Các phần tùy chọn tự ẩn khi không có dữ liệu:

- Badge góc trái "Giảm xx%" (nền đỏ), badge góc phải "Trả góp 0%" (chữ xanh).
- Ảnh sản phẩm: khung vuông 1:1, hiện là `DeviceImage`; ảnh thật dùng `object-contain`.
- Tên sản phẩm.
- Giá bán + giá gốc gạch ngang, hoặc nhãn "Hàng đặt trước".
- Dòng ưu đãi thành viên (nền `blue-soft`), dòng ưu đãi học sinh/sinh viên (nền `violet-soft`).
- Ô mô tả khuyến mãi (nền xám nhạt, tối đa 2 dòng).
- Hàng cuối: badge "Giao 2 Giờ", số sao, nút yêu thích (trái tim).

Variant `flash` thay hàng cuối bằng thanh "Đã bán x/y suất".

Ảnh và tên sản phẩm là `<Link>` tới trang chi tiết `productPath(product)` (xem rule routing).

## Dữ liệu

- Kiểu dữ liệu ở `src/types/index.ts`. `Product` có:
  - `kind` + `color` cho ảnh placeholder;
  - `tags` (`deal` | `hot` | `new`) cho khối Deal;
  - `subCategory` cho thẻ danh mục con;
  - `sold` / `stock` cho Flash Sale.
- Phần trăm giảm tính bằng `discountPercent(price, originalPrice)`, **không** lưu cứng trong dữ liệu.
