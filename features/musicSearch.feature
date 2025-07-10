Feature: busca por conteúdo 
As a usuário comum 
I want to buscar uma música 
so that eu possa avaliar e ver outras avaliações 

Scenario: música encontrada na busca por conteúdo
   Given eu estou na pagina "tela inicial" 
   And selecionei a opção "Buscando por conteúdo" 
   When eu preencho o campo de busca com "long live" 
   And eu seleciono a opção "Buscar" 
   Then eu vejo na tela as músicas "Long live - Taylor Swift" e "Long live (Taylor’s Version) - Taylor Swift"

Scenario: busca por conteúdo sem resultados 
   Given eu estou na pagina "tela inicial" 
   And selecionei a opção "Buscando por conteúdo" 
   When eu preencho o campo de busca com "Fulano" 
   And eu seleciono a opção "Buscar" 
   Then uma mensagem de erro é exibida "Não foi encontrada nenhuma música com esse nome." 

Scenario: busca com string vazia que retorna todos os conteúdos 
   Given estou na página "tela inicial" 
   And selecionei a opção "Buscando por conteúdo" 
   When eu deixo o campo de busca vazio 
   And eu seleciono a opção "Buscar" 
   Then eu vejo todos os conteúdos disponíveis listados na tela 
