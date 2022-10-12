import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Notifications Page Visual Test", () => {
  baseTests("notifications")
})
