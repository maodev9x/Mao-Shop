import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { menuLink } from '../../data/categories';
import { menuCategories } from '../../data/site';
import Accordion from '../ui/Accordion';
import Drawer from '../ui/Drawer';
import Logo from './Logo';

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} label="Menu danh mục" side="left" wrapperClassName="lg:hidden" className="w-[min(86vw,340px)]">
      <div className="flex items-center justify-between bg-primary px-4 py-3">
        <Logo />
        <button type="button" onClick={onClose} aria-label="Đóng menu" className="rounded-lg p-1 text-white hover:bg-white/15">
          <X className="h-6 w-6" />
        </button>
      </div>
      <Accordion
        className="flex-1 overflow-y-auto p-2"
        itemClassName="border-b border-line last:border-0"
        buttonClassName="px-2 py-3 text-sm font-medium"
        items={menuCategories.map(({ id, name, icon: Icon, groups }) => ({
          id,
          title: (
            <>
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              <span>{name}</span>
            </>
          ),
          content: (
            <div className="space-y-3 px-10 pb-3">
              {groups.map((g) => (
                <div key={g.title}>
                  <p className="mb-1 text-xs font-bold text-muted uppercase">{g.title}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((item) => {
                      const to = menuLink(id, g.title, item);
                      const cls = 'rounded-full bg-page px-2.5 py-1 text-xs';
                      return to ? (
                        <Link key={item} to={to} onClick={onClose} className={cls}>
                          {item}
                        </Link>
                      ) : (
                        <a key={item} href={`#${id}`} onClick={onClose} className={cls}>
                          {item}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ),
        }))}
      />
    </Drawer>
  );
}
