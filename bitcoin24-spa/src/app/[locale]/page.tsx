import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function IntroPage() {
  const t = useTranslations('intro');

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          {t('title')}
          <span className="text-bitcoin-500">₿</span>
        </h1>
        <p className="text-xl text-muted-foreground">{t('tagline')}</p>
      </div>

      {/* Strategy Table Placeholder */}
      <div className="bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 p-8 rounded-lg mb-12 text-white">
        <div className="grid grid-cols-5 gap-4 text-center">
          <div>
            <h3 className="font-bold mb-2">Normie</h3>
          </div>
          <div>
            <h3 className="font-bold mb-2">BTC 10%</h3>
          </div>
          <div>
            <h3 className="font-bold mb-2">BTC Maxi</h3>
          </div>
          <div>
            <h3 className="font-bold mb-2">Double Maxi</h3>
          </div>
          <div>
            <h3 className="font-bold mb-2">Triple Maxi</h3>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          21-Year Forecasting with Flexible Assumptions
        </h2>
        <p className="text-muted-foreground mb-6">{t('description')}</p>
        <p className="text-muted-foreground mb-6">{t('noVolatility')}</p>
      </div>

      {/* Contributors */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('contributors')}</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <a
              href="https://x.com/saylor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bitcoin-500 hover:underline"
            >
              Michael J. Saylor
            </a>
          </li>
          <li>
            <a
              href="https://x.com/shirishjajodia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bitcoin-500 hover:underline"
            >
              Shirish Jajodia
            </a>
          </li>
          <li>
            <a
              href="https://x.com/_ChaitanyaJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bitcoin-500 hover:underline"
            >
              Chaitanya Jain (CJ)
            </a>
          </li>
        </ul>
      </div>

      {/* Satoshi Quote */}
      <blockquote className="border-l-4 border-bitcoin-500 pl-6 py-4 mb-12 bg-muted/50 rounded-r-lg">
        <p className="text-lg italic mb-2">&ldquo;{t('satoshiQuote')}&rdquo;</p>
        <footer className="text-sm text-muted-foreground">
          — {t('satoshiQuoteAuthor')}
        </footer>
      </blockquote>

      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">{t('disclaimer')}</h3>
        <p className="text-sm text-muted-foreground">{t('disclaimerText')}</p>
      </div>
    </main>
  );
}

