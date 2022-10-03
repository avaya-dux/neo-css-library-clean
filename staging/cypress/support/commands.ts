/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command"

import "cypress-real-events/support"

addMatchImageSnapshotCommand("matchImageSnapshot", {
  failureThreshold: 5.0,
  failureThresholdType: "percent",
  customDiffConfig: { threshold: 0.1 },
  capture: "viewport",
})

Cypress.Commands.add("setResolution", (size) => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1])
  } else {
    cy.viewport(size)
  }
})

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Cypress {
    interface Chainable {
      matchImageSnapshot(snapshotName?: string): Chainable<void>
      setResolution(size: ViewportPreset): Chainable<void>
    }
  }
}
