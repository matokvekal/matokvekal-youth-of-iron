import { useEffect } from 'react';

type FocusCallback = () => void;

interface Options {
  condition?: boolean;
}

export const useTabRefocus = (callback: FocusCallback, options?: Options) => {
  const { condition = true } = options || {};

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && condition) {
        callback();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [callback, condition]);
};
