/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { SITE } from '../config/site';

interface SEOHeadProps {
  title: string;
  description: string;
  /** Path only, e.g. "/shop/portable/" — absolute canonical is built from SITE.domain so it never drifts. */
  path?: string;
  ogType?: 'website' | 'product';
  ogImage?: string;
  schemaMarkup?: object | object[];
}

const SITE_ORIGIN = `https://${SITE.domain}`;
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/placeholders/portable.svg`;

export default function SEOHead({
  title,
  description,
  path = '/',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  schemaMarkup
}: SEOHeadProps) {
  const canonicalUrl = `${SITE_ORIGIN}${path}`;

  useEffect(() => {
    // 1. Update Title tag
    const fullTitle = `${title} | ${SITE.shortName}`;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 4. Update Open Graph Tags
    const ogTags = {
      'og:title': fullTitle,
      'og:description': description,
      'og:type': ogType,
      'og:url': canonicalUrl,
      'og:image': ogImage,
      'og:site_name': SITE.name
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    });

    // 5. Update Twitter Cards
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': description,
      'twitter:image': ogImage
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let twTag = document.querySelector(`meta[name="${name}"]`);
      if (!twTag) {
        twTag = document.createElement('meta');
        twTag.setAttribute('name', name);
        document.head.appendChild(twTag);
      }
      twTag.setAttribute('content', content);
    });

    // 6. Ingest Structured Schema Markup (JSON-LD)
    const existingSchema = document.getElementById('seo-schema-markup');
    if (existingSchema) {
      existingSchema.remove();
    }

    if (schemaMarkup) {
      const script = document.createElement('script');
      script.id = 'seo-schema-markup';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaMarkup);
      document.head.appendChild(script);
    }

    // Clean up on unmount
    return () => {
      const schema = document.getElementById('seo-schema-markup');
      if (schema) {
        schema.remove();
      }
    };
  }, [title, description, canonicalUrl, ogType, ogImage, schemaMarkup]);

  return null; // Side-effect only component
}
