---
paths:
  - "src/**/*.{ts,tsx}"
---

# Quy ước code

## Đặt tên và tổ chức

- Component: PascalCase, mỗi file một component chính. Hook: `useXxx`. File tiện ích: camelCase.
- Slug URL tiếng Việt không dấu, gạch nối: `dien-thoai`, `may-tinh-bang`, `tivi`.
- Chuỗi hiển thị viết bằng tiếng Việt. Tên biến/hàm và comment code viết bằng tiếng Anh.

## State

- State dùng chung (giỏ hàng, yêu thích, toast, mở/đóng giỏ hàng) đi qua `useShop()` từ `src/context/ShopContext.tsx`.
- State chỉ dùng trong một khối (tab, bộ lọc) để trong component đó.
- Mọi truy cập `localStorage` phải bọc `try/catch`: dùng `readStorage` / `writeStorage` trong `src/lib/storage.ts`, không gọi `localStorage` trực tiếp. Khóa bắt đầu bằng `maoshop.`.
- Hook dùng lại được đặt trong `src/hooks/`.

## Định dạng và styling

- Định dạng giá luôn qua `formatPrice()` trong `src/lib/format.ts` (`Intl.NumberFormat('vi-VN')` + `đ`).
- Ghép class có điều kiện bằng `cn()` trong `src/lib/format.ts`.
- Không hard-code màu hex trong component; dùng token Tailwind (xem rule design-system).

## Accessibility

- Ảnh có `alt` mô tả. Nút chỉ có icon phải có `aria-label`.
- Tab dùng `role="tab"` + `aria-selected`; chip lọc dùng `aria-pressed`.
