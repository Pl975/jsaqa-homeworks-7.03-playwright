const { test, expect } = require("@playwright/test");
import { email, password } from "../user.js";

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.screenshot({ path: "screenshots/home page.png" });
  await page.getByRole("link", { name: "Войти" }).click();
  await page.screenshot({ path: "screenshots/authorization.png" });
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await page.getByRole("link", { name: "Моё обучение" }).click(); //подтверждение входа в профиль
  await page.screenshot({ path: "screenshots/Mytraining.png" });
});

test("Authorisation Error", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("dg11@gjttf.ru");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("fjdngjfngjld");
  await page.getByTestId("login-submit-btn").click();
  await page.getByTestId("login-error-hint").click();
  await expect(page.locator("data-testid=login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.screenshot({ path: "screenshots/error.png" });
});
