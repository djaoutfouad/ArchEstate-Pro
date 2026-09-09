import {
  calculateBA13Ceiling,
  calculatePVCCeiling,
  calculateAcousticGridCeiling,
  calculateCoveCeiling,
  calculatePlasterCeiling,
  calculatePaintPrimer,
  calculateTiles,
  calculateConcrete,
  calculateBricks,
  calculateACSize,
  calculateMortgagePITI,
  calculateRentalYield,
  calculateAffordability,
  calculateClosingCosts,
  calculateWallpaper
} from '../src/utils/calculations';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    passed++;
    console.log(`✓ PASS: ${testName}`);
  } else {
    failed++;
    console.error(`✗ FAIL: ${testName}`);
  }
}

console.log('--- Running Calculation Engine Edge-Case Tests ---');

// 1. BA13 Drywall Ceiling
try {
  const r1 = calculateBA13Ceiling({ roomLength: 5, roomWidth: 4, wastagePct: 10, hangerSpacing: 0.9 });
  assert(typeof r1.primaryResult.value === 'number' && r1.primaryResult.value > 0, 'BA13 normal values produce positive boards');
  const r1_zero = calculateBA13Ceiling({ roomLength: 0, roomWidth: -5, wastagePct: -2 });
  assert(!isNaN(r1_zero.primaryResult.value as number) && (r1_zero.primaryResult.value as number) > 0, 'BA13 clamps negative/zero dimensions cleanly');
} catch (e) {
  assert(false, `BA13 threw exception: ${e}`);
}

// 2. PVC Ceiling
try {
  const r2 = calculatePVCCeiling({ roomLength: 4, roomWidth: 3 });
  assert(typeof r2.primaryResult.value === 'number' && r2.primaryResult.value > 0, 'PVC normal values work');
} catch (e) {
  assert(false, `PVC threw exception: ${e}`);
}

// 3. Acoustic 60x60
try {
  const r3 = calculateAcousticGridCeiling({ roomLength: 6, roomWidth: 5 });
  assert(typeof r3.primaryResult.value === 'number' && r3.primaryResult.value > 0, 'Acoustic Grid works');
} catch (e) {
  assert(false, `Acoustic Grid threw exception: ${e}`);
}

// 4. Cove Light
try {
  const r4 = calculateCoveCeiling({ roomLength: 5, roomWidth: 4 });
  assert(typeof r4.primaryResult.value === 'number' && r4.primaryResult.value > 0, 'Cove Light works');
} catch (e) {
  assert(false, `Cove Light threw exception: ${e}`);
}

// 5. Plaster Staff
try {
  const r5 = calculatePlasterCeiling({ roomLength: 4, roomWidth: 3 });
  assert(typeof r5.primaryResult.value === 'number' && r5.primaryResult.value > 0, 'Plaster Staff works');
} catch (e) {
  assert(false, `Plaster Staff threw exception: ${e}`);
}

// 6. Paint & Primer
try {
  const r6 = calculatePaintPrimer({ wallLength: 12, wallHeight: 2.8, coats: 2 });
  assert(typeof r6.primaryResult.value === 'number' && r6.primaryResult.value > 0, 'Paint & Primer works');
} catch (e) {
  assert(false, `Paint & Primer threw exception: ${e}`);
}

// 7. Tiles & Grout
try {
  const r7 = calculateTiles({ floorLength: 5, floorWidth: 4, tileLengthCm: 60, tileWidthCm: 60 });
  assert(typeof r7.primaryResult.value === 'number' && r7.primaryResult.value > 0, 'Tiles & Grout works');
} catch (e) {
  assert(false, `Tiles & Grout threw exception: ${e}`);
}

// 8. Concrete
try {
  const r8 = calculateConcrete({ length: 6, width: 4, thickness: 15, bagSize: 25 });
  assert(typeof r8.primaryResult.value === 'number' && r8.primaryResult.value > 0, 'Concrete slab works');
  const r8_bags = r8.secondaryResults.find(s => s.id === 'premixBags');
  assert(r8_bags !== undefined && (r8_bags.value as number) > 0, 'Concrete premix bags calculated');
} catch (e) {
  assert(false, `Concrete threw exception: ${e}`);
}

// 9. Bricks & Blocks
try {
  const r9 = calculateBricks({ wallLength: 8, wallHeight: 2.6 });
  assert(typeof r9.primaryResult.value === 'number' && r9.primaryResult.value > 0, 'Brick & Block works');
} catch (e) {
  assert(false, `Bricks threw exception: ${e}`);
}

// 10. AC BTU Cooling
try {
  const r10 = calculateACSize({ roomLength: 5, roomWidth: 4, ceilingHeight: 2.7, occupants: 2 });
  assert(typeof r10.primaryResult.value === 'number' && r10.primaryResult.value > 0, 'AC BTU works');
} catch (e) {
  assert(false, `AC BTU threw exception: ${e}`);
}

// 11. Mortgage Amortization & PITI (CRITICAL: Test 0% rate and normal rate)
try {
  const r11_normal = calculateMortgagePITI({ purchasePrice: 400000, downPayment: 80000, interestRate: 6.5, loanTerm: 30 });
  assert(!isNaN(r11_normal.primaryResult.value as number) && (r11_normal.primaryResult.value as number) > 0, 'Mortgage normal rate works');
  assert(r11_normal.amortizationSchedule !== undefined && r11_normal.amortizationSchedule.length === 360, 'Mortgage amortization schedule has 360 months');

  // Test 0% interest rate
  const r11_zero = calculateMortgagePITI({ purchasePrice: 300000, downPayment: 60000, interestRate: 0, loanTerm: 20 });
  const loanAmount = 240000;
  const expectedMonthlyPI = loanAmount / (20 * 12); // exactly 1000
  const piResult = r11_zero.secondaryResults.find(s => s.id === 'pi');
  assert(piResult !== undefined && Math.abs((piResult.value as number) - expectedMonthlyPI) < 0.01, 'Mortgage 0% interest calculates exact principal payment without NaN');
  assert(r11_zero.amortizationSchedule !== undefined && r11_zero.amortizationSchedule[0].interest === 0, 'Mortgage 0% interest month 1 interest is 0');
  assert(r11_zero.amortizationSchedule !== undefined && r11_zero.amortizationSchedule[239].balance === 0, 'Mortgage 0% interest final balance is 0');
} catch (e) {
  assert(false, `Mortgage calculation threw exception: ${e}`);
}

// 12. Rental Yield & Cap Rate
try {
  const r12 = calculateRentalYield({ purchasePrice: 300000, downPayment: 60000, monthlyRent: 2000, vacancyPct: 5, annualOpex: 4000 });
  assert(!isNaN(r12.primaryResult.value as number) && (r12.primaryResult.value as number) > 0, 'Rental Yield normal values work');
  // Test zero rent or zero price safely
  const r12_zero = calculateRentalYield({ purchasePrice: 0, monthlyRent: 0, vacancyPct: 0 });
  assert(!isNaN(r12_zero.primaryResult.value as number) && !isNaN((r12_zero.secondaryResults[0].value as number)), 'Rental Yield 0 rent does not crash or produce NaN');
} catch (e) {
  assert(false, `Rental Yield threw exception: ${e}`);
}

// 13. Affordability & Debt Ratio (CRITICAL: Test 0% interest rate and normal)
try {
  const r13_normal = calculateAffordability({ grossAnnualIncome: 120000, monthlyDebts: 500, interestRate: 6.5, loanTerm: 30, downPayment: 50000 });
  assert(!isNaN(r13_normal.primaryResult.value as number) && (r13_normal.primaryResult.value as number) > 0, 'Affordability normal values produce positive price');

  // Test 0% rate
  const r13_zeroRate = calculateAffordability({ grossAnnualIncome: 100000, monthlyDebts: 0, interestRate: 0, loanTerm: 30, downPayment: 40000 });
  assert(!isNaN(r13_zeroRate.primaryResult.value as number) && (r13_zeroRate.primaryResult.value as number) > 0, 'Affordability 0% rate produces valid number without NaN');
} catch (e) {
  assert(false, `Affordability calculation threw exception: ${e}`);
}

// 14. Closing Costs
try {
  const r14 = calculateClosingCosts({ propertyPrice: 350000, transferTaxPct: 3.5, downPayment: 70000 });
  assert(!isNaN(r14.primaryResult.value as number) && (r14.primaryResult.value as number) > 0, 'Closing costs work');
} catch (e) {
  assert(false, `Closing costs threw exception: ${e}`);
}

// 15. Wallpaper
try {
  const r15 = calculateWallpaper({ wallWidth: 5, wallHeight: 2.8, rollWidth: 53, rollLength: 10.05, patternRepeat: 32 });
  assert(!isNaN(r15.primaryResult.value as number) && (r15.primaryResult.value as number) > 0, 'Wallpaper works');
  const r15_zeroPattern = calculateWallpaper({ wallWidth: 5, wallHeight: 2.8, patternRepeat: 0 });
  assert(!isNaN(r15_zeroPattern.primaryResult.value as number) && (r15_zeroPattern.primaryResult.value as number) > 0, 'Wallpaper 0 pattern repeat works');
} catch (e) {
  assert(false, `Wallpaper threw exception: ${e}`);
}

console.log(`\n--- Test Suite Summary ---`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('All mathematical edge-case tests passed successfully!');
}
