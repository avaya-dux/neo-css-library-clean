import { test } from "@playwright/test";
import { baseTests } from "./baseTest";

test.describe("Side Navigation Page Visual Test", () => {
	baseTests("sidenav");
});
