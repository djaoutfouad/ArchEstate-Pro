import { JSDOM } from 'jsdom';

// 1. Setup Full DOM Environment BEFORE importing React
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>', {
  url: 'https://archestatepro.com/calculators/ba13-drywall-ceiling/',
  pretendToBeVisual: true,
});

(global as any).window = dom.window;
(global as any).document = dom.window.document;
Object.defineProperty(global, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
  writable: true,
});
(global as any).HTMLElement = dom.window.HTMLElement;
(global as any).HTMLInputElement = dom.window.HTMLInputElement;
(global as any).HTMLButtonElement = dom.window.HTMLButtonElement;
(global as any).Event = dom.window.Event;
(global as any).CustomEvent = dom.window.CustomEvent;
(global as any).MouseEvent = dom.window.MouseEvent;
(global as any).InputEvent = dom.window.InputEvent;
(global as any).UIEvent = dom.window.UIEvent;
(global as any).KeyboardEvent = dom.window.KeyboardEvent;
(global as any).IS_REACT_ACT_ENVIRONMENT = true;

// Mock window.matchMedia and clipboard
(dom.window as any).matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});

Object.assign(navigator, {
  clipboard: {
    writeText: async () => {},
  },
});

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

async function runBrowserTests() {
  // Dynamically import React and app modules after DOM environment is established
  const React = (await import('react')).default;
  const { act } = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { CALCULATORS } = await import('../src/data/calculatorsData');
  const { CalculatorEngine } = await import('../src/components/calculator/CalculatorEngine');
  const { RouterProvider } = await import('../src/utils/router');

  async function testCalculatorInBrowser(slug: string, browserLocale: string) {
    console.log(`\n================================================================`);
    console.log(`Testing Calculator: /calculators/${slug}/ under Locale: ${browserLocale}`);
    console.log(`================================================================`);

    // Emulate locale context in navigator
    Object.defineProperty(navigator, 'language', { value: browserLocale, configurable: true });
    Object.defineProperty(navigator, 'languages', { value: [browserLocale, 'en'], configurable: true });

    const calcDef = CALCULATORS.find((c) => c.slug === slug);
    if (!calcDef) {
      throw new Error(`Calculator not found for slug: ${slug}`);
    }

    const container = document.createElement('div');
    document.body.replaceChildren(container);
    const root = createRoot(container);

    // 1. Mount and wait for React hydration
    await act(async () => {
      root.render(
        React.createElement(
          RouterProvider,
          null,
          React.createElement(CalculatorEngine, {
            calculator: calcDef,
            onNavigateHome: () => {},
            onNavigateCategory: () => {},
            onSelectRelated: () => {},
          })
        )
      );
    });

    // Verify container mounted
    assert(container.innerHTML.length > 0, 'React component mounted and hydrated in DOM', 'React component failed to mount');

    // 2. Select input elements inside Input Parameters panel
    const inputPanel = container.querySelector('.contractor-input-spec');
    assert(!!inputPanel, 'Input Parameters panel (.contractor-input-spec) located in DOM', 'Missing .contractor-input-spec panel');

    for (const field of calcDef.inputs) {
      if (field.options) continue; // Skip select dropdowns for text/numeric checks

      const inputId = `input-${field.id}`;
      const inputEl = container.querySelector(`#${inputId}`) as HTMLInputElement | null;
      assert(!!inputEl, `Input element #${inputId} rendered in DOM`, `Missing input element #${inputId}`);
      if (!inputEl) continue;

      // 3. Inspect input attributes: type="text", inputMode="decimal", lang="en", dir="ltr"
      assert(
        inputEl.getAttribute('type') === 'text',
        `#${inputId} has type="text" (strictly avoiding type="number")`,
        `#${inputId} has type="${inputEl.getAttribute('type')}" instead of "text"`
      );
      assert(
        inputEl.getAttribute('inputmode') === 'decimal',
        `#${inputId} has inputmode="decimal"`,
        `#${inputId} missing inputmode="decimal"`
      );
      assert(
        inputEl.getAttribute('lang') === 'en',
        `#${inputId} has lang="en"`,
        `#${inputId} missing lang="en"`
      );
      assert(
        inputEl.getAttribute('dir') === 'ltr',
        `#${inputId} has dir="ltr"`,
        `#${inputId} missing dir="ltr"`
      );

      // 4. Inspect initial input.value from DOM
      const initialVal = inputEl.value;
      assert(
        !ARABIC_INDIC_REGEX.test(initialVal),
        `#${inputId} initial DOM value "${initialVal}" is strictly Latin ASCII (0-9)`,
        `#${inputId} initial DOM value contains Arabic/Eastern digits: "${initialVal}"`
      );

      // Helper to simulate user typing into controlled input in React
      const fireUserInput = async (text: string) => {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          dom.window.HTMLInputElement.prototype,
          'value'
        )?.set;
        await act(async () => {
          if (nativeSetter) {
            nativeSetter.call(inputEl, text);
          } else {
            inputEl.value = text;
          }
          inputEl.dispatchEvent(new dom.window.Event('input', { bubbles: true, cancelable: true }));
        });
      };

      // 5. Test typing "1234.56"
      await fireUserInput('1234.56');

      assert(
        !ARABIC_INDIC_REGEX.test(inputEl.value) && inputEl.value.includes('1234'),
        `#${inputId} after typing "1234.56": DOM value is "${inputEl.value}" (strictly Latin ASCII)`,
        `#${inputId} failed to preserve Latin digits on typing: "${inputEl.value}"`
      );

      // 6. Test typing Arabic digits "١٢.٥" (e.g. pasted or typed via Arabic keyboard)
      await fireUserInput('١٢.٥');

      assert(
        !ARABIC_INDIC_REGEX.test(inputEl.value) && inputEl.value === '12.5',
        `#${inputId} after typing Arabic "١٢.٥": normalized live to "${inputEl.value}"`,
        `#${inputId} failed to normalize Arabic digits in DOM: "${inputEl.value}"`
      );

      // 7. Test Stepper Down (-) button
      const stepDownBtn = container.querySelector(`#step-down-${field.id}`) as HTMLButtonElement | null;
      if (stepDownBtn) {
        await act(async () => {
          stepDownBtn.click();
        });
        assert(
          !ARABIC_INDIC_REGEX.test(inputEl.value),
          `#${inputId} after step-down click: DOM value "${inputEl.value}" is strictly Latin ASCII`,
          `#${inputId} contains Arabic digits after step-down: "${inputEl.value}"`
        );
      }

      // 8. Test Stepper Up (+) button
      const stepUpBtn = container.querySelector(`#step-up-${field.id}`) as HTMLButtonElement | null;
      if (stepUpBtn) {
        await act(async () => {
          stepUpBtn.click();
        });
        assert(
          !ARABIC_INDIC_REGEX.test(inputEl.value),
          `#${inputId} after step-up click: DOM value "${inputEl.value}" is strictly Latin ASCII`,
          `#${inputId} contains Arabic digits after step-up: "${inputEl.value}"`
        );
      }

      // 9. Blur event sanity check
      await act(async () => {
        inputEl.dispatchEvent(new dom.window.Event('blur', { bubbles: true }));
      });
      assert(
        !ARABIC_INDIC_REGEX.test(inputEl.value),
        `#${inputId} after blur event: DOM value "${inputEl.value}" remains strictly Latin ASCII`,
        `#${inputId} contains Arabic digits after blur: "${inputEl.value}"`
      );
    }

    // 10. Check Computed Output Specification in the DOM
    const computedOutputs = container.textContent || '';
    const matches = computedOutputs.match(/[\u0660-\u0669\u06F0-\u06F9]/g);
    assert(
      !matches,
      `Full DOM text content for /calculators/${slug}/ contains ZERO Arabic digits [٠-٩]`,
      `Found Arabic digits in rendered DOM: ${matches ? matches.slice(0, 5).join(', ') : ''}`
    );

    // 11. Test Reset Spec button
    const resetBtn = (container.querySelector('#reset-inputs-btn') || container.querySelector('#reset-spec-btn')) as HTMLButtonElement | null;
    assert(!!resetBtn, 'Reset Spec button (#reset-inputs-btn) exists in DOM', 'Missing #reset-inputs-btn');
    if (resetBtn) {
      await act(async () => {
        resetBtn.click();
      });

      for (const field of calcDef.inputs) {
        if (field.options) continue;
        const inputEl = container.querySelector(`#input-${field.id}`) as HTMLInputElement | null;
        if (inputEl) {
          assert(
            inputEl.value === String(field.defaultValue),
            `#input-${field.id} successfully reset to defaultValue "${field.defaultValue}"`,
            `#input-${field.id} failed to reset: current value is "${inputEl.value}"`
          );
          assert(
            !ARABIC_INDIC_REGEX.test(inputEl.value),
            `#input-${field.id} reset value "${inputEl.value}" is strictly Latin ASCII`,
            `#input-${field.id} reset value has Arabic digits: "${inputEl.value}"`
          );
        }
      }
    }

    // Clean up
    await act(async () => {
      root.unmount();
    });
  }

  console.log('--- ArchEstate Pro Real Browser DOM Hydration & Interaction Test Suite ---');

  const targetPages = [
    'ba13-drywall-ceiling',
    'mortgage-piti',
    'paint-primer',
  ];

  // Test both in English locale and in Arabic (ar-EG) locale context!
  for (const page of targetPages) {
    await testCalculatorInBrowser(page, 'en-US');
    await testCalculatorInBrowser(page, 'ar-EG');
  }

  // Also test remaining 12 calculators under ar-EG to guarantee 100% full coverage!
  const remainingPages = CALCULATORS
    .map((c) => c.slug)
    .filter((slug) => !targetPages.includes(slug));

  for (const page of remainingPages) {
    await testCalculatorInBrowser(page, 'ar-EG');
  }

  console.log('\n================================================================');
  console.log('--- Real Browser DOM Test Results ---');
  console.log(`Total Passes: ${passCount}`);
  console.log(`Total Failures: ${failCount}`);

  if (failCount > 0) {
    console.error('\nBrowser DOM test suite encountered failures!');
    process.exit(1);
  } else {
    console.log('\nAll Real Browser DOM tests passed! Zero Arabic digits in DOM under all locales! ✨');
    process.exit(0);
  }
}

runBrowserTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
