'use client';

import { useRouter } from 'next/navigation';
import ShopView from '../pages/ShopView';
import { OUTBOARD_PRODUCTS } from '../../data/products';
import { useStore } from '../../context/store';
import { pathForView } from '../../lib/navigate';

export default function ShopClient({ categorySlug, brandSlug }: { categorySlug?: string; brandSlug?: string }) {
  const router = useRouter();
  const { addToCompare, compareList, addToBasket } = useStore();

  return (
    <ShopView
      products={OUTBOARD_PRODUCTS}
      categorySlug={categorySlug}
      brandSlug={brandSlug}
      onNavigate={(view, params) => router.push(pathForView(view, params))}
      onAddToCompare={addToCompare}
      compareList={compareList}
      onAddToBasket={addToBasket}
    />
  );
}
