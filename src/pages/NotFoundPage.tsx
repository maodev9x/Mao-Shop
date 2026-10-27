import { motion } from 'framer-motion';
import { Home, SearchX } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage({ message = 'Trang bạn tìm không tồn tại hoặc đã bị gỡ.' }: { message?: string }) {
  useEffect(() => {
    document.title = 'Không tìm thấy - MaoShop';
  }, []);

  return (
    <section className="container-page flex flex-col items-center py-24 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="rounded-full bg-primary-soft p-6"
      >
        <SearchX className="h-14 w-14 text-primary" />
      </motion.div>
      <h1 className="mt-5 text-2xl font-extrabold">Không tìm thấy</h1>
      <p className="mt-2 max-w-md text-muted">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        <Home className="h-4 w-4" /> Về trang chủ
      </Link>
    </section>
  );
}
