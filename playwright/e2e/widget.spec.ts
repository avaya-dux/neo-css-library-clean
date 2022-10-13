import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Widget Page Visual Test", () => {
  baseTests("widget")
})
