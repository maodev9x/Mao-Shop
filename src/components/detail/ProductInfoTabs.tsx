import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { Product, ProductDetail } from '../../types';
import Expandable from '../ui/Expandable';
import { UnderlineTabs } from '../ui/Tabs';
import DescriptionContent from '../shared/DescriptionContent';
import HighlightContent from './HighlightContent';

const tabs = [
  { value: 'highlight', label: 'Thông tin nổi bật' },
  { value: 'description', label: 'Mô tả sản phẩm' },
];

export default function ProductInfoTabs({ product, detail }: { product: Product; detail: ProductDetail }) {
  const [tab, setTab] = useState('highlight');

  return (
    <div>
      <UnderlineTabs options={tabs} value={tab} onChange={setTab} className="mx-auto mb-4 max-w-sm" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {tab === 'highlight' ? (
            <Expandable collapsedHeight={1100} fadeClassName="from-page" moreLabel="Xem thêm thông tin nổi bật">
              <HighlightContent product={product} detail={detail} />
            </Expandable>
          ) : (
            <DescriptionContent title={`Đặc điểm nổi bật của ${product.name}`} highlights={detail.highlights} paragraphs={detail.description} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
