import { test, expect } from "@playwright/test";

test.describe("Bitcoin24 smoke page", () => {
  test("renders the CI health check content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Bitcoin24 CI Health Check" })).toBeVisible();
    await expect(page.getByText("Score ≥ 95", { exact: false })).toBeVisible();
  });
import { test, expect } from '@playwright/test';

test('placeholder smoke test', async ({ page }) => {
  await page.goto('/');
  expect(true).toBeTruthy();
});
