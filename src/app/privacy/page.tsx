import type { Metadata } from 'next';
import StaticPageClient from '../../components/routes/StaticPageClient';

export const metadata: Metadata = {
  title: 'Privacy Policy & Cookies | Solent Marine UK',
  description:
    'Solent Marine Outboards UK GDPR notice. How your transaction logs and cookie tracking are handled securely.',
  alternates: { canonical: '/privacy/' }
};

export default function Page() {
  return <StaticPageClient page="privacy" />;
}
