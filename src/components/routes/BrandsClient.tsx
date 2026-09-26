'use client';

import { useRouter } from 'next/navigation';
import BrandsView, { BrandCardData } from '../pages/BrandsView';
import { pathForView } from '../../lib/navigate';

export default function BrandsClient({ brands }: { brands: BrandCardData[] }) {
  const router = useRouter();

  return <BrandsView brands={brands} onNavigate={(view, params) => router.push(pathForView(view, params))} />;
}
