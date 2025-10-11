import { getRequestConfig } from 'next-intl/server';
import { getRequestLocale } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async () => {
  // Get the locale from the request
  const locale = await getRequestLocale();
  
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    return {
      messages: (await import(`./locales/zh-TW.json`)).default,
    };
  }

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});

