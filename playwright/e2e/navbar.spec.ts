import { expect, test } from "@playwright/test";

import { baseTests, options } from "./baseTest";
import { getTestParameters, gotoPageAndVerify } from "./utils";

test.describe("Navbar Page Visual Test", () => {
  const { titleRegex: regex, url } = getTestParameters("navbar");

  test("hover styles", async ({ page }) => {
    await gotoPageAndVerify(page, url, regex);

    const navbarButtonParent = page.getByTestId("navbar-button-parent");

    await navbarButtonParent.hover().then(() => {
      const navbarButton = navbarButtonParent.getByRole("button");

      expect(navbarButton).toHaveCSS("background-color", "rgb(241, 241, 241)");
    });

    await expect(page).toHaveScreenshot(options);
  });

  baseTests("navbar");
});
