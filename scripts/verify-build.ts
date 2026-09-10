import fs from 'fs';
import path from 'path';
import { CALCULATORS, CATEGORIES } from '../src/data/calculatorsData';
import { SITE_URL, getCalculatorPath, getCategoryPath } from '../src/config/site';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

let failures: string[] = [];
let passes: string[] = [];

function assert(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    passes.push(`✓ ${passMsg}`);
  } else {
    failures.push(`✗ ${failMsg}`);
  }
}

console.log('--- ArchEstate Pro Post-Build Audit & Verification ---');

// 1. Verify dist exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('Fatal: dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// 2. Verify all 15 calculator static files exist
const expectedSlugs = CALCULATORS.map((c) => c.slug);
assert(
  expectedSlugs.length === 15,
  `CALCULATORS registry contains exactly 15 calculators (found ${expectedSlugs.length})`,
  `Expected 15 calculators in registry, but found ${expectedSlugs.length}`
);

const requiredKeywords = [
  'When to Use This Tool',
  'Worked',
  'Last Reviewed',
  'Input Parameters and Measurement Guidelines',
  'Plain-Language Formula',
  'Assumptions and Default Values',
  'What the Result Does Not Include',
  'Common Mistakes',
  'When to Consult a Qualified Professional',
  'Frequently Asked Questions',
  'Related Calculators',
];

for (const slug of expectedSlugs) {
  const calcFilePath = path.join(DIST_DIR, 'calculators', slug, 'index.html');
  const exists = fs.existsSync(calcFilePath);
  assert(
    exists,
    `Calculator static HTML exists: dist/calculators/${slug}/index.html`,
    `Missing calculator static HTML: dist/calculators/${slug}/index.html`
  );

  if (exists) {
    const html = fs.readFileSync(calcFilePath, 'utf-8');
    
    // Verify each required educational section exists
    for (const keyword of requiredKeywords) {
      assert(
        html.includes(keyword),
        `[${slug}] contains educational section "${keyword}"`,
        `[${slug}] MISSING educational section "${keyword}"`
      );
    }

    // Verify canonical URL is correct and doesn't contain workers.dev
    assert(
      !html.includes('workers.dev'),
      `[${slug}] canonical/links do not contain workers.dev`,
      `[${slug}] contains forbidden 'workers.dev'`
    );

    // Verify no fake adsense publisher ID
    assert(
      !html.includes('pub-1234567890123456') && !html.includes('ca-pub-0000000000000000'),
      `[${slug}] does not contain fake AdSense publisher IDs`,
      `[${slug}] contains fake AdSense publisher ID`
    );
  }
}

// 3. Verify sitemap.xml
const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml exists in dist/', 'dist/sitemap.xml is missing');

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

  // Verify all 15 calculators are in the sitemap
  for (const slug of expectedSlugs) {
    const calcPath = getCalculatorPath(slug);
    assert(
      sitemap.includes(calcPath),
      `sitemap.xml includes calculator path: ${calcPath}`,
      `sitemap.xml MISSING calculator path: ${calcPath}`
    );
  }

  // Count loc tags
  const locMatches = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
  const expectedTotalUrls = 1 + CATEGORIES.length + CALCULATORS.length + 5; // 1 home + 3 categories + 15 calculators + 5 legal = 24
  assert(
    locMatches.length === expectedTotalUrls,
    `sitemap.xml has exactly ${expectedTotalUrls} URLs (found ${locMatches.length})`,
    `sitemap.xml expected ${expectedTotalUrls} URLs, found ${locMatches.length}`
  );

  // Verify no workers.dev in sitemap
  assert(
    !sitemap.includes('workers.dev'),
    'sitemap.xml contains no workers.dev domains',
    'sitemap.xml contains workers.dev domain'
  );
}

// 4. Verify 404.html
const notFoundPath = path.join(DIST_DIR, '404.html');
assert(fs.existsSync(notFoundPath), '404.html exists in dist/', 'dist/404.html is missing');

if (fs.existsSync(notFoundPath)) {
  const notFoundHtml = fs.readFileSync(notFoundPath, 'utf-8');
  assert(
    notFoundHtml.includes('Page Not Found'),
    '404.html contains "Page Not Found"',
    '404.html is missing "Page Not Found"'
  );
  assert(
    notFoundHtml.includes('noindex, follow') || notFoundHtml.includes('noindex'),
    '404.html contains noindex robots meta tag',
    '404.html is missing noindex meta tag'
  );
}

// 5. Verify robots.txt
const robotsPath = path.join(DIST_DIR, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt exists in dist/', 'dist/robots.txt is missing');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf-8');
  assert(
    robots.includes('Sitemap:'),
    'robots.txt specifies Sitemap reference',
    'robots.txt missing Sitemap reference'
  );
}

// 6. Verify calculator local images & metadata
const seenImagePaths = new Set<string>();
for (const calc of CALCULATORS) {
  assert(
    Boolean(calc.personaImageUrl && calc.personaImageUrl.startsWith('/images/calculators/')),
    `[${calc.slug}] has local self-hosted image path (${calc.personaImageUrl})`,
    `[${calc.slug}] missing local self-hosted image path`
  );

  if (calc.personaImageUrl) {
    seenImagePaths.add(calc.personaImageUrl);
    const publicImgPath = path.join(process.cwd(), 'public', calc.personaImageUrl.replace(/^\//, ''));
    const distImgPath = path.join(DIST_DIR, calc.personaImageUrl.replace(/^\//, ''));
    assert(
      fs.existsSync(publicImgPath),
      `[${calc.slug}] image file exists in public: ${calc.personaImageUrl}`,
      `[${calc.slug}] image file MISSING in public: ${publicImgPath}`
    );
    assert(
      fs.existsSync(distImgPath),
      `[${calc.slug}] image file copied to dist: ${calc.personaImageUrl}`,
      `[${calc.slug}] image file MISSING in dist: ${distImgPath}`
    );
  }

  assert(
    Boolean(calc.imageAlt && calc.imageAlt.trim().length > 15),
    `[${calc.slug}] has descriptive imageAlt: "${calc.imageAlt}"`,
    `[${calc.slug}] missing or too short imageAlt`
  );

  assert(
    Boolean(calc.imageWidth && calc.imageWidth > 0 && calc.imageHeight && calc.imageHeight > 0),
    `[${calc.slug}] has explicit image dimensions (${calc.imageWidth}x${calc.imageHeight})`,
    `[${calc.slug}] missing image dimensions`
  );
}

assert(
  seenImagePaths.size === 15,
  `All 15 calculators have unique, dedicated images (found ${seenImagePaths.size})`,
  `Expected 15 unique images across 15 calculators, but found ${seenImagePaths.size}`
);

// Summary Output
console.log('\n--- Verification Results ---');
console.log(`Passed: ${passes.length}`);
console.log(`Failed: ${failures.length}`);

if (failures.length > 0) {
  console.error('\nFailures encountered:');
  failures.forEach((f) => console.error(f));
  process.exit(1);
} else {
  console.log('\nAll post-build verification tests passed successfully! ✨');
  process.exit(0);
}
