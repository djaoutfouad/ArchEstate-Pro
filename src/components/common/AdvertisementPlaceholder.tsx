import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  variant?: 'skyscraper' | 'leaderboard' | 'horizontal';
  className?: string;
}

export const AdvertisementPlaceholder: React.FC<AdPlaceholderProps> = ({
  className = '',
}) => {
  // Return null to completely suppress empty placeholder boxes for AdSense compliance
  return null;
};


