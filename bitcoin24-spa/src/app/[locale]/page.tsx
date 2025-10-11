import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StrategyComparisonTable } from '@/components/shared/StrategyComparisonTable';
import { Bitcoin, TrendingUp, Users, Building2, Building, Globe, Flag, ArrowRight } from 'lucide-react';

export default function IntroPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('intro');

  const models = [
    { href: '/btc', icon: Bitcoin, title: 'BTC', description: '比特幣假設設定' },
    { href: '/macro', icon: TrendingUp, title: 'Macro', description: '宏觀經濟假設' },
    { href: '/individual', icon: Users, title: 'Individual', description: '個人投資模擬' },
    { href: '/corporate', icon: Building2, title: 'Corporate', description: '企業財庫策略' },
    { href: '/institution', icon: Building, title: 'Institution', description: '機構投資配置' },
    { href: '/nation-state', icon: Globe, title: 'Nation State', description: '國家儲備管理' },
    { href: '/united-states', icon: Flag, title: 'United States', description: '美國戰略儲備' },
  ];

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-3">
          Bitcoin24
          <span className="text-bitcoin-500 animate-pulse">₿</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-2">{t('tagline')}</p>
        <p className="text-lg text-muted-foreground">
          21 年宏觀預測與微觀模型
        </p>
      </div>

      {/* Strategy Comparison */}
      <div className="mb-12">
        <StrategyComparisonTable />
      </div>

      {/* Description */}
      <div className="prose prose-lg max-w-none mb-12">
        <Card>
          <CardHeader>
            <CardTitle>關於 Bitcoin24</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>{t('description')}</p>
            <p>{t('noVolatility')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Models Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">探索不同投資場景</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <Link key={model.href} href={`/${locale}${model.href}` as any}>
                <Card className="h-full hover:border-bitcoin-500 hover:shadow-lg transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-bitcoin-50 dark:bg-bitcoin-900/20 group-hover:bg-bitcoin-500 transition-colors">
                        <Icon className="w-6 h-6 text-bitcoin-500 group-hover:text-white transition-colors" />
                      </div>
                      <CardTitle className="group-hover:text-bitcoin-500 transition-colors">
                        {model.title}
                      </CardTitle>
                    </div>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-bitcoin-500 group-hover:translate-x-2 transition-transform">
                      開始模擬
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Video Gallery */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>影片教學</CardTitle>
          <CardDescription>深入了解 Bitcoin24 的使用方式</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Bitcoin24 - 介紹',
              'Bitcoin24 - BTC',
              'Bitcoin24 - 宏觀',
              'Bitcoin24 - 個人',
              'Bitcoin24 - 企業',
              'Bitcoin24 - 機構',
              'Bitcoin24 - 國家',
              'Bitcoin24 - 美國',
            ].map((title) => (
              <div
                key={title}
                className="block p-3 border rounded-lg hover:border-bitcoin-500 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="aspect-video bg-muted rounded mb-2 flex items-center justify-center">
                  <span className="text-3xl">▶️</span>
                </div>
                <p className="text-xs font-medium text-center">{title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contributors */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>{t('contributors')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Michael J. Saylor', url: 'https://x.com/saylor', handle: 'saylor' },
              { name: 'Shirish Jajodia', url: 'https://x.com/shirishjajodia', handle: 'shirishjajodia' },
              { name: 'Chaitanya Jain (CJ)', url: 'https://x.com/_ChaitanyaJ', handle: '_ChaitanyaJ' },
            ].map((contributor) => (
              <a
                key={contributor.name}
                href={contributor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:border-bitcoin-500 hover:shadow-md transition-all text-center group"
              >
                <p className="font-semibold mb-1">{contributor.name}</p>
                <p className="text-sm text-bitcoin-500 group-hover:underline">
                  @{contributor.handle}
                </p>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Satoshi Quote */}
      <blockquote className="border-l-4 border-bitcoin-500 pl-6 py-4 mb-12 bg-muted/50 rounded-r-lg">
        <p className="text-lg italic mb-2">&ldquo;{t('satoshiQuote')}&rdquo;</p>
        <footer className="text-sm text-muted-foreground">— {t('satoshiQuoteAuthor')}</footer>
      </blockquote>

      {/* Disclaimer */}
      <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            ⚠️ {t('disclaimer')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('disclaimerText')}</p>
        </CardContent>
      </Card>
    </main>
  );
}
