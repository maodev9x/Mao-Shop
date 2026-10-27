import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { menuLink } from '../../data/categories';
import { menuCategories } from '../../data/site';
import { cn } from '../../lib/format';

type Props = {
  className?: string;
  panelHeight?: string;
  /** Called after a link is followed (e.g. to close the header dropdown) */
  onNavigate?: () => void;
};

type MenuLinkProps = {
  to: string | null;
  fallback: string;
  className: string;
  children: ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
};

/** Category pages use router links; entries that are not categories keep their anchor. */
function MenuLink({ to, fallback, children, onClick, ...rest }: MenuLinkProps) {
  return to ? (
    <Link to={to} onClick={onClick} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={fallback} {...rest}>
      {children}
    </a>
  );
}

/** Category list with a hover mega-menu panel to its right (desktop). */
export default function CategoryMenu({ className, panelHeight = 'h-full', onNavigate }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const current = menuCategories.find((c) => c.id === active);

  const close = () => {
    setActive(null);
    onNavigate?.();
  };

  return (
    <nav className={cn('relative', className)} onMouseLeave={() => setActive(null)} aria-label="Danh mục sản phẩm">
      <ul className="py-1.5">
        {menuCategories.map(({ id, name, icon: Icon }) => (
          <li key={id}>
            <MenuLink
              to={menuLink(id)}
              fallback={`#${id}`}
              onClick={close}
              onMouseEnter={() => setActive(id)}
              onFocus={() => setActive(id)}
              className={cn(
                'group flex items-center gap-2 rounded-lg px-2.5 py-[7px] text-[13px] font-medium transition-colors',
                active === id ? 'bg-primary-soft/70 text-primary' : 'text-ink hover:bg-page',
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0 text-ink/70 group-hover:text-primary" />
              <span className="flex-1 truncate">{name}</span>
              <ChevronRight className="h-4 w-4 text-ink/40 transition-transform group-hover:translate-x-0.5" />
            </MenuLink>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'absolute top-0 left-full z-40 ml-2 hidden w-[min(940px,calc(100vw-280px))] overflow-y-auto rounded-xl bg-white p-6 shadow-lift ring-1 ring-black/5 lg:block',
              panelHeight,
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-4 gap-6"
              >
                {current.groups.map((g) => (
                  <div key={g.title}>
                    <p className="mb-2 text-sm font-bold text-ink">{g.title}</p>
                    <ul className="space-y-1.5">
                      {g.items.map((item) => (
                        <li key={item}>
                          <MenuLink to={menuLink(current.id, g.title, item)} fallback={`#${current.id}`} onClick={close} className="text-[13px] text-ink/70 transition-colors hover:text-primary">
                            {item}
                          </MenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
