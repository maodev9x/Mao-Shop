---
paths:
  - "src/**/*.tsx"
  - "src/index.css"
---

# Design system (rút từ UI.png)

## Màu sắc

Token khai báo trong `@theme` của `src/index.css`. Dùng qua class Tailwind (`bg-primary`, `text-ink`...), **không** hard-code mã hex trong component.

| Token | Giá trị | Dùng cho |
|---|---|---|
| `primary` | `#D70018` | Màu chủ đạo: header, giá bán, nút chính, tab active |
| `primary-dark` | `#B5001A` | Hover nút, nền khối Flash Sale |
| `primary-light` | `#E1384A` | Đầu gradient của header và badge |
| `primary-soft` | `#FEE2E2` | Nền nhạt, thanh "Đã bán x/y suất" |
| `blue` | `#2563EB` | Link "Xem tất cả", badge "Trả góp 0%", viền khối Deal |
| `blue-soft` | `#E8F0FE` | Nền dòng "Smember giảm đến..." |
| `violet-soft` | `#F3E8FF` | Nền dòng ưu đãi học sinh/sinh viên |
| `ink` | `#111827` | Chữ chính |
| `muted` | `#6B7280` | Giá gạch, chữ phụ |
| `line` | `#E5E7EB` | Viền, đường kẻ |
| `page` | `#F4F6F8` | Nền trang |
| `surface` | `#FFFFFF` | Card, sidebar |
| `star` | `#F59E0B` | Sao đánh giá |

Header dùng gradient đỏ nhẹ `primary-light` → `primary`.

Ngoại lệ: màu riêng của từng sản phẩm/banner placeholder (`product.color`, gradient `from`/`to` trong `src/data/`) là dữ liệu, được phép là mã hex.

## Typography

- Font **Inter**, nạp từ Google Fonts với subset `vietnamese`.
- Tên sản phẩm 14px semibold, tối đa 2–3 dòng (`line-clamp`).
- Giá 16–18px bold màu `primary`; giá gốc 12px gạch ngang màu `muted`.

## Hình khối

- Bo góc: card `rounded-xl` (12px), chip/nút `rounded-lg` hoặc `rounded-full`.
- Shadow nhẹ (`shadow-card`); card hover nâng nhẹ (`shadow-lift`, `-translate-y-1`).
- Container: utility `container-page` (max 1200px, căn giữa, padding ngang 1rem).
