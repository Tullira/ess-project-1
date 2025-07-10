Feature: Seguir e Deixar de Seguir
  As um usuário logado
  I want to seguir e deixar de seguir outros usuários
  So that eu possa controlar quem acompanho na plataforma

  Scenario: Seguir outro usuário
    Given que estou logado como um usuário comum
    And estou na página de perfil do usuário "João"
    And vejo a opção "Seguir" no perfil de "João"
    When eu clico em "Seguir"
    Then a opção deve mudar para "Deixar de seguir"
    And a contagem de seguidores de "João" deve aumentar em 1
    And o usuário "João" deve aparecer na minha lista de usuários seguidos

  Scenario: Deixar de seguir um usuário que estou seguindo
    Given que estou logado como um usuário comum
    And eu sigo o usuário "Ana"
    And estou na página de perfil da usuária "Ana"
    And vejo a opção "Deixar de seguir" no perfil de "Ana"
    When eu clico em "Deixar de seguir"
    Then a opção deve mudar para "Seguir"
    And a contagem de seguidores de "Ana" deve diminuir em 1
    And o usuário "Ana" deve ser removido da minha lista de usuários seguidos

