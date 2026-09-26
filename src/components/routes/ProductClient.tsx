'use client';

import { useRouter } from 'next/navigation';
import ProductDetailsView from '../pages/ProductDetailsView';
import { OUTBOARD_PRODUCTS } from '../../data/products';
import { useStore } from '../../context/store';
import { pathForView } from '../../lib/navigate';

export default function ProductClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { addToCompare, compareList, addToBasket } = useStore();

  return (
    <ProductDetailsView
      slug={slug}
      products={OUTBOARD_PRODUCTS}
      onNavigate={(view, params) => router.push(pathForView(view, params))}
      onAddToCompare={addToCompare}
      compareList={compareList}
      onAddToBasket={addToBasket}
    />
  );
}
