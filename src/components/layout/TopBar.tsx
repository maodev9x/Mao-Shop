import { BadgeCheck, Truck, RefreshCcw, Store, FileSearch, Phone } from 'lucide-react';

const promises = [
  { icon: BadgeCheck, strong: 'Chính hãng', text: '- Xuất VAT đầy đủ' },
  { icon: Truck, strong: 'Giao nhanh - Miễn phí', text: 'cho đơn 300k' },
  { icon: RefreshCcw, strong: 'Thu cũ giá ngon', text: '- Lên đời tiết kiệm' },
];

export default function TopBar() {
  return (
    <div className="hidden bg-primary-dark/40 text-white/95 lg:block">
      <div className="container-page flex h-8 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          {promises.map(({ icon: Icon, strong, text }) => (
            <span key={strong} className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5" />
              <b className="font-semibold">{strong}</b> {text}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#stores" className="flex items-center gap-1 hover:underline">
            <Store className="h-3.5 w-3.5" /> Cửa hàng gần bạn
          </a>
          <a href="#orders" className="flex items-center gap-1 hover:underline">
            <FileSearch className="h-3.5 w-3.5" /> Tra cứu đơn hàng
          </a>
          <a href="tel:18002097" className="flex items-center gap-1 font-semibold hover:underline">
            <Phone className="h-3.5 w-3.5" /> 1800 2097
          </a>
        </div>
      </div>
    </div>
  );
}
