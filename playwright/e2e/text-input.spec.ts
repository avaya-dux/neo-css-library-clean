import { test } from "@playwright/test";

import { baseTests } from "./baseTest";

test.describe("Text Input Page Visual Test", () => {
  baseTests("text-input", "Text Input");
});
