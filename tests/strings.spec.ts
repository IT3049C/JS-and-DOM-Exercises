import path from "path";
import { test, expect, Page } from "@playwright/test"; // Add 'Page' to the import statement

test(`has title`, async ({ page }) => {
  const filePath = path.join(__dirname, "../exercises/string-exercises/index.html");
  await page.goto(`file://${filePath}`);

  await page.getByRole("textbox", { name: "text" }).fill("hello world");
  await expect(page.getByTestId('reverse')).toHaveText("dlrow olleh");
  await expect(page.getByTestId('capitalize')).toHaveText("HELLO WORLD");
  
  const words = await page.getByTestId('split').locator('li');
  await expect(await words.nth(0).textContent()).toBe("hello");
  await expect(await words.nth(1).textContent()).toBe("world");
});