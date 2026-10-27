---
paths:
  - "src/components/**"
  - "src/data/**"
---

# Hình ảnh và placeholder

Chưa có ảnh thật. Mọi slot ảnh phải giữ **đúng tỉ lệ** để sau này thay ảnh mà không vỡ bố cục.

- Ảnh sản phẩm là SVG vẽ bằng code (`src/components/product/DeviceImage.tsx`), khung **1:1**, đổi màu theo `product.color`. Thiết bị mới thì thêm một `DeviceKind` và nhánh vẽ tương ứng.
- Banner, thumbnail tin tức và review là khối gradient với class tỉ lệ cố định:

| Slot | Tỉ lệ |
|---|---|
| Hero carousel, 3 banner nhỏ dưới hero | `aspect-[23/10]` |
| Banner dọc của khối danh mục | `aspect-[9/20]` |
| Banner ngang khuyến mãi | `aspect-[5/1]` mobile, `aspect-[15/1]` từ `sm` |
| Thumbnail tin tức | `aspect-video` |
| Thẻ review (video) | `aspect-[3/4]` |
| Banner ưu đãi | `aspect-[2/1]` |
| Banner thương hiệu | `aspect-[16/9]` |
| Trang chi tiết: ô gallery chính | `aspect-[11/6]` |
| Trang chi tiết: banner khuyến mãi trong cột mua | `aspect-[3/1]` mobile, `aspect-[5/1]` từ `sm` |
| Trang chi tiết: ảnh nhỏ gallery, ô tính năng nổi bật | `aspect-square` |
| Trang chi tiết: thẻ "Vẫn còn nhiều món đáng yêu" | `aspect-[5/2]` (từ `sm`) |
| Trang chi tiết: khối hero marketing nền tối | `aspect-[3/2]` |
| Trang danh mục: 2 banner khuyến mãi | `aspect-[3/1]` mobile, `aspect-[6/1]` từ `sm` |
| Trang danh mục: ô "Chọn theo nhu cầu" | ảnh `aspect-square` |

- Khi có ảnh thật: thay bằng `<img>` cùng tỉ lệ, giữ nguyên class `aspect-*`, có `alt` mô tả.
- Không dùng ảnh hotlink từ website khác hoặc ảnh có bản quyền.
