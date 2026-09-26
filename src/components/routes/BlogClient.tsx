'use client';

import { useRouter } from 'next/navigation';
import { BlogIndexView, BlogPostView } from '../pages/BlogViews';
import { BLOG_POSTS } from '../../data/posts';
import { pathForView } from '../../lib/navigate';

export function BlogIndexClient() {
  const router = useRouter();
  return (
    <BlogIndexView
      posts={BLOG_POSTS}
      onNavigate={(view, params) => router.push(pathForView(view, params))}
    />
  );
}

export function BlogPostClient({ slug }: { slug: string }) {
  const router = useRouter();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  const related = (post.relatedPostSlugs || [])
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  return (
    <BlogPostView
      post={post}
      related={related}
      onNavigate={(view, params) => router.push(pathForView(view, params))}
    />
  );
}
