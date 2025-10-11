import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request
  const locale = await requestLocale;
  
  // Validate that the incoming `locale` parameter is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !locales.includes(locale as any)) {
    return {
      locale: 'zh-TW',  // CRITICAL: Return default locale
      messages: (await import(`./locales/zh-TW.json`)).default,
    };
  }

  return {
    locale,  // CRITICAL: Return locale to fix hydration error
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});

