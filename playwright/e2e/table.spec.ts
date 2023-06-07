import { expect, test } from "@playwright/test";

import { baseTests, options } from "./baseTest";
import { getTestParameters, gotoPageAndVerify } from "./utils";

test.describe("Table Page Visual Test", () => {
  const { titleRegex: regex, url } = getTestParameters("table");

  test("table header filters cell styles", async ({ page }) => {
    await gotoPageAndVerify(page, url, regex);

    const tableFiltersCell = page.getByTestId("table-filters-cell");

    await tableFiltersCell.focus().then(async () => {
      await expect(page).toHaveScreenshot(options);
    });

    await tableFiltersCell.click().then(async () => {
      await expect(page).toHaveScreenshot(options);
    });
  });

  baseTests("table");
});
