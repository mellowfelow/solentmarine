import { SITE } from '../../config/site';

export const runtime = 'nodejs';

// Search, answer and training crawlers are all welcome (owner decision: allow AI training).
const AI_CRAWLERS = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User',
  'MistralAI-User', 'MistralAI-Index',
  'Google-Extended', 'Applebot', 'Applebot-Extended', 'Amazonbot', 'Bytespider', 'CCBot',
  'Meta-ExternalAgent', 'Meta-WebIndexer', 'cohere-ai', 'DuckAssistBot'
];

// A plain Route Handler instead of the app/robots.ts metadata convention because
// MetadataRoute.Robots has no field for the emerging Content-Signal directive
// (https://contentsignals.org) that isitagentready.com's Bot Access Control check looks for.
export function GET() {
  const origin = `https://${SITE.domain}`;

  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /order/',
    '',
    'Content-Signal: search=yes, ai-input=yes, ai-train=yes',
    '',
    '# AI crawlers: welcome to index product and content pages',
    ...AI_CRAWLERS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', 'Disallow: /admin/', 'Disallow: /api/', 'Disallow: /order/', '']),
    '# Agent-readable resources',
    `# llms.txt: ${origin}/llms.txt`,
    `# llms-full.txt: ${origin}/llms-full.txt`,
    `# API Catalog: ${origin}/.well-known/api-catalog`,
    `# Agent Skills: ${origin}/.well-known/agent-skills/index.json`,
    `# MCP Server Card: ${origin}/.well-known/mcp/server-card.json`,
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    ''
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
  });
}
