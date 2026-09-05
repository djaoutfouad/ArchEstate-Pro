import React from 'react';
import { 
  Building2, 
  Grid3X3, 
  TrendingUp, 
  Compass
} from 'lucide-react';
import { Link } from '../../utils/router';
import { getCategoryPath } from '../../config/site';

interface HeroSectionProps {
  onSelectCategory?: (cat: string) => void;
  selectedCategory?: string;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCategory = 'all',
}) => {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 border-b border-slate-800 bg-slate-950 text-white">
      {/* High-Resolution Architectural Drafting & Blueprint Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      {/* Dark Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/95 to-slate-950 pointer-events-none" />

      {/* Background Architectural Grid Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-inner backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
            <span>Architecture • Construction • Real Estate</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] text-emerald-300">15 Real-Time Calculators</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Precision Engineering &amp; <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
              PropTech Calculators
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Instant material takeoff estimates, false ceiling layouts, masonry quantities, and real estate financial underwriting models.
          </p>

          {/* Quick Category Filter Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/"
              id="filter-all-btn"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
              }`}
            >
              <span>All 15 Calculators</span>
            </Link>

            <Link
              to={getCategoryPath('ceilings')}
              id="filter-ceilings-btn"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'ceilings'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>False Ceilings &amp; Drywall</span>
            </Link>

            <Link
              to={getCategoryPath('construction')}
              id="filter-construction-btn"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'construction'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-slate-300" />
              <span>Construction &amp; Finishes</span>
            </Link>

            <Link
              to={getCategoryPath('real-estate')}
              id="filter-real-estate-btn"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'real-estate'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Real Estate &amp; Finance</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
