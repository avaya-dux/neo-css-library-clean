import { test } from "@playwright/test"
import { baseTests } from "./baseTest"

test.describe("Navbar Page Visual Test", () => {
  baseTests("navbar")
})
