---
paths:
  - "src/components/**/*.tsx"
  - "src/App.tsx"
  - "src/main.tsx"
  - "src/index.css"
---

# Animation

Mọi animation dùng **framer-motion**. Chỉ dùng CSS animation cho hiệu ứng lặp đơn giản (`animate-float`, `animate-shimmer`, `animate-pulse`).

## Fade khi cuộn

- Bọc mỗi khối trang chủ bằng `<Reveal>` (`src/components/ui/Reveal.tsx`).
- Mặc định `once={false}`: hiện ra khi vào màn hình, mờ đi khi rời khỏi.
- Khi cần các phần tử con xuất hiện lần lượt, dùng `RevealGroup` + `RevealItem`.

## Lọc và đổi tab

- `FilterChips` và `UnderlineTabs` (`src/components/ui/Tabs.tsx`) dùng `layoutId` để highlight trượt sang lựa chọn mới.
- Animation card khi lọc nằm ở `product/AnimatedProductList` (`AnimatePresence mode="popLayout"` + `layout`): card cũ mờ dần, card còn lại trượt về chỗ mới, card mới hiện lên lần lượt. `ProductCarousel` (thêm cuộn về đầu khi `filterKey` đổi) và `ProductGrid` (thêm "Xem thêm") đều dùng nó.
- Danh sách sản phẩm đã lọc phải hiển thị qua `ProductCarousel` hoặc `ProductGrid`; không render lưới sản phẩm thủ công.

## Trang chi tiết sản phẩm

- Mỗi khối bọc `<Reveal>` như trang chủ. Trang fade-in khi đổi route.
- `OptionPicker` (phiên bản, màu) dùng `layoutId` cho viền highlight. Ảnh nhỏ đang chọn trong gallery cũng vậy.
- Giá đổi số khi chọn phiên bản/màu: `AnimatePresence` với `key` là giá.
- Ảnh chính gallery trượt theo hướng chuyển (trước/sau).
- Mở rộng/thu gọn (bảng thông số, nội dung nổi bật, phản hồi): animate `height` từ `0` tới `'auto'`.
- Danh sách đánh giá khi lọc: `AnimatePresence mode="popLayout"` + `layout`. Nội dung mới gửi trượt vào đầu danh sách.
- Cột biểu đồ số sao chạy từ 0 tới giá trị bằng `whileInView`.
- `StickyBuyBar` trượt lên từ đáy; hiện khi đáy khối `BuyActions` đã ở trên viewport. Kiểm tra bằng scroll listener (throttle bằng `requestAnimationFrame`), **không** dùng IntersectionObserver/`useInView`: khi nhảy anchor hoặc cuộn nhanh vượt qua khối, observer không phát sự kiện.
- Phần tử `position: fixed` (modal, `StickyBuyBar`) đặt trong khối có `Reveal` phải render qua `createPortal(..., document.body)`, vì transform của tổ tiên làm `fixed` định vị sai.

## Trang danh mục

- Mỗi khối bọc `<Reveal>`.
- Dropdown lọc: fade + scale từ mép trên. Bảng "Bộ lọc" dùng `ui/Drawer` (trượt từ phải trên desktop, từ dưới lên trên mobile).
- Chip bộ lọc đang chọn vào/ra bằng `AnimatePresence`.
- Số kết quả đổi số bằng `ui/AnimatedNumber`.
- Voucher "Thu thập" → dấu tick bật lên. Câu hỏi thường gặp dùng `ui/Accordion` (animate `height`).

## Khả năng truy cập

- Tôn trọng `prefers-reduced-motion`: `MotionConfig reducedMotion="user"` ở `main.tsx` và media query trong `index.css`. Không gỡ hai chỗ này.
