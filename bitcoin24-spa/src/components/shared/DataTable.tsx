'use client';

import { ForecastResult } from '@/types/forecast';
import { StrategyName } from '@/types/strategy';
import { formatCurrency } from '@/lib/utils/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DataTableProps {
  forecast: ForecastResult;
  strategies: StrategyName[];
}

export function DataTable({ forecast, strategies }: DataTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>詳細數據表格</CardTitle>
        <CardDescription>逐年投資組合價值與比特幣價格</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">年份</th>
                <th className="text-right p-3 font-semibold">BTC 價格</th>
                {forecast.strategies
                  .filter((s) => strategies.includes(s.strategy))
                  .map((s) => (
                    <th key={s.strategy} className="text-right p-3 font-semibold">
                      {s.strategy}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {forecast.strategies[0].yearlyData.map((_, index) => {
                const year = forecast.assumptions.macro.startYear + index;
                const btcPrice = forecast.btcPrices[index];

                return (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3">{year}</td>
                    <td className="text-right p-3 font-mono text-bitcoin-500">
                      {formatCurrency(btcPrice)}
                    </td>
                    {forecast.strategies
                      .filter((s) => strategies.includes(s.strategy))
                      .map((s) => (
                        <td key={s.strategy} className="text-right p-3 font-mono">
                          {formatCurrency(s.yearlyData[index].portfolioValue)}
                        </td>
                      ))}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 bg-muted/50 font-bold">
                <td className="p-3">最終</td>
                <td className="text-right p-3 font-mono text-bitcoin-500">
                  {formatCurrency(forecast.btcPrices[forecast.btcPrices.length - 1])}
                </td>
                {forecast.strategies
                  .filter((s) => strategies.includes(s.strategy))
                  .map((s) => (
                    <td key={s.strategy} className="text-right p-3 font-mono">
                      {formatCurrency(s.metrics.finalValue)}
                    </td>
                  ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

