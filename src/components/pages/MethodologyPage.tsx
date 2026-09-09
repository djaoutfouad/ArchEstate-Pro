import React from 'react';
import { 
  BookOpen, 
  Calculator, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Mail,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { CONTACT_EMAIL } from '../../config/site';
import { Link } from '../../utils/router';

export const MethodologyPage: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-12 text-slate-800 animate-in fade-in duration-300">
      {/* Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Documentation &amp; Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Engineering &amp; Computational Methodology
        </h1>
        <p className="text-sm text-slate-500">
          Standardized Mathematical Framework • Document Version 2.4 • Updated March 2026
        </p>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          ArchEstate Pro formulas are developed using established engineering conventions, manufacturer installation guidelines, trade packaging standards, and conventional real estate financial mathematics. This document outlines the exact computational foundations applied across our 15 calculation tools.
        </p>
      </header>

      {/* 1. Drywall & Ceilings Methodology */}
      <section aria-labelledby="ceilings-math" className="space-y-4">
        <h2 id="ceilings-math" className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-700" />
          1. False Ceilings &amp; Drywall Computational Standards
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Suspended ceiling models determine complete framing grids, suspension anchors, and panel counts based on linear geometric coverage and industry structural spacing rules:
        </p>

        <div className="space-y-4 text-sm text-slate-700">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">BA13 Suspended Gypsum Ceiling</h3>
            <p className="leading-relaxed">
              Based on standard 1.20m × 2.50m (3.0 m²) single-layer plasterboards mounted onto a primary CD60 framework at 500mm centers with UD28 perimeter tracks.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Board Quantity:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">Ceil((Area × (1 + Wastage / 100)) ÷ 3.0 m²)</code></li>
              <li><strong>Perimeter Track (UD28):</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">Ceil((Perimeter × 1.05) ÷ 3.0m)</code></li>
              <li><strong>Primary Rail Density (CD60):</strong> Modeled at 2.10 linear meters of profile per m² of ceiling plane.</li>
              <li><strong>Fastener Ratios:</strong> 20 drywall self-tapping screws (25mm) per m²; 0.85 kg of ready-mix joint compound per m².</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Acoustic 600×600mm Exposed T-Grid</h3>
            <p className="leading-relaxed">
              Adheres to CISCA (Ceilings &amp; Interior Systems Construction Association) standard linear framing consumption rates per square meter for 600×600mm modules:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Main Runners (3.6m):</strong> 0.23 lengths per m² (at 1.2m grid spacing).</li>
              <li><strong>Cross Tees (1.2m):</strong> 1.40 lengths per m² (at 0.6m cross spacing).</li>
              <li><strong>Cross Tees (0.6m):</strong> 1.40 lengths per m² to form the 600mm square aperture.</li>
              <li><strong>Border Cut Allowance:</strong> Default 8% wastage accounts for edge trimming against wall angle perimeters.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Construction & Finishes Methodology */}
      <section aria-labelledby="construction-math" className="space-y-4">
        <h2 id="construction-math" className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-emerald-700" />
          2. Construction, Masonry &amp; Finish Quantities
        </h2>
        <div className="space-y-4 text-sm text-slate-700">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Reinforced Concrete Slabs</h3>
            <p className="leading-relaxed">
              Geometric solid volume: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">Volume (m³) = Length (m) × Width (m) × Thickness (m)</code>.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Compaction &amp; Spillage Buffer:</strong> Standard 8% buffer compensates for subbase unevenness and pumping line loss.</li>
              <li><strong>Cubic Yard Conversion:</strong> 1 m³ = 1.30795 yd³.</li>
              <li><strong>Cured Density Benchmark:</strong> 2,400 kg/m³ for normal weight reinforced structural concrete.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Wall Paint &amp; Primer Spread Coverage</h3>
            <p className="leading-relaxed">
              Net surface area is calculated by subtracting designated window and door openings from gross wall area:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Formula:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">Liters = ((Area - Openings) × Coats × (1 + Wastage / 100)) ÷ Spread Rate</code></li>
              <li><strong>Theoretical Spread Rate:</strong> Default 10.0 m² per liter based on architectural emulsion benchmarks.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">HVAC Cooling BTU Thermal Load</h3>
            <p className="leading-relaxed">
              Calculated using simplified sensible and solar heat gain approximations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Base Sensible Load:</strong> 550 BTU/h per square meter for standard residential insulated envelopes.</li>
              <li><strong>Solar Exposure Factors:</strong> North (1.0x), East/South (1.08x), West (1.15x), Top Floor Under Concrete Roof (1.25x).</li>
              <li><strong>Occupant Sensible Heat:</strong> +500 BTU/h per regular occupant.</li>
              <li><strong>Tonnage:</strong> 1 Refrigeration Ton = 12,000 BTU/h cooling capacity.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Real Estate & Financial Mathematics */}
      <section aria-labelledby="finance-math" className="space-y-4">
        <h2 id="finance-math" className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-emerald-700" />
          3. Real Estate Analytics &amp; Capital Finance Models
        </h2>
        <div className="space-y-4 text-sm text-slate-700">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Fixed-Rate Mortgage Amortization &amp; PITI</h3>
            <p className="leading-relaxed">
              Standard fully amortizing monthly compounding loan annuity formula:
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
              M = P × [ r(1 + r)^n ] ÷ [ (1 + r)^n - 1 ]
            </div>
            <p className="text-xs text-slate-600">
              Where <code className="font-mono">P</code> = Principal loan balance, <code className="font-mono">r</code> = Monthly interest rate (Annual Rate ÷ 12), and <code className="font-mono">n</code> = Total loan payments (Years × 12).
            </p>
            <p className="text-xs text-slate-600">
              For 0.00% promotional loans, the engine automatically branches to <code className="font-mono">M = P ÷ n</code> to avoid division by zero.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Conventional Debt-to-Income (28/36) Affordability</h3>
            <p className="leading-relaxed">
              Evaluates borrower maximum housing capacity against strict conventional lending criteria:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Front-End Ratio (28%):</strong> Maximum monthly housing expense (PITI + HOA) cannot exceed 28% of gross pre-tax monthly income.</li>
              <li><strong>Back-End Ratio (36%):</strong> Total monthly debt obligations (housing + car loans + student loans + credit minimums) cannot exceed 36% of gross monthly income.</li>
              <li><strong>Binding Payment Constraint:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">MaxPayment = Min(Gross × 0.28, Gross × 0.36 - Debts)</code>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Continuous Peer Review & Error Reporting Policy */}
      <section aria-labelledby="peer-review-title" className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 id="peer-review-title" className="text-xl font-bold flex items-center gap-2 text-white">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Continuous Peer-Review &amp; Error Reporting
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Engineering practice thrives on mathematical rigor. If you identify a regional divergence, a newly amended building code requirement, or an opportunity to enhance formula accuracy, we invite you to submit your observations to our engineering desk.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>Submit Formula Verification Feedback</span>
          </Link>
        </div>
      </section>
    </article>
  );
};
