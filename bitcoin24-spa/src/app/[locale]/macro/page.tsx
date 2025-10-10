import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MacroAssumptionsForm } from '@/components/forms/MacroAssumptionsForm';

export default function MacroPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">宏觀經濟假設</h1>
        <p className="text-muted-foreground">設定未來 21 年的宏觀經濟參數</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：設定表單 */}
        <div>
          <MacroAssumptionsForm />
        </div>

        {/* 右側：說明與資訊 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>關於宏觀假設</CardTitle>
              <CardDescription>了解各項參數的意義</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">通膨率</h3>
                <p className="text-sm text-muted-foreground">
                  貨幣購買力的年度下降率。美國長期平均約 2-3%。
                  影響實質報酬的計算。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">股市報酬率</h3>
                <p className="text-sm text-muted-foreground">
                  股票市場的年度平均報酬率。美國 S&P 500 長期平均約 10%。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">債券報酬率</h3>
                <p className="text-sm text-muted-foreground">
                  政府或企業債券的年度平均報酬率。通常低於股票，約 3-5%。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">房地產報酬率</h3>
                <p className="text-sm text-muted-foreground">
                  不動產投資的年度平均報酬率。美國長期平均約 6%。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">現金報酬率</h3>
                <p className="text-sm text-muted-foreground">
                  銀行存款或貨幣市場基金的利率。通常最低，約 0.5-2%。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>歷史參考</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">美國通膨（1970-2020）</span>
                  <span>3.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">S&P 500（1970-2020）</span>
                  <span>10.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">美國 10年債券</span>
                  <span>6.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">房地產平均</span>
                  <span>6.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-sm">⚠️ 重要提醒</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                這些假設是簡化的模型。實際市場報酬會有波動，
                過去的表現不代表未來結果。請諮詢專業財務顧問。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

