'use client';
import React, { createContext, FC, PropsWithChildren } from 'react';
import { Platform } from 'types/internal';

export const PlatformContext = createContext<{ platform: Platform }>({
  platform: Platform.Twitter,
});

const PlatformProvider: FC<PropsWithChildren<{ platform: Platform }>> = ({
  children,
  platform,
}) => {
  return <PlatformContext.Provider value={{ platform }}>{children}</PlatformContext.Provider>;
};

export default PlatformProvider;
