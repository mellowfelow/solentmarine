import type { Metadata } from 'next';
import { BlogIndexClient } from '../../components/routes/BlogClient';

export const metadata: Metadata = {
  title: 'Outboard Motor Guides & Advice | Solent Marine UK',
  description: 'Sizing guides, maintenance how-tos, and buying advice for outboard motors — from choosing the right HP to winterizing your engine.',
  alternates: { canonical: '/blog/' }
};

export default function Page() {
  return <BlogIndexClient />;
}
