import type { ReactElement } from 'react';
import 'styles/globals.css';
import { Metadata } from 'next';
import { getCurrentLocale, getI18n } from 'locales/server';
import { Inter, Rubik } from 'next/font/google';
import { env } from 'env.mjs';
import { AppInsightsProvider } from 'instrumentation/appInsightsProvider';
import Script from 'next/script';
import GTMProvider from 'providers/GTMProvider';
import CookieConsent from 'components/CookieConsent';

const rubikFont = Rubik({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'hebrew'],
  display: 'swap',
});
const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(env.APP_PUBLIC_URL),
  keywords: 'bringthemhome, wordsofiron',
  robots: 'index, follow',
  openGraph: {
    images: [`${env.APP_PUBLIC_URL}/opengraph-image.jpg`],
  },
  twitter: {
    images: [`${env.APP_PUBLIC_URL}/opengraph-image.jpg`],
  },
};

export default async function RootLayout({ children }: { children: ReactElement }) {
  const isRtl = ['he'].includes(getCurrentLocale());

  const t = await getI18n();

  return (
    <html
      lang={getCurrentLocale()}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={isRtl ? rubikFont.className : interFont.className}
    >
      <head>
        {/* Google Tag Manager */}
        {process.env.NODE_ENV === 'production' && (
          <Script id='google-tag-manager'>
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N97VJCM6');
        `}
          </Script>
        )}
        {/* End Google Tag Manager */}
        <meta charSet='UTF-8' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <link rel='canonical' href={env.APP_PUBLIC_URL} />
        <link rel='alternate' hrefLang='en-US' href={`${env.APP_PUBLIC_URL}/en`} />
        <link rel='alternate' hrefLang='he-HE' href={`${env.APP_PUBLIC_URL}/he`} />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('title')} />
        <meta property='og:description' content={t('description')} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={t('title')} />
        <meta name='twitter:site' content='@WordOfIron710' />
        <meta name='twitter:description' content={t('description')} />
        <meta property='og:url' content={env.APP_PUBLIC_URL} />
        <meta property='twitter:domain' content={env.APP_PUBLIC_URL} />
        <meta property='twitter:url' content={env.APP_PUBLIC_URL} />

        <title>{t('title')}</title>
        <meta property='description' content={t('description')} />
      </head>
      <body>
        <AppInsightsProvider>
          <GTMProvider>{children}</GTMProvider>
        </AppInsightsProvider>
        <CookieConsent
          descriptionText={t('cookie_consent_description')}
          acceptText={t('cookie_consent_accept')}
          rejectText={t('cookie_consent_reject')}
        />
      </body>
    </html>
  );
}
