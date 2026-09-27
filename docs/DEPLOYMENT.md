# AIONÔDJUNTA — Deployment Guide

## 1. Objetivo

Este documento define o plano de preparação e publicação do AIONÔDJUNTA.

A publicação só deverá acontecer depois de o código, os testes e a segurança serem verificados.

## 2. Serviços previstos

- Supabase: base de dados, autenticação e armazenamento.
- Render: alojamento do backend/API.
- Vercel: alojamento do painel administrativo.
- Expo: desenvolvimento e preparação da aplicação móvel.

A utilização destes serviços depende da configuração e dos respetivos planos disponíveis.

## 3. Ambientes

O projeto deverá separar:

- Desenvolvimento: construção e testes iniciais.
- Testes: validação antes da publicação.
- Produção: serviço disponibilizado aos utilizadores.

Cada ambiente deverá utilizar as suas próprias credenciais e configurações.

## 4. Preparação do backend

Antes da publicação:

- Instalar as dependências.
- Configurar as variáveis de ambiente.
- Configurar a ligação ao Supabase.
- Executar as migrações da base de dados.
- Testar as rotas da API.
- Verificar autenticação e permissões.
- Confirmar que os logs não expõem dados sensíveis.

## 5. Preparação do painel administrativo

- Configurar a URL da API de produção.
- Configurar as variáveis públicas necessárias.
- Testar login e permissões administrativas.
- Confirmar que nenhuma chave secreta está incluída no frontend.
- Executar o processo de build.

## 6. Preparação da aplicação móvel

- Configurar a URL da API de produção.
- Testar login, navegação e comunicação com o backend.
- Verificar permissões e proteção de dados.
- Testar em dispositivos reais.
- Preparar os processos de compilação e publicação.

## 7. Segredos e variáveis de ambiente

- Não colocar ficheiros .env no GitHub.
- Guardar segredos nas configurações protegidas dos serviços.
- Nunca incluir a chave SUPABASE_SERVICE_ROLE_KEY na aplicação móvel ou no painel.
- Utilizar HTTPS em produção.
- Não reutilizar credenciais de teste em produção.

## 8. Verificações antes da publicação

- Testes automatizados concluídos.
- Autenticação e autorização verificadas.
- Políticas RLS testadas.
- Operações financeiras testadas em ambiente de simulação.
- Cópias de segurança e recuperação planeadas.
- Logs e monitorização configurados.
- Requisitos legais e operacionais avaliados.

## 9. Publicação

A publicação deverá ser feita por etapas:

1. Preparar e testar a base de dados.
2. Publicar o backend.
3. Verificar a API publicada.
4. Publicar o painel administrativo.
5. Preparar e testar a aplicação móvel.
6. Realizar uma verificação final de segurança.

## 10. Reversão

Deverá existir um plano para regressar à versão anterior do backend e do painel caso uma publicação provoque problemas.

As alterações à base de dados devem ter um plano de recuperação próprio.

## 11. Estado

Este documento é um plano de publicação. Não significa que os serviços estejam configurados ou que a aplicação já esteja publicada.
