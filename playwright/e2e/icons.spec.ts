import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Icons Page Visual Test", () => {
  baseTests("icons")
})
