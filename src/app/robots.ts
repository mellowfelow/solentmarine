import type { MetadataRoute } from 'next';
import { SITE } from '../config/site';

const AI_CRAWLERS = [
  'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot',
  'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai'
];

export default function robots(): MetadataRoute.Robots {
  const origin = `https://${SITE.domain}`;
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/thank-you-contact/', '/thank-you-order/', '/thank-you-wholesale/', '/admin/'] },
      ...AI_CRAWLERS.map((agent) => ({ userAgent: agent, allow: '/' }))
    ],
    sitemap: `${origin}/sitemap.xml`
  };
}
