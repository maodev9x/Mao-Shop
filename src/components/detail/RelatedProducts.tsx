import { useMemo, useState } from 'react';
import { getRelated, getUsedAlternatives } from '../../data/products';
import type { Product } from '../../types';
import ProductCarousel from '../product/ProductCarousel';
import { UnderlineTabs } from '../ui/Tabs';
import Reveal from '../ui/Reveal';

const tabs = [
  { value: 'used', label: 'Tham khảo hàng cũ' },
  { value: 'similar', label: 'Sản phẩm tương tự' },
];

export default function RelatedProducts({ product }: { product: Product }) {
  const [tab, setTab] = useState('similar');
  const lists = useMemo(() => ({ used: getUsedAlternatives(product), similar: getRelated(product) }), [product]);

  return (
    <Reveal as="section" className="mt-10">
      <h2 className="mb-2 text-lg font-bold">Có thể bạn cũng thích</h2>
      <UnderlineTabs options={tabs} value={tab} onChange={setTab} className="mb-3 max-w-md" />
      <ProductCarousel products={tab === 'used' ? lists.used : lists.similar} filterKey={tab} />
    </Reveal>
  );
}
