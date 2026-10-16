import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostClient } from '../../../components/routes/BlogClient';
import { BLOG_POSTS } from '../../../data/posts';
import { getBlogPostSchema } from '../../../lib/schema';
import { fitDesc, fitTitle } from '../../../lib/seo';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: fitTitle(`${post.title} | Solent Marine UK`),
    description: fitDesc(post.metaDescription),
    alternates: { canonical: `/blog/${post.slug}/` }
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const schema = getBlogPostSchema(post);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogPostClient slug={slug} />
    </>
  );
}
