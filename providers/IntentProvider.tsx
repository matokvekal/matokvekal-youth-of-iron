'use client';
import React, { createContext, FC, PropsWithChildren } from 'react';
import { Intent } from 'types/internal';

export const IntentContext = createContext<{ intent: Intent }>({
  intent: Intent.Share,
});

const IntentProvider: FC<PropsWithChildren<{ intent: Intent }>> = ({ children, intent }) => {
  return <IntentContext.Provider value={{ intent }}>{children}</IntentContext.Provider>;
};

export default IntentProvider;
