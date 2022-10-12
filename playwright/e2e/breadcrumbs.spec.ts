import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Breadcrumbs Page Visual Test", () => {
  baseTests("breadcrumbs")
})
