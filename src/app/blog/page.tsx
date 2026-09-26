import type { Metadata } from 'next';
import { BlogIndexClient } from '../../components/routes/BlogClient';
import { BLOG_POSTS } from '../../data/posts';
import { getBlogIndexSchema } from '../../lib/schema';

export const metadata: Metadata = {
  title: 'Outboard Motor Guides & Advice | Solent Marine UK',
  description: 'Sizing guides, maintenance how-tos, and buying advice for outboard motors — from choosing the right HP to winterizing your engine.',
  alternates: { canonical: '/blog/' }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogIndexSchema(BLOG_POSTS.length)) }}
      />
      <BlogIndexClient />
    </>
  );
}
