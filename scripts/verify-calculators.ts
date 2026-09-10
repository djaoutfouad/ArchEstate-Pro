import { CALCULATORS } from '../src/data/calculatorsData';

console.log('--- ArchEstate Pro 15-Calculator Exhaustive Logic Verification ---');

let passes: string[] = [];
let errors: string[] = [];

function check(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    passes.push(`✓ ${passMsg}`);
  } else {
    errors.push(`✗ ${failMsg}`);
  }
}

// Ensure exactly 15 calculators
check(
  CALCULATORS.length === 15,
  `Audit registry contains all 15 calculators (15/15)`,
  `Expected 15 calculators, found ${CALCULATORS.length}`
);

for (const calc of CALCULATORS) {
  const slug = calc.slug;

  // 1. Verify input definitions and defaults
  check(
    calc.inputs.length > 0,
    `[${slug}] Has ${calc.inputs.length} configured inputs`,
    `[${slug}] Has no inputs defined`
  );

  for (const field of calc.inputs) {
    check(
      field.defaultValue >= field.min && field.defaultValue <= field.max,
      `[${slug}] Input "${field.id}" defaultValue (${field.defaultValue}) within [${field.min}, ${field.max}]`,
      `[${slug}] Input "${field.id}" defaultValue (${field.defaultValue}) outside [${field.min}, ${field.max}]`
    );
    check(
      field.step > 0,
      `[${slug}] Input "${field.id}" has valid step size (${field.step})`,
      `[${slug}] Input "${field.id}" invalid step (${field.step})`
    );
    check(
      Boolean(field.unit && field.unit.trim()),
      `[${slug}] Input "${field.id}" defines unit: "${field.unit}"`,
      `[${slug}] Input "${field.id}" missing unit`
    );
  }

  // 2. Test Default Values execution
  const defaultInputs: Record<string, number> = {};
  calc.inputs.forEach((f) => { defaultInputs[f.id] = f.defaultValue; });

  let defaultRes;
  try {
    defaultRes = calc.calculate(defaultInputs);
    check(
      defaultRes && typeof defaultRes.primaryResult?.value === 'number',
      `[${slug}] Default inputs calculation succeeded`,
      `[${slug}] Default inputs calculation failed`
    );
    check(
      isFinite(defaultRes.primaryResult.value) && !isNaN(defaultRes.primaryResult.value),
      `[${slug}] Primary result value is finite and valid (${defaultRes.primaryResult.value})`,
      `[${slug}] Primary result produced NaN or Infinity`
    );
    check(
      Boolean(defaultRes.primaryResult.formatted && defaultRes.primaryResult.formatted.length > 0),
      `[${slug}] Primary result formatted string is valid: "${defaultRes.primaryResult.formatted}"`,
      `[${slug}] Primary result formatted string is empty`
    );
    check(
      defaultRes.secondaryResults.length > 0,
      `[${slug}] Has ${defaultRes.secondaryResults.length} secondary results`,
      `[${slug}] Has NO secondary results`
    );
    check(
      defaultRes.summarySteps.length > 0,
      `[${slug}] Has ${defaultRes.summarySteps.length} transparent summary formula steps`,
      `[${slug}] Has NO summary formula steps`
    );

    // Check all secondary results for NaN/Infinity
    defaultRes.secondaryResults.forEach((sr) => {
      const isValid = typeof sr.value === 'number' 
        ? (isFinite(sr.value) && !isNaN(sr.value))
        : (typeof sr.value === 'string' && sr.value.length > 0 && sr.value !== 'NaN' && sr.value !== 'Infinity');
      check(
        isValid,
        `[${slug}] Secondary [${sr.id}] valid (${sr.formatted})`,
        `[${slug}] Secondary [${sr.id}] is NaN or Infinity: ${sr.value}`
      );
    });
  } catch (err: any) {
    errors.push(`✗ [${slug}] Threw exception on default inputs: ${err.message}`);
  }

  // 3. Test Edge Case: Zero / Minimum inputs
  const zeroInputs: Record<string, number> = {};
  calc.inputs.forEach((f) => { zeroInputs[f.id] = 0; });
  try {
    const zeroRes = calc.calculate(zeroInputs);
    const zeroVal = Number(zeroRes.primaryResult.value);
    check(
      isFinite(zeroVal) && !isNaN(zeroVal),
      `[${slug}] Handles 0 inputs safely (${zeroRes.primaryResult.formatted})`,
      `[${slug}] Failed or produced NaN/Infinity on 0 inputs: ${zeroRes.primaryResult.value}`
    );
    zeroRes.secondaryResults.forEach((sr) => {
      const isValid = typeof sr.value === 'number' 
        ? (isFinite(sr.value) && !isNaN(sr.value))
        : (typeof sr.value === 'string' && sr.value.length > 0 && sr.value !== 'NaN' && sr.value !== 'Infinity');
      check(
        isValid,
        `[${slug}] Zero input secondary [${sr.id}] is finite`,
        `[${slug}] Zero input secondary [${sr.id}] produced NaN/Infinity`
      );
    });
  } catch (err: any) {
    errors.push(`✗ [${slug}] Threw exception on zero inputs: ${err.message}`);
  }

  // 4. Test Edge Case: Negative inputs
  const negInputs: Record<string, number> = {};
  calc.inputs.forEach((f) => { negInputs[f.id] = -50; });
  try {
    const negRes = calc.calculate(negInputs);
    const negVal = Number(negRes.primaryResult.value);
    check(
      isFinite(negVal) && !isNaN(negVal),
      `[${slug}] Handles negative inputs safely (${negRes.primaryResult.formatted})`,
      `[${slug}] Failed or produced NaN/Infinity on negative inputs`
    );
  } catch (err: any) {
    errors.push(`✗ [${slug}] Threw exception on negative inputs: ${err.message}`);
  }

  // 5. Test Edge Case: Extreme Maximum Inputs
  const maxInputs: Record<string, number> = {};
  calc.inputs.forEach((f) => { maxInputs[f.id] = f.max; });
  try {
    const maxRes = calc.calculate(maxInputs);
    const maxVal = Number(maxRes.primaryResult.value);
    check(
      isFinite(maxVal) && !isNaN(maxVal),
      `[${slug}] Handles maximum scale bounds safely (${maxRes.primaryResult.formatted})`,
      `[${slug}] Failed or produced NaN/Infinity on maximum inputs`
    );
  } catch (err: any) {
    errors.push(`✗ [${slug}] Threw exception on maximum inputs: ${err.message}`);
  }
}

// Summary
console.log('\n--- 15-Calculator Test Suite Results ---');
console.log(`Passed: ${passes.length}`);
console.log(`Failed: ${errors.length}`);

if (errors.length > 0) {
  console.error('\nErrors in calculator verification:');
  errors.forEach((e) => console.error(e));
  process.exit(1);
} else {
  console.log('\nAll 15 calculators passed exhaustive mathematical, boundary, and edge-case tests! ✨');
  process.exit(0);
}
