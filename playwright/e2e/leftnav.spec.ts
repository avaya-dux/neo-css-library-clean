import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Leftnav Page Visual Test", () => {
  baseTests("leftnav")
})
