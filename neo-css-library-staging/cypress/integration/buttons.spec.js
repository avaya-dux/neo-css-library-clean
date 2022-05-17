describe("Button Page", function () {
  // Go to Button Page
  before(() => {
    cy.visit("/src/components/buttons/buttons.html");
  });

  // Make the snapshot and compare it with baseline

  it(`Should match snapshot`, function () {
    cy.matchImageSnapshot();
  });

  // Added basic unit test for Primary Button CSS

  let buttonCSS = {
    "align-items": "center",
    "justify-content": "center",
    border: "0px none rgb(255, 255, 255)",
    "border-radius": "2px",
    display: "flex",
    "font-weight": "400",
    padding: "8px 16px",
    // width: "auto" // can't pass this in as it changes depending on container
    "line-height": "20px",
    "letter-spacing": "0",
    "font-size": "14px",
    "background-color": "rgb(18, 90, 179)",
    color: "rgb(255, 255, 255)",
    "background-image":
      "linear-gradient(50deg, rgb(18, 90, 179) 0%, rgb(18, 90, 179) 50%, rgb(20, 115, 230) 50%, rgb(20, 115, 230) 100%)",
    "background-repeat": "no-repeat",
    "background-size": "300%",
    "background-position": "100% 0%",
    transition: "background-position 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0s",
    "transition-delay": "0s, 0.15s",
  };

  it(`Should have the correct CSS`, function () {
    for (const property in buttonCSS) {
      cy.get("#primarybutton").should(
        "have.css",
        property,
        buttonCSS[property]
      );
    }
  });
});
