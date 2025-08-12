import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { setAdmin, setCommonUser } from "../../../client/src/currentUser";

// --------------------
// Cenário 1
// --------------------
// Feature: Remover review da home
//   	As a usuário administrador do sistema
// 	I want to remover uma review da home
// 	So that ela não fique mais disponível para os usuários

// Scenario: Administrador cancela remoção de review
// 	 Given eu estou na página inicial logado como "administrador"
// 	 And eu vejo uma review "Baby" de "Paulo Miranda"
// 	 When eu clico para excluir review de "Baby" feita por "Paulo Miranda"
//      And cancelo a operação
// 	 Then a review "Baby" de "Paulo Miranda" continua na página
Given("eu estou na página inicial logado como {string}", (role) => {
  if (role === "administrador") {
    setAdmin();
  } else {
    setCommonUser();
  }
  cy.visit("/");
});

Given("eu vejo uma review {string} de {string}", (songTitle, authorName) => {
  cy.get('[data-cy="review-card"]')
    .filter(`:contains("${songTitle}"):contains("${authorName}")`)
    .should("exist");
});

When(
  "eu clico para excluir review de {string} feita por {string}",
  (songTitle, authorName) => {
    cy.get('[data-cy="review-card"]')
      .filter(`:contains("${songTitle}"):contains("${authorName}")`)
      .within(() => {
        cy.get('[data-cy="delete-button"]').click();
      });
  }
);

When("cancelo a operação", () => {
  cy.get('[data-cy="cancel-delete-button"]').click();
});

Then(
  "a review {string} de {string} continua na página",
  (songTitle, authorName) => {
    cy.get('[data-cy="review-card"]')
      .filter(`:contains("${songTitle}"):contains("${authorName}")`)
      .should("exist");
  }
);

// Scenario: Administrador remove review com sucesso
//   Given eu estou na página inicial logado como "administrador"
//   And eu vejo uma review "Let Down" de "Túlio"
//   When eu clico para excluir review de "Let Down" feita por “Túlio”
//   Then a review "Let Down" de "Túlio" é removida da página

When("confirmo a operação", () => {
  // Confirma a exclusão no modal
  // cy.get('[data-cy="discard-modal]"').should("be.visible");
  cy.get('[data-cy="confirm-delete-button"]').click();
});

Then(
  "a review {string} de {string} é removida da página",
  (songTitle, authorName) => {
    cy.get('[data-cy="review-card"]')
      .filter(`:contains("${songTitle}"):contains("${authorName}")`)
      .should("not.exist");
  }
);
