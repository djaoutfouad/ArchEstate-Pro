import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/dashboard/HeroSection';
import { CategorySection } from './components/dashboard/CategorySection';
import { CalculatorEngine } from './components/calculator/CalculatorEngine';
import { AdvertisementPlaceholder } from './components/common/AdvertisementPlaceholder';
import { SEOHead } from './components/common/SEOHead';
import { LegalModal } from './components/common/LegalModals';
import { CALCULATORS, CATEGORIES } from './data/calculatorsData';
import { CalculatorCategory } from './types/calculator';

export default function App() {
  // Navigation state: null = dashboard, string = active calculator id
  const [activeCalculatorId, setActiveCalculatorId] = useState<string | null>(null);
  
  // Dashboard category filter: 'all' or specific Category ID
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Legal & Contact modal state
  const [legalModalType, setLegalModalType] = useState<'contact' | 'privacy' | 'terms' | 'about' | 'methodology' | null>(null);

  // Active calculator object
  const activeCalculator = activeCalculatorId 
    ? CALCULATORS.find((c) => c.id === activeCalculatorId) || null 
    : null;

  // Scroll to top on calculator switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCalculatorId]);

  const handleSelectCalculator = (id: string) => {
    setActiveCalculatorId(id);
  };

  const handleNavigateHome = () => {
    setActiveCalculatorId(null);
    setSelectedCategory('all');
  };

  const handleSelectCategoryFromNav = (catId: string) => {
    if (activeCalculatorId) {
      setActiveCalculatorId(null);
    }
    setSelectedCategory(catId);
    
    // Smooth scroll to category section
    setTimeout(() => {
      const el = document.getElementById(`category-section-${catId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Filter calculators on dashboard
  const filteredCategories = CATEGORIES.filter((cat) => {
    if (selectedCategory === 'all') return true;
    return cat.id === selectedCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Dynamic SEO & JSON-LD Structured Data */}
      <SEOHead calculator={activeCalculator} />

      {/* Global Application Header */}
      <Header
        onSelectCalculator={handleSelectCalculator}
        onSelectCategory={handleSelectCategoryFromNav}
        onNavigateHome={handleNavigateHome}
        activeCalculatorId={activeCalculatorId}
        onOpenLegal={setLegalModalType}
      />

      {/* Global 3-Column Layout Container (Left Rail, Main Content, Right Rail) */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center gap-6 lg:gap-8 relative flex-1">
        {/* Left Rail: Vertical Skyscraper Ad Slot (160x600) - Sticky on xl+ */}
        <aside 
          aria-label="Sidebar Advertisement Left"
          className="hidden xl:block w-[180px] 2xl:w-[200px] shrink-0 sticky top-24 self-start no-print"
        >
          <AdvertisementPlaceholder variant="skyscraper" slotId="rail-left-skyscraper" />
        </aside>

        {/* Main Center Content: Fluid max-w-5xl */}
        <main className="flex-1 max-w-5xl mx-auto w-full min-w-0" id="main-content">
          {activeCalculator ? (
            // Single Calculator Execution View
            <CalculatorEngine
              calculator={activeCalculator}
              onNavigateHome={handleNavigateHome}
              onNavigateCategory={handleSelectCategoryFromNav}
              onSelectRelated={handleSelectCalculator}
            />
          ) : (
            // Main Dashboard View
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Hero Section */}
              <HeroSection
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat as string)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <div className="max-w-5xl mx-auto space-y-12">
                {/* 1. ADVERTISEMENT: Below Hero Safe Zone Leaderboard (728x90) */}
                <div className="no-print">
                  <AdvertisementPlaceholder variant="leaderboard" slotId="home-hero-bottom" />
                </div>

                {/* Calculator Categories Grid */}
                <div className="space-y-16">
                  {filteredCategories.map((category) => {
                    const categoryCalcs = CALCULATORS.filter(
                      (calc) => calc.category === category.id
                    );

                    return (
                      <CategorySection
                        key={category.id}
                        category={category}
                        calculators={categoryCalcs}
                        onOpenCalculator={handleSelectCalculator}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right Rail: Vertical Skyscraper Ad Slot (160x600) - Sticky on xl+ */}
        <aside 
          aria-label="Sidebar Advertisement Right"
          className="hidden xl:block w-[180px] 2xl:w-[200px] shrink-0 sticky top-24 self-start no-print"
        >
          <AdvertisementPlaceholder variant="skyscraper" slotId="rail-right-skyscraper" />
        </aside>
      </div>

      {/* Pre-Footer Banner (728x90) */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8 no-print">
        <AdvertisementPlaceholder variant="leaderboard" slotId="pre-footer-leaderboard" />
      </div>

      {/* Legal & Informational Modals */}
      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Comprehensive Application Footer */}
      <Footer
        onSelectCategory={handleSelectCategoryFromNav}
        onNavigateHome={handleNavigateHome}
        onOpenLegal={setLegalModalType}
      />
    </div>
  );
}
