'use client';

import { useRouter } from 'next/navigation';
import HomeView from '../pages/HomeView';
import { OUTBOARD_PRODUCTS } from '../../data/products';
import { useStore } from '../../context/store';
import { pathForView } from '../../lib/navigate';

export default function HomeClient() {
  const router = useRouter();
  const { addToCompare, compareList } = useStore();

  return (
    <HomeView
      products={OUTBOARD_PRODUCTS}
      onNavigate={(view, params) => router.push(pathForView(view, params))}
      onAddToCompare={addToCompare}
      compareList={compareList}
    />
  );
}
