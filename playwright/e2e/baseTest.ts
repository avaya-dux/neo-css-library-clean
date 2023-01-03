import { test, expect } from "@playwright/test"
import {
  clickRadioAndVerify,
  getTestParameters,
  gotoPageAndVerify,
} from "./utils"

const options = {
  fullPage: true,
  maxDiffPixelRatio: 0,
  timeout: 10 * 1000,
}
export const baseTests = (page: string, optionTitle?: string) => {
  const { title, titleRegex: regex, url } = getTestParameters(page, optionTitle)

  test(`should match when dir is auto in ${title}`, async ({ page }) => {
    await gotoPageAndVerify(page, url, regex)
    await expect(page).toHaveScreenshot(options)
  })

  test(`should match when dir is rtl in ${title}`, async ({ page }) => {
    await gotoPageAndVerify(page, url, regex)
    await clickRadioAndVerify(page, "rtl")
    await expect(page).toHaveScreenshot(options)
  })

  test(`should match when dir is lrt in ${title}`, async ({ page }) => {
    await gotoPageAndVerify(page, url, regex)
    await clickRadioAndVerify(page, "ltr")
    await expect(page).toHaveScreenshot(options)
  })
}
