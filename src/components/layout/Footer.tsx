import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Facebook, Instagram, Youtube, Music2, MessageCircle, Smartphone, Apple } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import Reveal from '../ui/Reveal';
import Logo from './Logo';

const policies = [
  'Mua hàng và thanh toán Online',
  'Mua hàng trả góp',
  'Chính sách giao hàng',
  'Chính sách đổi trả',
  'Tra điểm Smember',
  'Tra thông tin bảo hành',
  'Trung tâm bảo hành chính hãng',
  'Quy định về việc sao lưu dữ liệu',
];
const services = [
  'Khách hàng doanh nghiệp (B2B)',
  'Ưu đãi thanh toán',
  'Quy chế hoạt động',
  'Chính sách bảo mật thông tin cá nhân',
  'Chính sách Bảo hành',
  'Liên hệ hợp tác kinh doanh',
  'Tuyển dụng',
  'Dịch vụ bảo hành mở rộng',
];
const payments = ['Apple Pay', 'VNPAY', 'MoMo', 'OnePay', 'ZaloPay', 'Kredivo', 'Visa', 'Mastercard'];
const socials = [
  { icon: Youtube, label: 'YouTube', cls: 'text-red-600' },
  { icon: Facebook, label: 'Facebook', cls: 'text-blue-600' },
  { icon: Instagram, label: 'Instagram', cls: 'text-pink-600' },
  { icon: Music2, label: 'TikTok', cls: 'text-ink' },
  { icon: MessageCircle, label: 'Zalo', cls: 'text-sky-500' },
];
const seoLinks = [
  ['iPhone 17 Pro Max', 'iPhone 17', 'iPhone Air', 'iPhone 16', 'MacBook Air'],
  ['Điện thoại Samsung', 'Galaxy Z Fold7', 'Xiaomi 15T', 'OPPO Find X9', 'Redmi Note 15'],
  ['Laptop Gaming', 'Laptop Dell', 'Laptop ASUS', 'Tivi Samsung', 'Tivi LG'],
  ['Apple Watch', 'AirPods Pro 3', 'Tủ lạnh', 'Máy giặt', 'Camera an ninh'],
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    setEmail('');
    setPhone('');
    setTimeout(() => setDone(false), 3500);
  };

  return (
    <footer className="mt-10 bg-white">
      <Reveal className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-bold">Tổng đài hỗ trợ miễn phí</h3>
            <p className="text-sm text-ink/80">
              Mua hàng - bảo hành <b>1800.2044</b> (7h30 - 22h00)
            </p>
            <p className="mt-1 text-sm text-ink/80">
              Khiếu nại <b>1800.2063</b> (8h00 - 21h30)
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-bold">Phương thức thanh toán</h3>
            <div className="grid grid-cols-4 gap-2">
              {payments.map((p) => (
                <span key={p} className="flex h-8 items-center justify-center rounded-md border border-line px-1 text-[10px] font-bold text-ink/70">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <h3 className="font-bold uppercase">Đăng ký nhận tin khuyến mãi</h3>
            <div className="rounded-lg bg-page p-3 text-xs">
              <p className="font-semibold text-primary">Nhận ngay voucher 10%</p>
              <p className="mt-0.5 text-muted">Voucher sẽ được gửi sau 24h, chỉ áp dụng cho khách hàng mới</p>
            </div>
            <label className="block text-xs font-medium">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="mt-1 h-10 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
            <label className="block text-xs font-medium">
              Số điện thoại
              <input
                type="tel"
                required
                pattern="0[0-9]{9}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại của bạn"
                className="mt-1 h-10 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
            <button type="submit" className="h-10 w-full rounded-lg bg-primary text-sm font-bold text-white uppercase transition-colors hover:bg-primary-dark">
              Đăng ký ngay
            </button>
            <AnimatePresence>
              {done && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-green-600"
                >
                  <CheckCircle2 className="h-4 w-4" /> Đăng ký thành công! Voucher sẽ được gửi tới bạn.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>

        <div>
          <h3 className="mb-3 font-bold">Thông tin về chính sách</h3>
          <ul className="space-y-2.5">
            {policies.map((p) => (
              <li key={p}>
                <a href="#policy" className="text-sm text-ink/80 transition-colors hover:text-primary">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-bold">Dịch vụ và thông tin khác</h3>
          <ul className="space-y-2.5">
            {services.map((p) => (
              <li key={p}>
                <a href="#service" className="text-sm text-ink/80 transition-colors hover:text-primary">
                  {p}
                </a>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 mb-3 font-bold">Mua sắm dễ dàng cùng app MaoShop</h3>
          <div className="flex gap-2">
            <div className="grid h-24 w-24 shrink-0 grid-cols-6 gap-0.5 rounded-lg border border-line p-1.5" aria-label="Mã QR tải ứng dụng (placeholder)">
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} className={(i * 7 + (i % 5)) % 3 === 0 ? 'bg-ink' : 'bg-transparent'} />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <a href="#app" className="flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-white">
                <Smartphone className="h-5 w-5" />
                <span className="text-[10px] leading-tight">
                  Tải trên <b className="block text-sm">Google Play</b>
                </span>
              </a>
              <a href="#app" className="flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-white">
                <Apple className="h-5 w-5" />
                <span className="text-[10px] leading-tight">
                  Tải về trên <b className="block text-sm">App Store</b>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold">Kết nối với MaoShop</h3>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, label, cls }) => (
              <a
                key={label}
                href="#social"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <Icon className={`h-4.5 w-4.5 ${cls}`} />
              </a>
            ))}
          </div>
          <h3 className="mt-6 mb-3 font-bold">Hệ thống website thành viên</h3>
          <ul className="space-y-3 text-sm text-ink/80">
            <li>Hệ thống bảo hành và chăm sóc điện thoại - máy tính</li>
            <li>Trung tâm bảo hành ủy quyền</li>
            <li>Kênh thông tin giải trí công nghệ cho giới trẻ</li>
            <li>Trang tin công nghệ mới nhất</li>
          </ul>
        </div>
      </Reveal>

      <div className="border-t border-line bg-page/60">
        <div className="container-page grid gap-4 py-6 text-xs text-ink/70 sm:grid-cols-2 lg:grid-cols-4">
          {seoLinks.map((col, i) => (
            <p key={i} className="leading-6">
              {col.map((l, j) => (
                <span key={l}>
                  <a href="#seo" className="hover:text-primary">
                    {l}
                  </a>
                  {j < col.length - 1 && <span className="mx-1.5 text-line">|</span>}
                </span>
              ))}
            </p>
          ))}
        </div>
        <div className="container-page flex flex-col items-center gap-3 border-t border-line py-6 text-center text-xs text-muted">
          <Logo tone="dark" />
          <p className="max-w-3xl">
            Công ty Cổ phần MaoShop Việt Nam (dữ liệu demo) · Địa chỉ: 123 Đường Công Nghệ, Hà Nội · Điện thoại: 024.0000.0000 · Email: hotro@maoshop.vn
          </p>
          <p>© 2026 MaoShop. Mọi quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
