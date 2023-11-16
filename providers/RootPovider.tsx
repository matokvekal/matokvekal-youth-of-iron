'use client';
import React, { FC, ReactNode } from 'react';
import I18nProvider from './I18nProvider';
import QueryProvider from './QueryProvider';
import IntentProvider from './IntentProvider';
import PlatformProvider from './PlatformProvider';
import { Intent, Platform } from 'types/internal';

type RootProviderProps = {
  locale: string;
  intent: Intent;
  platform: Platform;
  children: ReactNode;
};

const RootProvider: FC<RootProviderProps> = ({ locale, intent, platform, children }) => {
  return (
    <I18nProvider locale={locale}>
      <QueryProvider>
        <IntentProvider intent={intent}>
          <PlatformProvider platform={platform}>{children}</PlatformProvider>
        </IntentProvider>
      </QueryProvider>
    </I18nProvider>
  );
};

export default RootProvider;
