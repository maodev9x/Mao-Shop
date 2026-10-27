import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown, LayoutGrid, MapPin, Menu, ShoppingCart, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { provinces, useShop } from '../../context/ShopContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { cn } from '../../lib/format';
import CategoryMenu from './CategoryMenu';
import Logo from './Logo';
import SearchBox from './SearchBox';

export default function Header({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
  const { cartCount, setCartOpen, province, setProvince } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  const menuRef = useClickOutside(() => setMenuOpen(false));
  const locationRef = useClickOutside(() => setLocationOpen(false));

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-gradient-to-r from-primary-light via-primary to-primary transition-shadow duration-300',
        scrolled && 'shadow-lg shadow-primary/20',
      )}
    >
      <div className={cn('container-page flex items-center gap-2 transition-all duration-300 sm:gap-3', scrolled ? 'h-14' : 'h-16')}>
        <button type="button" onClick={onOpenMobileMenu} aria-label="Mở menu" className="rounded-lg p-1.5 text-white hover:bg-white/15 lg:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <Logo className="mr-1" />

        {/* Category dropdown (desktop) */}
        <div ref={menuRef} className="relative hidden lg:block">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            className="flex h-10 items-center gap-1.5 rounded-lg bg-white/20 px-3 text-sm font-medium text-white transition-colors hover:bg-white/30"
          >
            <LayoutGrid className="h-5 w-5" /> Danh mục
            <ChevronDown className={cn('h-4 w-4 transition-transform', menuOpen && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute top-12 left-0 w-60 rounded-xl bg-white shadow-lift ring-1 ring-black/5"
              >
                <CategoryMenu className="px-1.5" onNavigate={() => setMenuOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Location */}
        <div ref={locationRef} className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setLocationOpen((v) => !v)}
            aria-expanded={locationOpen}
            className="flex h-10 items-center gap-1.5 rounded-lg bg-white/20 px-3 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-white/30"
          >
            <MapPin className="h-5 w-5" /> {province}
            <ChevronDown className={cn('h-4 w-4 transition-transform', locationOpen && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {locationOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute top-12 left-0 w-48 rounded-xl bg-white p-1.5 shadow-lift ring-1 ring-black/5"
              >
                {provinces.map((p) => (
                  <li key={p}>
                    <button
                      type="button"
                      onClick={() => {
                        setProvince(p);
                        setLocationOpen(false);
                      }}
                      className={cn('w-full rounded-lg px-3 py-2 text-left text-sm', p === province ? 'bg-primary-soft text-primary' : 'hover:bg-page')}
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden flex-1 sm:block">
          <SearchBox />
        </div>
        <div className="flex-1 sm:hidden" />

        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="relative flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
          aria-label={`Giỏ hàng (${cartCount} sản phẩm)`}
        >
          <span className="hidden xl:inline">Giỏ hàng</span>
          <span className="relative">
            <ShoppingCart className="h-6 w-6" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -top-2 -right-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-primary"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </button>

        <a
          href="#login"
          className="flex h-10 items-center gap-1.5 rounded-lg bg-white/20 px-3 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-white/30"
        >
          <span className="hidden md:inline">Đăng nhập</span>
          <UserCircle2 className="h-6 w-6" />
        </a>
      </div>

      {/* Mobile search row */}
      <div className="container-page pb-2.5 sm:hidden">
        <SearchBox />
      </div>
    </header>
  );
}
