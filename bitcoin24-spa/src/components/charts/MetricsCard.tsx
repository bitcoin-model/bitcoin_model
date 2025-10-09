import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceMetrics } from '@/types/forecast';
import { formatCurrency, formatPercentage } from '@/lib/utils/format';
import { TrendingUp, TrendingDown, Activity, Target } from 'lucide-react';

interface MetricsCardProps {
  metrics: PerformanceMetrics;
  strategyName: string;
}

export function MetricsCard({ metrics, strategyName }: MetricsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-bitcoin-500" />
          {strategyName} 績效指標
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* 最終價值 */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">最終價值</p>
            <p className="text-2xl font-bold text-bitcoin-500">
              {formatCurrency(metrics.finalValue)}
            </p>
          </div>

          {/* CAGR */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">年化報酬率</p>
            <p className="text-2xl font-bold text-green-600">
              {formatPercentage(metrics.cagr, 1)}
            </p>
          </div>

          {/* 總報酬 */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">總報酬率</p>
            <p className="text-2xl font-bold">
              {formatPercentage(metrics.totalReturn, 0)}
            </p>
          </div>

          {/* 最大回撤 */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              最大回撤
            </p>
            <p className="text-xl font-semibold text-red-600">
              -{formatPercentage(metrics.maxDrawdown, 1)}
            </p>
          </div>

          {/* 夏普比率 */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Target className="w-4 h-4" />
              夏普比率
            </p>
            <p className="text-xl font-semibold">
              {metrics.sharpeRatio.toFixed(2)}
            </p>
          </div>

          {/* 波動率 */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Activity className="w-4 h-4" />
              波動率
            </p>
            <p className="text-xl font-semibold">
              {formatPercentage(metrics.volatility, 1)}
            </p>
          </div>

          {/* 最佳年度 */}
          <div className="space-y-1 col-span-2 md:col-span-1">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              最佳年度
            </p>
            <p className="text-lg font-semibold text-green-600">
              {metrics.bestYear.year}: +{formatPercentage(metrics.bestYear.return, 1)}
            </p>
          </div>

          {/* 最差年度 */}
          <div className="space-y-1 col-span-2 md:col-span-1">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              最差年度
            </p>
            <p className="text-lg font-semibold text-red-600">
              {metrics.worstYear.year}: {formatPercentage(metrics.worstYear.return, 1)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

