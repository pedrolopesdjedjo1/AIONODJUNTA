# AIONÔDJUNTA — Operations Guide

## 1. Objetivo

Definir os procedimentos para acompanhar, manter e recuperar os serviços do AIONÔDJUNTA.

Este documento descreve procedimentos planeados, ainda sujeitos a implementação.

## 2. Monitorização

Acompanhar:
- Disponibilidade do backend e da API.
- Erros e falhas nas operações.
- Estado da base de dados.
- Utilização de recursos e limites dos serviços.
- Tentativas de acesso suspeitas.

## 3. Registos e privacidade

- Registar erros importantes e eventos técnicos.
- Não guardar palavras-passe, tokens secretos ou dados financeiros desnecessários nos logs.
- Limitar o acesso aos registos.
- Definir um período de retenção adequado.

## 4. Cópias de segurança

- Configurar cópias de segurança da base de dados.
- Restringir o acesso às cópias.
- Testar periodicamente a recuperação dos dados.
- Definir objetivos de recuperação e perda de dados aceitável.

## 5. Gestão de incidentes

Quando ocorrer um problema:
1. Identificar o serviço afetado.
2. Avaliar o impacto nos utilizadores.
3. Conter o problema e proteger as contas e os dados.
4. Corrigir a causa.
5. Verificar se o serviço voltou a funcionar.
6. Registar o incidente e as medidas tomadas.

## 6. Alterações e atualizações

- Testar alterações antes de as publicar.
- Rever as migrações da base de dados.
- Manter um registo das versões publicadas.
- Preparar um plano de reversão para alterações de risco.

## 7. Operações financeiras

- Monitorizar falhas, duplicações e operações pendentes.
- Comparar os registos internos com os registos dos parceiros autorizados.
- Investigar diferenças antes de corrigir saldos.
- Não alterar manualmente o histórico contabilístico.
- Manter operações reais desativadas até à aprovação legal, técnica e operacional.

## 8. Acesso administrativo

- Conceder apenas as permissões necessárias.
- Remover acessos que já não sejam necessários.
- Proteger as contas administrativas com autenticação reforçada.
- Auditar ações administrativas sensíveis.

## 9. Continuidade do serviço

Preparar procedimentos para:
- Indisponibilidade do backend.
- Falhas na base de dados.
- Exposição de credenciais.
- Perda ou corrupção de dados.
- Falhas de fornecedores externos.

## 10. Estado

Este documento é um guia de operações planeado. Os procedimentos precisam de ser implementados, testados e mantidos.
