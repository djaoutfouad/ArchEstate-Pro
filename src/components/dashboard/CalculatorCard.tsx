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
  const [imageError, setImageError] = React.useState(false);

  return (
    <div 
      className="group relative flex flex-col justify-between rounded-2xl bg-white/90 border border-slate-200/80 shadow-lg shadow-slate-200/40 backdrop-blur-xl hover:shadow-2xl hover:shadow-emerald-950/10 hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      id={`calculator-card-${calculator.id}`}
    >
      {/* Blueprint Top Edge Accent */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-emerald-400 transition-colors z-20" />

      {/* Image Header with Fixed Ratio, No Negative Margins, Overflow Hidden */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950 rounded-t-2xl">
        {!imageError && calculator.personaImageUrl ? (
          <img
            src={calculator.personaImageUrl}
            alt={calculator.personaRole || calculator.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Architectural Blueprint Grid Pattern Fallback */
          <div className="w-full h-full architectural-grid bg-slate-950 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-950/50" />
            <div className="relative flex flex-col items-center gap-1.5 opacity-60">
              <DynamicIcon name={calculator.iconName} className="w-9 h-9 text-emerald-400" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{calculator.categoryName}</span>
            </div>
          </div>
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

        {/* Top Left: Icon Button */}
        <Link
          to={calcPath}
          className={`absolute top-3 left-3 z-10 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-md ${
            isRealEstate 
              ? 'bg-slate-950/80 text-amber-400 border border-amber-500/40 group-hover:bg-amber-600 group-hover:text-white' 
              : 'bg-slate-950/80 text-emerald-400 border border-emerald-500/40 group-hover:bg-emerald-600 group-hover:text-white'
          }`}
        >
          <DynamicIcon name={calculator.iconName} className="w-5 h-5" />
        </Link>

        {/* Top Right: Category & Badge */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-200 bg-slate-950/80 border border-slate-700/60 backdrop-blur-md px-2 py-0.5 rounded-md shadow-xs">
            {calculator.categoryName}
          </span>
          {calculator.badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border backdrop-blur-md shadow-xs ${
              isRealEstate 
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' 
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
            }`}>
              <Sparkles className="w-2.5 h-2.5" />
              {calculator.badge}
            </span>
          )}
        </div>

        {/* Bottom Overlay: Persona Role */}
        {calculator.personaRole && (
          <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center">
            <span className="text-[11px] font-medium text-emerald-300 bg-slate-950/85 border border-emerald-500/30 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-xs truncate flex items-center gap-1.5 w-fit max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">{calculator.personaRole}</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
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
          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-emerald-700 text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md group-hover:shadow-emerald-700/20 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 mt-auto"
        >
          <span>Open Calculator</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
