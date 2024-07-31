import { test } from "@playwright/test";
import { baseTests } from "./baseTest";

test.describe("SplitButton Page Visual Test", () => {
	baseTests("splitbutton", "SplitButton");
});
