import { Link } from 'react-router-dom';
import { getProductById } from '../../data/products';
import { getProductDetail } from '../../data/productDetails';
import { cn, formatPrice, productPath } from '../../lib/format';
import type { Product } from '../../types';
import DeviceImage from '../product/DeviceImage';
import Reveal from '../ui/Reveal';

/** "Which one fits you?" — the current product side by side with its two closest siblings. */
export default function CompareProducts({ ids, current }: { ids: string[]; current: Product }) {
  const items = ids.map((id) => getProductById(id)).filter((p): p is Product => !!p);
  if (items.length < 2) return null;
  const details = items.map((p) => getProductDetail(p));
  const labels = details[0].specs.slice(0, 7).map((s) => s.label);

  return (
    <Reveal>
      <section id="so-sanh" className="mt-6 scroll-mt-24 rounded-2xl bg-white px-4 py-8 text-center shadow-card sm:px-8">
        <p className="text-sm font-semibold text-ink/60">So sánh</p>
        <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">Sản phẩm nào phù hợp với bạn?</h2>
        <div className="no-scrollbar mt-6 overflow-x-auto">
          <div className="mx-auto grid min-w-[540px] max-w-3xl grid-cols-3 gap-4">
            {items.map((p, i) => {
              const isCurrent = p.id === current.id;
              return (
                <div key={p.id} className={cn('rounded-2xl p-3', isCurrent && 'bg-primary-soft/40 ring-1 ring-primary/30')}>
                  <p className="line-clamp-2 min-h-10 text-sm font-semibold">{p.name}</p>
                  <DeviceImage kind={p.kind} color={p.color} className="mx-auto my-3 h-28 w-28" />
                  <div className="flex justify-center gap-1">
                    {details[i].colors.map((c) => (
                      <span key={c.name} title={c.name} className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: c.color }} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-bold text-primary">{formatPrice(p.price)}</p>
                  {isCurrent ? (
                    <span className="mt-2 inline-block rounded-full border border-primary px-4 py-1 text-xs font-medium text-primary">Đang xem</span>
                  ) : (
                    <Link
                      to={productPath(p)}
                      className="mt-2 inline-block rounded-full border border-ink/30 px-4 py-1 text-xs font-medium hover:border-primary hover:text-primary"
                    >
                      Xem
                    </Link>
                  )}
                  <dl className="mt-5 space-y-4 border-t border-line pt-4 text-xs">
                    {labels.map((label) => (
                      <div key={label}>
                        <dt className="font-semibold text-ink/50">{label}</dt>
                        <dd className="mt-0.5 line-clamp-3 whitespace-pre-line">{details[i].specs.find((s) => s.label === label)?.value ?? '—'}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
