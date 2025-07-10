Feature: Moderação de Conteúdo Reportado (Reviews)
  As an administrador
  I want to analisar e moderar reviews que foram reportadas
  So that eu possa remover conteúdo inadequado e garantir um ambiente seguro para os usuários.

  Scenario: Ocultar review reportada
    Given que eu estou na tela de reports do usuário “Usuário 1”
    And eu vejo a review “Musica 1” reportada
    And eu vejo o botão “Ocultar Review” disponível para esta review
    When eu clico no botão “Ocultar Review”
    Then o botão muda de estado indicando que a review foi ocultada
    And a review permanece visível para o administrador com o status de “oculta”
