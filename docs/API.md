# AIONÔDJUNTA — API REST

## 1. Objetivo

Definir as rotas da API REST do AIONÔDJUNTA.

Base URL de desenvolvimento: http://localhost:4000/api/v1

Em produção, a API será disponibilizada através de HTTPS no domínio configurado para o backend.

## 2. Regras gerais

- Utilizar JSON nos pedidos e respostas.
- Utilizar HTTPS em produção.
- Validar todos os dados recebidos.
- Exigir autenticação nas rotas privadas.
- Verificar permissões no servidor.
- Utilizar paginação nas listas.
- Não confiar em valores de saldo enviados pelo cliente.
- Utilizar chaves de idempotência nas operações financeiras.
- Não devolver dados pessoais ou financeiros desnecessários.
- Nunca devolver segredos ou tokens privados.

## 3. Formato das respostas

Sucesso:

{
  "success": true,
  "data": {},
  "requestId": "identificador-do-pedido"
}

Erro:

{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descrição do erro"
  },
  "requestId": "identificador-do-pedido"
}

Os exemplos são ilustrativos. Os formatos definitivos serão implementados e testados no backend.

## 4. Estado do serviço

### GET /health

Verifica se o servidor está ativo.

### GET /ready

Verifica se os serviços essenciais estão disponíveis, sem revelar credenciais ou informações internas.

## 5. Conta e perfil

### GET /me
Obtém o perfil do utilizador autenticado.

### PATCH /me
Atualiza os campos de perfil permitidos.

### POST /identity-verifications
Inicia um processo de verificação de identidade.

### GET /identity-verifications/:id
Consulta o estado de uma verificação própria.

O resultado da verificação depende do fornecedor e das validações aplicáveis.

## 6. Carteiras

### GET /wallets
Lista as carteiras do utilizador autenticado.

### GET /wallets/:walletId
Consulta uma carteira autorizada.

### GET /wallets/:walletId/balance
Consulta o saldo contabilístico e o saldo disponível, quando aplicável.

### GET /wallets/:walletId/transactions
Consulta o histórico com paginação e filtros.

Os saldos e movimentos são calculados ou obtidos a partir dos registos financeiros oficiais. O cliente não pode definir o seu próprio saldo.

## 7. Transferências

### POST /transfers
Cria um pedido de transferência interna.

Requisitos:
- Utilizador autenticado.
- Carteira de origem autorizada.
- Destinatário válido.
- Valor positivo e moeda suportada.
- Saldo e limites suficientes.
- Chave de idempotência.
- Confirmação adicional quando exigida.

### GET /transfers/:transferId
Consulta uma transferência autorizada.

### GET /transfers
Lista transferências próprias com paginação.

### POST /transfers/:transferId/cancel
Solicita cancelamento, apenas quando o estado da operação o permitir.

Uma transferência concluída não será apagada. Uma correção financeira será registada através de uma operação de reversão autorizada.

## 8. Pagamentos

### POST /payment-intents
Cria um pedido de pagamento.

### GET /payment-intents/:paymentId
Consulta o estado de um pagamento.

### POST /payment-intents/:paymentId/cancel
Solicita cancelamento quando permitido.

### POST /webhooks/:provider
Recebe notificações de um fornecedor externo.

Os webhooks devem validar a assinatura do fornecedor, impedir duplicações e verificar o estado real da operação antes de contabilizar dinheiro.

## 9. Comerciantes

### GET /merchants/:merchantId
Consulta informações públicas de um comerciante ativo.

### POST /merchant-applications
Submete um pedido de registo de comerciante.

### GET /merchant/me
Consulta o perfil do comerciante autenticado.

### PATCH /merchant/me
Atualiza os campos permitidos do próprio comerciante.

## 10. Agentes

### POST /agent-applications
Submete um pedido de adesão como agente.

### GET /agent/me
Consulta o perfil do agente autenticado.

### GET /agent/me/transactions
Consulta operações autorizadas do agente.

### GET /agent/me/commissions
Consulta comissões e respetivos estados.

Operações de caixa, depósitos e levantamentos dependerão de parceiros e procedimentos autorizados. Não serão simuladas como dinheiro real.

## 11. Poupança

### GET /savings-goals
Lista objetivos de poupança.

### POST /savings-goals
Cria um objetivo.

### PATCH /savings-goals/:goalId
Atualiza os campos permitidos.

### DELETE /savings-goals/:goalId
Elimina um objetivo sem movimentos financeiros associados, quando permitido.

Os objetivos de poupança não representam automaticamente depósitos ou contas bancárias.

## 12. Crédito

### POST /loan-applications
Submete um pedido de crédito.

### GET /loan-applications
Lista os pedidos do utilizador.

### GET /loan-applications/:id
Consulta um pedido próprio.

### GET /loans
Consulta contratos de crédito associados ao utilizador.

### GET /loans/:id/repayments
Consulta o plano e o histórico de reembolsos.

A aprovação, concessão e cobrança de crédito exigem processos, contratos e autorizações aplicáveis.

## 13. Notificações e apoio

### GET /notifications
Lista notificações próprias.

### PATCH /notifications/:id/read
Marca uma notificação própria como lida.

### POST /support/tickets
Abre um pedido de apoio.

### GET /support/tickets
Lista pedidos próprios.

### GET /support/tickets/:id
Consulta um pedido próprio.

## 14. Administração

Todas as rotas administrativas exigem autenticação, autorização específica e registo de auditoria.

### GET /admin/dashboard
Consulta indicadores administrativos autorizados.

### GET /admin/users
Pesquisa e lista utilizadores.

### GET /admin/transactions
Consulta operações financeiras conforme as permissões atribuídas.

### GET /admin/transactions/:id
Consulta os detalhes permitidos de uma operação.

### POST /admin/users/:id/suspend
Suspende uma conta com motivo e auditoria.

### POST /admin/users/:id/restore
Solicita reposição de uma conta, quando permitido.

### GET /admin/agents
Lista agentes.

### GET /admin/merchants
Lista comerciantes.

### GET /admin/loan-applications
Lista pedidos de crédito para análise autorizada.

### GET /admin/audit-logs
Consulta registos de auditoria com acesso restrito.

### GET /admin/reconciliation
Consulta o estado da reconciliação financeira.

Ações administrativas não podem alterar ou apagar diretamente movimentos contabilizados. Ajustes devem seguir um processo controlado e auditável.

## 15. Códigos HTTP

- 200: pedido concluído.
- 201: recurso criado.
- 202: pedido aceite para processamento.
- 400: pedido inválido.
- 401: autenticação necessária.
- 403: operação não autorizada.
- 404: recurso não encontrado.
- 409: conflito ou pedido duplicado incompatível.
- 422: dados válidos em formato, mas inválidos para a operação.
- 429: limite de pedidos excedido.
- 500: erro interno.
- 503: serviço temporariamente indisponível.

## 16. Segurança das operações

- Verificar a identidade e a propriedade dos recursos.
- Aplicar autorização em cada endpoint.
- Validar montantes, moedas e limites no servidor.
- Usar idempotência para pedidos que possam movimentar dinheiro.
- Registar request IDs para rastreabilidade.
- Não incluir dados secretos nos logs.
- Aplicar rate limiting e proteção contra abuso.
- Validar assinaturas de webhooks.
- Não revelar se uma conta existe quando isso facilitar abusos.

## 17. Testes

Cada rota terá testes de:
- Sucesso.
- Dados inválidos.
- Falta de autenticação.
- Falta de permissão.
- Recursos de outros utilizadores.
- Pedidos duplicados.
- Falhas de dependências externas.

## Estado

Contrato inicial da API. As rotas serão implementadas por módulos e verificadas através de testes automatizados.
