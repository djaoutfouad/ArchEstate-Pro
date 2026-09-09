import React from 'react';
import { CalculatorDefinition } from '../../types/calculator';
import { 
  BookOpen, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Calculator, 
  Layers, 
  Sparkles, 
  Info, 
  ShieldAlert, 
  ExternalLink,
  Calendar
} from 'lucide-react';
import { getCalculatorPath } from '../../config/site';

interface CalculatorEducationalGuideProps {
  calculator: CalculatorDefinition;
  relatedCalculators?: CalculatorDefinition[];
  onSelectCalculator?: (calculator: CalculatorDefinition) => void;
}

export const CalculatorEducationalGuide: React.FC<CalculatorEducationalGuideProps> = ({
  calculator,
  relatedCalculators = [],
  onSelectCalculator,
}) => {
  const content = calculator.educationalContent;
  if (!content) return null;

  return (
    <div className="mt-12 space-y-10 border-t border-slate-200 pt-10 text-slate-800" id="educational-guide">
      {/* 1. Header & What It Does */}
      <section aria-labelledby="section-guide-title" className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Comprehensive Architectural & Engineering Guide</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last Reviewed: {content.lastReviewed}</span>
          </div>
        </div>

        <h2 id="section-guide-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Understanding the {calculator.title}
        </h2>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
          {content.whatItDoes}
        </p>
      </section>

      {/* 2. When To Use It */}
      <section aria-labelledby="section-when-to-use" className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-7 space-y-4">
        <h3 id="section-when-to-use" className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          When to Use This Tool
        </h3>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
          {content.whenToUse.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Input-by-Input Explanation */}
      <section aria-labelledby="section-inputs-guide" className="space-y-4">
        <h3 id="section-inputs-guide" className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-slate-600" />
          Input Parameters & Measurement Guidelines
        </h3>
        <p className="text-sm text-slate-600">
          Accurate outputs depend on verified field measurements. Review each parameter's engineering purpose and recommended measuring method below:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-6">Parameter</th>
                <th scope="col" className="px-4 py-3 sm:px-6">Engineering Purpose</th>
                <th scope="col" className="px-4 py-3 sm:px-6">How to Measure on Site</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {content.inputExplanations.map((input, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 sm:px-6 font-semibold text-slate-900 whitespace-nowrap align-top">
                    {input.label}
                  </td>
                  <td className="px-4 py-3.5 sm:px-6 text-slate-700 align-top">
                    {input.purpose}
                  </td>
                  <td className="px-4 py-3.5 sm:px-6 text-slate-600 text-xs sm:text-sm align-top">
                    {input.howToMeasure}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Worked Realistic Example */}
      <section aria-labelledby="section-worked-example" className="bg-emerald-950/5 border border-emerald-900/10 rounded-xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg" id="section-worked-example">
          <Calculator className="w-5 h-5 text-emerald-700" />
          <h3>Worked Engineering Example</h3>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 text-base">
            Scenario: {content.workedExample.scenarioTitle}
          </h4>
          <p className="text-sm text-slate-700 italic">
            {content.workedExample.inputsDescription}
          </p>
          <div className="bg-white border border-emerald-100 rounded-lg p-4 space-y-2 text-sm text-slate-800 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">Step-by-Step Calculation:</span>
            <ul className="space-y-1.5 list-disc pl-5">
              {content.workedExample.stepByStepMath.map((step, idx) => (
                <li key={idx} className="text-slate-700 leading-relaxed">{step}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <strong>Estimated Order Output:</strong> {content.workedExample.finalOutputSummary}
          </p>
        </div>
      </section>

      {/* 5. Plain Language Formula & Assumptions */}
      <div className="grid md:grid-cols-2 gap-6">
        <section aria-labelledby="section-formula" className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
          <h3 id="section-formula" className="font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Plain-Language Formula
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
            {content.plainLanguageFormula}
          </p>
          <p className="text-xs text-slate-700">
            {content.roundingAndUnits}
          </p>
        </section>

        <section aria-labelledby="section-assumptions" className="border border-slate-200 rounded-xl p-6 bg-white space-y-3">
          <h3 id="section-assumptions" className="font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-600" />
            Key Assumptions & Standards
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {content.assumptionsAndDefaults.map((assumption, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                <span>{assumption}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 8 & 9. Scope Boundaries & Common Mistakes */}
      <div className="grid md:grid-cols-2 gap-6">
        <section aria-labelledby="section-exclusions" className="border border-amber-200 bg-amber-50/50 rounded-xl p-6 space-y-3">
          <h3 id="section-exclusions" className="font-bold text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            What the Result Does Not Include
          </h3>
          <ul className="space-y-2 text-sm text-amber-950/80">
            {content.whatResultExcludes.map((exclusion, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{exclusion}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="section-mistakes" className="border border-rose-200 bg-rose-50/50 rounded-xl p-6 space-y-3">
          <h3 id="section-mistakes" className="font-bold text-rose-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Common Pitfalls to Avoid
          </h3>
          <ul className="space-y-2 text-sm text-rose-950/80">
            {content.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 10. When to Consult Professional */}
      <section aria-labelledby="section-consult-pro" className="bg-slate-900 text-white rounded-xl p-6 sm:p-7 space-y-3">
        <h3 id="section-consult-pro" className="text-lg font-bold flex items-center gap-2 text-white">
          <ShieldAlert className="w-5 h-5 text-emerald-400" />
          Professional Verification & Local Building Code Notice
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {content.whenToConsultProfessional}
        </p>
        <p className="text-xs text-slate-700 border-t border-slate-800 pt-3">
          Notice: All computational outputs on ArchEstate Pro represent preliminary planning estimates. Actual field conditions, seismic requirements, structural spans, and local jurisdiction building codes must be verified by a licensed professional engineer, architect, or general contractor before construction or financial commitment.
        </p>
      </section>

      {/* 11. Tool-Specific Frequently Asked Questions */}
      {calculator.faqs && calculator.faqs.length > 0 && (
        <section aria-labelledby="section-faqs" className="space-y-4">
          <h3 id="section-faqs" className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            Frequently Asked Questions: {calculator.title}
          </h3>
          <div className="space-y-3">
            {calculator.faqs.map((faq, idx) => (
              <details key={idx} className="group border border-slate-200 rounded-xl bg-white p-5 [&_summary::-webkit-details-marker]:hidden open:border-emerald-200 open:bg-emerald-50/20 transition-colors">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-900 group-open:text-emerald-900">
                  <span className="text-base">{faq.question}</span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 12. Related Architectural & PropTech Calculators */}
      {relatedCalculators.length > 0 && (
        <section aria-labelledby="section-related" className="space-y-4 pt-4 border-t border-slate-200">
          <h3 id="section-related" className="text-xl font-bold text-slate-900">
            Related Architectural & Construction Calculators
          </h3>
          <p className="text-sm text-slate-600">
            Continue planning your project specifications with complementary engineering tools:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedCalculators.map((related) => (
              <a
                key={related.id}
                href={getCalculatorPath(related.slug)}
                onClick={(e) => {
                  if (onSelectCalculator) {
                    e.preventDefault();
                    onSelectCalculator(related);
                  }
                }}
                className="group p-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl transition-all duration-200 hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                      {related.categoryName}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-emerald-800 text-sm">
                    {related.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {related.shortDescription}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
