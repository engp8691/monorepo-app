import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')

  await page.click('text=Home')
  await page.click('text=Form 1')
})

test('should show errors after clicking on submit button with empty form', async ({
  page,
}) => {
  await page.click('button:has-text("Submit")')

  await expect(page).toHaveURL(/form1/)
  await expect(page.locator('text=Name is required')).toBeVisible()
  await expect(page.locator('text=Email is required')).toBeVisible()
  await expect(page.locator('text=Age is required')).toBeVisible()
  await expect(page.locator('text=Gender is required')).toBeVisible()
  await expect(page.locator('text=Country is required')).toBeVisible()
  await expect(
    page.locator('text=You must accept the terms and conditions'),
  ).toBeVisible()
})

test('should submit the form without error with all fields filled', async ({
  page,
}) => {
  await expect(page).toHaveURL(/form1/)

  await page.click('button:has-text("Submit")')
  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="email"]', 'john')
  await expect(page.locator('text="Invalid email address"')).toBeVisible()
  await page.fill('input[name="email"]', 'john@example.com')
  await page.fill('input[name="age"]', '13')
  await expect(
    page.locator('text="You must be at least 18 years old"'),
  ).toBeVisible()
  await page.fill('input[name="age"]', '32')
  await page.locator('[data-testid="male"]').click()
  await page.selectOption('select[name="country"]', 'USA')
  await page.selectOption('select[name="state"]', 'New York')
  await page.locator('[data-testid="acceptedTerms"]').check()

  await page.click('button:has-text("Submit")')

  await expect(page.locator('text=Name is required')).toHaveCount(0)
  await expect(page.locator('text=Email is required')).toHaveCount(0)
  await expect(page.locator('text=Age is required')).toHaveCount(0)
  await expect(page.locator('text=Gender is required')).toHaveCount(0)
  await expect(page.locator('text=Country is required')).toHaveCount(0)
  await expect(
    page.locator('text=You must accept the terms and conditions'),
  ).toHaveCount(0)
})
