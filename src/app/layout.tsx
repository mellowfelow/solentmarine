import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import AppShell from '../components/AppShell';
import { StoreProvider } from '../context/store';
import { SITE } from '../config/site';

const SITE_ORIGIN = `https://${SITE.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: 'Outboard Motors UK | Solent Marine Boat Engines Specialist',
  description:
    "UK's premier outboard motors catalog and dealer directory. Featuring Yamaha, Suzuki, Honda, Mercury, Tohatsu, and Torqeedo engines with detailed specs, comparisons, finance calculations, and UK-wide delivery guides.",
  verification: {
    google: 'google-site-verification-solent-marine-uk-2026'
  },
  other: {
    'indexnow-key': 'om-indexnow-solent-marine-key'
  },
  openGraph: {
    siteName: SITE.name,
    type: 'website',
    url: SITE_ORIGIN,
    images: [{ url: '/images/hero/hero-yamaha-200-rib.jpg', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/hero/hero-yamaha-200-rib.jpg']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        {/* Agent/discovery resource links — not modeled by the Metadata API */}
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <link rel="describedby" href="/.well-known/agent-skills/index.json" />
        <link rel="describedby" href="/llms.txt" />
        <link rel="service-desc" href="/.well-known/mcp/server-card.json" />
        <link rel="auth" href="/auth.md" />
        <link rel="openid-configuration" href="/.well-known/openid-configuration" />
      </head>
      <body className="bg-white text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
        <Script src="/js/webmcp.js" strategy="afterInteractive" />
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}
