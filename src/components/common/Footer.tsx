import React from 'react';
import { Compass, ShieldCheck, CheckCircle2, Mail } from 'lucide-react';
import { CATEGORIES } from '../../data/calculatorsData';
import { Link } from '../../utils/router';
import { getCategoryPath, CONTACT_EMAIL } from '../../config/site';

interface FooterProps {
  onSelectCategory?: (categoryId: string) => void;
  onNavigateHome?: () => void;
  onOpenLegal?: (type: 'contact' | 'privacy' | 'terms' | 'about' | 'methodology') => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50/90 text-slate-600 transition-colors">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-1 space-y-3.5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                ArchEstate<span className="text-emerald-700">Pro</span>
              </span>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Architecture + Construction + Real Estate Technology Platform. Computational planning tools for contractors, architects, remodelers, and property investors.
            </p>
            <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-600 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                100% Client-Side Engine
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Zero Latency Calculations
              </span>
            </div>
          </div>

          {/* Col 2: Calculator Suites */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Calculator Suites
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={getCategoryPath(cat.id)}
                    className="hover:text-emerald-700 hover:underline transition-colors flex items-center gap-1 text-slate-600"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({cat.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal & Standards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Governance & Policies
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/methodology"
                  className="hover:text-emerald-700 hover:underline transition-colors text-slate-600"
                >
                  Calculation Methodology
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-emerald-700 hover:underline transition-colors text-slate-600"
                >
                  Privacy Policy & Security
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-emerald-700 hover:underline transition-colors text-slate-600"
                >
                  Terms of Service & Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-emerald-700 hover:underline transition-colors text-slate-600"
                >
                  About ArchEstate Pro
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-emerald-700 hover:underline transition-colors text-slate-600 font-semibold text-emerald-800"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Official Contact
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Questions, technical inquiries, or partnership opportunities:
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl transition-colors text-left"
            >
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{CONTACT_EMAIL}</span>
            </a>
          </div>
        </div>

        {/* Global Safety Note */}
        <div className="mt-10 pt-6 border-t border-slate-200 text-[11px] text-slate-600 leading-relaxed">
          <p>
            <strong>Professional Notice:</strong> ArchEstate Pro provides planning estimates only. Actual material quantities, structural requirements, HVAC sizing, taxes, fees, and financing terms vary by project, product, jurisdiction, and site conditions. Always verify critical measurements and financial/legal assumptions with a qualified professional.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>© {new Date().getFullYear()} ArchEstate Pro. All rights reserved. English edition.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-800 font-semibold">15 Active Calculators</span>
            <span>•</span>
            <span>Client-Side Standard Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
