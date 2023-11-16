import { createI18nClient } from 'next-international/client';

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  defineLocale,
  useCurrentLocale,
} = createI18nClient(
  {
    en: async () => {
      return import('./en');
    },
    he: async () => {
      return import('./he');
    },
  },
  {},
);
