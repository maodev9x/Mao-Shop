import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CartDrawer from './components/layout/CartDrawer';
import FloatingButtons from './components/layout/FloatingButtons';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import MobileMenu from './components/layout/MobileMenu';
import TopBar from './components/layout/TopBar';
import CategoryPage from './pages/CategoryPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailPage from './pages/ProductDetailPage';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-amber-300" />;
}

/** Jump to the top on route change, or to the `#section` of links like `/#phone`. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // wait for the new page to render before looking up the anchor
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  return (
    <div id="top" className="min-h-screen overflow-x-clip">
      <ScrollToTop />
      <ScrollProgress />
      <div className="bg-gradient-to-r from-primary-light via-primary to-primary">
        <TopBar />
      </div>
      <Header onOpenMobileMenu={() => setMobileMenu(true)} />
      <MobileMenu open={mobileMenu} onClose={() => setMobileMenu(false)} />

      {/* keyed by path so each page fades in on navigation */}
      <motion.main key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/danh-muc/:slug" element={<CategoryPage />} />
          <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>

      <Footer />
      <FloatingButtons />
      <CartDrawer />
    </div>
  );
}
