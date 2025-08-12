Feature: Remover review da home
  	As a usuário administrador do sistema
	I want to remover uma review da home
	So that ela não fique mais disponível para os usuários


	Scenario: Administrador cancela remoção de review
	 Given eu estou na página inicial logado como "administrador"
	 And eu vejo uma review "Silver Springs" de "Paulo Miranda"
	 When eu clico para excluir review de "Silver Springs" feita por "Paulo Miranda"
     And cancelo a operação
	 Then a review "Silver Springs" de "Paulo Miranda" continua na página

	Scenario: Administrador remove review com sucesso
	 Given eu estou na página inicial logado como "administrador"
	 And eu vejo uma review "Silver Springs" de "Paulo Miranda"
	 When eu clico para excluir review de "Silver Springs" feita por "Paulo Miranda"
	 And confirmo a operação
	 Then a review "Silver Springs" de "Paulo Miranda" é removida da página
