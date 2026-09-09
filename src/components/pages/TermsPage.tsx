import React from 'react';
import { FileText, ShieldAlert, AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import { CONTACT_EMAIL } from '../../config/site';

export const TermsPage: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-10 text-slate-800 animate-in fade-in duration-300">
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service &amp; Computational Disclaimers
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated: March 1, 2026
        </p>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          Please read these Terms of Service carefully before utilizing any tools, models, or documentation hosted on ArchEstate Pro ("the Service", "the Site"). By accessing or using the Site, you agree to be bound by these terms.
        </p>
      </header>

      {/* Critical Disclaimer */}
      <section aria-labelledby="disclaimer-title" className="p-6 sm:p-7 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-3">
        <h2 id="disclaimer-title" className="text-lg font-bold text-amber-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          Critical Professional Planning Disclaimer
        </h2>
        <p className="text-sm text-amber-950 leading-relaxed font-medium">
          ALL COMPUTATIONAL OUTPUTS, QUANTITY ESTIMATES, FORMULAS, AND FINANCIAL ANALYTICS PROVIDED ON ARCHESTATE PRO ARE OFFERED EXCLUSIVELY AS PRELIMINARY PLANNING AND EDUCATIONAL GUIDES.
        </p>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          THEY DO NOT CONSTITUTE AND MUST NOT BE RELIED UPON AS LICENSED STRUCTURAL ENGINEERING BLUEPRINTS, PROFESSIONAL ARCHITECTURAL DRAWINGS, BINDING MORTGAGE UNDERWRITING APPROVALS, OR FORMAL LEGAL TAX ADVICE.
        </p>
      </section>

      {/* 1. Preliminary Estimation Scope */}
      <section aria-labelledby="scope-title" className="space-y-3">
        <h2 id="scope-title" className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-700" />
          1. Scope of Estimations &amp; Material Variances
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Construction projects inherently carry site-specific variances including out-of-square room corners, subbase settling, irregular ceiling drops, batch-to-batch tile dye differences, and local climate differences. While our formulas follow rigorous engineering conventions:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
          <li><strong>Wastage Allowances:</strong> Suggested wastage buffers (e.g. 5% to 15%) represent mathematical approximations. Intricate architectural layouts, diagonal tile patterns, or multi-level bulkheads may require significantly higher contingency margins.</li>
          <li><strong>Supplier Package Sizing:</strong> Commercial pack quantities (such as tile cartons, 25kg mortar bags, or 3m metal profiles) vary by manufacturer and regional distributor. Always reconcile calculations against local supplier catalogs before issuing purchase orders.</li>
          <li><strong>Financial Calculations:</strong> Mortgage PITI and affordability figures assume fixed rates and standard conventional ratios. Real underwriting depends on credit scores, automated underwriting findings, local property tax assessments, and actual lender rate locks.</li>
        </ul>
      </section>

      {/* 2. Limitation of Liability */}
      <section aria-labelledby="liability-title" className="space-y-3">
        <h2 id="liability-title" className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-700" />
          2. Limitation of Liability
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          To the maximum extent permitted by applicable law, ArchEstate Pro, its developers, authors, and contributors shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages resulting from:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
          <li>Material shortages, delivery delays, or over-purchasing on construction sites.</li>
          <li>Structural failures, code compliance rejections, or installation defects resulting from failure to hire certified licensed trades.</li>
          <li>Financial losses or financing rejections incurred during property acquisitions, contract negotiations, or mortgage applications.</li>
        </ul>
      </section>

      {/* 3. Acceptable Use & Intellectual Property */}
      <section aria-labelledby="use-title" className="space-y-3">
        <h2 id="use-title" className="text-xl font-bold text-slate-900">
          3. Acceptable Use &amp; Intellectual Property
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          All calculators, software code, educational guides, diagrams, and written editorial materials on ArchEstate Pro are protected by copyright and intellectual property laws. You are granted a personal, non-exclusive, non-transferable license to use our tools for personal or commercial project estimating.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          You may not scrape, mirror, reverse-engineer, frame, or republish our computational engine or datasets on external domains without explicit prior written consent from ArchEstate Pro.
        </p>
      </section>

      {/* 4. Governing Law */}
      <section aria-labelledby="law-title" className="space-y-3 border-t border-slate-200 pt-6">
        <h2 id="law-title" className="text-lg font-bold text-slate-900">
          4. Governing Law &amp; Inquiries
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          These Terms of Service are governed by general commercial software principles. If you have questions regarding acceptable use, syndication, or licensing, contact our legal desk at <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-700 font-semibold underline">{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </article>
  );
};
