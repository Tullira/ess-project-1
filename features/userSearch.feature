Feature: busca por usuário 
As a usuário comum 
I want to buscar o perfil de um usuário 
So that eu possa ver suas reviews 

Scenario: busca por usuário feita com sucesso 
   Given eu estou na pagina "tela inicial" 
   And selecionei a opção "Buscando por usuário" 
   When eu preencho o campo de busca com "carol_gab" 
   And eu seleciono a opção "Buscar" 
   Then eu vejo na tela os resultados de usuários com o nome "carol_gab" 
   And os resultados estão ordenados em ordem alfabética 

Scenario: busca por usuário sem resultados 
   Given eu estou na pagina "tela inicial" 
   And selecionei a opção "Buscando por usuário" 
   When eu preencho o campo de busca com "xxxAbc" 
   And eu seleciono a opção "Buscar" 
   Then uma mensagem de erro é exibida "Não foi encontrado nenhum usuário com esse nome." 
