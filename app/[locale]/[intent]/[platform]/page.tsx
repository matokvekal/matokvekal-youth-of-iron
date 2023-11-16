import { setStaticParamsLocale } from 'next-international/server';
import { getStaticParams } from 'locales/server';
import React, { Suspense } from 'react';
import { Intent, Platform } from 'types/internal';
import App from 'app/ui/App';
import RootProvider from 'providers/RootPovider';

export function generateStaticParams() {
  return getStaticParams();
}

interface AppProps {
  params: {
    locale: string;
    intent: Intent;
    platform: Platform;
  };
}

export default async function AppPage({ params: { locale, intent, platform } }: AppProps) {
  setStaticParamsLocale(locale);

  return (
    <>
      <RootProvider intent={intent} platform={platform} locale={locale}>
        <Suspense fallback={<ClientLoader />}>
          <App />
        </Suspense>
      </RootProvider>
    </>
  );
}

const ClientLoader = () => {
  return (
    <div className='flex h-screen w-screen flex-col  items-center justify-center'>
      <div
        className='
        relative h-6
        w-6
        animate-spin
        rounded-full
        border-2
        border-gray-200
        border-t-gray-800
        duration-500'
      ></div>
    </div>
  );
};
