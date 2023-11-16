'use client';

import { usePathname } from 'next/navigation';
import { createContext, useEffect } from 'react';
import { trackButtonClick } from 'utils/events';

export const GTMContext = createContext({});

export default function GTMProvider({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  useEffect(() => {
    window.dataLayer?.push({
      event: 'page_view',
      page: window.location.href,
    });
  }, [path]);

  // track anchor clicks as button_click events
  useEffect(() => {
    function onAnchorClick(ev: MouseEvent) {
      if (ev.target instanceof Element) {
        const linkEl = ev.target.closest('a');
        if (linkEl) {
          const id = linkEl.getAttribute('id');
          if (id) {
            trackButtonClick({ id });
          }
        }
      }
    }

    document.addEventListener('click', onAnchorClick);
    return () => {
      document.removeEventListener('click', onAnchorClick);
    };
  }, []);

  return <GTMContext.Provider value={{}}>{children}</GTMContext.Provider>;
}
