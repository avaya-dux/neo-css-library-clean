import { test } from "@playwright/test";
import { baseTests } from "./baseTest";

test.describe("Panel Tabs Page Visual Test", () => {
  baseTests("panel-tabs", "Panel Tabs");
});
