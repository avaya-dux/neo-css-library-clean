import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Switch Page Visual Test", () => {
  baseTests("switch")
})
