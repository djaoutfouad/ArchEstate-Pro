import React from 'react';
import { 
  Building2, 
  Compass, 
  ShieldCheck, 
  Mail, 
  Calculator, 
  Users, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CONTACT_EMAIL } from '../../config/site';
import { Link } from '../../utils/router';

export const AboutPage: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-12 text-slate-800 animate-in fade-in duration-300">
      {/* Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Building2 className="w-3.5 h-3.5" />
          <span>About ArchEstate Pro</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Independent Architectural, Construction &amp; PropTech Computational Suite
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          ArchEstate Pro was established in 2025 to provide contractors, remodelers, architects, quantity surveyors, and property investors with transparent, rigorous, and instant planning calculations without paywalls or mandatory account sign-ups.
        </p>
      </header>

      {/* Core Mission */}
      <section aria-labelledby="mission-title" className="space-y-4">
        <h2 id="mission-title" className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Compass className="w-6 h-6 text-emerald-700" />
          Our Purpose &amp; Engineering Philosophy
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Construction job sites and property investment evaluations demand rapid, repeatable, and mathematically transparent estimates. Too many online construction calculators are either clunky marketing lead-capture traps or hide their assumptions behind opaque formulas.
        </p>
        <p className="text-slate-700 leading-relaxed">
          ArchEstate Pro was engineered around three strict product principles:
        </p>
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Client-Side Transparency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculations evaluate locally in your browser with zero latency. Every formula, assumption, and wastage multiplier is fully documented in plain language.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Practitioner Accuracy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Material algorithms reflect realistic trade practices: CD60/UD28 profile grid densities, tile cut losses, ready-mix batching truck yields, and standard amortized loan models.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Zero Friction Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No paywalls, no forced email registrations, and no locked PDF exports. Every contractor and student has full access to every tool in the suite.
            </p>
          </div>
        </div>
      </section>

      {/* The 3 Core Disciplines */}
      <section aria-labelledby="disciplines-title" className="space-y-4">
        <h2 id="disciplines-title" className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-emerald-700" />
          The 15 Integrated Computational Tools
        </h2>
        <p className="text-slate-700 leading-relaxed">
          ArchEstate Pro unites 15 specialized mathematical models organized across three interconnected disciplines:
        </p>
        <div className="space-y-4 pt-1">
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
            <h3 className="font-bold text-slate-900 text-base">1. False Ceilings &amp; Drywall Systems</h3>
            <p className="text-sm text-slate-600">
              Covers standard BA13 gypsum plasterboards on CD60/UD28 metal framing, tongue-and-groove waterproof PVC slats, 600×600mm commercial acoustic lay-in grid ceilings, stepped perimeter light coves with LED integration, and decorative fibrous plaster cornices.
            </p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
            <h3 className="font-bold text-slate-900 text-base">2. Architectural Construction &amp; Finishes</h3>
            <p className="text-sm text-slate-600">
              Covers wall paint and primer spread coverage with opening deductions, floor and wall tile carton take-offs with mortar and grout, ready-mix concrete slab volumes with compaction factors, brick and concrete block single-skin masonry, HVAC cooling thermal load sizing, and pattern-repeat wallpaper rolls.
            </p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-2">
            <h3 className="font-bold text-slate-900 text-base">3. Real Estate Analytics &amp; Capital Finance</h3>
            <p className="text-sm text-slate-600">
              Covers full-term monthly PITI mortgage amortization schedules, gross rental yield and capitalization rates (Cap Rate) with vacancy allowances, 28/36 front-and-back qualifying debt-to-income home affordability limits, and comprehensive conveyance closing costs.
            </p>
          </div>
        </div>
      </section>

      {/* Who Operates the Platform */}
      <section aria-labelledby="team-title" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 id="team-title" className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-700" />
          Who Operates ArchEstate Pro
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          ArchEstate Pro is developed and maintained by an independent multidisciplinary team of web software engineers, construction estimators, and financial modelers. We do not manufacture building materials, sell real estate, or broker mortgages. This independence ensures our formulas remain objective, unclouded by commercial product sponsorships.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          We actively welcome technical corrections and formula peer reviews from licensed architects, civil engineers, quantity surveyors, and mortgage professionals. If you identify an edge-case discrepancy or wish to propose a formula improvement, our team reviews every submission.
        </p>
      </section>

      {/* Scope of Use & Professional Disclaimers */}
      <section aria-labelledby="scope-title" className="border border-amber-200 bg-amber-50/50 rounded-2xl p-6 sm:p-8 space-y-3">
        <h2 id="scope-title" className="text-lg font-bold text-amber-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          Planning Scope &amp; Legal Disclaimers
        </h2>
        <p className="text-sm text-amber-950/80 leading-relaxed">
          All calculations provided on ArchEstate Pro are intended strictly as preliminary estimating and conceptual planning aids. They do not constitute certified structural engineering stamps, formal architectural construction drawings, legally binding conveyance statements, or formal lending pre-approvals.
        </p>
        <p className="text-sm text-amber-950/80 leading-relaxed">
          Actual field conditions, structural spans, seismic specifications, soil bearing capacities, and local municipal building codes (such as IBC, Eurocodes, or local bylaws) require verification by licensed professionals on-site before executing contracts or ordering non-refundable materials.
        </p>
      </section>

      {/* Further Information Links */}
      <footer className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <Link to="/methodology" className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Read Calculation Methodology</span>
          </Link>
          <Link to="/contact" className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5">
            <Mail className="w-4 h-4" />
            <span>Contact Our Team</span>
          </Link>
        </div>
        <p className="text-xs text-slate-700">
          Last Updated: March 2026 • ArchEstate Pro
        </p>
      </footer>
    </article>
  );
};
