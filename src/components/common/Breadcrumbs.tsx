import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  categoryName?: string;
  categoryId?: string;
  calculatorTitle?: string;
  onNavigateHome: () => void;
  onNavigateCategory?: (categoryId: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  categoryName,
  categoryId,
  calculatorTitle,
  onNavigateHome,
  onNavigateCategory,
}) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap gap-2 text-xs text-slate-500 font-medium">
      <button
        type="button"
        onClick={onNavigateHome}
        id="breadcrumb-home-btn"
        className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-600 rounded px-1.5 py-1"
      >
        <Home className="w-3.5 h-3.5" />
        <span>ArchEstate Pro</span>
      </button>

      {categoryName && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {onNavigateCategory && categoryId ? (
            <button
              type="button"
              onClick={() => onNavigateCategory(categoryId)}
              id={`breadcrumb-category-${categoryId}`}
              className="hover:text-emerald-700 transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-600 rounded px-1.5 py-1"
            >
              {categoryName}
            </button>
          ) : (
            <span className="text-slate-600 px-1">{categoryName}</span>
          )}
        </>
      )}

      {calculatorTitle && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate max-w-[240px] sm:max-w-md px-1.5 py-1 bg-slate-100 rounded">
            {calculatorTitle}
          </span>
        </>
      )}
    </nav>
  );
};
