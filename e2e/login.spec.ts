import { test, expect } from '@playwright/test'

test('главная страница открывается и есть кнопка входа', async ({ page }) => {
  await page.goto('/login')

  // await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible()

  await expect(page.getByTestId('login-btn')).toBeVisible()
  await expect(page.getByTestId('register-btn')).toBeVisible()

  await page.getByTestId('username').fill('test@test.ru')
  await page.getByTestId('password').fill('123456')
  // await page.getByRole('button', { name: 'Вход' }).click()
})
