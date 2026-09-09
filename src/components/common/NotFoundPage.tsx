import React from 'react';
import { Home, Compass, ArrowRight, HelpCircle } from 'lucide-react';
import { CATEGORIES } from '../../data/calculatorsData';
import { getCategoryPath, CONTACT_EMAIL } from '../../config/site';
import { Link } from '../../utils/router';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          HTTP 404 — Resource Not Located
        </div>

        {/* Primary Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            The requested calculator, page, or document URL does not exist or has been relocated. Please verify the web address or explore our active calculation suites below.
          </p>
        </div>

        {/* Quick Action Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-800/20 transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
          >
            <Home className="w-4 h-4" />
            <span>Return to All 15 Calculators</span>
          </Link>
          <Link
            to="/methodology"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-slate-300"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Calculation Methodology</span>
          </Link>
        </div>

        {/* Directory of Calculation Categories */}
        <div className="pt-8 border-t border-slate-200/80 text-left space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Browse Active Tool Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={getCategoryPath(cat.id)}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all group block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {cat.count} Tools
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-emerald-700 transition-colors">
                  {cat.shortName}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {cat.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Direct Help */}
        <p className="text-xs text-slate-500 pt-4">
          Need technical assistance or want to report a broken link? Reach our team directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-700 hover:underline font-medium">
            {CONTACT_EMAIL}
          </a>.
        </p>
      </div>
    </div>
  );
};
