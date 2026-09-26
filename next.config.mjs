/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async headers() {
    const agentLinks = [
      '</.well-known/api-catalog>; rel="api-catalog"',
      '</.well-known/agent-skills/index.json>; rel="describedby"',
      '</llms.txt>; rel="describedby"',
      '</.well-known/mcp/server-card.json>; rel="service-desc"',
      '</auth.md>; rel="auth"',
      '</.well-known/openid-configuration>; rel="openid-configuration"'
    ].join(', ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          { key: 'Link', value: agentLinks }
        ]
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      },
      {
        source: '/.well-known/api-catalog',
        headers: [
          { key: 'Content-Type', value: 'application/linkset+json' },
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      },
      {
        source: '/.well-known/:path*.json',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      },
      {
        source: '/.well-known/oauth-protected-resource',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      },
      {
        source: '/.well-known/oauth-authorization-server',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      },
      {
        source: '/.well-known/openid-configuration',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      },
      {
        source: '/.well-known/ucp',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      },
      {
        source: '/auth.md',
        headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }]
      },
      {
        source: '/llms.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.outboardmotors.co.uk' }],
        destination: 'https://outboardmotors.co.uk/:path*',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
