const dirTest = (dir) => {
  // get radio button by id
  cy.get(`#${dir}`)
    .should("be.visible")
    .should("not.be.checked")
    // .check({force: true}) // check the radio button
    .realClick() // does not work either
    .should("be.checked")
    .should("have.attr", "value", `${dir}`)

  cy.get("main").should("have.length", 1).should("have.attr", "dir", `${dir}`) // failing why?

  cy.matchImageSnapshot(`select-${dir}`)
}

const checkRtl = () => {
  cy.get('[type="radio"]')
    .check("rtl")
    .should("be.checked")
    .should("have.length", 1)
}

describe("Select Page Visual Test", () => {
  beforeEach(() => {
    cy.visit("/select")
  })

  it("Should match snapshot after page load", () => {
    cy.matchImageSnapshot("select-auto")
  })

  // not working
  it.skip("Should match snapshot when dir is rtl", () => {
    dirTest("rtl")
  })

  // not working
  it.skip("Should match snapshot when dir is ltr", () => {
    dirTest("ltr")
  })
})
