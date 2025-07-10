Feature: Gerenciamento de Usuários Reportados
  As an administrador
  I want to visualizar e gerenciar usuários que foram reportados pela comunidade
  So that eu possa tomar ações disciplinares apropriadas e manter a integridade da plataforma.

  Scenario: Visualizar painel de usuários reportados
    Given que eu estou logado como “administrador”
    When eu clico em “Gerenciar usuários” no menu lateral
    Then eu vejo uma lista de usuários
      | Nome     | Reports | Último Report   | Status   |
      | Usuario1 | 3       | 08/06/2025      | Ativo    |
      | Usuario2 | 1       | 07/06/2025      | Ativo    |
      | Usuario3 | 5       | 09/06/2025      | Suspenso |
    And devo ver um botão “Ver” ao lado de cada usuário reportado

  Scenario: Visualizar detalhes de reports de um usuário
    Given eu estou logado como “administrador” e estou vendo o painel de usuários reportados
    When eu clico em “Ver” ao lado do usuário “Usuário 1”
    Then vou dar de cara com o perfil do usuário: nome, e-mail, como tá a conta e quando ela foi criada
    And eu vejo uma indicação das reviews reportadas do usuário
    And devo ver os motivos de cada report agrupados por review
      | Review   | Motivos                                 |
      | Musica1  | Linguagem ofensiva (2), Discurso de ódio (1) |
      | Musica2  | Conteúdo irrelevante (1)                |
      | Musica3  | Spam (2)                                |
