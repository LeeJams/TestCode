// 요구사항

// - [v] counter의 초기값은 0이다.
// - [v] + 버튼을 클릭 시 count가 1증가한다.
// - [v] - 버튼을 클릭 시 count가 1감소한다.
// - [v] + 버튼을 클릭 시 count가 10이 넘는 경우 더이상 증가하지 못한다. (Max 값이 10)
// - [v] - 버튼을 클릭 시 count가 0보다 작아지는 경우 감소하지 못한다. (Min 값이 0)
// - [v] reset 버튼을 클릭 시 counter가 0으로 초기화된다.

describe("example counter app", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/cypress-ex/index.html");
  });

  it("counter의 초기값은 0이다.", () => {
    cy.get("#value").invoke("text").should("eq", "0");
  });

  it("+ 버튼을 클릭 시 count가 1증가한다.", () => {
    // 1. 기존 값을 가져온다.
    // 2. + 버튼을 클릭한다.
    // 3. 변환된 값이 기존값 + 1 인지 체크한다.
    cy.get("#value")
      .invoke("text")
      .then((val) => {
        const preValue = Number(val);
        cy.get(".increase-btn").click();
        cy.get("#value")
          .invoke("text")
          .should("eq", (preValue + 1).toString());
      });
  });

  it("- 버튼을 클릭 시 count가 1감소한다.", () => {
    // 1. 기존 값을 가져온다.
    // 2. - 버튼을 클릭한다.
    // 3. 변환된 값이 기존값 - 1 인지 체크한다.

    // count가 0보다 작아지는 경우 감소하지 못한다.
    // 위 요구 사항이 있으므로 값을 먼저 증가시켜준다.
    cy.get(".increase-btn").click();

    cy.get("#value")
      .invoke("text")
      .then((val) => {
        const preValue = Number(val);
        cy.get(".decrease-btn").click();
        cy.get("#value")
          .invoke("text")
          .should("eq", (preValue - 1).toString());
      });
  });

  it("+ 버튼을 클릭 시 count가 10이 넘는 경우 더이상 증가하지 못한다. (Max 값이 10)", () => {
    for (let i = 0; i < 11; i++) {
      cy.get(".increase-btn").click();
    }
    cy.get("#value").invoke("text").should("eq", "10");
  });

  it("- 버튼을 클릭 시 count가 0보다 작아지는 경우 감소하지 못한다. (Min 값이 0)", () => {
    cy.get(".decrease-btn").click();
    cy.get("#value").invoke("text").should("eq", "0");
  });

  it("reset 버튼을 클릭 시 counter가 0으로 초기화된다.", () => {
    cy.get(".increase-btn").click();
    cy.get(".reset-btn").click();
    cy.get("#value").invoke("text").should("eq", "0");
  });
});
