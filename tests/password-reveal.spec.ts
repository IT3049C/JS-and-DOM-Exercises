import path from "path";
const { test, expect } = require("@playwright/test");

test.describe("Password Reveal", () => {
  const credentials = {
    username: `user`,
    password: `secret-password`,
  };

  test.beforeEach(async ({ page }) => {
    const filePath = path.join(__dirname, "../exercises/password-reveal/index.html");
    await page.goto(`file://${filePath}`);
  });

  test("displays a form", async ({ page }) => {
    await expect(page.getByLabel(`username`)).toBeVisible();
    await expect(page.getByLabel(`password`)).toBeVisible();
  });

  test("can fill out a form", async ({ page }) => {
    await fillOutForm(page);

    await expect(page.getByLabel(`username`)).toHaveValue(credentials.username);
    await expect(page.getByLabel(`password`)).toHaveValue(credentials.password);
  });

  test("can toggle password visibility", async ({ page }) => {
    await fillOutForm(page);

    await expect(page.getByLabel(`username`)).toHaveValue(credentials.username);
    await expect(page.getByLabel(`password`)).toHaveValue(credentials.password);

    await expect(page.getByLabel(`password`)).toHaveAttribute(`type`, `password`);

    await page.getByTestId(`toggle-password-visibility`).click();
    await expect(page.getByLabel(`password`)).toHaveAttribute(`type`, `text`);

    await page.getByTestId(`toggle-password-visibility`).click();
    await expect(page.getByLabel(`password`)).toHaveAttribute(`type`, `password`);
  });

  async function fillOutForm(page) {
    await page.getByLabel(`username`).fill(credentials.username);
    await page.getByLabel(`password`).fill(credentials.password);
  }
});
