import fs from 'fs';
import path from 'path';
import { CALCULATORS } from '../src/data/calculatorsData';

console.log('--- ArchEstate Pro Visual Assets Verification ---');

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const DIST_DIR = path.resolve(process.cwd(), 'dist');

let errors: string[] = [];
let passes: string[] = [];

function check(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    passes.push(`✓ ${passMsg}`);
  } else {
    errors.push(`✗ ${failMsg}`);
  }
}

// 1. Verify exactly 15 calculators exist in data
check(
  CALCULATORS.length === 15,
  `Calculators registry contains exactly 15 tools (found ${CALCULATORS.length})`,
  `Expected 15 calculators, found ${CALCULATORS.length}`
);

const seenPaths = new Set<string>();

for (const calc of CALCULATORS) {
  const slug = calc.slug;

  // 2. Check local path specification (no external URLs)
  check(
    Boolean(calc.personaImageUrl && calc.personaImageUrl.startsWith('/images/calculators/')),
    `[${slug}] Uses local path: ${calc.personaImageUrl}`,
    `[${slug}] Does not use a valid local path: ${calc.personaImageUrl}`
  );

  check(
    !calc.personaImageUrl?.startsWith('http://') && !calc.personaImageUrl?.startsWith('https://'),
    `[${slug}] Has no external hotlink`,
    `[${slug}] Contains external URL hotlink: ${calc.personaImageUrl}`
  );

  if (calc.personaImageUrl) {
    // 3. Check uniqueness
    check(
      !seenPaths.has(calc.personaImageUrl),
      `[${slug}] Image path is unique to this tool`,
      `[${slug}] Image path is DUPLICATED: ${calc.personaImageUrl}`
    );
    seenPaths.add(calc.personaImageUrl);

    // 4. Check file existence in public/
    const publicFilePath = path.join(PUBLIC_DIR, calc.personaImageUrl.replace(/^\//, ''));
    const existsInPublic = fs.existsSync(publicFilePath);
    check(
      existsInPublic,
      `[${slug}] Image exists in public directory: ${calc.personaImageUrl}`,
      `[${slug}] Missing image file in public: ${publicFilePath}`
    );

    if (existsInPublic) {
      const stats = fs.statSync(publicFilePath);
      check(
        stats.size > 5000,
        `[${slug}] Image file size is healthy (${stats.size} bytes)`,
        `[${slug}] Image file is suspicious or empty (${stats.size} bytes)`
      );

      // Check valid JPEG or PNG header
      const buffer = Buffer.alloc(4);
      const fd = fs.openSync(publicFilePath, 'r');
      fs.readSync(fd, buffer, 0, 4, 0);
      fs.closeSync(fd);

      const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8;
      const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
      check(
        isJpeg || isPng,
        `[${slug}] Image is valid binary image (${isJpeg ? 'JPEG' : 'PNG'})`,
        `[${slug}] File at ${calc.personaImageUrl} has invalid image magic bytes`
      );
    }

    // If dist/ exists, verify copied to dist/
    if (fs.existsSync(DIST_DIR)) {
      const distFilePath = path.join(DIST_DIR, calc.personaImageUrl.replace(/^\//, ''));
      check(
        fs.existsSync(distFilePath),
        `[${slug}] Image exists in dist directory: ${calc.personaImageUrl}`,
        `[${slug}] Missing image file in dist: ${distFilePath}`
      );
    }
  }

  // 5. Check imageAlt quality
  check(
    Boolean(calc.imageAlt && calc.imageAlt.trim().length >= 15),
    `[${slug}] imageAlt is descriptive (${calc.imageAlt?.length || 0} chars): "${calc.imageAlt}"`,
    `[${slug}] imageAlt is missing or too brief`
  );

  // imageAlt should not repeat personaRole blindly
  check(
    calc.imageAlt !== calc.personaRole,
    `[${slug}] imageAlt describes visual content rather than repeating personaRole`,
    `[${slug}] imageAlt blindly repeats personaRole ("${calc.personaRole}")`
  );

  // 6. Check explicit width and height dimensions
  check(
    Boolean(calc.imageWidth && calc.imageWidth > 0 && calc.imageHeight && calc.imageHeight > 0),
    `[${slug}] Dimensions explicitly declared (${calc.imageWidth}x${calc.imageHeight})`,
    `[${slug}] Missing width or height dimensions`
  );
}

// 7. Check total unique images
check(
  seenPaths.size === 15,
  `All 15 calculators have separate dedicated image assets (15/15 unique)`,
  `Expected 15 unique images across 15 calculators, found ${seenPaths.size}`
);

// Summary
console.log('\n--- Asset Verification Results ---');
console.log(`Passed: ${passes.length}`);
console.log(`Failed: ${errors.length}`);

if (errors.length > 0) {
  console.error('\nAsset verification errors:');
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log('\nAll image asset checks passed with 100% compliance! ✨');
  process.exit(0);
}
