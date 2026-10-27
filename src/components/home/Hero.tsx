import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gift, GraduationCap, RefreshCcw, Briefcase, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { heroSlides } from '../../data/site';
import { cn } from '../../lib/format';
import CategoryMenu from '../layout/CategoryMenu';
import DeviceImage from '../product/DeviceImage';
import Banner from '../ui/Banner';

const AUTOPLAY_MS = 5000;

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const slide = heroSlides[index];

  const go = useCallback((next: number) => {
    setDirection(next > index || (index === heroSlides.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, [index]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  // keep the active tab visible inside its scroller (without scrolling the page)
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.children[index] as HTMLElement | undefined;
    if (strip && tab) strip.scrollTo({ left: tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2, behavior: 'smooth' });
  }, [index]);

  return (
    <div
      className="overflow-hidden rounded-xl bg-white shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={tabsRef} className="no-scrollbar relative flex overflow-x-auto border-b border-line">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(i)}
            className={cn('relative min-w-[130px] flex-1 px-3 py-2 text-center transition-colors', i === index ? 'text-ink' : 'text-ink/60 hover:text-ink')}
          >
            {i === index && (
              <motion.span layoutId="hero-tab" className="absolute inset-1 rounded-lg bg-page" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
            )}
            <span className="relative block text-xs font-bold uppercase">{s.tab}</span>
            <span className="relative block text-[11px] text-muted">{s.tabSub}</span>
            {i === index && (
              <span className="absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-full bg-line">
                <motion.span
                  key={`${index}-${paused}`}
                  className="block h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: paused ? '0%' : '100%' }}
                  transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main slide — 23:10 placeholder */}
      <div className="group relative aspect-[23/10] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.a
            key={slide.id}
            href="#promo"
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0.4 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center px-6 text-white sm:px-10"
            style={{ backgroundImage: `linear-gradient(120deg, ${slide.from}, ${slide.to})` }}
          >
            <span className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <span className="absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-xl" />
            <motion.div
              className="relative z-10 max-w-[55%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur sm:text-xs">
                <Sparkles className="h-3 w-3" /> {slide.eyebrow}
              </span>
              <h2 className="mt-2 text-xl leading-tight font-black sm:text-4xl">{slide.title}</h2>
              <p className="mt-1.5 text-xs text-white/85 sm:mt-3 sm:text-base">{slide.subtitle}</p>
              <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold text-primary shadow-lg transition-transform hover:scale-105 sm:mt-5 sm:px-6 sm:py-2.5 sm:text-sm">
                {slide.cta}
              </span>
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-2 h-[88%] -translate-y-1/2 sm:right-8"
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <DeviceImage kind={slide.kind} color={slide.deviceColor} className="h-full w-auto animate-float drop-shadow-2xl" />
            </motion.div>
          </motion.a>
        </AnimatePresence>

        <button type="button" aria-label="Slide trước" onClick={() => go(index - 1)} className="absolute top-1/2 left-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:bg-black/40">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Slide tiếp" onClick={() => go(index + 1)} className="absolute top-1/2 right-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:bg-black/40">
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => go(i)}
              className={cn('h-1.5 rounded-full bg-white transition-all duration-300', i === index ? 'w-6' : 'w-1.5 opacity-50')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const offers = [
  { title: 'Ưu đãi cho giáo dục', items: [{ icon: GraduationCap, text: 'Đăng ký nhận ưu đãi' }, { icon: GraduationCap, text: 'Deal hot học sinh sinh viên' }, { icon: GraduationCap, text: 'Laptop ưu đãi khủng' }] },
  { title: 'Thu cũ lên đời giá hời', items: [{ icon: RefreshCcw, text: 'Định giá máy chuyên sâu', badge: 'Mới' }, { icon: RefreshCcw, text: 'iPhone trợ giá đến 5 triệu' }, { icon: RefreshCcw, text: 'Samsung trợ giá đến 6 triệu' }] },
  { title: 'Khách hàng doanh nghiệp (B2B)', items: [{ icon: Briefcase, text: 'Đăng ký T-Business' }] },
];

function RightColumn() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="shrink-0 rounded-xl bg-white p-3.5 shadow-card">
        <div className="flex items-start gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg">👋</span>
          <p className="text-sm leading-snug font-bold">Chào mừng bạn đến với MaoShop</p>
        </div>
        <p className="mt-2 text-xs text-ink/75">Nhập hội thành viên Smember để không bỏ lỡ các ưu đãi hấp dẫn.</p>
        <p className="mt-2 text-xs">
          <a href="#login" className="font-semibold text-primary hover:underline">Đăng nhập</a> hoặc{' '}
          <a href="#register" className="font-semibold text-primary hover:underline">Đăng ký</a>
        </p>
        <a href="#member" className="mt-2 flex items-center gap-2 rounded-lg px-1 py-1.5 text-xs text-ink/80 hover:bg-page">
          <Gift className="h-4 w-4 text-primary" /> Xem ưu đãi Smember
          <ChevronRight className="ml-auto h-4 w-4" />
        </a>
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-xl bg-white p-3 shadow-card [scrollbar-width:thin]">
        {offers.map((g) => (
          <div key={g.title}>
            <p className="rounded-md bg-page py-1 text-center text-xs font-semibold">{g.title}</p>
            <ul className="mt-1">
              {g.items.map(({ icon: Icon, text, badge }) => (
                <li key={text}>
                  <a href="#offer" className="flex items-center gap-2 rounded-md px-1 py-1.5 text-xs text-ink/85 transition-colors hover:bg-primary-soft/50 hover:text-primary">
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="flex-1">{text}</span>
                    {badge && <span className="rounded bg-primary px-1.5 text-[10px] font-semibold text-white">{badge}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="container-page pt-4">
      <div className="grid gap-3 lg:grid-cols-[236px_minmax(0,1fr)_220px]">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-30 hidden rounded-xl bg-white px-1.5 shadow-card lg:block"
        >
          <CategoryMenu />
        </motion.aside>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="min-w-0 space-y-3">
          <HeroCarousel />
          <div className="no-scrollbar grid auto-cols-[72%] grid-flow-col gap-3 overflow-x-auto sm:grid-flow-row sm:grid-cols-3">

            <Banner aspect="aspect-[23/10]" size="sm" from="#000000" to="#374151" title="Watch Series 11" cta="Mua ngay" device={{ kind: 'watch', color: '#f43f5e' }} />
            <Banner aspect="aspect-[23/10]" size="sm" from="#1d4ed8" to="#60a5fa" title="Galaxy A57 5G" subtitle="Ưu đãi chỉ từ 9.98 triệu" device={{ kind: 'phone', color: '#a78bfa' }} />
            <Banner aspect="aspect-[23/10]" size="sm" from="#be123c" to="#fb7185" title="Laptop giảm thêm 1 triệu" device={{ kind: 'laptop', color: '#475569' }} />
          </div>
        </motion.div>

        {/* absolute inner box so this column never grows taller than the carousel */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative hidden lg:block">
          <div className="absolute inset-0">
            <RightColumn />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
