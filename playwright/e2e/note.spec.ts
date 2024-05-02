import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Note Page Visual Test", () => {
  baseTests("note")
})
