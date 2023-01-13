import { expect, test } from "@playwright/test";

import { baseTests, options } from "./baseTest";
import { getTestParameters, gotoPageAndVerify } from "./utils";

test.describe("Links Page Visual Test", () => {
  const { titleRegex: regex, url } = getTestParameters("links");

  test("hover styles", async ({ page }) => {
    await gotoPageAndVerify(page, url, regex);

    const blockLink = page.getByText("Default anchor element");

    const inlineLink = page.getByText(
      "Inline anchor element with '.neo-link--inline' class applied"
    );

    await blockLink
      .hover()
      .then(() => expect(blockLink).toHaveCSS("color", "rgb(18, 90, 179)"));

    await inlineLink
      .hover()
      .then(() => expect(inlineLink).toHaveCSS("color", "rgb(18, 90, 179)"));

    await expect(page).toHaveScreenshot(options);
  });

  baseTests("links");
});
