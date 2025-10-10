'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { STRATEGIES, getAllStrategyNames } from '@/types/strategy';
import { useStrategies } from '@/lib/hooks';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StrategySelector() {
  const { selectedStrategies, toggleStrategy, selectAllStrategies, clearStrategies } =
    useStrategies();

  const allStrategies = getAllStrategyNames();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>選擇要對比的策略</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={selectAllStrategies}>
              全選
            </Button>
            <Button variant="outline" size="sm" onClick={clearStrategies}>
              清除
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {allStrategies.map((strategyName) => {
            const strategy = STRATEGIES[strategyName];
            const isSelected = selectedStrategies.includes(strategyName);

            return (
              <button
                key={strategyName}
                onClick={() => toggleStrategy(strategyName)}
                className={cn(
                  'relative p-4 rounded-lg border-2 transition-all hover:scale-105',
                  'flex flex-col items-center gap-2 text-center',
                  isSelected
                    ? 'border-bitcoin-500 bg-bitcoin-50 dark:bg-bitcoin-900/20'
                    : 'border-muted hover:border-bitcoin-300'
                )}
              >
                {/* 選中指示器 */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-bitcoin-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* 策略顏色指示 */}
                <div
                  className="w-full h-2 rounded"
                  style={{ backgroundColor: strategy.color }}
                />

                {/* 策略名稱 */}
                <div className="font-semibold">{strategy.displayName}</div>

                {/* 策略描述 */}
                <div className="text-xs text-muted-foreground">
                  {strategy.description}
                </div>

                {/* 配置簡述 */}
                <div className="text-xs font-mono">
                  BTC: {strategy.allocation.btc}%
                  {strategy.leverageMultiplier && ` × ${strategy.leverageMultiplier}`}
                </div>
              </button>
            );
          })}
        </div>

        {/* 選中數量提示 */}
        <div className="mt-4 text-sm text-muted-foreground text-center">
          已選擇 {selectedStrategies.length} 個策略
        </div>
      </CardContent>
    </Card>
  );
}

