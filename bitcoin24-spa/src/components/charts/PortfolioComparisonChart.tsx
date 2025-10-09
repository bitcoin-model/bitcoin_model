'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ForecastResult } from '@/types/forecast';
import { StrategyName, STRATEGIES } from '@/types/strategy';
import { formatCurrency, formatCompactNumber } from '@/lib/utils/format';

interface PortfolioComparisonChartProps {
  forecast: ForecastResult;
  strategies: StrategyName[];
}

export function PortfolioComparisonChart({
  forecast,
  strategies,
}: PortfolioComparisonChartProps) {
  // 準備圖表資料
  const chartData = forecast.strategies[0]?.yearlyData.map((_, index) => {
    const dataPoint: any = {
      year: forecast.assumptions.macro.startYear + index,
    };

    forecast.strategies.forEach((strategyResult) => {
      if (strategies.includes(strategyResult.strategy)) {
        dataPoint[strategyResult.strategy] = strategyResult.yearlyData[index].portfolioValue;
      }
    });

    return dataPoint;
  }) || [];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="year"
            className="text-xs"
            tick={{ fill: 'currentColor' }}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: 'currentColor' }}
            tickFormatter={(value) => formatCompactNumber(value)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
            }}
            formatter={(value: number) => [formatCurrency(value), '']}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => STRATEGIES[value as StrategyName]?.displayName || value}
          />
          {strategies.map((strategy) => (
            <Line
              key={strategy}
              type="monotone"
              dataKey={strategy}
              stroke={STRATEGIES[strategy].color}
              strokeWidth={strategy === 'btcMaxi' ? 3 : 2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

