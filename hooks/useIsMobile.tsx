import { useEffect, useState } from 'react';

const mobileVendors = [
  'Android',
  'webOS',
  'iPhone',
  'iPad',
  'iPod',
  'BlackBerry',
  'Windows Phone',
  'Opera Mini',
  'IEMobile',
  'Mobile',
];

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDimension = () => window.innerWidth <= 800;

    const checkUserAgent = () => {
      const userAgent = window.navigator.userAgent;
      return mobileVendors.some((vendor) => userAgent.includes(vendor));
    };

    const checkTouch = () => 'ontouchstart' in window;

    const checkIsMobile = () => {
      return checkDimension() || checkUserAgent() || checkTouch();
    };

    setIsMobile(checkIsMobile());

    window.addEventListener('resize', () => setIsMobile(checkIsMobile()));

    return () => {
      window.removeEventListener('resize', () => setIsMobile(checkIsMobile()));
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
