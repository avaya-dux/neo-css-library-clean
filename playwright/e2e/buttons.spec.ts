import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Buttons Page Visual Test", () => {
  baseTests("buttons")
})
