'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InvestorProfileForm } from '@/components/forms/InvestorProfileForm';
import { StrategySelector } from '@/components/charts/StrategySelector';
import { PortfolioComparisonChart } from '@/components/charts/PortfolioComparisonChart';
import { MetricsCard } from '@/components/charts/MetricsCard';
import { ExportButton } from '@/components/shared/ExportButton';
import { Loading } from '@/components/shared/Loading';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { useForecast, useStrategies, useAssumptions } from '@/lib/hooks';
import { Calculator, Building2 } from 'lucide-react';

export default function CorporatePage() {
  const { setInvestorType } = useAssumptions();
  const { selectedStrategies } = useStrategies();
  const { forecast, isCalculating, error, calculate } = useForecast(selectedStrategies, false);

  // 設定為企業類型
  useEffect(() => {
    setInvestorType('corporate');
  }, [setInvestorType]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-10 h-10 text-bitcoin-500" />
          <h1 className="text-4xl font-bold">企業投資策略</h1>
        </div>
        <p className="text-muted-foreground">
          模擬企業財庫管理的 21 年比特幣投資策略
        </p>
      </div>

      <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">企業投資特色</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>更大的初始資本（預設 $10M）</li>
            <li>持續的現金流投入</li>
            <li>企業稅率考量（25%）</li>
            <li>財務報表影響分析</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mb-8">
        <InvestorProfileForm />
      </div>

      <div className="mb-8">
        <StrategySelector />
      </div>

      <div className="mb-8 flex justify-center">
        <Button
          size="lg"
          onClick={() => calculate()}
          disabled={isCalculating}
          className="w-full md:w-auto"
        >
          {isCalculating ? (
            <>
              <Calculator className="w-5 h-5 mr-2 animate-spin" />
              計算中...
            </>
          ) : (
            <>
              <Calculator className="w-5 h-5 mr-2" />
              開始計算 21 年預測
            </>
          )}
        </Button>
      </div>

      {isCalculating && <Loading text="正在計算企業投資預測..." />}
      {error && <ErrorMessage message={error} onRetry={() => calculate()} />}

      {forecast && !isCalculating && (
        <div className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <PortfolioComparisonChart
                forecast={forecast}
                strategies={selectedStrategies}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            {forecast.strategies
              .filter((s) => selectedStrategies.includes(s.strategy))
              .map((strategyResult) => (
                <MetricsCard
                  key={strategyResult.strategy}
                  metrics={strategyResult.metrics}
                  strategyName={strategyResult.strategy}
                />
              ))}
          </div>

          <div className="flex justify-center">
            <ExportButton />
          </div>
        </div>
      )}
    </div>
  );
}

