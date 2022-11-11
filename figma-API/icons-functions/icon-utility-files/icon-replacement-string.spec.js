const { stringsToReplace } = require("./icon-replacement-string.js")

describe("stringsToReplace", () => {
    it("should not match social", () => {
        expect(stringsToReplace.test("social")).toBeFalsy();
    })
    it("should not match social-incoming", () => {
        expect(stringsToReplace.test("social-incoming")).toBeFalsy();
    })
})
