Feature: Perfil de Usuário 
  As um usuário comum
  I want to visualizar meu perfil e as informações de outros usuários
  So that eu possa acompanhar minha rede e editar minhas informações

  Scenario: Exibir meu próprio perfil
    Given eu estou logado como "Guga" 
    When eu acesso a página "perfil"
    Then eu devo ver o nome "Guga", o email "guga@exemplo.com" e a "foto de perfil"
    And devo ver que sigo 3 pessoas e tenho 2 seguidores
    And não devo ver a opção "Seguir" ou "Deixar de seguir"
    And devo ver a opção "Editar perfil"
    And devo ver links para ver as listas de seguidores e de pessoas que sigo

  Scenario: Visualizar o perfil de outro usuário que eu ainda não sigo
    Given que estou logado como um usuário comum
    And existe um usuário chamado "Maria" no sistema
    When eu visito a página de perfil do usuário "Maria"
    Then eu devo ver o nome "Maria" na tela
    And eu devo ver a foto de perfil de "Maria"
    And eu devo ver a contagem de seguidores e de usuários que "Maria" segue
    And eu devo ver um link para a lista de seguidores de "Maria"
    And eu devo ver um link para a lista de usuários que "Maria" segue

  Scenario: Ver minha lista de usuários seguidos
    Given que estou logado como um usuário
    And eu sigo o usuário "Guga"
    When eu clico no link "Seguindo" no meu perfil
    Then eu devo ver uma lista contendo o nome "Guga"
    And eu devo ver a foto de perfil de "Guga"

  Scenario: Ver minha lista de seguidores
    Given que estou logado como um usuário
    And os usuários "Guga" e "Tulio" me seguem
    When eu clico no link "Seguidores" no meu perfil
    Then eu devo ver uma lista contendo os nomes "Guga" e "Tulio"
    And eu devo ver as respectivas fotos de perfil de "Guga" e "Tulio"
    And se eu não sigo "Guga", devo ver a opção "Seguir" ao lado do nome dele
    And se eu sigo "Tulio", devo ver a opção "Deixar de seguir" ao lado do nome dele
    And os nomes "Guga" e "Tulio" devem ser clicáveis e levar ao perfil de cada um
  
  Scenario: Editar perfil
    Given que estou logado como o usuário "Guga"
    And estou na página de perfil
    When eu clico no botão "Editar perfil"
    And preencho o campo "E-mail" com "GG@exemplo.com"
    And clico no botão "Confirmar"
    Then eu devo ver a mensagem "Perfil atualizado com sucesso"
