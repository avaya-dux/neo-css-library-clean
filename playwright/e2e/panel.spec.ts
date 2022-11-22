import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Panel Page Visual Test", () => {
  baseTests("panel")
})
