import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Table Page Visual Test", () => {
  baseTests("table")
})
