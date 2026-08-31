import fs from 'fs';
import path from 'path';
import { CALCULATORS, CATEGORIES } from '../src/data/calculatorsData';
import { 
  SITE_URL, 
  SITE_NAME, 
  SITE_TAGLINE, 
  SITE_DESCRIPTION, 
  CONTACT_EMAIL, 
  getCanonicalUrl, 
  getCalculatorPath, 
  getCategoryPath 
} from '../src/config/site';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Read base template index.html produced by vite build
const baseTemplatePath = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(baseTemplatePath)) {
  console.error('Error: dist/index.html not found. Make sure "vite build" runs before pre-rendering.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(baseTemplatePath, 'utf-8');

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  schemaJson: object[];
  prerenderedHtml: string;
}

// Helper to escape HTML
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate static pre-rendered routes
const routes: RouteMeta[] = [];

// 1. Home Page
const homeCanonical = getCanonicalUrl('/');
const homeTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;
const homeDesc = SITE_DESCRIPTION;
const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': SITE_NAME,
    'url': homeCanonical,
    'description': homeDesc,
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'email': CONTACT_EMAIL,
      'url': SITE_URL,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': `${SITE_NAME} Computational Suite`,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  },
];

const homeHtml = `
<div class="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
  <header class="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">AP</div>
        <div>
          <span class="text-xl font-extrabold text-slate-900">${SITE_NAME}</span>
          <p class="text-[11px] text-slate-600 font-medium">Architecture • Construction • Real Estate Technology</p>
        </div>
      </a>
      <nav class="hidden lg:flex items-center gap-2 text-xs font-semibold">
        <a href="${getCategoryPath('ceilings')}" class="px-3 py-1.5 rounded-lg text-slate-700 hover:text-emerald-700">False Ceilings</a>
        <a href="${getCategoryPath('construction')}" class="px-3 py-1.5 rounded-lg text-slate-700 hover:text-emerald-700">Construction</a>
        <a href="${getCategoryPath('real-estate')}" class="px-3 py-1.5 rounded-lg text-slate-700 hover:text-emerald-700">Real Estate</a>
        <a href="/contact" class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">Contact</a>
      </nav>
    </div>
  </header>

  <main class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
    <div class="text-center max-w-3xl mx-auto mb-12 space-y-4">
      <h1 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
        Precision Engineering &amp; <span class="text-emerald-700">PropTech Calculators</span>
      </h1>
      <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
        ${escapeHtml(homeDesc)}
      </p>
    </div>

    <div class="space-y-16">
      ${CATEGORIES.map(cat => {
        const calcs = CALCULATORS.filter(c => c.category === cat.id);
        return `
          <section id="category-section-${cat.id}" class="space-y-6">
            <div class="border-b border-slate-200 pb-3">
              <h2 class="text-2xl font-black text-slate-900">
                <a href="${getCategoryPath(cat.id)}" class="hover:text-emerald-700 transition-colors">${escapeHtml(cat.name)}</a>
              </h2>
              <p class="text-xs text-slate-600">${escapeHtml(cat.description)}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${calcs.map(calc => `
                <div class="rounded-2xl border border-slate-200 p-6 bg-white shadow-xs flex flex-col justify-between">
                  <div>
                    <span class="text-[10px] font-mono font-bold uppercase text-slate-600 bg-slate-100 px-2 py-0.5 rounded">${escapeHtml(calc.categoryName)}</span>
                    <h3 class="text-lg font-bold text-slate-900 mt-2 mb-1">
                      <a href="${getCalculatorPath(calc.slug)}" class="hover:text-emerald-700">${escapeHtml(calc.title)}</a>
                    </h3>
                    <p class="text-xs text-slate-600 mb-4">${escapeHtml(calc.shortDescription)}</p>
                  </div>
                  <a href="${getCalculatorPath(calc.slug)}" class="w-full py-2.5 px-4 rounded-xl text-center font-bold text-xs bg-slate-900 text-white hover:bg-emerald-700 transition-colors">
                    Open Calculator &rarr;
                  </a>
                </div>
              `).join('')}
            </div>
          </section>
        `;
      }).join('')}
    </div>
  </main>

  <footer class="mt-20 border-t border-slate-200 bg-slate-50 py-12">
    <div class="max-w-7xl mx-auto px-4 text-xs text-slate-600 text-center space-y-2">
      <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved. Official contact: <a href="mailto:${CONTACT_EMAIL}" class="text-emerald-700 underline">${CONTACT_EMAIL}</a></p>
    </div>
  </footer>
</div>
`;

routes.push({
  path: '/',
  title: homeTitle,
  description: homeDesc,
  canonical: homeCanonical,
  schemaJson: homeSchema,
  prerenderedHtml: homeHtml,
});

// 2. Category Pages
for (const cat of CATEGORIES) {
  const catPath = getCategoryPath(cat.id);
  const catCanonical = getCanonicalUrl(catPath);
  const catTitle = `${cat.name} Calculators — ${SITE_NAME}`;
  const catDesc = `${cat.description} Free online engineering and architectural calculation tools on ArchEstate Pro.`;
  const catCalcs = CALCULATORS.filter(c => c.category === cat.id);

  const catSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': SITE_NAME, 'item': homeCanonical },
        { '@type': 'ListItem', 'position': 2, 'name': cat.name, 'item': catCanonical },
      ],
    },
  ];

  const catHtml = `
  <div class="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
    <header class="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">AP</div>
          <span class="text-xl font-extrabold text-slate-900">${SITE_NAME}</span>
        </a>
        <nav class="flex items-center gap-2 text-xs font-semibold">
          <a href="/" class="px-3 py-1.5 rounded-lg text-slate-700 hover:text-emerald-700">&larr; All Calculators</a>
        </nav>
      </div>
    </header>

    <main class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <nav aria-label="Breadcrumb" class="mb-6 text-xs text-slate-600 flex items-center gap-2">
        <a href="/" class="hover:text-emerald-700">ArchEstate Pro</a> &gt; <span class="font-bold text-slate-900">${escapeHtml(cat.name)}</span>
      </nav>

      <div class="mb-10 space-y-2">
        <h1 class="text-3xl font-black text-slate-900">${escapeHtml(cat.name)} Calculators</h1>
        <p class="text-sm text-slate-600 max-w-2xl">${escapeHtml(cat.description)}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${catCalcs.map(calc => `
          <div class="rounded-2xl border border-slate-200 p-6 bg-white shadow-xs flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-mono font-bold uppercase text-slate-600 bg-slate-100 px-2 py-0.5 rounded">${escapeHtml(calc.categoryName)}</span>
              <h2 class="text-lg font-bold text-slate-900 mt-2 mb-1">
                <a href="${getCalculatorPath(calc.slug)}" class="hover:text-emerald-700">${escapeHtml(calc.title)}</a>
              </h2>
              <p class="text-xs text-slate-600 mb-4">${escapeHtml(calc.shortDescription)}</p>
            </div>
            <a href="${getCalculatorPath(calc.slug)}" class="w-full py-2.5 px-4 rounded-xl text-center font-bold text-xs bg-slate-900 text-white hover:bg-emerald-700 transition-colors">
              Open Calculator &rarr;
            </a>
          </div>
        `).join('')}
      </div>
    </main>

    <footer class="mt-20 border-t border-slate-200 bg-slate-50 py-12">
      <div class="max-w-7xl mx-auto px-4 text-xs text-slate-600 text-center">
        <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. Official contact: <a href="mailto:${CONTACT_EMAIL}" class="text-emerald-700 underline">${CONTACT_EMAIL}</a></p>
      </div>
    </footer>
  </div>
  `;

  routes.push({
    path: catPath,
    title: catTitle,
    description: catDesc,
    canonical: catCanonical,
    schemaJson: catSchema,
    prerenderedHtml: catHtml,
  });
}

// 3. Calculator Pages (All 15)
for (const calc of CALCULATORS) {
  const calcPath = getCalculatorPath(calc.slug);
  const calcCanonical = getCanonicalUrl(calcPath);
  const calcTitle = `${calc.title} — ${SITE_NAME}`;
  const calcDesc = `${calc.shortDescription} Accurate materials, quantities, and financial formulas on ArchEstate Pro.`;
  const relatedCalcs = CALCULATORS.filter(c => (calc.relatedCalculatorIds || []).includes(c.id));

  // Compute default run results for pristine static preview
  const defaultInputs: Record<string, number> = {};
  calc.inputs.forEach(f => {
    defaultInputs[f.id] = f.defaultValue;
  });
  const defaultResults = calc.calculate(defaultInputs);

  const calcSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': `${calc.title} | ${SITE_NAME}`,
      'applicationCategory': 'UtilitiesApplication',
      'operatingSystem': 'All',
      'url': calcCanonical,
      'description': calcDesc,
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': SITE_NAME, 'item': homeCanonical },
        { '@type': 'ListItem', 'position': 2, 'name': calc.categoryName, 'item': getCanonicalUrl(getCategoryPath(calc.category)) },
        { '@type': 'ListItem', 'position': 3, 'name': calc.title, 'item': calcCanonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': calc.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer,
        },
      })),
    },
  ];

  const calcHtml = `
  <div class="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
    <header class="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">AP</div>
          <span class="text-xl font-extrabold text-slate-900">${SITE_NAME}</span>
        </a>
        <nav class="flex items-center gap-3 text-xs font-semibold">
          <a href="${getCategoryPath(calc.category)}" class="text-slate-700 hover:text-emerald-700">&larr; ${escapeHtml(calc.categoryName)}</a>
          <a href="/contact" class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">Contact</a>
        </nav>
      </div>
    </header>

    <main class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" id="main-content">
      <!-- Breadcrumbs -->
      <nav aria-label="Breadcrumb" class="mb-6 text-xs text-slate-600 flex items-center gap-2">
        <a href="/" class="hover:text-emerald-700">ArchEstate Pro</a> &gt; 
        <a href="${getCategoryPath(calc.category)}" class="hover:text-emerald-700">${escapeHtml(calc.categoryName)}</a> &gt; 
        <span class="font-bold text-slate-900">${escapeHtml(calc.title)}</span>
      </nav>

      <!-- Calculator Header -->
      <header class="mb-8 space-y-2 border-b border-slate-200 pb-6">
        <span class="text-[11px] font-mono font-bold uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
          ${escapeHtml(calc.categoryName)}
        </span>
        <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          ${escapeHtml(calc.title)}
        </h1>
        <p class="text-sm font-semibold text-slate-700">${escapeHtml(calc.subtitle)}</p>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">${escapeHtml(calc.shortDescription)}</p>
      </header>

      <!-- Top Ad Slot Banner (728x90) -->
      <div class="mb-8">
        <div class="w-full max-w-[728px] mx-auto min-h-[90px] rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
          <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400">ADVERTISEMENT</span>
        </div>
      </div>

      <!-- Live Calculation Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <!-- Inputs Column -->
        <div class="lg:col-span-6 space-y-6">
          <div class="rounded-2xl border border-slate-200 p-6 bg-white shadow-xs">
            <h2 class="text-base font-bold text-slate-900 mb-4">Input Specifications</h2>
            <div class="space-y-4">
              ${calc.inputs.map(field => `
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">
                    ${escapeHtml(field.label)} (${escapeHtml(field.unit)})
                  </label>
                  <input 
                    type="number" 
                    value="${field.defaultValue}" 
                    class="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg"
                    readonly
                  />
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Output Column -->
        <div class="lg:col-span-6 space-y-6">
          <div class="rounded-2xl border border-emerald-200 p-6 bg-emerald-50/50 shadow-xs space-y-4">
            <span class="text-[10px] font-mono font-bold uppercase text-emerald-800">Primary Planning Output</span>
            <div class="text-3xl font-black text-emerald-950">
              ${escapeHtml(defaultResults.primaryResult.formatted)}
            </div>
            <p class="text-xs text-emerald-800 font-medium">
              ${escapeHtml(defaultResults.primaryResult.description || '')}
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 p-6 bg-white shadow-xs space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900">Detailed Bill of Quantities</h3>
            <ul class="divide-y divide-slate-100 text-xs">
              ${defaultResults.secondaryResults.map(res => `
                <li class="py-2 flex items-center justify-between">
                  <span class="text-slate-600">${escapeHtml(res.label)}</span>
                  <span class="font-bold text-slate-900">${escapeHtml(res.formatted)}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Calculation Steps Summary -->
      <section class="mb-12 rounded-2xl border border-slate-200 p-6 bg-white shadow-xs space-y-4">
        <h2 class="text-base font-bold text-slate-900">Calculation Formula Steps</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${defaultResults.summarySteps.map(step => `
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-[10px] font-mono uppercase text-slate-500">${escapeHtml(step.label)}</span>
              <p class="text-xs font-mono font-bold text-slate-800 mt-0.5">${escapeHtml(step.formula)} = ${escapeHtml(step.value)}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Technical Guide & Methodology (4-Section Standard) -->
      <section class="mb-12 rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-xs space-y-6">
        <h2 class="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Technical Specifications &amp; Engineering Methodology
        </h2>

        <div class="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 class="font-bold text-slate-900 mb-1">1. How the Model Works</h3>
            <p>${escapeHtml(calc.methodology.howItWorks)}</p>
          </div>

          <div>
            <h3 class="font-bold text-slate-900 mb-1">2. Included Components &amp; Bill of Materials</h3>
            <ul class="list-disc pl-5 space-y-1">
              ${calc.methodology.whatIsIncluded.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-slate-900 mb-1">3. Important Engineering Assumptions</h3>
            <ul class="list-disc pl-5 space-y-1">
              ${calc.methodology.importantAssumptions.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>

          <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
            <span class="font-bold uppercase text-[10px] text-amber-800 block mb-1">Professional Field Note</span>
            <p>${escapeHtml(calc.methodology.professionalNote)}</p>
          </div>
        </div>
      </section>

      <!-- Frequently Asked Questions (FAQ) -->
      <section class="mb-12 rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-xs space-y-6">
        <h2 class="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Frequently Asked Questions (FAQ)
        </h2>

        <div class="divide-y divide-slate-100 space-y-4">
          ${calc.faqs.map(faq => `
            <div class="pt-4 space-y-1.5">
              <h3 class="text-sm font-bold text-slate-900">${escapeHtml(faq.question)}</h3>
              <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(faq.answer)}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Related Calculators -->
      ${relatedCalcs.length > 0 ? `
        <section class="mb-12 space-y-4">
          <h2 class="text-base font-bold text-slate-900">Related Planning Tools</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${relatedCalcs.map(rel => `
              <a href="${getCalculatorPath(rel.slug)}" class="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors block bg-white">
                <span class="text-[10px] font-mono uppercase text-slate-500">${escapeHtml(rel.categoryName)}</span>
                <h3 class="text-xs font-bold text-slate-900 mt-1">${escapeHtml(rel.title)}</h3>
                <p class="text-[11px] text-slate-600 line-clamp-1">${escapeHtml(rel.subtitle)}</p>
              </a>
            `).join('')}
          </div>
        </section>
      ` : ''}
    </main>

    <footer class="mt-20 border-t border-slate-200 bg-slate-50 py-12">
      <div class="max-w-7xl mx-auto px-4 text-xs text-slate-600 text-center">
        <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. Official contact: <a href="mailto:${CONTACT_EMAIL}" class="text-emerald-700 underline">${CONTACT_EMAIL}</a></p>
      </div>
    </footer>
  </div>
  `;

  routes.push({
    path: calcPath,
    title: calcTitle,
    description: calcDesc,
    canonical: calcCanonical,
    schemaJson: calcSchema,
    prerenderedHtml: calcHtml,
  });
}

// 4. Legal & Informational Pages
const legalPages = [
  { slug: 'about', title: `About Us — ${SITE_NAME}`, desc: 'About ArchEstate Pro architectural, construction, and real estate computational suite.' },
  { slug: 'contact', title: `Contact Us — ${SITE_NAME}`, desc: 'Contact the ArchEstate Pro engineering, support, and technical feedback desk.' },
  { slug: 'privacy', title: `Privacy Policy — ${SITE_NAME}`, desc: 'ArchEstate Pro client-side data security and privacy policy statement.' },
  { slug: 'terms', title: `Terms of Service — ${SITE_NAME}`, desc: 'Terms of service, mathematical planning limitations, and liability disclaimers.' },
  { slug: 'methodology', title: `Calculation Methodology — ${SITE_NAME}`, desc: 'Mathematical standards, peer-reviewed engineering formulas, and tolerance frameworks.' },
];

for (const leg of legalPages) {
  const legPath = `/${leg.slug}`;
  const legCanonical = getCanonicalUrl(legPath);

  routes.push({
    path: legPath,
    title: leg.title,
    description: leg.desc,
    canonical: legCanonical,
    schemaJson: [],
    prerenderedHtml: `
    <div class="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <header class="w-full border-b border-slate-200 bg-white/90 p-4">
        <div class="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" class="text-lg font-bold text-slate-900">${SITE_NAME}</a>
          <a href="/" class="text-xs text-emerald-700">&larr; Home</a>
        </div>
      </header>
      <main class="flex-1 max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 class="text-2xl font-bold text-slate-900">${escapeHtml(leg.title)}</h1>
        <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(leg.desc)}</p>
        <p class="text-xs text-slate-600">For direct support, contact: <a href="mailto:${CONTACT_EMAIL}" class="text-emerald-700 underline">${CONTACT_EMAIL}</a></p>
      </main>
    </div>
    `,
  });
}

// 5. Generate and Write All Static HTML Files
console.log(`Pre-rendering ${routes.length} static routes for SEO and instant loading...`);

for (const route of routes) {
  let html = baseTemplate;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  // Replace or Insert Meta Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(route.description)}" />\n</head>`);
  }

  // Replace or Insert Canonical Tag
  const canonicalTag = `<link rel="canonical" href="${route.canonical}" />`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/i, canonicalTag);
  } else {
    html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
  }

  // Replace or Insert OpenGraph & Twitter tags
  const ogTags = `
  <meta property="og:title" content="${escapeHtml(route.title)}" />
  <meta property="og:description" content="${escapeHtml(route.description)}" />
  <meta property="og:url" content="${route.canonical}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(route.title)}" />
  <meta name="twitter:description" content="${escapeHtml(route.description)}" />
`;
  html = html.replace(/<meta property="og:title"[^>]*>/gi, '');
  html = html.replace(/<meta property="og:description"[^>]*>/gi, '');
  html = html.replace(/<meta property="og:url"[^>]*>/gi, '');
  html = html.replace(/<meta property="og:type"[^>]*>/gi, '');
  html = html.replace(/<meta name="twitter:card"[^>]*>/gi, '');
  html = html.replace('</head>', `${ogTags}</head>`);

  // Inject JSON-LD Structured Data
  if (route.schemaJson && route.schemaJson.length > 0) {
    const schemaScripts = route.schemaJson.map(s => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`).join('\n');
    html = html.replace('</head>', `${schemaScripts}\n</head>`);
  }

  // Inject Pre-rendered Static HTML into #root
  if (route.prerenderedHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${route.prerenderedHtml}</div>`);
  }

  // Determine output directory & file path
  let targetFile: string;
  if (route.path === '/' || route.path === '') {
    targetFile = path.join(DIST_DIR, 'index.html');
  } else {
    const routeSubDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
    if (!fs.existsSync(routeSubDir)) {
      fs.mkdirSync(routeSubDir, { recursive: true });
    }
    targetFile = path.join(routeSubDir, 'index.html');
  }

  fs.writeFileSync(targetFile, html, 'utf-8');
}

// 6. Generate sitemap.xml
const sitemapUrls = routes.map(r => {
  let priority = '0.8';
  if (r.path === '/') priority = '1.0';
  else if (r.path.startsWith('/calculators/')) priority = '0.9';
  else if (['/about', '/contact', '/privacy', '/terms', '/methodology'].includes(r.path)) priority = '0.5';

  return `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

// 7. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');

console.log(`✓ SSG generation complete: ${routes.length} static HTML pages, sitemap.xml, and robots.txt created successfully.`);
