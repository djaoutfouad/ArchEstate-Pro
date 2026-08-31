import React from 'react';
import { 
  Building2, 
  Grid3X3, 
  TrendingUp, 
  Search, 
  ShieldCheck, 
  Zap, 
  Layers, 
  CheckCircle2,
  Compass
} from 'lucide-react';
import { CalculatorCategory } from '../../types/calculator';

interface HeroSectionProps {
  onSelectCategory: (cat: CalculatorCategory) => void;
  selectedCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  selectedCategory,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-14 border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-white architectural-grid">
      {/* Background Architectural Grid Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
            <Compass className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
            <span>Architecture &bull; Construction &bull; Real Estate</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] text-emerald-700">15 Real-Time Calculators</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Precision Engineering &amp; <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900">
              PropTech Calculators
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Instant material takeoff estimates, false ceiling layouts, masonry quantities, and real estate financial underwriting models.
          </p>

          {/* Quick Category Filter Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onSelectCategory('all' as any)}
              id="filter-all-btn"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>All 15 Calculators</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('ceilings')}
              id="filter-ceilings-btn"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'ceilings'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>False Ceilings &amp; Drywall</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('construction')}
              id="filter-construction-btn"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'construction'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              <span>Construction &amp; Finishes</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('real-estate')}
              id="filter-real-estate-btn"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'real-estate'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-200 hover:bg-amber-50/50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>Real Estate &amp; Finance</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
