---
paths:
  - "src/pages/HomePage.tsx"
  - "src/components/home/**"
  - "src/components/layout/**"
  - "src/data/site.ts"
---

# Các khối giao diện trang chủ

Thứ tự theo [UI.png](../../UI.png). Khi thêm hoặc sửa khối, giữ đúng thứ tự này trong `src/pages/HomePage.tsx`. Khung dùng chung (mục 1, 2, 11, 12) nằm trong `src/App.tsx`.

1. **Top bar** đỏ: các cam kết (Chính hãng, Giao nhanh, Thu cũ đổi mới), Cửa hàng gần bạn, Tra cứu đơn hàng, hotline.
2. **Header** (sticky): logo, nút "Danh mục", chọn tỉnh/thành, ô tìm kiếm "Bạn muốn mua gì hôm nay?", Giỏ hàng, Đăng nhập.
3. **Hero** 3 cột:
   - Trái: sidebar danh mục có icon + mũi tên (hover mở mega menu).
   - Giữa: tab tên chiến dịch phía trên + carousel banner lớn; bên dưới 3 banner nhỏ.
   - Phải: card chào mừng thành viên + danh sách ưu đãi (giáo dục, thu cũ, doanh nghiệp).
4. **Banner ngang** khuyến mãi toàn chiều rộng.
5. **Flash Sale**: nền đỏ, chọn khung giờ, đồng hồ đếm ngược `DD : HH : MM : SS`, carousel sản phẩm có thanh "Đã bán x/y suất", dòng điều kiện áp dụng.
6. **Khối tab Deal** (viền xanh): "Deal sốc mỗi ngày / Sản phẩm hot trend / Hàng mới về" → chip danh mục → carousel sản phẩm.
7. **Các khối danh mục** (Điện thoại, Laptop, Đồng hồ/Âm thanh, Tivi, Tủ lạnh/Máy giặt/Gia dụng): banner dọc bên trái + tab danh mục + thẻ danh mục con có ảnh (`product/SubCategoryTiles`) + chip thương hiệu + "Xem tất cả" + lưới sản phẩm 2 hàng × 4 cột (dạng carousel). Dùng chung component `CategorySection`.
   - Mỗi khối hiển thị **tối đa 20 sản phẩm** sau khi lọc, vì catalog đã có khoảng 30–40 sản phẩm mỗi danh mục.
   - "Xem tất cả" dẫn tới trang danh mục của tab đang chọn (`categoryPath`), kèm `hang` nếu đang lọc theo hãng.
8. **Sắm thêm phụ kiện**: lưới icon danh mục phụ kiện.
9. **Review sản phẩm** (thẻ video), **Ưu đãi sinh viên / thanh toán**, **Chuyên trang thương hiệu**.
10. **Tin tức**: 5 thẻ bài viết (ảnh + tiêu đề 3 dòng).
11. **Footer** 4 cột: tổng đài hỗ trợ, phương thức thanh toán, form đăng ký nhận khuyến mãi (email, SĐT) | chính sách | dịch vụ + tải app | mạng xã hội; dưới cùng là link SEO và thông tin công ty.
12. **Nút nổi** góc phải dưới: "Lên đầu", "Liên hệ".

Chưa làm (có trong UI.png): khối **Hàng cũ**, **banner khuyến mãi lớn** cuối trang.
