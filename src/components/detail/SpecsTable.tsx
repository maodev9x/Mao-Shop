import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/format';
import type { SpecRow } from '../../types';
import Reveal from '../ui/Reveal';

const VISIBLE_ROWS = 10;

function Row({ row, index }: { row: SpecRow; index: number }) {
  return (
    <tr className={cn('align-top', index % 2 === 0 ? 'bg-page/70' : 'bg-white')}>
      <th scope="row" className="w-2/5 px-3 py-2.5 text-left text-xs font-medium text-ink/70 sm:text-sm">
        {row.label}
      </th>
      <td className="px-3 py-2.5 text-xs whitespace-pre-line text-ink sm:text-sm">{row.value}</td>
    </tr>
  );
}

export default function SpecsTable({ specs }: { specs: SpecRow[] }) {
  const [open, setOpen] = useState(false);
  const rest = specs.slice(VISIBLE_ROWS);

  return (
    <Reveal>
      <div id="thong-so" className="scroll-mt-24">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold">Thông số kỹ thuật</h2>
          {rest.length > 0 && (
            <button type="button" onClick={() => setOpen((v) => !v)} className="flex items-center gap-0.5 text-sm font-medium text-blue">
              {open ? 'Thu gọn' : 'Xem tất cả'} <ChevronRight className={cn('h-4 w-4 transition-transform', open && 'rotate-90')} />
            </button>
          )}
        </div>
        <div className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-black/[0.03]">
          <table className="w-full border-collapse">
            <tbody>
              {specs.slice(0, VISIBLE_ROWS).map((row, i) => (
                <Row key={row.label} row={row} index={i} />
              ))}
            </tbody>
          </table>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <table className="w-full border-collapse">
                  <tbody>
                    {rest.map((row, i) => (
                      <Row key={row.label} row={row} index={i + VISIBLE_ROWS} />
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {rest.length > 0 && !open && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex items-center gap-1 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium shadow-card hover:border-primary hover:text-primary"
            >
              Xem cấu hình chi tiết <ChevronDown className="h-4 w-4" />
            </button>
          )}
          <a
            href="#so-sanh"
            className="flex items-center gap-1 rounded-lg border border-blue px-4 py-2 text-sm font-medium text-blue transition-colors hover:bg-blue-soft"
          >
            So sánh các phiên bản <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}
