import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  X, 
  ChevronRight, 
  Compass,
  Grid3X3,
  TrendingUp,
  Mail
} from 'lucide-react';
import { CALCULATORS } from '../../data/calculatorsData';
import { DynamicIcon } from './DynamicIcon';
import { Link, useRouter } from '../../utils/router';
import { getCalculatorPath, getCategoryPath } from '../../config/site';

interface HeaderProps {
  onSelectCalculator?: (id: string) => void;
  onSelectCategory?: (categoryId: string) => void;
  onNavigateHome?: () => void;
  activeCalculatorId?: string | null;
  onOpenLegal?: (type: 'contact' | 'privacy' | 'terms' | 'about' | 'methodology') => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { navigateToCalculator } = useRouter();

  // Search filter
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : CALCULATORS.filter(calc => {
        const q = searchQuery.toLowerCase();
        return (
          calc.title.toLowerCase().includes(q) ||
          calc.subtitle.toLowerCase().includes(q) ||
          calc.categoryName.toLowerCase().includes(q) ||
          calc.keywords.some(k => k.toLowerCase().includes(q))
        );
      });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectFromSearch = (slug: string) => {
    navigateToCalculator(slug);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/90 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/"
              id="header-logo-btn"
              className="flex items-center gap-3 text-left group focus:outline-hidden focus:ring-2 focus:ring-emerald-600 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900">
                    ArchEstate<span className="text-emerald-700">Pro</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 hidden sm:block font-medium tracking-tight">
                  Architecture • Construction • Real Estate Technology
                </p>
              </div>
            </Link>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-md relative" ref={searchRef}>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search 15 calculators (e.g., drywall, paint, mortgage, tile, AC)..."
                id="header-global-search"
                className="w-full pl-9 pr-9 py-2 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-600 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  id="clear-search-btn"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div 
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-[380px] overflow-y-auto"
                id="header-search-results-dropdown"
              >
                <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                  <span>Found {searchResults.length} Match{searchResults.length === 1 ? '' : 'es'}</span>
                  <span>Instant Jump</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-600">
                    <p className="font-semibold text-slate-700">No calculators found</p>
                    <p className="mt-1 text-[11px]">Try searching for &quot;drywall&quot;, &quot;concrete&quot;, &quot;mortgage&quot;, &quot;tile&quot;, or &quot;cove&quot;.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {searchResults.map((calc) => (
                      <button
                        key={calc.id}
                        type="button"
                        onClick={() => handleSelectFromSearch(calc.slug)}
                        id={`search-item-${calc.id}`}
                        className="w-full px-4 py-3 text-left hover:bg-emerald-50/60 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <DynamicIcon name={calc.iconName} className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-emerald-800">
                              {calc.title}
                            </p>
                            <p className="text-[11px] text-slate-600 line-clamp-1">
                              {calc.categoryName} • {calc.shortDescription}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Categories & Contact Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            <Link
              to={getCategoryPath('ceilings')}
              id="nav-cat-ceilings"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Grid3X3 className="w-3.5 h-3.5 text-emerald-700" />
              <span>False Ceilings</span>
            </Link>
            <Link
              to={getCategoryPath('construction')}
              id="nav-cat-construction"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              <span>Construction</span>
            </Link>
            <Link
              to={getCategoryPath('real-estate')}
              id="nav-cat-real-estate"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
              <span>Real Estate</span>
            </Link>
            <Link
              to="/contact"
              id="nav-contact-btn"
              className="ml-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 hover:text-emerald-900 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-700" />
              <span>Contact</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
