import { AnimatePresence, motion } from 'framer-motion';
import { Search, TrendingUp, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';
import { formatPrice, productPath } from '../../lib/format';
import DeviceImage from '../product/DeviceImage';

const trending = ['iPhone 17 Pro Max', 'Galaxy Z Fold7', 'MacBook Air M4', 'AirPods Pro 3', 'Tivi 4K'];

function normalize(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
}

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return products.filter((p) => normalize(`${p.name} ${p.brand}`).includes(q)).slice(0, 6);
  }, [query]);

  const open = focused;

  return (
    <div className="relative flex-1">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex h-10 items-center rounded-lg bg-white px-3 shadow-sm ring-primary-dark/20 transition-shadow focus-within:ring-4"
      >
        <Search className="h-5 w-5 shrink-0 text-ink/60" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Bạn muốn mua gì hôm nay?"
          aria-label="Tìm kiếm sản phẩm"
          className="h-full w-full min-w-0 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-ink/45"
        />
        {query && (
          <button type="button" aria-label="Xóa" onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="text-ink/50 hover:text-ink">
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-12 z-50 overflow-hidden rounded-xl bg-white p-3 text-ink shadow-lift ring-1 ring-black/5"
          >
            {query.trim() === '' ? (
              <>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted">
                  <TrendingUp className="h-4 w-4 text-primary" /> Xu hướng tìm kiếm
                </p>
                <div className="flex flex-wrap gap-2">
                  {trending.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setQuery(t)}
                      className="rounded-full bg-page px-3 py-1 text-xs hover:bg-primary-soft hover:text-primary"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            ) : results.length ? (
              <ul className="divide-y divide-line">
                {results.map((p, i) => (
                  <motion.li key={p.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link
                      to={productPath(p)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setQuery('');
                        setFocused(false);
                        inputRef.current?.blur();
                      }}
                      className="flex items-center gap-3 rounded-lg px-1 py-2 hover:bg-page"
                    >
                      <DeviceImage kind={p.kind} color={p.color} className="h-11 w-11 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{p.name}</span>
                        <span className="text-sm font-bold text-primary">{formatPrice(p.price)}</span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="py-4 text-center text-sm text-muted">Không tìm thấy sản phẩm cho "{query}"</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
