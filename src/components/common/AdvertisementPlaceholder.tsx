import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  variant?: 'skyscraper' | 'leaderboard' | 'horizontal';
  className?: string;
}

export const AdvertisementPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId = 'standard-slot',
  variant = 'horizontal',
  className = '',
}) => {
  if (variant === 'skyscraper') {
    return (
      <div 
        aria-label="Advertisement Slot"
        className={`w-full block select-none ${className}`}
        id={`ad-container-${slotId}`}
      >
        <div className="w-full max-w-[180px] min-h-[600px] h-[600px] mx-auto rounded-2xl border-2 border-dashed border-slate-200/90 bg-slate-50/60 flex items-center justify-center p-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none text-center">
            ADVERTISEMENT
          </span>
        </div>
      </div>
    );
  }

  // Horizontal / Leaderboard (Top or Pre-Footer)
  return (
    <div 
      aria-label="Advertisement Slot"
      className={`w-full my-8 block select-none ${className}`}
      id={`ad-container-${slotId}`}
    >
      <div className="w-full max-w-5xl mx-auto min-h-[90px] rounded-2xl border-2 border-dashed border-slate-200/90 bg-slate-50/60 flex items-center justify-center p-6">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none text-center">
          ADVERTISEMENT
        </span>
      </div>
    </div>
  );
};


