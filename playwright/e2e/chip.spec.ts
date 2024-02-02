import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Chip Page Visual Test", () => {
  baseTests("chip")
})
