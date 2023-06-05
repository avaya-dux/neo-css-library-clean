import { expect, test } from "@playwright/test";

import { baseTests, options } from "./baseTest";
import { getTestParameters, gotoPageAndVerify } from "./utils";

test.describe("Buttons Page Visual Test", () => {
  const { titleRegex: regex, url } = getTestParameters("buttons");

  test("hover styles", async ({ page }) => {
    await gotoPageAndVerify(page, url, regex);

    const primaryButtonsWrapper = page.getByTestId("primary-buttons");

    const primaryButtons = await primaryButtonsWrapper
      .locator(".neo-btn")
      .all();

    for (const button of await primaryButtonsWrapper
      .locator(".neo-btn")
      .all()) {
      await button.hover();
      await expect(page).toHaveScreenshot(options);
    }
  });

  baseTests("buttons");
});
