import { expect } from "@playwright/test"

export const gotoPageAndVerify = async (page, url, regex) => {
  await page.goto(url)
  await expect(page).toHaveTitle(regex)
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1)
}

export const getTestParameters = (pagePath: string) => {
  const title = capitalize(pagePath)
  const regex = new RegExp(title)
  const baseURL = process.env.BASEURL || "http://127.0.0.1:3000"
  const url = `${baseURL}/${pagePath}`
  return { title, titleRegex: regex, url }
}

export const clickRadioAndVerify = async (page, dir: string) => {
  const radio = page.locator(`[id=${dir}]`)
  await radio.click()

  const main = page.locator("main")
  await expect(main).toHaveAttribute("dir", dir)
}
