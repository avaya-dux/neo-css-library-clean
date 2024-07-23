import { test } from "@playwright/test";
import { baseTests } from "./baseTest";

test.describe("Sheet Page Visual Test", () => {
	baseTests("sheet");
});
