import fetchMock from "jest-fetch-mock"
fetchMock.enableMocks()

const coreFigmaFunctions = require("./core-figma-functions.js")

describe("coreFigmaFunctions", () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it("getFigmaObjTree success", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: "12345" }))

    const response = await coreFigmaFunctions.getFigmaObjTree(
      "figmaApiKey",
      "figmaId"
    )

    expect(response.data).toEqual("12345")

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      "https://api.figma.com/v1/files/figmaId?geometry=paths",
      { headers: { "X-Figma-Token": "figmaApiKey" }, method: "GET" }
    )
  })

  it("getFigmaObjTree failed", async () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => { })

    fetch.mockReject(() => Promise.reject("API is down"))

    const response = await coreFigmaFunctions.getFigmaObjTree(
      "figmaApiKey",
      "figmaId"
    )

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      "https://api.figma.com/v1/files/figmaId?geometry=paths",
      { headers: { "X-Figma-Token": "figmaApiKey" }, method: "GET" }
    )

    expect(error).toHaveBeenCalledTimes(1)
  })
})
