'use client';
import { Draft, produce } from 'immer';
import { useEffect, useState } from 'react';
import { Platform } from 'types/internal';

interface Dialogs {
  kudos: {
    isOpen: boolean;
  };
  instructions: {
    isOpen: boolean;
    dismissed: {
      [key in Platform]: boolean;
    };
  };
  getNotified: {
    isOpen: boolean;
    dismissed: {
      [key in Platform]: boolean;
    };
    hideRefetchBtn: boolean;
  };
}

const dismissedInitialState = Object.fromEntries(
  Object.values(Platform).map((platform) => [platform, false]),
) as Record<Platform, boolean>;

const initialState: Dialogs = {
  kudos: {
    isOpen: false,
  },
  instructions: {
    isOpen: false,
    dismissed: dismissedInitialState,
  },
  getNotified: {
    isOpen: false,
    dismissed: dismissedInitialState,
    hideRefetchBtn: false,
  },
};

const useDialogs = () => {
  const isBrowser = typeof window !== 'undefined';
  let initialDialogsState = initialState;

  useEffect(() => {
    if (isBrowser) {
      const localStorageDismissed = localStorage.getItem('dialogsDismissed');
      if (localStorageDismissed) {
        const dismissedStates = JSON.parse(localStorageDismissed);
        setDialogsState((draft) => {
          draft.instructions.dismissed = { ...dismissedStates.instructions };
          draft.getNotified.dismissed = { ...dismissedStates.getNotified };
        });
      }
    }
  }, []);

  const [dialogsState, set] = useState<Dialogs>(initialDialogsState);

  const setDialogsState = (updater: (draft: Draft<Dialogs>) => void) => {
    const newState = produce<Dialogs>(dialogsState, updater);
    set(newState);

    if (isBrowser) {
      const { instructions, getNotified } = newState;
      const dismissedStates = {
        instructions: instructions.dismissed,
        getNotified: getNotified.dismissed,
      };
      localStorage.setItem('dialogsDismissed', JSON.stringify(dismissedStates));
    }
  };

  const dismissDialog = (platform: Platform) => {
    setDialogsState((draft) => {
      draft.instructions.dismissed[platform] = true;
    });
  };

  return { dialogsState, setDialogsState, dismissDialog };
};

export { useDialogs };
