'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InvestorProfileForm } from '@/components/forms/InvestorProfileForm';
import { StrategySelector } from '@/components/charts/StrategySelector';
import { PortfolioComparisonChart } from '@/components/charts/PortfolioComparisonChart';
import { MetricsCard } from '@/components/charts/MetricsCard';
import { ExportButton } from '@/components/shared/ExportButton';
import { Loading } from '@/components/shared/Loading';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { useForecast, useStrategies, useAssumptions } from '@/lib/hooks';
import { Calculator, Flag } from 'lucide-react';

export default function UnitedStatesPage() {
  const { setInvestorType } = useAssumptions();
  const { selectedStrategies } = useStrategies();
  const { forecast, isCalculating, error, calculate } = useForecast(selectedStrategies, false);

  useEffect(() => {
    setInvestorType('nation-state');
  }, [setInvestorType]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Flag className="w-10 h-10 text-bitcoin-500" />
          <h1 className="text-4xl font-bold">美國戰略儲備</h1>
        </div>
        <p className="text-muted-foreground">
          模擬美國建立比特幣戰略儲備的 21 年場景
        </p>
      </div>

      <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardHeader>
          <CardTitle>美國比特幣戰略儲備構想</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            探討美國政府建立比特幣戰略儲備的潛在場景。
            類似於黃金儲備，比特幣可能成為國家資產負債表的一部分。
          </p>
          
          <h4 className="font-semibold">潛在益處</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>對抗長期通膨與債務貶值</li>
            <li>保持金融科技領先地位</li>
            <li>多元化國家儲備資產</li>
            <li>減輕美元系統性風險</li>
            <li>創造巨大的財政收益</li>
          </ul>

          <h4 className="font-semibold">考量因素</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>波動性管理</li>
            <li>監管框架建立</li>
            <li>國際政治影響</li>
            <li>民眾接受度</li>
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

      {isCalculating && <Loading text="正在計算美國戰略儲備場景..." />}
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

          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
            <CardHeader>
              <CardTitle>潛在經濟影響</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                若美國採用 BTC Maxi 策略配置國家儲備的一小部分，
                21 年後可能創造數兆美元的財政資產，
                有助於償還國債並強化美元信心。
              </p>
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

