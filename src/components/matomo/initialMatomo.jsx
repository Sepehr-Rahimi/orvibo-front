'use client';

import { useEffect } from 'react';

export const InitialMatomo = () => {
  useEffect(() => {
    // eslint-disable-next-line no-multi-assign, no-var
    var _mtm = (window._mtm = window._mtm || []);
    _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
    // eslint-disable-next-line vars-on-top, no-var
    var d = document;
    // eslint-disable-next-line vars-on-top, no-var
    var g = d.createElement('script');
    // eslint-disable-next-line vars-on-top, no-var
    var s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = 'https://analytics.noyanstore.com/js/container_lkksdu3L.js';
    s.parentNode.insertBefore(g, s);
  }, []);
  return null;
};
