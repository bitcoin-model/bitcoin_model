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
import { Calculator, Building } from 'lucide-react';

export default function InstitutionPage() {
  const { setInvestorType } = useAssumptions();
  const { selectedStrategies } = useStrategies();
  const { forecast, isCalculating, error, calculate } = useForecast(selectedStrategies, false);

  useEffect(() => {
    setInvestorType('institution');
  }, [setInvestorType]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Building className="w-10 h-10 text-bitcoin-500" />
          <h1 className="text-4xl font-bold">機構投資策略</h1>
        </div>
        <p className="text-muted-foreground">
          模擬機構投資者的 21 年比特幣配置策略
        </p>
      </div>

      <Card className="mb-8 bg-purple-50 dark:bg-purple-900/20 border-purple-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">機構投資特色</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>大規模資金配置（預設 $100M）</li>
            <li>較低的風險承受度</li>
            <li>法規遵循考量</li>
            <li>優惠稅率（15%）</li>
            <li>專業的投資組合管理</li>
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

      {isCalculating && <Loading text="正在計算機構投資預測..." />}
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

