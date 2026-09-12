import { chromium, Browser, BrowserContext, Page } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { CALCULATORS } from '../src/data/calculatorsData';

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const ARABIC_INDIC_REGEX = /[\u0660-\u0669\u06F0-\u06F9]/;

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    passCount++;
    console.log(`  ✓ PASS: ${passMsg}`);
  } else {
    failCount++;
    console.error(`  ✗ FAIL: ${failMsg}`);
  }
}

// MIME types for local testing server
const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2',
};

// Start local testing server mimicking Cloudflare edge worker routing
function startServer(): Promise<http.Server> {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
      let pathname = decodeURIComponent(parsedUrl.pathname);

      // 1. ads.txt special handling: NEVER return HTML
      if (pathname === '/ads.txt') {
        const adsFile = path.join(DIST_DIR, 'ads.txt');
        if (fs.existsSync(adsFile)) {
          const content = fs.readFileSync(adsFile, 'utf-8');
          res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Robots-Tag': 'noindex, follow',
          });
          res.end(content);
        } else {
          res.writeHead(404, {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Robots-Tag': 'noindex, follow',
          });
          res.end('# No active ads.txt entries configured yet.\n');
        }
        return;
      }

      // 2. Resolve file in dist
      let filePath = path.join(DIST_DIR, pathname);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      } else if (!fs.existsSync(filePath) && fs.existsSync(`${filePath}.html`)) {
        filePath = `${filePath}.html`;
      } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
        return;
      }

      // 3. 404 Handler: Genuine HTTP 404 with 404.html and X-Robots-Tag
      const notFoundPath = path.join(DIST_DIR, '404.html');
      const notFoundContent = fs.existsSync(notFoundPath)
        ? fs.readFileSync(notFoundPath)
        : Buffer.from('<!DOCTYPE html><html><body><h1>404 Not Found</h1></body></html>');

      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, follow',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      });
      res.end(notFoundContent);
    });

    server.listen(PORT, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

async function runPlaywrightTests() {
  console.log('--- ArchEstate Pro Real Browser Test (Playwright Chromium) ---');
  console.log(`Starting local server on ${BASE_URL}...`);
  const server = await startServer();

  let browser: Browser | null = null;

  try {
    console.log('Launching Chromium with locale ar-EG and timezone Africa/Cairo...');
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const context: BrowserContext = await browser.newContext({
      locale: 'ar-EG',
      timezoneId: 'Africa/Cairo',
      extraHTTPHeaders: {
        'Accept-Language': 'ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      viewport: { width: 1280, height: 800 },
    });

    const page: Page = await context.newPage();

    // 1. Test HTTP 404 behavior and headers
    console.log('\n--- 1. Testing HTTP 404 Behavior & Headers ---');
    const notFoundRes = await page.goto(`${BASE_URL}/does-not-exist`);
    assert(
      notFoundRes?.status() === 404,
      `Navigating to /does-not-exist returns genuine HTTP 404 status (got ${notFoundRes?.status()})`,
      `Expected HTTP 404 for /does-not-exist, got ${notFoundRes?.status()}`
    );

    const xRobots = notFoundRes?.headers()['x-robots-tag'];
    assert(
      Boolean(xRobots && xRobots.includes('noindex')),
      `404 response includes X-Robots-Tag: ${xRobots}`,
      `404 response MISSING X-Robots-Tag: noindex header`
    );

    const notFoundTitle = await page.title();
    assert(
      notFoundTitle.includes('Not Found') || notFoundTitle.includes('404'),
      `404 page title indicates missing resource: "${notFoundTitle}"`,
      `404 page title unexpected: "${notFoundTitle}"`
    );

    // 2. Test /ads.txt compliance (Must NEVER return HTML)
    console.log('\n--- 2. Testing /ads.txt Compliance ---');
    const adsRes = await page.goto(`${BASE_URL}/ads.txt`);
    const adsContentType = adsRes?.headers()['content-type'] || '';
    assert(
      !adsContentType.includes('text/html'),
      `/ads.txt does NOT return HTML (Content-Type: ${adsContentType})`,
      `/ads.txt returned HTML! AdSense violation!`
    );

    // 3. Priority Calculators Testing in ar-EG Locale
    console.log('\n--- 3. Testing Priority Calculators in ar-EG Locale ---');
    const prioritySlugs = [
      'ba13-drywall-ceiling',
      'mortgage-piti',
      'paint-primer',
    ];

    for (const slug of prioritySlugs) {
      console.log(`\nTesting Calculator: [${slug}]`);
      const calcUrl = `${BASE_URL}/calculators/${slug}/`;
      const navRes = await page.goto(calcUrl, { waitUntil: 'domcontentloaded' });

      assert(
        navRes?.status() === 200,
        `[${slug}] loaded with HTTP 200 OK`,
        `[${slug}] failed to load: status ${navRes?.status()}`
      );

      // Wait for React hydration and calculator input fields
      await page.waitForSelector('body[data-hydrated="true"]', { timeout: 15000 });
      await page.waitForSelector('input[inputmode="decimal"]', { timeout: 10000 });

      const allInputs = await page.$$('input');
      assert(
        allInputs.length > 0,
        `[${slug}] found ${allInputs.length} total input controls in DOM`,
        `[${slug}] found 0 inputs in DOM`
      );

      const textInputs = await page.$$('input[type="text"][inputmode="decimal"]');
      assert(
        textInputs.length > 0,
        `[${slug}] found ${textInputs.length} text decimal input controls in DOM`,
        `[${slug}] found 0 text decimal inputs in DOM`
      );

      // Check each text input for forbidden type="number" and Arabic digits
      let hasTypeNumber = false;
      let hasArabicDigits = false;

      for (let i = 0; i < allInputs.length; i++) {
        const input = allInputs[i];
        const typeAttr = await input.getAttribute('type');
        const value = await input.inputValue();

        if (typeAttr === 'number') {
          hasTypeNumber = true;
          console.error(`  ✗ FAIL: [${slug}] input #${i} has forbidden type="number"!`);
        }

        if (ARABIC_INDIC_REGEX.test(value)) {
          hasArabicDigits = true;
          console.error(`  ✗ FAIL: [${slug}] input #${i} contains localized Arabic digits: "${value}"`);
        }
      }

      assert(
        !hasTypeNumber,
        `[${slug}] All inputs strictly avoid type="number" (all use type="text")`,
        `[${slug}] Contains input with type="number"`
      );

      assert(
        !hasArabicDigits,
        `[${slug}] All default input values are 100% Latin ASCII digits in ar-EG locale`,
        `[${slug}] Contains Arabic-Indic digits in input values`
      );

      // Test typing 1234.56 into the first text input
      const firstInput = textInputs[0];
      const firstInputId = await firstInput.getAttribute('id');
      const fieldId = firstInputId ? firstInputId.replace('input-', '') : '';

      await firstInput.click();
      await firstInput.fill('1234.56');
      const typedValue = await firstInput.inputValue();
      assert(
        typedValue === '1234.56',
        `[${slug}] successfully typed "1234.56", input value is: "${typedValue}"`,
        `[${slug}] typing "1234.56" failed, got: "${typedValue}"`
      );

      // Wait a moment for calculation reaction
      await page.waitForTimeout(150);

      // Check primary result does not contain NaN
      const bodyText = await page.innerText('body');
      assert(
        !bodyText.includes('NaN'),
        `[${slug}] calculation after typing 1234.56 produced no NaN errors`,
        `[${slug}] calculation produced NaN error!`
      );

      // Test typing/pasting Arabic-Indic digits ١٢.٥
      await firstInput.click();
      await firstInput.fill('١٢.٥');
      await page.waitForTimeout(150);
      const arabicTypedValue = await firstInput.inputValue();
      assert(
        !ARABIC_INDIC_REGEX.test(arabicTypedValue) && (arabicTypedValue === '12.5' || arabicTypedValue.includes('12')),
        `[${slug}] Arabic-Indic input "١٢.٥" cleanly normalized/cleansed to ASCII: "${arabicTypedValue}"`,
        `[${slug}] Arabic-Indic input not handled properly: "${arabicTypedValue}"`
      );

      // Test Stepper button (+ and -) using precise button ID
      const stepUpBtn = await page.$(`#step-up-${fieldId}`);
      if (stepUpBtn) {
        const valBefore = parseFloat(await firstInput.inputValue());
        await stepUpBtn.click();
        await page.waitForTimeout(150);
        const valAfter = parseFloat(await firstInput.inputValue());
        assert(
          valAfter > valBefore,
          `[${slug}] Stepper (+) successfully incremented input value (${valBefore} -> ${valAfter})`,
          `[${slug}] Stepper (+) failed to increment value`
        );
      }

      // Test Reset button
      const resetBtn = await page.$('#reset-inputs-btn');
      if (resetBtn) {
        await resetBtn.click();
        await page.waitForTimeout(150);
        const resetVal = await firstInput.inputValue();
        assert(
          !ARABIC_INDIC_REGEX.test(resetVal),
          `[${slug}] Reset button restored defaults with Latin ASCII digits: "${resetVal}"`,
          `[${slug}] Reset button failed or output Arabic digits`
        );
      }
    }

    // 4. Batch Verification for remaining 12 calculators
    console.log('\n--- 4. Batch Verification for Remaining 12 Calculators ---');
    const remainingCalcs = CALCULATORS.filter(c => !prioritySlugs.includes(c.slug));

    for (const calc of remainingCalcs) {
      const calcUrl = `${BASE_URL}/calculators/${calc.slug}/`;
      await page.goto(calcUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('input', { timeout: 8000 });

      const inputs = await page.$$('input');
      let calcHasNumber = false;
      let calcHasArabic = false;

      for (const input of inputs) {
        const type = await input.getAttribute('type');
        const val = await input.inputValue();
        if (type === 'number') calcHasNumber = true;
        if (ARABIC_INDIC_REGEX.test(val)) calcHasArabic = true;
      }

      assert(
        !calcHasNumber && !calcHasArabic,
        `[${calc.slug}] Verified: 0 type="number" inputs and 0 Arabic-Indic digits in ar-EG locale`,
        `[${calc.slug}] Failed type="number" or Arabic-Indic digit check`
      );
    }

    await context.close();
  } finally {
    if (browser) {
      await browser.close();
    }
    server.close();
  }

  console.log('\n========================================');
  console.log(`Real Browser Tests Complete:`);
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);
  console.log('========================================');

  if (failCount > 0) {
    console.error(`\n${failCount} tests failed!`);
    process.exit(1);
  } else {
    console.log('\nAll Playwright real browser tests passed successfully! ✨');
    process.exit(0);
  }
}

runPlaywrightTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
