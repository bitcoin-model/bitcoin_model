import { test, expect } from '@playwright/test';

test.describe('Individual Investment Flow', () => {
  test('complete investment simulation flow', async ({ page }) => {
    await page.goto('/zh-TW/individual');

    // 驗證頁面載入
    await expect(page.locator('h1')).toContainText('個人投資策略');

    // 填寫投資者檔案
    await page.fill('input[id="initialCapital"]', '100000');
    await page.fill('input[id="annualContribution"]', '12000');
    await page.fill('input[id="taxRate"]', '20');

    // 選擇策略
    const strategies = ['normie', 'btc10', 'btcMaxi'];
    for (const strategy of strategies) {
      await page.click(`button:has-text("${strategy}")`);
    }

    // 點擊計算按鈕
    await page.click('button:has-text("開始計算")');

    // 等待計算完成
    await page.waitForSelector('text=21 年投資預測結果', { timeout: 10000 });

    // 驗證圖表顯示
    await expect(page.locator('.recharts-wrapper')).toBeVisible();

    // 驗證績效指標
    await expect(page.locator('text=績效指標')).toBeVisible();
    await expect(page.locator('text=最終價值')).toBeVisible();
    await expect(page.locator('text=年化報酬率')).toBeVisible();

    // 驗證數據表格
    await expect(page.locator('table')).toBeVisible();
  });

  test('should export data', async ({ page }) => {
    await page.goto('/zh-TW/individual');

    // 執行計算（簡化流程）
    await page.click('button:has-text("開始計算")');
    await page.waitForSelector('text=21 年投資預測結果', { timeout: 10000 });

    // 測試匯出功能
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("匯出資料")');
    await page.click('text=匯出為 CSV');
    const download = await downloadPromise;

    // 驗證檔案名稱
    expect(download.suggestedFilename()).toContain('bitcoin24-forecast');
    expect(download.suggestedFilename()).toContain('.csv');
  });

  test('should handle errors gracefully', async ({ page }) => {
    await page.goto('/zh-TW/individual');

    // 輸入無效數據
    await page.fill('input[id="initialCapital"]', '-1000');

    // 嘗試計算
    await page.click('button:has-text("開始計算")');

    // 應該顯示錯誤或驗證訊息
    // (實際行為取決於驗證實現)
  });
});

