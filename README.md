# AIONÔDJUNTA

Plataforma de serviços financeiros digitais orientada para a Guiné-Bissau.

## Objetivo

Construir uma plataforma financeira segura, acessível e preparada para integrar serviços de pagamentos, transferências, carteiras digitais e outros serviços financeiros autorizados.

## Funcionalidades planeadas

- Cadastro, autenticação e gestão de perfil
- Verificação de identidade (KYC)
- Carteiras digitais e consulta de saldo
- Transferências entre utilizadores
- Depósitos e levantamentos através de parceiros
- Pagamentos a comerciantes
- QR Codes e comprovativos
- Histórico e extratos
- Poupança e objetivos financeiros
- Pedidos e gestão de crédito
- Agentes e comerciantes
- Notificações por SMS, email e aplicação
- Gestão de reclamações e disputas
- Painel administrativo
- Relatórios e reconciliação financeira
- Segurança, auditoria e prevenção de fraude

## Tecnologias

- GitHub: controlo de versões e repositório
- Node.js: ambiente de execução do backend
- Supabase: PostgreSQL, autenticação e armazenamento
- Render: alojamento do backend
- Vercel: alojamento do painel web
- Replit: ambiente opcional de desenvolvimento
- Expo: aplicação móvel Android e iOS

## Arquitetura

- `backend/`: API e lógica de negócio
- `apps/mobile/`: aplicação móvel
- `apps/admin/`: painel administrativo
- `supabase/`: migrações, políticas e funções de base de dados
- `packages/`: código partilhado
- `docs/`: documentação técnica
- `infrastructure/`: configurações de publicação

## Segurança

- Nunca guardar credenciais reais no GitHub.
- Utilizar variáveis de ambiente para segredos.
- Aplicar controlo de acesso e permissões.
- Validar todas as operações no servidor.
- Manter registos de auditoria.
- Utilizar operações financeiras consistentes e idempotentes.
- Não guardar dados de cartões bancários completos.

## Desenvolvimento

O projeto será construído por módulos. As dependências e as variáveis de ambiente serão configuradas durante a fase de instalação.

As transações financeiras iniciais serão testadas em ambiente de demonstração, sem dinheiro real.

## Aviso

Este repositório é um projeto em desenvolvimento. A existência do código não representa uma autorização para prestar serviços financeiros. A operação real dependerá das licenças, autorizações, integrações e verificações aplicáveis na Guiné-Bissau.

## Estado

Em desenvolvimento — estrutura inicial.
