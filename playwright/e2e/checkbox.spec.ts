import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Checkbox Page Visual Test", () => {
  baseTests("checkbox")
})
