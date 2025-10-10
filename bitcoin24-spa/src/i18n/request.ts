import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`./locales/zh-TW.json`)).default,
    };
  }

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});

