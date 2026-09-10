import { CalculatorDefinition } from '../types/calculator';
import { getCalculatorPath } from '../config/site';

/**
 * Escapes characters for safe HTML output
 */
export function escapeHtml(str: string | number | undefined | null): string {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates semantic, search-engine-readable static HTML for a calculator's
 * 13 core educational and planning sections.
 */
export function renderEducationalGuideHtml(
  calculator: CalculatorDefinition,
  relatedCalculators: CalculatorDefinition[] = []
): string {
  const content = calculator.educationalContent;
  if (!content) return '';

  const inputRows = (content.inputExplanations || [])
    .map(
      (input) => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="px-4 py-3.5 sm:px-6 font-semibold text-slate-900 whitespace-nowrap align-top">
          ${escapeHtml(input.label)}
        </td>
        <td class="px-4 py-3.5 sm:px-6 text-slate-700 align-top">
          ${escapeHtml(input.purpose)}
        </td>
        <td class="px-4 py-3.5 sm:px-6 text-slate-600 text-xs sm:text-sm align-top">
          ${escapeHtml(input.howToMeasure)}
        </td>
      </tr>`
    )
    .join('\n');

  const whenToUseItems = (content.whenToUse || [])
    .map(
      (item) => `
      <li class="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
        <span>${escapeHtml(item)}</span>
      </li>`
    )
    .join('\n');

  const workedSteps = (content.workedExample?.stepByStepMath || [])
    .map(
      (step) => `
      <li class="text-slate-700 leading-relaxed">${escapeHtml(step)}</li>`
    )
    .join('\n');

  const assumptionsList = (content.assumptionsAndDefaults || [])
    .map(
      (assumption) => `
      <li class="flex items-start gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></span>
        <span>${escapeHtml(assumption)}</span>
      </li>`
    )
    .join('\n');

  const exclusionsList = (content.whatResultExcludes || [])
    .map(
      (exclusion) => `
      <li class="flex items-start gap-2">
        <span class="text-amber-600 font-bold">•</span>
        <span>${escapeHtml(exclusion)}</span>
      </li>`
    )
    .join('\n');

  const mistakesList = (content.commonMistakes || [])
    .map(
      (mistake) => `
      <li class="flex items-start gap-2">
        <span class="text-rose-600 font-bold">✕</span>
        <span>${escapeHtml(mistake)}</span>
      </li>`
    )
    .join('\n');

  const faqsList = (calculator.faqs || [])
    .map(
      (faq) => `
      <details class="group border border-slate-200 rounded-xl bg-white p-5 open:border-emerald-200 open:bg-emerald-50/20 transition-colors">
        <summary class="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-900 group-open:text-emerald-900">
          <span class="text-base">${escapeHtml(faq.question)}</span>
          <span class="shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500">▼</span>
        </summary>
        <div class="mt-3 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
          ${escapeHtml(faq.answer)}
        </div>
      </details>`
    )
    .join('\n');

  const relatedCards = relatedCalculators
    .map(
      (related) => `
      <a
        href="${escapeHtml(getCalculatorPath(related.slug))}"
        class="group p-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl transition-all duration-200 hover:shadow-md flex flex-col justify-between"
      >
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              ${escapeHtml(related.categoryName || related.category)}
            </span>
            <span class="text-xs text-slate-400 group-hover:text-emerald-600">↗</span>
          </div>
          <h4 class="font-semibold text-slate-900 group-hover:text-emerald-800 text-sm">
            ${escapeHtml(related.title)}
          </h4>
          <p class="text-xs text-slate-600 line-clamp-2">
            ${escapeHtml(related.shortDescription)}
          </p>
        </div>
      </a>`
    )
    .join('\n');

  return `
  <section class="mt-12 space-y-10 border-t border-slate-200 pt-10 text-slate-800" id="educational-guide" aria-label="Educational and Technical Guide">
    <!-- 1. What This Calculator Does -->
    <article aria-labelledby="section-what-it-does" class="space-y-4">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <span>Comprehensive Architectural &amp; Planning Guide</span>
        </div>
        <!-- 11. Last Reviewed Date -->
        <div class="flex items-center gap-1.5 text-xs text-slate-700">
          <span class="font-medium">Last Reviewed:</span>
          <time datetime="${escapeHtml(content.lastReviewed)}">${escapeHtml(content.lastReviewed)}</time>
        </div>
      </div>

      <h2 id="section-what-it-does" class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
        Understanding the ${escapeHtml(calculator.title)}
      </h2>
      <h3 class="text-lg font-bold text-slate-900">What This Calculator Does</h3>
      <p class="text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
        ${escapeHtml(content.whatItDoes)}
      </p>
    </article>

    <!-- 2. When to Use This Tool -->
    <article aria-labelledby="section-when-to-use" class="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-7 space-y-4">
      <h3 id="section-when-to-use" class="text-lg font-bold text-slate-900 flex items-center gap-2">
        When to Use This Tool
      </h3>
      <ul class="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
        ${whenToUseItems}
      </ul>
    </article>

    <!-- 3. Input Parameters and Measurement Guidelines -->
    <article aria-labelledby="section-inputs-guide" class="space-y-4">
      <h3 id="section-inputs-guide" class="text-xl font-bold text-slate-900 flex items-center gap-2">
        Input Parameters and Measurement Guidelines
      </h3>
      <p class="text-sm text-slate-600">
        Accurate estimates require precise field measurements. Review each parameter purpose and measurement method below:
      </p>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full divide-y divide-slate-200 text-sm text-left">
          <thead class="bg-slate-100 text-slate-700 font-semibold">
            <tr>
              <th scope="col" class="px-4 py-3 sm:px-6">Parameter</th>
              <th scope="col" class="px-4 py-3 sm:px-6">Engineering Purpose</th>
              <th scope="col" class="px-4 py-3 sm:px-6">How to Measure on Site</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 bg-white">
            ${inputRows}
          </tbody>
        </table>
      </div>
    </article>

    <!-- 4. Worked Engineering or Planning Example -->
    <article aria-labelledby="section-worked-example" class="bg-emerald-950/5 border border-emerald-900/10 rounded-xl p-6 sm:p-7 space-y-4">
      <div class="text-emerald-800 font-bold text-lg" id="section-worked-example">
        <h3 class="text-lg font-bold text-emerald-900">Worked Engineering or Planning Example</h3>
      </div>
      <div class="space-y-3">
        <h4 class="font-semibold text-slate-900 text-base">
          Scenario: ${escapeHtml(content.workedExample?.scenarioTitle)}
        </h4>
        <p class="text-sm text-slate-700 italic">
          ${escapeHtml(content.workedExample?.inputsDescription)}
        </p>
        <div class="bg-white border border-emerald-100 rounded-lg p-4 space-y-2 text-sm text-slate-800 shadow-xs">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-700 block">Step-by-Step Calculation:</span>
          <ul class="space-y-1.5 list-disc pl-5">
            ${workedSteps}
          </ul>
        </div>
        <p class="text-sm font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <strong>Estimated Order Output:</strong> ${escapeHtml(content.workedExample?.finalOutputSummary)}
        </p>
      </div>
    </article>

    <!-- 5, 6 & 7. Plain-Language Formula, Assumptions & Rounding Rules -->
    <div class="grid md:grid-cols-2 gap-6">
      <article aria-labelledby="section-formula" class="border border-slate-200 rounded-xl p-6 bg-white space-y-4">
        <h3 id="section-formula" class="font-bold text-slate-900 flex items-center gap-2">
          Plain-Language Formula
        </h3>
        <p class="text-sm text-slate-700 leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
          ${escapeHtml(content.plainLanguageFormula)}
        </p>
        <div>
          <h4 class="text-sm font-bold text-slate-900 mb-1">Rounding Rules and Units</h4>
          <p class="text-xs text-slate-700 leading-relaxed">
            ${escapeHtml(content.roundingAndUnits)}
          </p>
        </div>
      </article>

      <article aria-labelledby="section-assumptions" class="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
        <h3 id="section-assumptions" class="font-bold text-slate-900 flex items-center gap-2">
          Assumptions and Default Values
        </h3>
        <ul class="space-y-2 text-sm text-slate-700">
          ${assumptionsList}
        </ul>
      </article>
    </div>

    <!-- 8 & 9. What the Result Does Not Include & Common Mistakes -->
    <div class="grid md:grid-cols-2 gap-6">
      <article aria-labelledby="section-exclusions" class="border border-amber-200 bg-amber-50/50 rounded-xl p-6 space-y-3">
        <h3 id="section-exclusions" class="font-bold text-amber-900 flex items-center gap-2">
          What the Result Does Not Include
        </h3>
        <ul class="space-y-2 text-sm text-amber-950/80">
          ${exclusionsList}
        </ul>
      </article>

      <article aria-labelledby="section-mistakes" class="border border-rose-200 bg-rose-50/50 rounded-xl p-6 space-y-3">
        <h3 id="section-mistakes" class="font-bold text-rose-900 flex items-center gap-2">
          Common Mistakes
        </h3>
        <ul class="space-y-2 text-sm text-rose-950/80">
          ${mistakesList}
        </ul>
      </article>
    </div>

    <!-- 10. When to Consult a Qualified Professional -->
    <article aria-labelledby="section-consult-pro" class="bg-slate-900 text-white rounded-xl p-6 sm:p-7 space-y-3">
      <h3 id="section-consult-pro" class="text-lg font-bold text-white">
        When to Consult a Qualified Professional
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        ${escapeHtml(content.whenToConsultProfessional)}
      </p>
      <p class="text-xs text-slate-400 border-t border-slate-800 pt-3">
        Professional Notice: All computational outputs on ArchEstate Pro represent preliminary planning estimators. Actual field conditions, structural loads, seismic ratings, and municipal building codes must be verified by a qualified professional before ordering materials or signing contracts.
      </p>
    </article>

    <!-- 11. Last Reviewed Date Section -->
    <article aria-labelledby="section-reviewed-date" class="bg-slate-50 border border-slate-200 rounded-xl p-5">
      <h4 id="section-reviewed-date" class="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
        Last Reviewed Date
      </h4>
      <p class="text-xs text-slate-700">
        This planning methodology and formula set was last reviewed on <strong>${escapeHtml(content.lastReviewed)}</strong>.
      </p>
    </article>

    <!-- 12. Frequently Asked Questions -->
    ${
      calculator.faqs && calculator.faqs.length > 0
        ? `
    <article aria-labelledby="section-faqs" class="space-y-4">
      <h3 id="section-faqs" class="text-xl font-bold text-slate-900 pb-2 border-b border-slate-200">
        Frequently Asked Questions
      </h3>
      <div class="space-y-3">
        ${faqsList}
      </div>
    </article>`
        : ''
    }

    <!-- 13. Related Calculators -->
    ${
      relatedCalculators.length > 0
        ? `
    <article aria-labelledby="section-related" class="space-y-4 pt-4 border-t border-slate-200">
      <h3 id="section-related" class="text-xl font-bold text-slate-900">
        Related Calculators
      </h3>
      <p class="text-sm text-slate-600">
        Explore complementary calculators for complete project planning:
      </p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${relatedCards}
      </div>
    </article>`
        : ''
    }
  </section>`;
}
