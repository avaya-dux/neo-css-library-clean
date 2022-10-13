import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Dropdown Page Visual Test", () => {
  baseTests("dropdown")
})
