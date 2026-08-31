import React from 'react';
import { CategoryInfo, CalculatorDefinition } from '../../types/calculator';
import { CalculatorCard } from './CalculatorCard';
import { DynamicIcon } from '../common/DynamicIcon';
import { Link } from '../../utils/router';
import { getCategoryPath } from '../../config/site';

interface CategorySectionProps {
  category: CategoryInfo;
  calculators: CalculatorDefinition[];
  onOpenCalculator?: (id: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  calculators,
}) => {
  if (calculators.length === 0) return null;
  const catPath = getCategoryPath(category.id);

  return (
    <section 
      id={`category-section-${category.id}`} 
      className="scroll-mt-24 space-y-6 pt-4"
    >
      {/* Category Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/90 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <Link
              to={catPath}
              className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs hover:bg-emerald-700 transition-colors"
            >
              <DynamicIcon name={category.iconName} className="w-4 h-4" />
            </Link>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              <Link to={catPath} className="hover:text-emerald-700 transition-colors">
                {category.name}
              </Link>
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
              {calculators.length} Tools
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {category.description}
          </p>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator) => (
          <CalculatorCard
            key={calculator.id}
            calculator={calculator}
          />
        ))}
      </div>
    </section>
  );
};
