'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AssetAllocation } from '@/types/strategy';
import { formatPercentage } from '@/lib/utils/format';

interface AllocationPieChartProps {
  allocation: AssetAllocation;
}

const COLORS = {
  btc: '#F7931A',
  stocks: '#3B82F6',
  bonds: '#10B981',
  realEstate: '#F59E0B',
  cash: '#6B7280',
};

const LABELS = {
  btc: 'Bitcoin',
  stocks: '股票',
  bonds: '債券',
  realEstate: '房地產',
  cash: '現金',
};

export function AllocationPieChart({ allocation }: AllocationPieChartProps) {
  const data = Object.entries(allocation)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: LABELS[name as keyof AssetAllocation],
      value,
      color: COLORS[name as keyof AssetAllocation],
    }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${formatPercentage(value, 0)}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatPercentage(value, 1)}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

