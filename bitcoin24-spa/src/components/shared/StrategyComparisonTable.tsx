import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { STRATEGIES } from '@/types/strategy';
import { Check, X } from 'lucide-react';

export function StrategyComparisonTable() {
  const strategies = Object.values(STRATEGIES);

  return (
    <Card>
      <CardHeader>
        <CardTitle>策略快速對比</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">特徵</th>
                {strategies.map((s) => (
                  <th key={s.name} className="text-center p-3">
                    <div
                      className="inline-block px-3 py-1 rounded text-white font-semibold"
                      style={{ backgroundColor: s.color }}
                    >
                      {s.displayName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/30">
                <td className="p-3 font-medium">BTC 配置</td>
                {strategies.map((s) => (
                  <td key={s.name} className="text-center p-3">
                    {s.allocation.btc}%
                  </td>
                ))}
              </tr>
              <tr className="border-b hover:bg-muted/30">
                <td className="p-3 font-medium">股票配置</td>
                {strategies.map((s) => (
                  <td key={s.name} className="text-center p-3">
                    {s.allocation.stocks}%
                  </td>
                ))}
              </tr>
              <tr className="border-b hover:bg-muted/30">
                <td className="p-3 font-medium">槓桿</td>
                {strategies.map((s) => (
                  <td key={s.name} className="text-center p-3">
                    {s.leverageMultiplier ? `${s.leverageMultiplier}x` : '無'}
                  </td>
                ))}
              </tr>
              <tr className="border-b hover:bg-muted/30">
                <td className="p-3 font-medium">再平衡</td>
                {strategies.map((s) => (
                  <td key={s.name} className="text-center p-3">
                    {s.rebalanceFrequency === 'never' ? (
                      <X className="w-4 h-4 mx-auto text-muted-foreground" />
                    ) : (
                      <Check className="w-4 h-4 mx-auto text-green-600" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b hover:bg-muted/30">
                <td className="p-3 font-medium">風險等級</td>
                {strategies.map((s, i) => (
                  <td key={s.name} className="text-center p-3">
                    {'⭐'.repeat(i + 1)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

