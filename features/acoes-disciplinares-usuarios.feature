Feature: Comunicação e Ações Disciplinares sobre Usuários
  As an administrador
  I want to comunicar advertências, suspender ou aplicar outras ações sobre as contas dos usuários
  So that eu possa aplicar as políticas da comunidade de forma eficaz e transparente.

  Scenario: Enviar advertência geral para o usuário
    Given que eu estou na tela de análise de reports do usuário
    When eu clico no botão “Enviar Advertência Geral”
    And eu preencho o campo de mensagem explicando o motivo da advertência:
      """
      Linguagem inadequada identificada na review da música ‘Musica1’. Esta conduta viola as diretrizes da comunidade.
      """
    And eu clico em “Enviar”
    Then eu vejo a mensagem “Advertência enviada com sucesso” na tela
    And nenhuma alteração ocorre no status do usuário

  Scenario: Suspender usuário por um período
    Given estou na tela de análise de reports do usuário
    When eu clico em “Suspender por: [10] dias”
    And preencho dias de suspensão e justificativa:
      """
      Reincidência no uso de discurso de ódio nas reviews ‘Musica1’ e ‘Musica3’.
      """
    And eu clico em “Enviar”
    Then vejo mensagem “Usuário suspenso por 10 dias”
    And o e-mail de notificação é enviado ao usuário
    And o status do usuário muda para “Suspenso” por 10 dias
    And na tela “Gerenciar Usuários”, status do usuário é “Suspenso”

  Scenario: Excluir conta de usuário reportado
    Given que eu estou na tela de análise de reports do usuário “Usuário 1”
    And o botão “Excluir Conta” está visível na seção “Ações Gerais sobre o Usuário”
    When eu clico no botão “Excluir Conta”
    And eu preencho a justificativa com “Violação grave das diretrizes da comunidade”
    And eu clico em “Confirmar”
    Then eu vejo a mensagem “Conta excluída com sucesso”
    And ao voltar para a tela “Gerenciar Usuários”, o nome “Usuário 1” não aparece mais na lista

  Scenario: Arquivar caso como resolvido
    Given que eu estou na tela de análise de reports do usuário “Usuário 1”
    And o status do usuário está visível como “Suspenso” ou “Resolvido” na parte superior da tela
    When eu clico no botão “Arquivar caso como resolvido”
    Then o status exibido do usuário muda para “Ativo” na mesma tela
    And ao voltar para a página “Gerenciar Usuários”, o status do “Usuário 1” aparece como “Ativo” na tabela

# Cenários de falha

    Scenario: Tentar suspender usuário com valor inválido no campo de dias
    Given que estou na tela de análise de reports do usuário
    When eu clico em “Suspender por: [10] dias”
    And preencho o campo de dias com “dez” e justificativa “Conduta inapropriada”
    And clico em “Enviar”
    Then vejo mensagem de erro “Informe um número válido de dias”
    And o status do usuário permanece “Ativo”

    Scenario: Tentar suspender usuário com justificativa vazia
    Given que estou na tela de análise de reports do usuário
    When eu clico em “Suspender por: [5] dias”
    And deixo o campo de justificativa vazio
    And clico em “Enviar”
    Then vejo mensagem de erro “Justificativa obrigatória para suspensão”
    And o status do usuário permanece “Ativo”