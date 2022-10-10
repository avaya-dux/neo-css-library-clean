import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Textarea input Page Visual Test", () => {
  baseTests("textarea-input")
})
