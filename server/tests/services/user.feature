Feature: Serviço de Gerenciamento de Usuário

  # Cenários para getUserById
  Scenario: Buscar um usuário por ID existente
    Given um usuário já existe no sistema
    When eu buscar esse usuário pelo seu ID
    Then os dados do usuário devem ser retornados

  Scenario: Buscar um usuário por ID inexistente
    Given o ID fornecido não pertence a nenhum usuário
    When eu buscar um usuário por esse ID
    Then o resultado da busca deve ser nulo

  # Cenários para updateUser
  Scenario: Atualizar o nome de um usuário existente
    Given um usuário já existe no sistema
    When eu atualizar o nome desse usuário para "Nome Novo"
    Then os dados do usuário devem ser retornados com o nome atualizado

  Scenario: Tentar atualizar um usuário que não existe
    Given o ID de um usuário que não existe no sistema
    When eu tentar atualizar esse usuário
    Then o resultado da operação deve ser nulo

  Scenario: Tentar atualizar um usuário para um e-mail que já está em uso
    Given existem dois usuários: "userA" com e-mail "a@email.com" e "userB" com e-mail "b@email.com"
    When eu tentar atualizar o e-mail de "userA" para "b@email.com"
    Then um erro deve ser lançado dizendo que o e-mail já está em uso

  Scenario: Atualizar a senha de um usuário
    Given um usuário já existe no sistema
    When eu atualizar a senha desse usuário para "novaSenha123"
    Then a operação de atualização deve ser chamada com a nova senha

  # Cenários para createUser
  Scenario: Criar um novo usuário com sucesso
    Given não existe um usuário com o e-mail "novo@email.com"
    When eu criar um novo usuário com os dados para "novo@email.com"
    Then um novo usuário deve ser retornado com sucesso

  Scenario: Tentar criar um usuário com um e-mail que já existe
    Given um usuário com o e-mail "existente@email.com" já foi criado
    When eu tentar criar um novo usuário com o e-mail "existente@email.com"
    Then um erro deve ser lançado dizendo que o e-mail já está em uso

  # Cenário para deleteUser
  Scenario: Deletar um usuário com sucesso
    Given um usuário já existe no sistema
    When eu deletar esse usuário
    Then o usuário deletado deve ser retornado

  # Cenário para getUsers
  Scenario: Listar todos os usuários
    Given existem múltiplos usuários no sistema
    When eu solicitar a lista de todos os usuários
    Then uma lista contendo todos os usuários deve ser retornada