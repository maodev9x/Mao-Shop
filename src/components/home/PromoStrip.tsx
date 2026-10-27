import { ArrowRight, CreditCard } from 'lucide-react';
import Reveal from '../ui/Reveal';

/** Full-width promo strip — 15:1 slot on desktop, taller on mobile. */
export default function PromoStrip() {
  return (
    <Reveal className="container-page mt-4">
      <a
        href="#promo"
        className="group relative flex aspect-[5/1] items-center overflow-hidden rounded-xl bg-gradient-to-r from-primary-dark via-primary to-fuchsia-600 px-4 text-white shadow-card sm:aspect-[15/1] sm:px-8"
      >
        <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_35%,rgb(255_255_255/0.18)_50%,transparent_65%)] bg-[length:200%_100%]" />
        <p className="relative text-base font-black italic sm:text-2xl">TƯNG BỪNG DEAL KHỦNG</p>
        <span className="relative mx-4 hidden h-8 w-px bg-white/40 md:block" />
        <p className="relative hidden items-center gap-2 text-sm font-semibold md:flex">
          <CreditCard className="h-5 w-5" /> Trả góp sinh viên, duyệt nhanh 5 phút — hạn mức lên đến <b className="text-xl text-amber-300">30 triệu</b>
        </p>
        <span className="relative ml-auto flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary transition-transform group-hover:translate-x-1 sm:px-4 sm:py-1.5 sm:text-sm">
          Mua ngay <ArrowRight className="h-4 w-4" />
        </span>
      </a>
    </Reveal>
  );
}
