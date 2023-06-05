import { expect, test } from "@playwright/test";

import { baseTests, options } from "./baseTest";
import { getTestParameters, gotoPageAndVerify } from "./utils";

test.describe("Checkbox Page Visual Test", () => {

  const { titleRegex: regex, url } = getTestParameters("checkbox");

  test("hover styles", async ({ page }) => {
    await gotoPageAndVerify(page, url, regex);

    const checkbox = page.getByLabel("Check 1");

    await checkbox
      .focus()
      .then(() => expect(checkbox).toHaveCSS("outline", "rgb(20, 115, 230) auto 2px"));

    await expect(page).toHaveScreenshot(options);
  });

  baseTests("checkbox")
})
