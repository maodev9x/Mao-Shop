---
paths:
  - "src/pages/ProductDetailPage.tsx"
  - "src/components/detail/**"
---

# Bố cục trang chi tiết sản phẩm

Thiết kế tham chiếu: [UI_Detail_Product.jpg](../../UI_Detail_Product.jpg). Khối riêng của trang nằm trong `src/components/detail/`. `QASection`, `Avatar`, `ProductNews`, `DescriptionContent` nằm trong `src/components/shared/` vì trang danh mục cũng dùng. Trang ráp ở `src/pages/ProductDetailPage.tsx`.

Breadcrumb: Trang chủ / `<danh mục>` (`categoryPath(config)`) / `<hãng>` (`categoryPath(config, { hang })`) / tên sản phẩm.

## Phần trên: 2 cột

Dùng grid-template-areas để không phải render khối hai lần:
- desktop (`lg`): `"gallery buy" "info buy"`, hai cột bằng nhau, `grid-rows-[auto_1fr]` + `items-start`. Không có dòng này thì chiều cao dư của cột `buy` sẽ dồn vào hàng `gallery` và tạo khoảng trống lớn dưới gallery;
- mobile: `"gallery" "buy" "info"`.

| Vùng | Khối (theo thứ tự) |
|---|---|
| `gallery` | `Breadcrumb` (đặt trên grid), `ProductHeader` (tên, sao, link nhanh Yêu thích · Hỏi đáp · Thông số · So sánh), `ProductGallery` |
| `buy` | `PriceBox`, `OptionPicker` Phiên bản, `OptionPicker` Màu sắc, `PromotionsBox`, banner khuyến mãi, `PaymentOffers`, `ShippingInfo`, `BuyActions` (Trả góp 0% · MUA NGAY · Thêm vào giỏ), `BundleDeals`, `AccessoryUpsell`, `WarrantyPicker` |
| `info` | `CommitmentCards`, `SpecsTable` (id `thong-so`) + nút "So sánh các phiên bản" |

## Phần dưới

1. `RelatedProducts`: tab "Tham khảo hàng cũ" / "Sản phẩm tương tự".
2. Hàng 2 cột (`lg:grid-cols-[minmax(0,1fr)_300px]`):
   - trái: `ProductInfoTabs` với tab "Thông tin nổi bật" (`HighlightContent`, thu gọn bằng `Expandable`) / "Mô tả sản phẩm" (`DescriptionContent`); bên dưới là `CompareProducts` (id `so-sanh`). Bảng so sánh nằm **ngoài** tab để link "So sánh" luôn cuộn tới được, kể cả khi đang ở tab mô tả hoặc nội dung đang thu gọn;
   - phải: `ProductNews` (sticky; `Reveal` đặt bên trong khối sticky, không bọc ngoài).
3. `ReviewsSection` (id `danh-gia`).
4. `QASection` (id `hoi-dap`).

## Thanh mua hàng dính đáy

`StickyBuyBar` chỉ hiện khi `BuyActions` đã cuộn khuất khỏi màn hình. Khi thanh hiện, `FloatingButtons` dời lên để không bị đè.

## Chưa làm

Trang trả góp, trang thanh toán, trang so sánh đầy đủ, upload ảnh trong đánh giá, lưu gói bảo hành vào giỏ. Các nút tương ứng chỉ mở giỏ hàng hoặc cuộn tới khối liên quan.
