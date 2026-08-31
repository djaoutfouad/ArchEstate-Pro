import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CalculatorDefinition } from '../../types/calculator';
import { DynamicIcon } from '../common/DynamicIcon';
import { Link } from '../../utils/router';
import { getCalculatorPath } from '../../config/site';

interface CalculatorCardProps {
  calculator: CalculatorDefinition;
  onOpen?: (id: string) => void;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  calculator,
}) => {
  const isRealEstate = calculator.category === 'real-estate';
  const calcPath = getCalculatorPath(calculator.slug);

  return (
    <div 
      className="group relative flex flex-col justify-between rounded-2xl bg-white/90 border border-slate-200/80 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-xl hover:shadow-2xl hover:shadow-emerald-950/10 hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1"
      id={`calculator-card-${calculator.id}`}
    >
      {/* Blueprint Top Edge Accent */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-emerald-400 transition-colors" />

      <div>
        {/* Card Header: Icon & Category/Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <Link
            to={calcPath}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isRealEstate 
                ? 'bg-amber-50 text-amber-600 border border-amber-200 group-hover:bg-amber-600 group-hover:text-white' 
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white'
            }`}
          >
            <DynamicIcon name={calculator.iconName} className="w-6 h-6" />
          </Link>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              {calculator.categoryName}
            </span>
            {calculator.badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isRealEstate 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                <Sparkles className="w-2.5 h-2.5" />
                {calculator.badge}
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-1.5">
          <Link to={calcPath} className="hover:underline">
            {calculator.title}
          </Link>
        </h3>
        <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-2">
          {calculator.subtitle}
        </p>
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {calculator.shortDescription}
        </p>

        {/* Input Parameters Preview */}
        <div className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-100 mb-5 text-[11px] text-slate-500 font-mono flex items-center justify-between">
          <span>{calculator.inputs.length} Input Variables</span>
          <span className="text-emerald-700 font-medium">Instant Model</span>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        to={calcPath}
        id={`open-calc-btn-${calculator.id}`}
        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-emerald-700 text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md group-hover:shadow-emerald-700/20 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
      >
        <span>Open Calculator</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
