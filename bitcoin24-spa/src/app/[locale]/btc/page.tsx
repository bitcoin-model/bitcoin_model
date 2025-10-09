import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BTCAssumptionsForm } from '@/components/forms/BTCAssumptionsForm';

export default function BTCPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">比特幣假設</h1>
        <p className="text-muted-foreground">設定比特幣價格預測的參數與模型</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：設定表單 */}
        <div>
          <BTCAssumptionsForm />
        </div>

        {/* 右側：說明與資訊 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>關於比特幣價格模型</CardTitle>
              <CardDescription>了解我們如何預測未來價格</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">採用曲線模型</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>線性增長</strong>: 穩定的採用速度</li>
                  <li><strong>指數增長</strong>: 加速的採用速度</li>
                  <li><strong>S曲線（推薦）</strong>: 符合技術採用的典型模式</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">減半週期</h3>
                <p className="text-sm text-muted-foreground">
                  每 4 年（約 210,000 個區塊），比特幣的區塊獎勵減半。
                  歷史上每次減半後，價格都有顯著增長。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">機構採用</h3>
                <p className="text-sm text-muted-foreground">
                  機構投資者的買入力度約為散戶的 10 倍，對價格有更大影響。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Stock-to-Flow (S2F)</h3>
                <p className="text-sm text-muted-foreground">
                  基於稀缺性的價格模型，將比特幣與黃金等稀缺資產比較。
                  S2F 倍數可調整模型的樂觀/保守程度。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>預設假設</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">當前價格</span>
                  <span className="font-mono">$50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">採用曲線</span>
                  <span>S曲線</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">最大採用率</span>
                  <span>10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">價格範圍</span>
                  <span className="font-mono">$30K - $10M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

