import { useSearchParams } from 'next/navigation';
import React from 'react';

export const useIsPdfWithoutPricing = () => {
  const params = useSearchParams();
  const withoutPricing = params.get('withoutPricing');
  return withoutPricing === 'true';
};
