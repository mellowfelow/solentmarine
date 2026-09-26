'use client';

import { useRouter } from 'next/navigation';
import CompareView from '../pages/CompareView';
import { useStore } from '../../context/store';
import { pathForView } from '../../lib/navigate';

export default function CompareClient() {
  const router = useRouter();
  const { compareList, removeFromCompare, clearCompare, addToBasket } = useStore();

  return (
    <CompareView
      compareList={compareList}
      onRemove={removeFromCompare}
      onClear={clearCompare}
      onNavigate={(view, params) => router.push(pathForView(view, params))}
      onAddToBasket={addToBasket}
    />
  );
}
