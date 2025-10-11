'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvestorProfileForm } from '@/components/forms/InvestorProfileForm';
import { StrategySelector } from '@/components/charts/StrategySelector';
import { PortfolioComparisonChart } from '@/components/charts/PortfolioComparisonChart';
import { BTCPriceChart } from '@/components/charts/BTCPriceChart';
import { AllocationPieChart } from '@/components/charts/AllocationPieChart';
import { MetricsCard } from '@/components/charts/MetricsCard';
import { ExportButton } from '@/components/shared/ExportButton';
import { DataTable } from '@/components/shared/DataTable';
import { QuickActions } from '@/components/shared/QuickActions';
import { Loading } from '@/components/shared/Loading';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { useForecast, useStrategies } from '@/lib/hooks';
import { STRATEGIES } from '@/types/strategy';
import { Calculator } from 'lucide-react';

export default function IndividualPage() {
  const { selectedStrategies } = useStrategies();
  const { forecast, isCalculating, error, calculate } = useForecast(selectedStrategies, false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* 標題 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">個人投資策略</h1>
        <p className="text-muted-foreground">
          模擬個人投資者的 21 年比特幣投資策略結果
        </p>
      </div>

      {/* 快速操作 */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* 投資者檔案 */}
      <div className="mb-8">
        <InvestorProfileForm />
      </div>

      {/* 策略選擇 */}
      <div className="mb-8">
        <StrategySelector />
      </div>

      {/* 計算按鈕 */}
      <div className="mb-8 flex justify-center">
        <Button
          size="lg"
          onClick={() => calculate()}
          disabled={isCalculating || selectedStrategies.length === 0}
          className="w-full md:w-auto min-w-[300px]"
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

      {/* 結果顯示 */}
      {isCalculating && <Loading text="正在計算您的投資預測..." />}

      {error && <ErrorMessage message={error} onRetry={() => calculate()} />}

      {forecast && !isCalculating && (
        <div className="space-y-8">
          {/* 圖表區域 */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>21 年投資預測結果</CardTitle>
                  <CardDescription>
                    比較 {selectedStrategies.length} 種策略在{' '}
                    {forecast.assumptions.macro.forecastYears} 年的表現
                  </CardDescription>
                </div>
                <ExportButton />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="portfolio" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="portfolio">投資組合</TabsTrigger>
                  <TabsTrigger value="btc">BTC 價格</TabsTrigger>
                  <TabsTrigger value="allocation">資產配置</TabsTrigger>
                </TabsList>
                <TabsContent value="portfolio" className="mt-6">
                  <PortfolioComparisonChart forecast={forecast} strategies={selectedStrategies} />
                </TabsContent>
                <TabsContent value="btc" className="mt-6">
                  <BTCPriceChart forecast={forecast} />
                </TabsContent>
                <TabsContent value="allocation" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedStrategies.map((strategyName) => (
                      <div key={strategyName}>
                        <h3 className="text-center font-semibold mb-4">
                          {STRATEGIES[strategyName].displayName}
                        </h3>
                        <AllocationPieChart allocation={STRATEGIES[strategyName].allocation} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* 績效指標 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">績效指標對比</h2>
            {forecast.strategies
              .filter((s) => selectedStrategies.includes(s.strategy))
              .map((strategyResult) => (
                <MetricsCard
                  key={strategyResult.strategy}
                  metrics={strategyResult.metrics}
                  strategyName={STRATEGIES[strategyResult.strategy].displayName}
                />
              ))}
          </div>

          {/* 詳細數據表格 */}
          <DataTable forecast={forecast} strategies={selectedStrategies} />
        </div>
      )}

      {/* 初始提示 */}
      {!forecast && !isCalculating && !error && (
        <Card>
          <CardContent className="py-12 text-center">
            <Calculator className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">準備開始計算</h3>
            <p className="text-muted-foreground mb-6">
              請設定您的投資者檔案和選擇要對比的策略，然後點擊「開始計算」按鈕
            </p>
            <Button onClick={() => calculate()} size="lg">
              <Calculator className="w-5 h-5 mr-2" />
              開始計算預測
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
