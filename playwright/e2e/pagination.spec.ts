import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Pagination Page Visual Test", () => {
  baseTests("pagination")
})
