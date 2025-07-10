Feature: Gerenciar reviews
  As a usuário comum do sistema
  I want to criar, editar, visualizar e remover meus reviews
  So that que eu possa compartilhar e atualizar minhas opiniões sobre músicas

  Scenario: Review removido com sucesso
    Given Estou na página "Meus reviews"
    And Estou logado como "usuário comum"
    And Tenho uma review "Ótima música!" cadastrada
    When Clico no botão "X" ao lado da review
    And Aparece a tela "Confirmação de delete"
    And Clico no botão "Apagar"
    Then O pop-up "Review apagado com sucesso!" aparece na tela

  Scenario: Review editado com sucesso
    Given Estou na página "Editar review"
    And Estou logado como "usuário comum"
    And Tenho uma review "Ótima música!" cadastrada da música "Long Live"
    When Clico no botão "Editar" de "Ano de Lançamento"
    And O campo "Ano de Lançamento" fica disponível para edição
    And Mudo o valor de "2008" para "2012"
    And Pressiono a tecla "Enter"
    Then Vejo o valor "2012" no campo "Ano de Lançamento"

  Scenario: Visualizar review
    Given Estou na página de reviews da música "Long Live"
    And Estou logado como "usuário comum"
    And Vejo a review "Excelente som!" do usuário "XYZ"
    When Clico no botão "Ler mais" da review "Excelente som!"
    Then Vejo a página de review da música "Long Live" do usuário "XYZ"
