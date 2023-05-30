import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Colors Page Visual Test", () => {
  baseTests("colors")
})
