# AIONÔDJUNTA — Estrutura da Base de Dados

## 1. Tecnologia

A base de dados utilizará PostgreSQL através do Supabase.

As alterações à estrutura serão controladas por migrações SQL versionadas no diretório supabase/migrations.

## 2. Regras gerais

- Todas as tabelas terão uma chave primária.
- Utilizar UUIDs para identificadores internos.
- Guardar datas em formato timestamptz.
- Guardar valores monetários em unidades mínimas inteiras (por exemplo, XOF em francos CFA inteiros).
- Não utilizar números de ponto flutuante para dinheiro.
- Aplicar chaves estrangeiras e restrições de integridade.
- Definir políticas RLS nas tabelas acessíveis por clientes.
- Não permitir que clientes alterem diretamente saldos financeiros.
- Não guardar palavras-passe: a autenticação será gerida pelo Supabase Auth.
- Não guardar dados completos de cartões bancários.

## 3. Identidade e utilizadores

### profiles

Perfil associado ao utilizador autenticado.

Campos previstos:
- id: UUID, associado a auth.users
- full_name
- phone_number
- email
- avatar_path
- preferred_language
- account_status
- created_at
- updated_at

### user_roles

Papéis e permissões atribuídos a utilizadores.

Campos previstos:
- id
- user_id
- role
- created_at

Os papéis administrativos serão atribuídos apenas por processos seguros no servidor.

### identity_verifications

Estado e referências da verificação de identidade.

Campos previstos:
- id
- user_id
- provider
- verification_status
- provider_reference
- reviewed_at
- created_at

Documentos de identidade serão guardados em armazenamento privado, com acesso restrito e prazo de retenção definido.

## 4. Carteiras

### wallets
Representa uma carteira e a sua moeda.

Campos previstos:
- id
- owner_user_id
- currency_code
- wallet_status
- created_at
- updated_at

### ledger_accounts
Contas contabilísticas associadas às carteiras e às contas internas do sistema.

Campos previstos:
- id
- wallet_id, quando aplicável
- account_type
- currency_code
- account_status
- created_at

### ledger_transactions
Cabeçalho de cada operação contabilística.

Campos previstos:
- id
- transaction_type
- transaction_status
- reference
- idempotency_key
- description
- created_at
- posted_at

### ledger_entries
Movimentos individuais de débito e crédito.

Campos previstos:
- id
- transaction_id
- ledger_account_id
- entry_side
- amount_minor
- currency_code
- created_at

Regras:
- Uma operação contabilizada deve ter pelo menos dois movimentos.
- O total de débitos deve ser igual ao total de créditos por moeda.
- Movimentos contabilizados não podem ser editados ou apagados.
- Correções devem utilizar movimentos de reversão.
- A contabilização deve ocorrer numa transação PostgreSQL.
- A chave de idempotência deve impedir a repetição da mesma operação.

O saldo será calculado a partir dos movimentos contabilizados ou mantido numa projeção atualizada de forma transacional e reconciliável.

## 5. Transferências e pagamentos

### transfers
- id
- sender_wallet_id
- recipient_wallet_id
- amount_minor
- currency_code
- fee_minor
- status
- ledger_transaction_id
- created_at
- completed_at

### payment_intents
- id
- payer_user_id
- merchant_id
- amount_minor
- currency_code
- status
- provider_reference
- created_at
- completed_at

### payment_providers
- id
- provider_name
- provider_status
- created_at

### provider_events
- id
- provider_name
- external_event_id
- event_type
- processing_status
- received_at
- processed_at

Os eventos externos terão identificadores únicos para evitar processamento duplicado. A confirmação de pagamentos será validada no servidor.

## 6. Agentes e comerciantes

### agents
- id
- user_id
- agent_code
- status
- created_at

### merchants
- id
- owner_user_id
- business_name
- merchant_code
- status
- created_at

### agent_commissions
- id
- agent_id
- related_transaction_id
- amount_minor
- currency_code
- status
- created_at

Comissões e liquidações serão contabilizadas através do livro financeiro.

## 7. Crédito e poupança

### savings_goals
- id
- user_id
- title
- target_amount_minor
- currency_code
- status
- created_at

### loan_applications
- id
- user_id
- requested_amount_minor
- currency_code
- application_status
- created_at
- reviewed_at

### loans
- id
- borrower_user_id
- principal_amount_minor
- currency_code
- interest_terms
- loan_status
- created_at

### loan_repayments
- id
- loan_id
- amount_minor
- currency_code
- ledger_transaction_id
- repayment_status
- created_at

Crédito real dependerá de avaliação, contratos, regras aplicáveis e autorização para a atividade.

## 8. Notificações e apoio

### notifications
- id
- user_id
- notification_type
- title
- message
- read_at
- created_at

### support_tickets
- id
- user_id
- subject
- description
- ticket_status
- created_at
- updated_at

### audit_logs
- id
- actor_user_id
- action
- resource_type
- resource_id
- request_id
- created_at

Os registos de auditoria não devem conter palavras-passe, tokens ou dados pessoais desnecessários.

## 9. Segurança e permissões

- Ativar RLS nas tabelas expostas ao cliente.
- Permitir que cada utilizador consulte apenas os seus dados autorizados.
- Impedir acesso direto do cliente às tabelas internas do livro financeiro.
- Executar operações financeiras através de funções ou serviços seguros no servidor.
- Nunca expor a chave service_role.
- Validar permissões administrativas no backend.
- Proteger documentos privados com políticas de acesso restritas.

## 10. Integridade financeira

As operações de dinheiro serão implementadas com funções PostgreSQL seguras e transações atómicas.

Cada operação deverá validar:
- Identidade e estado das contas.
- Saldo disponível e limites.
- Moeda e valor.
- Chave de idempotência.
- Débitos e créditos equilibrados.
- Estado da operação e possibilidade de reversão.

As operações pendentes de fornecedores externos serão reconciliadas antes de serem consideradas concluídas.

## 11. Migrações e testes

As tabelas, índices, restrições, funções, políticas RLS e dados de demonstração serão criados através de migrações SQL.

Os testes deverão cobrir:
- Acesso não autorizado.
- Transferências concorrentes.
- Saldo insuficiente.
- Pedidos duplicados.
- Reversões.
- Falhas de fornecedores.
- Reconciliação contabilística.

## Estado

Documento de planeamento. A estrutura definitiva será implementada e validada nas migrações SQL antes de utilizar dinheiro real.
