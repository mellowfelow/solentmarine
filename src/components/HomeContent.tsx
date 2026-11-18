import NavLink from './NavLink';
import { CATEGORIES, BRANDS } from '../config/site';
import { BLOG_POSTS } from '../data/posts';
import { HOME_FAQS } from '../data/homeContent';

/**
 * Server-renderable homepage content: category and brand links, guides and FAQ.
 * Keeps the homepage rich in crawlable internal links (categories, brands, guides) and
 * answers the questions buyers ask first.
 */
export default function HomeContent() {
  const guides = BLOG_POSTS.filter((p) =>
    ['outboard-horsepower-guide', 'electric-outboard-motors-explained', 'best-outboard-for-dinghy-tender-kayak', 'affordable-outboard-motors-uk', 'outboard-motor-maintenance-guide', 'outboard-serial-number-year-guide'].includes(p.slug)
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <section aria-labelledby="home-buy-heading" className="space-y-5">
        <h2 id="home-buy-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Buy outboard motors online from Solent Marine UK</h2>
        <p className="text-slate-700 leading-relaxed max-w-3xl">
          Solent Marine Outboards UK supplies new outboard motors for sale across the UK, from 2.5HP tender engines to 400HP offshore power. Every engine is unboxed, inspected and test-run before dispatch, and supplied with the UK manufacturer warranty. Choose your size below, or browse the complete <NavLink view="shop" className="text-sky-700 font-semibold underline">outboard engines for sale directory</NavLink>.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => (
            <li key={c.slug} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-sky-300 transition">
              <NavLink view="shop-category" params={{ slug: c.slug }} className="block space-y-1.5">
                <span className="block font-bold text-slate-900">{c.name}</span>
                <span className="block text-sm text-slate-600 leading-relaxed">{c.description}</span>
                <span className="block text-sm font-semibold text-sky-800">View range &rarr;</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="home-brands-heading" className="space-y-4">
        <h2 id="home-brands-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Outboards by brand</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BRANDS.map((b) => (
            <li key={b.slug} className="text-sm text-slate-700 leading-relaxed">
              <NavLink view="shop-category" params={{ slug: b.slug }} className="font-bold text-sky-800 underline">{b.name} outboards</NavLink>: {b.description}
            </li>
          ))}
        </ul>
        <p><NavLink view="brands" className="text-sky-700 font-semibold underline">See all outboard motor brands</NavLink></p>
      </section>

      <section aria-labelledby="home-guides-heading" className="space-y-4">
        <h2 id="home-guides-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Outboard buying guides and advice</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {guides.map((g) => (
            <li key={g.slug} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <NavLink view="blog-post" params={{ slug: g.slug }} className="block space-y-1">
                <span className="block font-bold text-slate-900">{g.title}</span>
                <span className="block text-sm text-slate-600">{g.metaDescription}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <p><NavLink view="blog" className="text-sky-700 font-semibold underline">Read all outboard motor guides</NavLink></p>
      </section>

      <section aria-labelledby="home-faq-heading" className="space-y-4">
        <h2 id="home-faq-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Outboard motor questions, answered</h2>
        <div className="space-y-3">
          {HOME_FAQS.map((f) => (
            <div key={f.question} className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
              <h3 className="font-bold text-slate-900 text-sm mb-1">{f.question}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
        <p><NavLink view="faq" className="text-sky-700 font-semibold underline">See all FAQs</NavLink></p>
      </section>
    </div>
  );
}
