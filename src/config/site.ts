/**
 * ArchEstate Pro - Central Site Configuration
 * Single source of truth for domain, brand, metadata, and routing
 */

export const SITE_URL = (
  (typeof process !== 'undefined' && process.env?.SITE_URL)
    ? process.env.SITE_URL
    : (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_SITE_URL?: string } }).env?.VITE_SITE_URL)
      ? (import.meta as unknown as { env?: { VITE_SITE_URL?: string } }).env!.VITE_SITE_URL!
      : 'https://archestatepro.com'
).trim().replace(/\/+$/, '');

export const SITE_NAME = 'ArchEstate Pro';
export const SITE_TAGLINE = 'Architectural, Construction & Real Estate Calculators';
export const SITE_DESCRIPTION = 'Precision Architecture, Construction, False Ceiling & Real Estate PropTech calculator suite for contractors, architects, remodelers, and property investors.';
export const CONTACT_EMAIL = 'contact15archestate@gmail.com';

// Category route mapping
export const CATEGORY_ROUTES: Record<string, string> = {
  'ceilings': '/calculators/false-ceilings-drywall',
  'construction': '/calculators/construction-finishing',
  'real-estate': '/calculators/real-estate-financial',
};

// Reverse mapping from route slug to category ID
export const ROUTE_TO_CATEGORY_ID: Record<string, string> = {
  'false-ceilings-drywall': 'ceilings',
  'construction-finishing': 'construction',
  'real-estate-financial': 'real-estate',
};

export const LEGAL_ROUTES = [
  { path: '/about', type: 'about', title: 'About ArchEstate Pro' },
  { path: '/contact', type: 'contact', title: 'Contact ArchEstate Pro' },
  { path: '/privacy', type: 'privacy', title: 'Privacy Policy' },
  { path: '/terms', type: 'terms', title: 'Terms of Service' },
  { path: '/methodology', type: 'methodology', title: 'Calculation Methodology' },
] as const;

export const VALID_CALCULATOR_SLUGS = [
  'ba13-drywall-ceiling',
  'pvc-suspended-ceiling',
  'acoustic-grid-ceiling-60x60',
  'cove-light-perimeter-bulkhead',
  'gypsum-cornice-plaster-staff',
  'wall-paint-primer',
  'tile-grout-flooring',
  'reinforced-concrete-volume',
  'brick-block-masonry-mortar',
  'hvac-cooling-btu-load',
  'mortgage-piti-amortization',
  'rental-yield-cap-rate-roi',
  'home-affordability-debt-ratio',
  'closing-costs-notary-fee',
  'wallpaper-rolls-pattern-repeat',
] as const;

export type CalculatorSlug = typeof VALID_CALCULATOR_SLUGS[number];

export const isValidCalculatorSlug = (slug: string): slug is CalculatorSlug => {
  return (VALID_CALCULATOR_SLUGS as readonly string[]).includes(slug);
};

export const getCanonicalUrl = (pathname: string): string => {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (cleanPath === '/' || cleanPath === '') {
    return `${SITE_URL}/`;
  }
  // Standardize: no trailing slash for canonical URLs
  return `${SITE_URL}${cleanPath.replace(/\/+$/, '')}`;
};

export const getCalculatorPath = (slug: string): string => {
  return `/calculators/${slug}`;
};

export const getCategoryPath = (categoryId: string): string => {
  return CATEGORY_ROUTES[categoryId] || `/calculators/${categoryId}`;
};
