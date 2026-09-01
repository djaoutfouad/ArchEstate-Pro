import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/dashboard/HeroSection';
import { CategorySection } from './components/dashboard/CategorySection';
import { CalculatorEngine } from './components/calculator/CalculatorEngine';
import { AdvertisementPlaceholder } from './components/common/AdvertisementPlaceholder';
import { SEOHead } from './components/common/SEOHead';
import { LegalModal } from './components/common/LegalModals';
import { Breadcrumbs } from './components/common/Breadcrumbs';
import { CALCULATORS, CATEGORIES } from './data/calculatorsData';
import { useRouter } from './utils/router';

export default function App() {
  const { 
    pathname, 
    calculatorSlug, 
    categoryId, 
    legalType, 
    navigateToHome, 
    navigateToCategory, 
    navigateToCalculator, 
    navigateToLegal 
  } = useRouter();

  // Search filter query state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active calculator object matching the route slug
  const activeCalculator = calculatorSlug 
    ? CALCULATORS.find((c) => c.slug === calculatorSlug || c.id === calculatorSlug) || null 
    : null;

  // Active category object matching the route category ID
  const activeCategory = categoryId
    ? CATEGORIES.find((cat) => cat.id === categoryId) || null
    : null;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  // Determine if current view is a legal or informational route
  const isLegalRoute = Boolean(legalType) || ['/contact', '/privacy', '/terms', '/about', '/methodology'].includes(pathname);

  // Categories to display on dashboard
  const displayedCategories = activeCategory 
    ? [activeCategory]
    : CATEGORIES;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Dynamic SEO & JSON-LD Structured Data */}
      <SEOHead 
        calculator={activeCalculator} 
        category={activeCategory} 
        legalType={legalType} 
        pathname={pathname}
      />

      {/* Global Application Header */}
      <Header
        onSelectCalculator={navigateToCalculator}
        onSelectCategory={navigateToCategory}
        onNavigateHome={navigateToHome}
        activeCalculatorId={activeCalculator?.id || null}
        onOpenLegal={navigateToLegal}
      />

      {/* Global 3-Column Layout Container (Left Rail, Main Content, Right Rail) */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center gap-6 lg:gap-8 relative flex-1">
        {/* Left Rail: Vertical Skyscraper Ad Slot (160x600) - Sticky on xl+ */}
        {!isLegalRoute && (
          <aside 
            aria-label="Sidebar Advertisement Left"
            className="hidden xl:block w-[180px] 2xl:w-[200px] shrink-0 sticky top-24 self-start no-print"
          >
            <AdvertisementPlaceholder variant="skyscraper" slotId="rail-left-skyscraper" />
          </aside>
        )}

        {/* Main Center Content: Fluid max-w-5xl */}
        <main className="flex-1 max-w-5xl mx-auto w-full min-w-0" id="main-content">
          {activeCalculator ? (
            // Single Calculator Execution View
            <CalculatorEngine
              calculator={activeCalculator}
              onNavigateHome={navigateToHome}
              onNavigateCategory={navigateToCategory}
              onSelectRelated={navigateToCalculator}
            />
          ) : (
            // Main Dashboard or Category Filter View
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Category Breadcrumbs if on dedicated Category URL */}
              {activeCategory && (
                <div className="pt-4">
                  <Breadcrumbs
                    categoryName={activeCategory.name}
                    categoryId={activeCategory.id}
                  />
                </div>
              )}

              {/* Hero Section */}
              <HeroSection
                selectedCategory={activeCategory ? activeCategory.id : 'all'}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <div className="max-w-5xl mx-auto space-y-12">
                {/* 1. ADVERTISEMENT: Below Hero Safe Zone Leaderboard (728x90) */}
                {!isLegalRoute && (
                  <div className="no-print">
                    <AdvertisementPlaceholder variant="leaderboard" slotId="home-hero-bottom" />
                  </div>
                )}

                {/* Calculator Categories Grid */}
                <div className="space-y-16">
                  {displayedCategories.map((category) => {
                    const categoryCalcs = CALCULATORS.filter(
                      (calc) => calc.category === category.id
                    );

                    return (
                      <CategorySection
                        key={category.id}
                        category={category}
                        calculators={categoryCalcs}
                        onOpenCalculator={navigateToCalculator}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right Rail: Vertical Skyscraper Ad Slot (160x600) - Sticky on xl+ */}
        {!isLegalRoute && (
          <aside 
            aria-label="Sidebar Advertisement Right"
            className="hidden xl:block w-[180px] 2xl:w-[200px] shrink-0 sticky top-24 self-start no-print"
          >
            <AdvertisementPlaceholder variant="skyscraper" slotId="rail-right-skyscraper" />
          </aside>
        )}
      </div>

      {/* Pre-Footer Banner (728x90) */}
      {!isLegalRoute && (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8 no-print">
          <AdvertisementPlaceholder variant="leaderboard" slotId="pre-footer-leaderboard" />
        </div>
      )}

      {/* Legal & Informational Modals */}
      <LegalModal
        isOpen={legalType !== null}
        type={legalType}
        onClose={() => navigateToLegal(null)}
      />

      {/* Comprehensive Application Footer */}
      <Footer
        onSelectCategory={navigateToCategory}
        onNavigateHome={navigateToHome}
        onOpenLegal={navigateToLegal}
      />
    </div>
  );
}
