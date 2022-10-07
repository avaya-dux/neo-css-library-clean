import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Form Page Visual Test", () => {
  baseTests("form")
})
