import exp from "constants";
import path from "path";
const { test, expect } = require('@playwright/test');

test.describe('Word Counter', () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.join(__dirname, "../exercises/word-counter/index.html");
    await page.goto(`file://${filePath}`);
  });

  test('displays a page with a textarea and stats', async ({ page }) => {
    const textbox = await page.getByRole("textbox", { name: "text" });
    const stat = await page.locator('#stat');
    await expect(textbox).toBeVisible();
    await expect(stat).toBeVisible();
  });

  test('the stat sections updates as you type', async ({ page }) => {
    await page.getByRole("textbox", { name: "text" }).fill("hello world!");
    await expect(page.locator('#stat')).toHaveText("You've written 2 words and 12 characters.");
  });
});
