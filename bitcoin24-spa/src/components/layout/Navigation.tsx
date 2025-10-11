'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Bitcoin } from 'lucide-react';

const NAV_ITEMS = [
  { href: '', label: 'intro' },
  { href: '/btc', label: 'btc' },
  { href: '/macro', label: 'macro' },
  { href: '/individual', label: 'individual' },
  { href: '/corporate', label: 'corporate' },
  { href: '/institution', label: 'institution' },
  { href: '/nation-state', label: 'nationState' },
  { href: '/united-states', label: 'unitedStates' },
] as const;

export function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 gap-8">
          {/* Logo */}
          <Link href={"/" as any} className="flex items-center gap-2 font-bold text-lg">
            <Bitcoin className="w-6 h-6 text-bitcoin-500" />
            <span className="hidden sm:inline">Bitcoin24</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const href = `/${pathname.split('/')[1]}${item.href}`;
              const isActive = pathname.endsWith(item.href) || (item.href === '' && pathname.split('/').length === 2);

              return (
                <Link
                  key={item.href}
                  href={href as any}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-bitcoin-500 text-white'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {t(item.label)}
                </Link>
              );
            })}
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

