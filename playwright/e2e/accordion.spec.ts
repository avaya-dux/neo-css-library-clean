import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Accordion Page Visual Test", () => {
  baseTests("accordion")
})
