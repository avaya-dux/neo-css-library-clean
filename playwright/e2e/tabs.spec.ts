import { test } from "@playwright/test";

import { baseTests } from "./baseTest";

test.describe("Tabs Page Visual Test", () => {
  baseTests("tabs", "Tabs");
});
