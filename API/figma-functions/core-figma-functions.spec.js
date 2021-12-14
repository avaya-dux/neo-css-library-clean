const coreFigmaFunctions = require("./core-figma-functions.js");

describe("coreFigmaFunctions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("getFigmaObjTree success", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));

    const response = await coreFigmaFunctions.getFigmaObjTree(
      "figmaApiKey",
      "figmaId"
    );

    expect(response).toMatchInlineSnapshot(`
      Object {
        "data": "12345",
      }
    `);
    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toEqual(
      "https://api.figma.com/v1/files/figmaId?geometry=paths"
    );
  });
  it("getFigmaObjTree failed", async () => {
    fetch.mockReject(new Error("fake error message"));

    const response = await coreFigmaFunctions.getFigmaObjTree(
      "figmaApiKey",
      "figmaId"
    );

    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toEqual(
      "https://api.figma.com/v1/files/figmaId?geometry=paths"
    );
  });
});
