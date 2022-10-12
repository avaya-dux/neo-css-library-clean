import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Radio Page Visual Test", () => {
  baseTests("radio")
})
