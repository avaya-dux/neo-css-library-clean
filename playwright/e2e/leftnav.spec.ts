import { test } from "@playwright/test";
import { baseTests } from "./baseTest";

test.describe("Left Navigation Page Visual Test", () => {
	baseTests("leftnav");
});
