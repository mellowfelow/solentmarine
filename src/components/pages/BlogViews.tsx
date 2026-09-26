/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { BlogPost } from '../../types';
import { CATEGORIES } from '../../config/site';

interface NavProp {
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export function BlogIndexView({ posts, onNavigate }: { posts: BlogPost[] } & NavProp) {
  return (
    <div id="blog-index-page" className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-sky-700 cursor-pointer">Home</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 font-semibold">Blog</span>
      </nav>

      <div className="text-center space-y-3 mb-12">
        <BookOpen className="w-12 h-12 text-sky-800 mx-auto" />
        <h1 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">Outboard Motor Guides &amp; Advice</h1>
        <p className="text-base text-slate-500 max-w-2xl mx-auto">
          Sizing guides, maintenance how-tos, and buying advice from the Solent Marine team — everything we know about choosing, running and looking after an outboard motor.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            onClick={() => onNavigate('blog-post', { slug: post.slug })}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-800 bg-sky-50 px-2 py-1 rounded">
                {post.contentType}
              </span>
              <h2 className="font-sans font-bold text-slate-900 text-base leading-snug mt-2.5 hover:text-sky-800 transition">
                {post.title}
              </h2>
              <p className="text-xs text-slate-500 mt-2 line-clamp-3">{post.metaDescription}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-4 pt-3 border-t border-slate-100">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.publishDate}>{new Date(post.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function BlogPostView({ post, related, onNavigate }: { post: BlogPost; related: BlogPost[] } & NavProp) {
  return (
    <div id="blog-post-page" className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-sky-700 cursor-pointer">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button type="button" onClick={() => onNavigate('blog')} className="hover:text-sky-700 cursor-pointer">Blog</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 font-semibold line-clamp-1">{post.title}</span>
      </nav>

      <button
        type="button"
        onClick={() => onNavigate('blog')}
        className="text-slate-600 hover:text-slate-900 font-semibold text-xs flex items-center gap-1 cursor-pointer transition mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to all guides</span>
      </button>

      <article className="prose prose-slate max-w-none">
        <h1 className="font-sans font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight leading-tight mb-2">{post.title}</h1>
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-8">
          <time dateTime={post.publishDate}>{new Date(post.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
          <span>&middot;</span>
          <span>{post.contentType}</span>
        </div>

        <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-2 [&_a]:text-sky-700 [&_a]:font-semibold [&_a]:underline" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

        {post.faq && post.faq.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-200">
            <h2 className="font-sans font-bold text-slate-900 text-lg mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faq.map((f, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{f.question}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related category links */}
      <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 self-center mr-1">Shop related:</span>
        {post.relatedCategorySlugs.map((slug) => {
          const cat = CATEGORIES.find((c) => c.slug === slug);
          if (!cat) return null;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => onNavigate('shop-category', { slug })}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-white text-slate-600 border-slate-200 hover:border-sky-400 hover:text-sky-800 transition"
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-8">
          <h3 className="font-bold text-slate-900 text-sm mb-3">Related guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <button
                key={r.slug}
                type="button"
                onClick={() => onNavigate('blog-post', { slug: r.slug })}
                className="text-left p-3 bg-white border border-slate-200 rounded-lg hover:border-sky-300 transition text-xs font-semibold text-slate-700 hover:text-sky-800"
              >
                {r.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
