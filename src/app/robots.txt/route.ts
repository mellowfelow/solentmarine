import { SITE } from '../../config/site';

export const runtime = 'nodejs';

const AI_CRAWLERS = [
  'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot',
  'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai'
];

// A plain Route Handler instead of the app/robots.ts metadata convention because
// MetadataRoute.Robots has no field for the emerging Content-Signal directive
// (https://contentsignals.org) that isitagentready.com's Bot Access Control check
// looks for — this gives full control over the raw text.
export function GET() {
  const origin = `https://${SITE.domain}`;

  const lines = [
    'User-Agent: *',
    'Allow: /',
    'Disallow: /thank-you-contact/',
    'Disallow: /thank-you-order/',
    'Disallow: /thank-you-wholesale/',
    'Disallow: /admin/',
    '',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    '',
    '# AI crawlers — welcome to index product & content pages',
    ...AI_CRAWLERS.flatMap((agent) => [`User-Agent: ${agent}`, 'Allow: /', '']),
    '# Agent-readable resources',
    `# llms.txt: ${origin}/llms.txt`,
    `# API Catalog: ${origin}/.well-known/api-catalog`,
    `# Agent Skills: ${origin}/.well-known/agent-skills/index.json`,
    `# MCP Server Card: ${origin}/.well-known/mcp/server-card.json`,
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    ''
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
