import { test } from "@playwright/test";
import { baseTests } from "./baseTest";

test.describe("Tree View Page Visual Test", () => {
  baseTests("tree-view", "Tree View");
});
