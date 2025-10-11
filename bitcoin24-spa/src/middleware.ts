import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'zh-TW',

  // Always use prefix for the default locale
  localePrefix: 'always',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh-TW|zh-CN|en|ja)/:path*']
};
