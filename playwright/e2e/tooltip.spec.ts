import { test } from "@playwright/test";
import { baseTests } from "./baseTest";

test.describe("Tooltip Page Visual Test", () => {
  baseTests("tooltip", "Tooltip");
});
