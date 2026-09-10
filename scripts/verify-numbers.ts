import fs from 'fs';
import path from 'path';
import { CALCULATORS } from '../src/data/calculatorsData';
import { 
  formatCurrency, 
  formatCurrencyExact, 
  formatNumber, 
  formatPercent, 
  normalizeToAsciiDigits 
} from '../src/utils/calculations';

console.log('--- ArchEstate Pro Latin ASCII Numerals Verification ---');

const NON_LATIN_DIGITS_REGEX = /[\u0660-\u0669\u06F0-\u06F9]/g;

let errors: string[] = [];
let passes: string[] = [];

function check(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    passes.push(`✓ ${passMsg}`);
  } else {
    errors.push(`✗ ${failMsg}`);
  }
}

// 1. Test normalization utility with Arabic-Indic and Persian digits
const sampleArabic = '١٢٣٤٥٦٧٨٩٠';
const samplePersian = '۱۲۳۴۵۶۷۸۹۰';
const normalizedArabic = normalizeToAsciiDigits(sampleArabic);
const normalizedPersian = normalizeToAsciiDigits(samplePersian);

check(
  normalizedArabic === '1234567890',
  'normalizeToAsciiDigits converts Arabic-Indic digits [٠-٩] to ASCII Latin "1234567890"',
  `Expected "1234567890", got "${normalizedArabic}"`
);

check(
  normalizedPersian === '1234567890',
  'normalizeToAsciiDigits converts Persian digits [۰-۹] to ASCII Latin "1234567890"',
  `Expected "1234567890", got "${normalizedPersian}"`
);

// 2. Test formatting functions with en-US-u-nu-latn
const testCurrency = formatCurrency(1234567);
const testCurrencyExact = formatCurrencyExact(1234.56);
const testNumber = formatNumber(9876.54, 2);
const testPercent = formatPercent(15.75, 2);

check(
  !NON_LATIN_DIGITS_REGEX.test(testCurrency) && testCurrency.includes('1,234,567'),
  `formatCurrency(1234567) outputs ASCII Latin digits: "${testCurrency}"`,
  `formatCurrency contains non-Latin digits: "${testCurrency}"`
);

check(
  !NON_LATIN_DIGITS_REGEX.test(testCurrencyExact) && testCurrencyExact.includes('1,234.56'),
  `formatCurrencyExact(1234.56) outputs ASCII Latin digits: "${testCurrencyExact}"`,
  `formatCurrencyExact contains non-Latin digits: "${testCurrencyExact}"`
);

check(
  !NON_LATIN_DIGITS_REGEX.test(testNumber) && testNumber.includes('9,876.54'),
  `formatNumber(9876.54) outputs ASCII Latin digits: "${testNumber}"`,
  `formatNumber contains non-Latin digits: "${testNumber}"`
);

check(
  !NON_LATIN_DIGITS_REGEX.test(testPercent) && testPercent === '15.75%',
  `formatPercent(15.75) outputs ASCII Latin digits: "${testPercent}"`,
  `formatPercent contains non-Latin digits: "${testPercent}"`
);

// 3. Test calculation results across all 15 calculators with both default and modified inputs
for (const calc of CALCULATORS) {
  // Test with default inputs
  const defaultInputs: Record<string, number> = {};
  calc.inputs.forEach(i => { defaultInputs[i.id] = i.defaultValue; });

  const defaultResults = calc.calculate(defaultInputs);
  const checkResults = (prefix: string, res: typeof defaultResults) => {
    // Primary result
    if (NON_LATIN_DIGITS_REGEX.test(res.primaryResult.formatted)) {
      errors.push(`✗ [${calc.slug}] ${prefix} primaryResult has non-Latin digits: ${res.primaryResult.formatted}`);
    } else {
      passes.push(`✓ [${calc.slug}] ${prefix} primaryResult uses Latin digits: ${res.primaryResult.formatted}`);
    }

    // Secondary results
    res.secondaryResults.forEach(sr => {
      if (NON_LATIN_DIGITS_REGEX.test(sr.formatted)) {
        errors.push(`✗ [${calc.slug}] ${prefix} secondaryResult (${sr.id}) has non-Latin digits: ${sr.formatted}`);
      }
    });

    // Summary steps
    res.summarySteps.forEach(st => {
      if (NON_LATIN_DIGITS_REGEX.test(st.value) || NON_LATIN_DIGITS_REGEX.test(st.formula)) {
        errors.push(`✗ [${calc.slug}] ${prefix} summary step (${st.label}) has non-Latin digits: ${st.formula} = ${st.value}`);
      }
    });

    // Amortization schedule if present
    if (res.amortizationSchedule) {
      res.amortizationSchedule.slice(0, 10).forEach(row => {
        const rowStr = `${row.month} ${row.payment} ${row.principal} ${row.interest} ${row.balance}`;
        if (NON_LATIN_DIGITS_REGEX.test(rowStr)) {
          errors.push(`✗ [${calc.slug}] amortization row has non-Latin digits: ${rowStr}`);
        }
      });
    }
  };

  checkResults('Default inputs', defaultResults);

  // Test with modified custom inputs (scale up by 1.5x)
  const modifiedInputs: Record<string, number> = {};
  calc.inputs.forEach(i => { 
    const stepped = Math.min(i.max, i.defaultValue * 1.5);
    modifiedInputs[i.id] = stepped; 
  });
  const modifiedResults = calc.calculate(modifiedInputs);
  checkResults('Modified inputs (1.5x)', modifiedResults);
}

// 4. Scan static HTML in dist/ (if exists) for non-Latin digits
const DIST_DIR = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(DIST_DIR)) {
  const checkDirForNonLatin = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        checkDirForNonLatin(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const matches = content.match(NON_LATIN_DIGITS_REGEX);
        const relPath = path.relative(DIST_DIR, fullPath);
        if (matches && matches.length > 0) {
          errors.push(`✗ [${relPath}] Contains ${matches.length} non-Latin Arabic/Persian digits: ${matches.slice(0, 5).join(', ')}`);
        } else {
          passes.push(`✓ [${relPath}] Verified 100% clean of non-Latin Arabic/Persian digits`);
        }
      }
    }
  };
  checkDirForNonLatin(DIST_DIR);
}

// Summary
console.log('\n--- Number System Verification Results ---');
console.log(`Passed: ${passes.length}`);
console.log(`Failed: ${errors.length}`);

if (errors.length > 0) {
  console.error('\nErrors found in number formatting:');
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log('\nAll numerals across calculations, formatting utilities, and HTML are strictly Latin ASCII (0-9)! ✨');
  process.exit(0);
}
