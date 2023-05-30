import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Avatar Page Visual Test", () => {
  baseTests("avatar")
})
