'use client';

import { useRouter } from 'next/navigation';
import { FAQView, ContactView, AboutView, ShippingView, PrivacyView, TermsView } from '../pages/StaticViews';
import { pathForView } from '../../lib/navigate';

type StaticPage = 'faq' | 'contact' | 'about' | 'shipping' | 'privacy' | 'terms';

export default function StaticPageClient({ page }: { page: StaticPage }) {
  const router = useRouter();
  const onNavigate = (view: string, params?: Record<string, string>) => router.push(pathForView(view, params));

  switch (page) {
    case 'faq':
      return <FAQView onNavigate={onNavigate} />;
    case 'contact':
      return <ContactView onNavigate={onNavigate} />;
    case 'about':
      return <AboutView onNavigate={onNavigate} />;
    case 'shipping':
      return <ShippingView onNavigate={onNavigate} />;
    case 'privacy':
      return <PrivacyView />;
    case 'terms':
      return <TermsView />;
  }
}
