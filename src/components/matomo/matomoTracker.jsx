'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const MatomoTracker = ({ product }) => {
  const pathName = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window._mtm) {
      const _mtm = window?._mtm;
      _mtm.push({
        event: 'mtm.PageView',
        page: {
          url: window.location.href,
          title: document.title,
        },
      });
      // console.log(_mtm);
    }
  }, [pathName]);
  return null;
};
