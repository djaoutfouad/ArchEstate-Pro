import React, { useState, useEffect, useMemo } from 'react';
import { 
  RotateCcw, 
  Copy, 
  Printer, 
  Share2, 
  Check, 
  Info, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  Layers, 
  FileText, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  Table as TableIcon
} from 'lucide-react';
import { CalculatorDefinition, InputFieldDefinition } from '../../types/calculator';
import { DynamicIcon } from '../common/DynamicIcon';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Disclaimer } from '../common/Disclaimer';
import { AdvertisementPlaceholder } from '../common/AdvertisementPlaceholder';
import { CALCULATORS } from '../../data/calculatorsData';
import { SITE_URL, CONTACT_EMAIL, getCalculatorPath } from '../../config/site';
import { Link } from '../../utils/router';
import { normalizeToAsciiDigits, normalizeInputDigits } from '../../utils/calculations';
import { CalculatorEducationalGuide } from './CalculatorEducationalGuide';

interface CalculatorEngineProps {
  calculator: CalculatorDefinition;
  onNavigateHome: () => void;
  onNavigateCategory: (categoryId: string) => void;
  onSelectRelated: (id: string) => void;
}

export const CalculatorEngine: React.FC<CalculatorEngineProps> = ({
  calculator,
  onNavigateHome,
  onNavigateCategory,
  onSelectRelated,
}) => {
  // Numeric state for computational execution
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    calculator.inputs.forEach((field) => {
      initial[field.id] = field.defaultValue;
    });
    return initial;
  });

  // String state for display in text inputs (always strictly Latin ASCII text)
  const [inputText, setInputText] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    calculator.inputs.forEach((field) => {
      initial[field.id] = String(field.defaultValue);
    });
    return initial;
  });

  // Reset inputs when calculator changes
  useEffect(() => {
    const initialInputs: Record<string, number> = {};
    const initialText: Record<string, string> = {};
    calculator.inputs.forEach((field) => {
      initialInputs[field.id] = field.defaultValue;
      initialText[field.id] = String(field.defaultValue);
    });
    setInputs(initialInputs);
    setInputText(initialText);
    setCopied(false);
    setShowFullSchedule(false);
  }, [calculator.id]);

  // Copy state
  const [copied, setCopied] = useState(false);

  // Amortization schedule toggle
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  // FAQ accordion open states (first item open by default)
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true });

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Live text input change: normalizes Arabic/Persian digits and allows in-progress typing
  const handleTextChange = (field: InputFieldDefinition, rawValue: string) => {
    const normalized = normalizeInputDigits(rawValue);
    
    // Filter out invalid characters, allowing only ASCII digits, dot, and minus if min < 0
    const allowed = field.min < 0 
      ? normalized.replace(/[^0-9.-]/g, '') 
      : normalized.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = allowed.split('.');
    const sanitized = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : allowed;

    // Immediately update text state so the user can type freely (e.g. "12.", "", "0")
    setInputText((prev) => ({ ...prev, [field.id]: sanitized }));

    // If valid finite number, update computation inputs live
    const parsed = parseFloat(sanitized);
    if (!isNaN(parsed) && isFinite(parsed)) {
      setInputs((prev) => ({ ...prev, [field.id]: parsed }));
    }
  };

  // Blur handler: clamps to bounds, restores safe fallback if empty/invalid, re-syncs text
  const handleTextBlur = (field: InputFieldDefinition) => {
    const currentText = inputText[field.id] ?? '';
    const parsed = parseFloat(currentText);

    if (isNaN(parsed) || !isFinite(parsed) || currentText.trim() === '') {
      const fallback = field.defaultValue;
      setInputText((prev) => ({ ...prev, [field.id]: String(fallback) }));
      setInputs((prev) => ({ ...prev, [field.id]: fallback }));
      return;
    }

    // Clamp within min and max
    const clamped = Math.max(field.min, Math.min(field.max, parsed));
    const stepDecimals = (field.step.toString().split('.')[1] || '').length;
    const rounded = stepDecimals > 0 ? parseFloat(clamped.toFixed(stepDecimals)) : clamped;

    setInputText((prev) => ({ ...prev, [field.id]: String(rounded) }));
    setInputs((prev) => ({ ...prev, [field.id]: rounded }));
  };

  // Stepper handler (+ / - buttons)
  const handleStep = (field: InputFieldDefinition, delta: number) => {
    const current = inputs[field.id] ?? field.defaultValue;
    const target = current + delta;
    const clamped = Math.max(field.min, Math.min(field.max, target));
    const stepDecimals = (field.step.toString().split('.')[1] || '').length;
    const rounded = stepDecimals > 0 ? parseFloat(clamped.toFixed(stepDecimals)) : clamped;

    setInputs((prev) => ({ ...prev, [field.id]: rounded }));
    setInputText((prev) => ({ ...prev, [field.id]: String(rounded) }));
  };

  // Range slider change handler
  const handleSliderChange = (field: InputFieldDefinition, rawValue: string) => {
    const num = parseFloat(rawValue);
    if (!isNaN(num) && isFinite(num)) {
      setInputs((prev) => ({ ...prev, [field.id]: num }));
      setInputText((prev) => ({ ...prev, [field.id]: String(num) }));
    }
  };

  // Select dropdown change handler
  const handleSelectChange = (field: InputFieldDefinition, rawValue: string) => {
    const num = parseFloat(rawValue);
    if (!isNaN(num) && isFinite(num)) {
      setInputs((prev) => ({ ...prev, [field.id]: num }));
      setInputText((prev) => ({ ...prev, [field.id]: String(num) }));
    }
  };

  // Reset to default values
  const handleReset = () => {
    const initialInputs: Record<string, number> = {};
    const initialText: Record<string, string> = {};
    calculator.inputs.forEach((field) => {
      initialInputs[field.id] = field.defaultValue;
      initialText[field.id] = String(field.defaultValue);
    });
    setInputs(initialInputs);
    setInputText(initialText);
  };

  // Run calculation deterministically
  const results = useMemo(() => {
    try {
      return calculator.calculate(inputs);
    } catch (err) {
      console.error('Calculation error:', err);
      return {
        primaryResult: { id: 'err', label: 'Calculation Error', value: 0, formatted: '0' },
        secondaryResults: [],
        summarySteps: [],
      };
    }
  }, [calculator, inputs]);

  // Copy calculation summary
  const handleCopySummary = () => {
    const textLines = [
      `=== ${calculator.title} — ArchEstate Pro Specification ===`,
      `Date: ${new Date().toLocaleDateString('en-US-u-nu-latn', { year: 'numeric', month: 'short', day: 'numeric', numberingSystem: 'latn' })}`,
      `Category: ${calculator.categoryName}`,
      '',
      '--- INPUT PARAMETERS ---',
      ...calculator.inputs.map(
        (f) => `• ${f.label}: ${inputs[f.id] ?? f.defaultValue} ${f.unit}`
      ),
      '',
      '--- PRIMARY CALCULATION RESULT ---',
      `★ ${results.primaryResult.label}: ${results.primaryResult.formatted}`,
      results.primaryResult.description ? `  Note: ${results.primaryResult.description}` : '',
      '',
      '--- DETAILED BREAKDOWN ---',
      ...results.secondaryResults.map(
        (r) => `• ${r.label}: ${r.formatted} ${r.description ? `(${r.description})` : ''}`
      ),
      '',
      '--- CALCULATION SUMMARY STEPS ---',
      ...results.summarySteps.map((s) => `• ${s.label}: ${s.formula} = ${s.value}`),
      '',
      `Generated by ArchEstate Pro (${SITE_URL})`,
      `Official Contact: ${CONTACT_EMAIL}`,
      'Notice: Planning estimates only. Verify measurements on-site.',
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(textLines).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Print spec sheet
  const handlePrint = () => {
    window.print();
  };

  // Related calculators
  const relatedCalculators = useMemo(() => {
    return CALCULATORS.filter((c) => calculator.relatedCalculatorIds.includes(c.id));
  }, [calculator]);

  const isFinancial = calculator.category === 'real-estate';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all" id="calculator-execution-page">
      {/* Breadcrumbs */}
      <div className="no-print">
        <Breadcrumbs
          categoryName={calculator.categoryName}
          categoryId={calculator.category}
          calculatorTitle={calculator.title}
          onNavigateHome={onNavigateHome}
          onNavigateCategory={onNavigateCategory}
        />
      </div>

      {/* Printable Contractor Document Header (Print Only) */}
      <div className="print-only hidden mb-6 pb-4 border-b-2 border-slate-900">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">
              ArchEstate Pro &bull; Contractor Material Takeoff &amp; Specification Sheet
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
              {calculator.title}
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              {calculator.subtitle} &bull; Classification: {calculator.categoryName}
            </p>
          </div>
          <div className="text-right text-xs text-slate-600 font-mono">
            <div>Date: {new Date().toLocaleDateString('en-US-u-nu-latn', { year: 'numeric', month: 'short', day: 'numeric', numberingSystem: 'latn' })}</div>
            <div className="font-bold text-emerald-800 mt-0.5">Verified Calculation Benchmark</div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${
              isFinancial ? 'bg-amber-600 shadow-amber-600/20' : 'bg-emerald-700 shadow-emerald-700/20'
            }`}>
              <DynamicIcon name={calculator.iconName} className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                {calculator.categoryName}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {calculator.title}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {calculator.subtitle}
          </p>
        </div>

        {/* Quick Action Toolbar */}
        <div className="no-print flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={handleReset}
            id="reset-inputs-btn"
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            title="Reset to default benchmark values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            id="copy-summary-btn"
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 transition-colors flex items-center gap-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            title="Copy formatted specification sheet"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Spec</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            id="print-sheet-btn"
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            title="Print or export as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* 1. ADVERTISEMENT: Top safe zone before calculator (Leaderboard 728x90, >=32px separation) */}
      <div className="no-print my-8">
        <AdvertisementPlaceholder variant="leaderboard" slotId="calc-top-leaderboard" />
      </div>

      {/* Main Execution Split View: Inputs Left / Results Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-white/95 border border-slate-200/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl space-y-6 contractor-input-spec">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Input Parameters
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Live Dynamic Engine
              </span>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {calculator.inputs.map((field) => {
                const val = inputs[field.id] ?? field.defaultValue;

                return (
                  <div 
                    key={field.id} 
                    className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-slate-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <label 
                        htmlFor={`input-${field.id}`}
                        className="text-xs font-bold text-slate-800"
                      >
                        {field.label}
                      </label>
                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        {field.unit}
                      </span>
                    </div>

                    {/* If select options exist */}
                    {field.options ? (
                      <select
                        id={`input-${field.id}`}
                        value={inputs[field.id] ?? field.defaultValue}
                        onChange={(e) => handleSelectChange(field, e.target.value)}
                        lang="en"
                        dir="ltr"
                        className="w-full px-3 py-2 bg-white text-xs sm:text-sm font-medium text-slate-900 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden transition-all"
                      >
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="space-y-2">
                        {/* Number input box with stepper */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStep(field, -field.step)}
                            id={`step-down-${field.id}`}
                            aria-label={`Decrease ${field.label}`}
                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center focus:outline-hidden active:scale-95 transition-transform"
                          >
                            -
                          </button>
                          
                          <input
                            type="text"
                            id={`input-${field.id}`}
                            value={inputText[field.id] ?? String(field.defaultValue)}
                            inputMode="decimal"
                            lang="en"
                            dir="ltr"
                            pattern="[0-9]*[.]?[0-9]*"
                            autoComplete="off"
                            onChange={(e) => handleTextChange(field, e.target.value)}
                            onBlur={() => handleTextBlur(field)}
                            className="flex-1 px-3 py-1.5 bg-white text-center text-sm font-mono font-bold text-slate-900 border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden transition-all [font-variant-numeric:lining-nums]"
                          />

                          <button
                            type="button"
                            onClick={() => handleStep(field, field.step)}
                            id={`step-up-${field.id}`}
                            aria-label={`Increase ${field.label}`}
                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center focus:outline-hidden active:scale-95 transition-transform"
                          >
                            +
                          </button>
                        </div>

                        {/* Slider control */}
                        <input
                          type="range"
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={inputs[field.id] ?? field.defaultValue}
                          onChange={(e) => handleSliderChange(field, e.target.value)}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700 focus:outline-hidden"
                        />

                        <div className="flex justify-between text-[10px] text-slate-500 font-mono" dir="ltr">
                          <span>Min: {field.min} {field.unit}</span>
                          <span>Max: {field.max} {field.unit}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Planning Safety Box under inputs */}
          <Disclaimer 
            type={isFinancial ? 'financial' : 'construction'} 
            compact={true} 
          />
        </div>

        {/* Right Column: Dynamic Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl bg-white/95 border border-slate-200/90 p-6 sm:p-7 shadow-xl shadow-slate-200/40 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Computed Output Specification
                </h2>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Instant Calculation
              </span>
            </div>

            {/* VISUAL HERO: Primary Dominant Result */}
            <div className="calculator-result-hero relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/20">
              {/* Subtle background blueprint grid */}
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative space-y-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                  Primary Estimate
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-200">
                  {results.primaryResult.label}
                </p>
                <div className="pt-1 flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono">
                    {results.primaryResult.formatted}
                  </span>
                </div>
                {results.primaryResult.description && (
                  <p className="text-xs text-slate-300/90 pt-1 leading-relaxed border-t border-slate-800/80 mt-3">
                    {results.primaryResult.description}
                  </p>
                )}
              </div>
            </div>

            {/* Secondary Results Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Detailed Material &amp; Metric Breakdown
              </h3>
              
              <div className="contractor-results-grid grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {results.secondaryResults.map((sec) => (
                  <div
                    key={sec.id}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-slate-300 transition-all space-y-1"
                  >
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      {sec.label}
                    </span>
                    <p className="text-lg font-black text-slate-900 font-mono tracking-tight">
                      {sec.formatted}
                    </p>
                    {sec.description && (
                      <p className="text-[11px] text-slate-600 leading-snug pt-0.5">
                        {sec.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Calculation Summary Steps */}
            {results.summarySteps.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Calculation Mathematical Summary
                  </h3>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200/80 overflow-hidden divide-y divide-slate-200/60 text-xs">
                  {results.summarySteps.map((step, idx) => (
                    <div key={idx} className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                      <span className="font-semibold text-slate-800">{step.label}</span>
                      <div className="flex items-center gap-2 text-right">
                        <span className="font-mono text-slate-500 text-[11px]">{step.formula} =</span>
                        <span className="font-mono font-bold text-slate-900">{step.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Amortization Table (Mortgage Calculator Only) */}
            {results.amortizationSchedule && (
              <div className="space-y-3 pt-2 border-t border-slate-100" id="amortization-table-section">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <TableIcon className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Amortization Schedule Schedule
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFullSchedule(!showFullSchedule)}
                    id="toggle-amortization-schedule-btn"
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
                  >
                    {showFullSchedule ? 'Show First 12 Months' : 'View Full Schedule (All Months)'}
                  </button>
                </div>

                <div className="contractor-table-container rounded-xl border border-slate-200 overflow-x-auto max-h-[360px] overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs [font-variant-numeric:lining-nums]" lang="en" dir="ltr">
                    <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Mo #</th>
                        <th className="py-2.5 px-3">Payment</th>
                        <th className="py-2.5 px-3">Principal</th>
                        <th className="py-2.5 px-3">Interest</th>
                        <th className="py-2.5 px-3">Accum Interest</th>
                        <th className="py-2.5 px-3">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono [font-variant-numeric:lining-nums]" lang="en" dir="ltr">
                      {(showFullSchedule 
                        ? results.amortizationSchedule 
                        : results.amortizationSchedule.slice(0, 12)
                      ).map((row) => (
                        <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2 px-3 font-bold text-slate-900">#{row.month}</td>
                          <td className="py-2 px-3 text-slate-800">${row.payment.toFixed(2)}</td>
                          <td className="py-2 px-3 text-emerald-700 font-semibold">${row.principal.toFixed(2)}</td>
                          <td className="py-2 px-3 text-amber-700">${row.interest.toFixed(2)}</td>
                          <td className="py-2 px-3 text-slate-500">${row.totalInterest.toFixed(0)}</td>
                          <td className="py-2 px-3 text-slate-900 font-bold">${row.balance.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comprehensive In-Depth Engineering & Methodology Guide */}
      <section 
        className="mt-12 rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-lg shadow-slate-200/40 space-y-8"
        id="methodology-section"
      >
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Technical Guide &amp; Engineering Specifications
            </h2>
            <p className="text-xs text-slate-500">
              In-depth mathematical breakdown and professional standards for {calculator.title}
            </p>
          </div>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Section 1: How This Calculator Works & Technical Formula */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              How This Calculator Works &amp; Technical Formula
            </h3>
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-700 leading-relaxed">
              <p>{calculator.methodology.howItWorks}</p>
            </div>
          </div>

          {/* Section 2 & 3 in a 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Section 2: Standard Specifications & Field Rules */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Standard Specifications &amp; Field Rules
              </h3>
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Bill of Quantities &amp; Inclusions:
                </p>
                <ul className="space-y-2">
                  {calculator.methodology.whatIsIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 3: Important Planning Assumptions & Safety Margins */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                Important Planning Assumptions &amp; Safety Margins
              </h3>
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                <ul className="space-y-2">
                  {calculator.methodology.importantAssumptions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3.5 rounded-lg bg-amber-50/90 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800 block">
                    Professional Field Note
                  </span>
                  <p className="leading-relaxed">
                    {calculator.methodology.professionalNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive 12-Dimension Educational & Engineering Guide */}
      <CalculatorEducationalGuide
        calculator={calculator}
        relatedCalculators={relatedCalculators}
        onSelectCalculator={(rel) => onSelectRelated(rel.id)}
      />
    </div>
  );
};
