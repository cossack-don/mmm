/// <reference types="cypress" />

describe("list-projects", () => {
  it("GET /project - получает список проектов", () => {
    const params = "limit=5&offset=0";
    const url = `/project?${params}`;

    cy.request({ method: "GET", url: url }).then((res) => {
      expect(res.status).to.equal(200);
    });
  });
});
