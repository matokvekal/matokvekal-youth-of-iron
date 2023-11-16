'use client';
import React, { FC, ReactNode } from 'react';
import { I18nProviderClient } from 'locales/client';

type I18nProviderProps = {
  locale: string;
  children: ReactNode;
};

const I18nProvider: FC<I18nProviderProps> = ({ locale, children }) => {
  return (
    <I18nProviderClient locale={locale} fallback={<p>Loading...</p>}>
      {children}
    </I18nProviderClient>
  );
};

export default I18nProvider;
