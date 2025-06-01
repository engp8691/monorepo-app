import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('AG Grid', async ({ page }) => {
  await page.getByRole('link', { name: 'AG Grid Filtering' }).click()
  await expect(page).toHaveURL(/aggridfiltering/)

  await page
    .locator('.ag-cell-label-container > .ag-header-icon > .ag-icon')
    .first()
    .click()
  await expect(page.locator('.ag-menu.ag-filter-menu')).toBeVisible()
  await page.getByRole('textbox', { name: 'Filter Value' }).click()
  await page.getByRole('textbox', { name: 'Filter Value' }).fill('Li Na')
  await page.getByRole('radio', { name: 'OR' }).check()
  await page
    .getByRole('combobox', { name: 'Filtering operator' })
    .nth(1)
    .click()
  await page.getByText('Begins with').click()
  await page.getByLabel('Filter Value').nth(1).fill('Zheng')
  await page
    .locator('div')
    .filter({ hasText: 'Home IntroductionForm 1Form' })
    .nth(2)
    .click()
  await expect(page.locator('.ag-menu.ag-filter-menu')).toBeHidden()

  await page
    .locator('.ag-cell-label-container > .ag-header-icon > .ag-icon')
    .first()
    .click()
  await expect(page.locator('.ag-menu.ag-filter-menu')).toBeVisible()
  await page
    .getByRole('combobox', { name: 'Filtering operator' })
    .nth(1)
    .click()
  await page.getByLabel('Filter Value').nth(1).fill('Li')
  await page
    .locator('div')
    .filter({ hasText: 'Home IntroductionForm 1Form' })
    .nth(2)
    .click()
  await expect(page.locator('.ag-menu.ag-filter-menu')).toBeHidden()
  // await new Promise((resolve) => setTimeout(resolve, 5000))

  await page
    .locator('.ag-cell-label-container > .ag-header-icon > .ag-icon')
    .first()
    .click()
  await expect(page.locator('.ag-menu.ag-filter-menu')).toBeVisible()
  await page
    .getByRole('combobox', { name: 'Filtering operator' })
    .nth(1)
    .click()
  await page.getByLabel('Filter Value').nth(1).fill('Li ')
  await page
    .locator('div')
    .filter({ hasText: 'Home IntroductionForm 1Form' })
    .nth(2)
    .click()
  await expect(page.locator('.ag-menu.ag-filter-menu')).toBeHidden()
  // await new Promise((resolve) => setTimeout(resolve, 1000))
})
