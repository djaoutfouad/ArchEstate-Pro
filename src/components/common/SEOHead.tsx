import React, { useEffect } from 'react';
import { CalculatorDefinition, CategoryInfo } from '../../types/calculator';
import { 
  SITE_URL, 
  SITE_NAME, 
  SITE_TAGLINE, 
  SITE_DESCRIPTION, 
  CONTACT_EMAIL, 
  getCanonicalUrl, 
  getCalculatorPath, 
  getCategoryPath 
} from '../../config/site';

interface SEOHeadProps {
  calculator?: CalculatorDefinition | null;
  category?: CategoryInfo | null;
  legalType?: 'contact' | 'privacy' | 'terms' | 'about' | 'methodology' | null;
  pathname?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ 
  calculator, 
  category, 
  legalType, 
  pathname = '/' 
}) => {
  // Determine title, description, and canonical
  let pageTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;
  let metaDesc = SITE_DESCRIPTION;
  let canonicalUrl = getCanonicalUrl(pathname);

  if (calculator) {
    pageTitle = `${calculator.title} — ${SITE_NAME}`;
    metaDesc = `${calculator.shortDescription} Accurate materials, quantities, and financial formulas on ArchEstate Pro.`;
    canonicalUrl = getCanonicalUrl(getCalculatorPath(calculator.slug));
  } else if (category) {
    pageTitle = `${category.name} Calculators — ${SITE_NAME}`;
    metaDesc = `${category.description} Free online engineering and architectural calculation tools.`;
    canonicalUrl = getCanonicalUrl(getCategoryPath(category.id));
  } else if (legalType) {
    const titles: Record<string, string> = {
      about: `About Us — ${SITE_NAME}`,
      contact: `Contact Engineering & Support — ${SITE_NAME}`,
      privacy: `Privacy Policy — ${SITE_NAME}`,
      terms: `Terms of Service & Disclaimers — ${SITE_NAME}`,
      methodology: `Engineering & Calculation Methodology — ${SITE_NAME}`,
    };
    pageTitle = titles[legalType] || pageTitle;
    canonicalUrl = getCanonicalUrl(`/${legalType}`);
  }

  // Client-side DOM update for SPA transitions
  useEffect(() => {
    document.title = pageTitle;
    
    // Update description
    let descElem = document.querySelector('meta[name="description"]');
    if (!descElem) {
      descElem = document.createElement('meta');
      descElem.setAttribute('name', 'description');
      document.head.appendChild(descElem);
    }
    descElem.setAttribute('content', metaDesc);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // OpenGraph
    const updateMeta = (attr: string, val: string, content: string) => {
      let elem = document.querySelector(`meta[${attr}="${val}"]`);
      if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute(attr, val);
        document.head.appendChild(elem);
      }
      elem.setAttribute('content', content);
    };

    updateMeta('property', 'og:title', pageTitle);
    updateMeta('property', 'og:description', metaDesc);
    updateMeta('property', 'og:url', canonicalUrl);
    updateMeta('property', 'og:site_name', SITE_NAME);
    updateMeta('name', 'twitter:title', pageTitle);
    updateMeta('name', 'twitter:description', metaDesc);
  }, [pageTitle, metaDesc, canonicalUrl]);

  // Generate JSON-LD SoftwareApplication / WebApplication Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': calculator ? `${calculator.title} | ${SITE_NAME}` : `${SITE_NAME} Computational Suite`,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'url': canonicalUrl,
    'description': metaDesc,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'author': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'email': CONTACT_EMAIL,
      'url': SITE_URL,
    },
  };

  // BreadcrumbList Schema for SEO crawlability
  const breadcrumbSchema = calculator ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': SITE_NAME,
        'item': `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': calculator.categoryName,
        'item': getCanonicalUrl(getCategoryPath(calculator.category)),
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': calculator.title,
        'item': canonicalUrl,
      },
    ],
  } : category ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': SITE_NAME,
        'item': `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': category.name,
        'item': canonicalUrl,
      },
    ],
  } : null;

  const faqSchema = calculator && calculator.faqs && calculator.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': calculator.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
};
