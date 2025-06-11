Feature: remover review
	As a administrador
	I want to remover um review mostrado na página inicial
	So that eu possa gerenciar reviews na plataforma

Scenario: Administrador remove review com sucesso
  Given eu estou na página "Home"
  And eu estou logado como administrador
  And eu vejo uma review "Let Down" de "Fulano"
  When eu clico para excluir review de "Let Down" feita por “Fulano”
  Then a review "Let Down" de "Fulano" desaparece da lista
  And sou redirecionado para a página "Home"


Scenario: Administrador cancela exclusão
  Given eu estou logado como administrador
  And eu estou na página "Home"
  When eu requisito a exclusão da review de "Something" feita por “Sicrano”
  And eu cancelo a exclusão
  Then a review "Something" permanece na lista de reviews