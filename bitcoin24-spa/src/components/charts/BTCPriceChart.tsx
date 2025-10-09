'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ForecastResult } from '@/types/forecast';
import { formatCurrency, formatCompactNumber } from '@/lib/utils/format';
import { BITCOIN_ORANGE } from '@/lib/constants';

interface BTCPriceChartProps {
  forecast: ForecastResult;
}

export function BTCPriceChart({ forecast }: BTCPriceChartProps) {
  const chartData = forecast.btcPrices.map((price, index) => ({
    year: forecast.assumptions.macro.startYear + index,
    price,
    logPrice: Math.log10(price), // 對數尺度
  }));

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
            scale="log"
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
            }}
            formatter={(value: number) => [formatCurrency(value, 'USD'), 'BTC Price']}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={BITCOIN_ORANGE}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

