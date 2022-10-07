import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Select Page Visual Test", () => {
  baseTests("select")
})
