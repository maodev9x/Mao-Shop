import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/format';

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode };

type Props = {
  items: AccordionItem[];
  /** Item open on first render */
  defaultOpen?: string | null;
  className?: string;
  itemClassName?: string;
  buttonClassName?: string;
  iconClassName?: string;
};

/** List where at most one item is expanded; content animates its height open and closed. */
export default function Accordion({ items, defaultOpen = null, className, itemClassName, buttonClassName, iconClassName }: Props) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen);

  return (
    <ul className={className}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <li key={item.id} className={itemClassName}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className={cn('flex w-full items-center gap-3 text-left', buttonClassName)}
            >
              <span className="flex min-w-0 flex-1 items-center gap-3">{item.title}</span>
              <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted transition-transform duration-300', isOpen && 'rotate-180', iconClassName)} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  {item.content}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
