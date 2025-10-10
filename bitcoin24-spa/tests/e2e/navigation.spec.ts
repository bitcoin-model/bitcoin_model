import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all pages', async ({ page }) => {
    // 訪問首頁
    await page.goto('/zh-TW');
    await expect(page).toHaveTitle(/Bitcoin24/);

    // 測試所有導航連結
    const pages = [
      { path: '/zh-TW/btc', title: '比特幣假設' },
      { path: '/zh-TW/macro', title: '宏觀經濟假設' },
      { path: '/zh-TW/individual', title: '個人投資策略' },
      { path: '/zh-TW/corporate', title: '企業投資策略' },
      { path: '/zh-TW/institution', title: '機構投資策略' },
      { path: '/zh-TW/nation-state', title: '國家級投資策略' },
      { path: '/zh-TW/united-states', title: '美國戰略儲備' },
    ];

    for (const { path, title } of pages) {
      await page.goto(path);
      await expect(page.locator('h1')).toContainText(title);
    }
  });

  test('should switch languages', async ({ page }) => {
    await page.goto('/zh-TW');

    // 點擊語言切換器
    await page.click('button:has-text("繁體中文")');

    // 選擇英文
    await page.click('text=English');

    // 驗證 URL 變化
    await expect(page).toHaveURL(/\/en/);

    // 驗證內容變化
    await expect(page.locator('h1')).toContainText('Bitcoin24');
  });
});

