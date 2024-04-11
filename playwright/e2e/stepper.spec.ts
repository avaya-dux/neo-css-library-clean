import { test } from "@playwright/test";
import { baseTests } from "./baseTest";

test.describe("Stepper Page Visual Test", () => {
  baseTests("stepper");
});
