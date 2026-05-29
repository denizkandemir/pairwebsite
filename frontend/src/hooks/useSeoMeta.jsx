import { useEffect } from 'react';
import { SITE, absoluteUrl, toKeywordString } from '../seo/siteSeo';

const updateOrCreateMeta = (selector, attributes) => {
  const existing = document.head.querySelector(selector) || document.createElement('meta');

  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      existing.setAttribute(key, value);
    }
  });

  if (!existing.parentNode) {
    document.head.appendChild(existing);
  }

  return existing;
};

const updateOrCreateLink = (selector, attributes) => {
  const existing = document.head.querySelector(selector) || document.createElement('link');

  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      existing.setAttribute(key, value);
    }
  });

  if (!existing.parentNode) {
    document.head.appendChild(existing);
  }

  return existing;
};

const syncSchemaScripts = (schemas = []) => {
  document.head.querySelectorAll('script[data-seo-schema="true"]').forEach((script) => {
    if (!schemas.some((schema) => schema.key === script.dataset.seoSchemaKey)) {
      script.remove();
    }
  });

  schemas.forEach((schema) => {
    if (!schema?.data) return;

    let script = document.head.querySelector(`script[data-seo-schema-key="${schema.key}"]`);
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoSchema = 'true';
      script.dataset.seoSchemaKey = schema.key;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema.data);
  });
};

const useSeoMeta = ({
  title,
  description,
  path = '/',
  image = SITE.imageUrl,
  type = 'website',
  keywords = [],
  locale = 'en_US',
  robots = 'index, follow',
  siteName = SITE.name,
  canonicalPath,
  schemas = [],
  themeColor = '#111827',
  language = 'en',
  author = SITE.name,
} = {}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const canonicalTarget = canonicalPath || path;
    const absoluteCanonical = absoluteUrl(canonicalTarget);

    if (title) {
      document.title = title;
    }

    if (language) {
      document.documentElement.lang = language;
    }

    updateOrCreateMeta('meta[data-seo-meta="description"]', {
      'data-seo-meta': 'description',
      name: 'description',
      content: description || SITE.description,
    });

    updateOrCreateMeta('meta[data-seo-meta="keywords"]', {
      'data-seo-meta': 'keywords',
      name: 'keywords',
      content: toKeywordString(keywords.length ? keywords : SITE.keywords),
    });

    updateOrCreateMeta('meta[data-seo-meta="author"]', {
      'data-seo-meta': 'author',
      name: 'author',
      content: author,
    });

    updateOrCreateMeta('meta[data-seo-meta="robots"]', {
      'data-seo-meta': 'robots',
      name: 'robots',
      content: robots,
    });

    updateOrCreateMeta('meta[data-seo-meta="theme-color"]', {
      'data-seo-meta': 'theme-color',
      name: 'theme-color',
      content: themeColor,
    });

    updateOrCreateMeta('meta[data-seo-meta="og:title"]', {
      'data-seo-meta': 'og:title',
      property: 'og:title',
      content: title || SITE.name,
    });

    updateOrCreateMeta('meta[data-seo-meta="og:description"]', {
      'data-seo-meta': 'og:description',
      property: 'og:description',
      content: description || SITE.description,
    });

    updateOrCreateMeta('meta[data-seo-meta="og:url"]', {
      'data-seo-meta': 'og:url',
      property: 'og:url',
      content: absoluteCanonical,
    });

    updateOrCreateMeta('meta[data-seo-meta="og:type"]', {
      'data-seo-meta': 'og:type',
      property: 'og:type',
      content: type,
    });

    updateOrCreateMeta('meta[data-seo-meta="og:site_name"]', {
      'data-seo-meta': 'og:site_name',
      property: 'og:site_name',
      content: siteName,
    });

    updateOrCreateMeta('meta[data-seo-meta="og:image"]', {
      'data-seo-meta': 'og:image',
      property: 'og:image',
      content: absoluteUrl(image),
    });

    updateOrCreateMeta('meta[data-seo-meta="og:locale"]', {
      'data-seo-meta': 'og:locale',
      property: 'og:locale',
      content: locale,
    });

    updateOrCreateMeta('meta[data-seo-meta="twitter:card"]', {
      'data-seo-meta': 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    updateOrCreateMeta('meta[data-seo-meta="twitter:title"]', {
      'data-seo-meta': 'twitter:title',
      name: 'twitter:title',
      content: title || SITE.name,
    });

    updateOrCreateMeta('meta[data-seo-meta="twitter:description"]', {
      'data-seo-meta': 'twitter:description',
      name: 'twitter:description',
      content: description || SITE.description,
    });

    updateOrCreateMeta('meta[data-seo-meta="twitter:image"]', {
      'data-seo-meta': 'twitter:image',
      name: 'twitter:image',
      content: absoluteUrl(image),
    });

    updateOrCreateLink('link[data-seo-meta="canonical"]', {
      'data-seo-meta': 'canonical',
      rel: 'canonical',
      href: absoluteCanonical,
    });

    syncSchemaScripts(schemas);
  }, [title, description, path, image, type, keywords, locale, robots, siteName, canonicalPath, author, themeColor, language, schemas]);
};

export default useSeoMeta;