import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface DisclaimerProps {
  type?: 'general' | 'financial' | 'construction';
  compact?: boolean;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ 
  type = 'general',
  compact = false 
}) => {
  return (
    <div 
      role="note" 
      aria-label="Professional Planning Estimate Disclaimer"
      id="professional-safety-disclaimer"
      className={`rounded-xl border border-amber-200/90 bg-amber-50/70 p-4 sm:p-5 text-amber-950 backdrop-blur-xs ${
        compact ? 'text-xs' : 'text-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-amber-900 text-xs sm:text-sm">
            <span>Professional Planning Notice & Methodology Scope</span>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-200/80 rounded-full text-amber-800">
              <ShieldCheck className="w-3 h-3" />
              Estimate Only
            </span>
          </div>
          <p className="text-xs text-amber-900/90">
            <strong>ArchEstate Pro provides planning estimates only.</strong> Actual material quantities, structural requirements, HVAC thermal sizing, taxes, fees, and financing terms vary by project, product manufacturer, local jurisdiction, and physical site conditions.
          </p>
          {type === 'financial' && (
            <p className="text-[11px] text-amber-900/80">
              <strong>Financial Advisory:</strong> This tool generates computational models based on user inputs and standard assumptions. It does not constitute a formal lending decision, tax advice, or legal appraisal. Always verify with a qualified mortgage broker, certified accountant, or real estate attorney.
            </p>
          )}
          {type === 'construction' && (
            <p className="text-[11px] text-amber-900/80">
              <strong>Engineering Advisory:</strong> This estimate does not replace architectural drawings, licensed structural engineering certifications, or manufacturer technical data sheets. Verify all measurements on site before ordering materials.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
