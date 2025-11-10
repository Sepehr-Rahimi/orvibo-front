'use client';

import ReactGA from 'react-ga4';
import { usePathname } from 'next/navigation';
import { useEffect, useContext, createContext } from 'react';

const GoogleAnalyticsContext = createContext();

export const GoogleAnalyticsProvider = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname
  const GA_TRACKING_ID = ['G-1DFD9SVPBC', 'G-NM2VCT3XLN']; // Replace with your GA4 tracking ID

  useEffect(() => {
    // Initialize Google Analytics on first load
    ReactGA.initialize([{ trackingId: GA_TRACKING_ID[0] }, { trackingId: GA_TRACKING_ID[1] }]);

    // Send the initial page view event
    ReactGA.send({ hitType: 'pageview', page: pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Track changes to the pathname

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <GoogleAnalyticsContext.Provider value={{}}>{children}</GoogleAnalyticsContext.Provider>;
};

export const useGoogleAnalytics = () => useContext(GoogleAnalyticsContext);
