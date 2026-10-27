# Tech stack

- **React 18 + TypeScript** (strict mode), build bằng **Vite 6**.
- **Tailwind CSS v4** (plugin `@tailwindcss/vite`). Design token khai báo bằng `@theme` trong `src/index.css`; **không có** `tailwind.config`.
- **framer-motion** cho mọi animation (lọc tab, fade khi cuộn, drawer, carousel hero).
- **lucide-react** cho icon.
- **react-router-dom v6** cho routing (xem rule routing).
- Carousel tự viết bằng CSS scroll-snap (`src/components/ui/Carousel.tsx`); không dùng Swiper.
- Dữ liệu: mock trong `src/data/*.ts`. Giỏ hàng và danh sách yêu thích lưu ở `localStorage` qua `ShopContext`.
- Package manager: `npm`.

Không thêm thư viện mới (state manager, UI kit, form library...) khi chưa hỏi chủ dự án.
