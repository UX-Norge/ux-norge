describe("uxnorge.no", () => {
  it("works", () => {
    cy.visit("/");
    cy.contains("Nettverk").click();
    cy.contains("Jobb").click();
  });
});
