Feature: Cadastrar nova música
  	As a usuário administrador do sistema
	I want to cadastrar uma nova música
	So that ela fique disponível para os usuários visualizarem e avaliarem
 
Scenario: Cadastrar música com sucesso
  	Given eu estou na página "Cadastrar nova música" logado como usuário administrador
	When eu preencho o campo "Nome da música" com "Long Live"
	And eu preencho o campo "Artista" com "Taylor Swift"
	And eu preencho o campo "Álbum" com "Speak Now"
	And eu preencho o campo "Ano de lançamento" com "2010"
	And eu preencho o campo "Duração" com "5:17"
	And eu preencho o campo "URL" com "https://youtu.be/TFglkZVPBY0"
	And eu preencho o campo "Plataformas" com as opções "Spotify", "Deezer" e "Apple Music"
	And eu seleciono a foto "capa_longlive.png" em "Capa"
  	And eu seleciono a opção "Finalizar cadastro"
	Then eu vejo a mensagem "Música cadastrada com sucesso!"
	And eu clico em "Voltar à tela inicial"
 
Scenario: Erro ao não preencher todos os campos obrigatórios no cadastro de uma música
	Given eu estou na página "Cadastrar nova música" logado como usuário administrador
	When eu preencho o campo "Nome da música" com "Long Live"
	And eu preencho o campo "Ano de lançamento" com "2010"
	And eu preencho o campo "Duração" com "5:17"
	And eu preencho o campo "URL" com "https://youtu.be/TFglkZVPBY0"
	And eu preencho o campo "Plataformas" com as opções "Spotify", "Deezer" e "Apple Music"
	And eu seleciono a foto "capa_longlive.png" em "Capa"
	And eu seleciono a opção "Finalizar cadastro"
	Then eu vejo a mensagem "Atenção: campos obrigatórios não preenchidos"
	And eu clico em "Voltar para o cadastro"

Scenario: Tentativa de selecionar uma foto em formato inválido
	Given eu estou na página "Cadastrar nova música" logado como usuário administrador
	When eu preencho o campo "Nome da música" com "Long Live"
	And eu preencho o campo "Artista" com "Taylor Swift"
	And eu preencho o campo "Álbum" com "Speak Now"
	And eu preencho o campo "Ano de lançamento" com "2010"
	And eu preencho o campo "Duração" com "5:17" 
	And eu preencho o campo "URL" com "https://youtu.be/TFglkZVPBY0" 
	And eu preencho o campo "Plataformas" com as opções "Spotify", "Deezer" e "Apple Music"
	And eu seleciono a foto "capa_longlive2.pdf" em "Capa"
	And eu seleciono a opção "Finalizar cadastro"
	Then eu vejo a mensagem "Atenção: formato de foto inválido"
	And eu clico em "Voltar para o cadastro"
	
Scenario: Inserir ano de lançamento inválido
	Given eu estou na página "Cadastrar nova música" logado como usuário administrador
	When eu preencho o campo "Nome da música" com "Long Live"
	And eu preencho o campo "Artista" com "Taylor Swift"
	And eu preencho o campo "Álbum" com "Speak Now"
	And eu preencho o campo "Ano de lançamento" com "20aa"
	And eu preencho o campo "Duração" com "5:17"
	And eu preencho o campo "URL" com "https://youtu.be/TFglkZVPBY0" 
	And eu preencho o campo "Plataformas" com as opções "Spotify", "Deezer" e "Apple Music"	
	And eu seleciono a foto "capa_longlive.png" em "Capa"
	And eu seleciono a opção "Finalizar cadastro"
	Then eu vejo a mensagem "Atenção: formato de data inválido"
	And eu clico em "Voltar para o cadastro"
