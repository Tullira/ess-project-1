Feature: Criar review
  As a usuário comum do sistema
  I want to cadastrar um novo review
  So that ele fique disponível para os demais usuários

  Scenario: Review criado com sucesso
    Given Estou na página "Cadastrar review"
    When Preencho o campo "Escrever review" da música "Long Live" com "Ótima música!"
    And Preencho o campo "Avaliação" com "1 estrela"
    And Clico no botão "Postar review"
    Then O pop-up "Review cadastrada com sucesso" aparece na tela
    And Posso clicar no botão "Cadastrar novo review" para voltar à página de cadastro

  Scenario: Review não foi criado por falta de texto no campo "Escrever review"
    Given Estou na página "Cadastrar review" da música "Long Live"
    And Estou logado como "usuário comum"
    And O campo "Escrever review" está vazio
    When Clico no botão "Postar review"
    Then O pop-up "Escreva algo para fazer o review!" aparece na tela

  Scenario: Review não foi criado por falta de avaliação
    Given Estou na página "Cadastrar review"
    And Estou logado como "usuário comum"
    And Escolhi a música "Tal" para fazer o review
    And Preenchi o campo "Escrever review" com "Muito boa"
    When Não preencho o campo "Avaliação"
    And Clico no botão "Postar review"
    Then O pop-up "Selecione uma avaliação para continuar" aparece na tela
  
