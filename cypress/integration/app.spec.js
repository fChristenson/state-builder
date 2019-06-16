const StateBuilder = require("../../src/utils/stateBuilder");
const builder = new StateBuilder();

describe("App test", () => {

  beforeEach((done) => {
    builder.clear().then(() => done());
  });

  it("list order", () => {
    builder
      .createUser({name: "foo"})
      .createUser({name: "bar"})
      .execute().then(() => {
      cy.visit("/");
      cy.get("li").should(($e) => {
        expect($e).to.have.length(2)
      });
      cy.get("li").should("contain", "foo");
      cy.get("li").should("contain", "bar");
    })
  });
});