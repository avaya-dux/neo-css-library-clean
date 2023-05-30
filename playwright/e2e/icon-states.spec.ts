import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Icon States Page Visual Test", () => {
  baseTests("icon-states", "Icon States")
})
