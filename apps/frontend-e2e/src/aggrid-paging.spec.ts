import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('AG Grid', async ({ page }) => {
  await page.getByRole('link', { name: 'AG Grid Paging' }).click()
  await expect(page).toHaveURL(/aggridpaging/)
  await page.getByRole('gridcell', { name: 'Michael Phelps' }).nth(1).click()
  await page
    .locator(
      'div:nth-child(2) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > span > .ag-icon',
    )
    .click()
  await page
    .locator(
      'div:nth-child(2) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > span > .ag-icon',
    )
    .click()
  await page
    .locator(
      'div:nth-child(2) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label',
    )
    .click()
  await page
    .locator(
      'div:nth-child(3) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label',
    )
    .click()
  await page
    .locator(
      'div:nth-child(2) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label',
    )
    .click()
  await page
    .locator(
      'div:nth-child(4) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > span > .ag-icon',
    )
    .click()
  await page
    .locator(
      'div:nth-child(4) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label',
    )
    .click()
  await page
    .locator(
      'div:nth-child(5) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label',
    )
    .click()
  await page
    .locator(
      'div:nth-child(3) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label',
    )
    .click()
  await page.getByRole('gridcell', { name: 'Yang Yilin' }).click()
  await page
    .locator('.ag-center-cols-container > div:nth-child(6) > div:nth-child(3)')
    .click()
  await page.getByRole('gridcell', { name: 'Yang Yilin' }).click()
})
