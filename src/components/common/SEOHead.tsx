import React, { useEffect } from 'react';
import { CalculatorDefinition } from '../../types/calculator';

interface SEOHeadProps {
  calculator?: CalculatorDefinition | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ calculator }) => {
  useEffect(() => {
    if (calculator) {
      document.title = `${calculator.title} — ArchEstate Pro`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `${calculator.shortDescription} Accurate materials, quantities, and financial formulas on ArchEstate Pro.`
        );
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${calculator.title} — ArchEstate Pro`);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', calculator.shortDescription);
      }
    } else {
      document.title = 'ArchEstate Pro — Architectural, Construction & Real Estate Calculators';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Precision Architecture, Construction, False Ceiling & Real Estate PropTech calculator suite for contractors, architects, remodelers, and property investors.'
        );
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', 'ArchEstate Pro — Architectural, Construction & Real Estate Calculators');
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute(
          'content',
          'Precision Architecture, Construction, False Ceiling & Real Estate PropTech calculator suite for contractors, architects, remodelers, and property investors.'
        );
      }
    }
  }, [calculator]);

  // Generate JSON-LD SoftwareApplication / WebApplication Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': calculator ? `${calculator.title} | ArchEstate Pro` : 'ArchEstate Pro Computational Suite',
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'description': calculator 
      ? calculator.shortDescription 
      : 'Precision Architecture, Construction, False Ceiling & Real Estate PropTech calculator suite for contractors, architects, remodelers, and property investors.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'author': {
      '@type': 'Organization',
      'name': 'ArchEstate Pro',
      'email': 'contact.archestate@gmail.com',
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
        'name': 'ArchEstate Pro',
        'item': 'https://archestatepro.app/',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': calculator.categoryName,
        'item': `https://archestatepro.app/#${calculator.category}`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': calculator.title,
        'item': `https://archestatepro.app/#${calculator.slug}`,
      },
    ],
  } : null;

  const faqSchema = calculator && calculator.faqs.length > 0 ? {
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
