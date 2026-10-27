import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { readStorage, writeStorage } from '../../lib/storage';
import type { Voucher } from '../../types';

const KEY = 'maoshop.vouchers';

/** Ticket-style vouchers; "Thu thập" saves them in localStorage. */
export default function VoucherList({ vouchers, scope }: { vouchers: Voucher[]; scope: string }) {
  const { notify } = useShop();
  const [saved, setSaved] = useState<string[]>(() => readStorage<string[]>(KEY, []));

  const collect = (v: Voucher) => {
    const id = `${scope}-${v.id}`;
    if (saved.includes(id)) return;
    const next = [...saved, id];
    setSaved(next);
    writeStorage(KEY, next);
    notify(`Đã lưu voucher "${v.title}"`);
  };

  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
      {vouchers.map((v) => {
        const done = saved.includes(`${scope}-${v.id}`);
        return (
          <div key={v.id} className="flex w-80 max-w-[85vw] shrink-0 overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-primary/20">
            {/* ticket stub with punched edge */}
            <div className="relative flex w-16 shrink-0 flex-col items-center justify-center bg-gradient-to-b from-primary-light to-primary text-white">
              <span className="text-[10px] font-semibold uppercase">Giảm</span>
              <span className="text-base font-black">{v.discount}</span>
              <span className="absolute top-0 -right-1.5 h-full w-3 bg-[radial-gradient(circle,transparent_4px,white_4.5px)] bg-[length:12px_12px]" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 p-3">
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-[13px] leading-snug font-semibold">{v.title}</p>
                <p className="line-clamp-2 text-[11px] text-ink/70">{v.detail}</p>
                <p className="mt-0.5 text-[10px] text-muted">HSD: {v.expires}</p>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => collect(v)}
                disabled={done}
                aria-pressed={done}
                className="relative h-8 shrink-0 overflow-hidden rounded-lg bg-primary px-3 text-xs font-semibold text-white transition-colors hover:bg-primary-dark disabled:bg-emerald-500"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {done ? (
                    <motion.span key="done" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} /> Đã lưu
                    </motion.span>
                  ) : (
                    <motion.span key="collect" exit={{ y: -12, opacity: 0 }}>
                      Thu thập
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
