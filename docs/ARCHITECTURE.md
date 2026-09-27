# AIONÔDJUNTA — Arquitetura do Sistema

## 1. Objetivo

Definir a arquitetura técnica da plataforma financeira AIONÔDJUNTA, orientada para a Guiné-Bissau.

O sistema será desenvolvido por módulos, com separação entre interface, lógica de negócio, dados e serviços externos.

## 2. Componentes principais

### Aplicação móvel — apps/mobile

- Desenvolvida com React Native e Expo.
- Destinada a Android e iOS.
- Apresenta carteira, movimentos, transferências e pagamentos.
- Comunica com o backend através de HTTPS.
- Nunca contém chaves privadas do servidor.

### Painel administrativo — apps/admin

- Aplicação web desenvolvida com React e Vite.
- Permite gerir utilizadores, agentes, comerciantes, reclamações e operações.
- Exige autenticação e permissões administrativas.
- Não permite contornar as regras financeiras do backend.

### Backend — backend

- Desenvolvido com Node.js.
- Expõe uma API REST.
- Valida pedidos, identidade, permissões, limites e dados.
- Executa a lógica de negócio e coordena as operações financeiras.
- Regista auditoria e trata erros.
- Comunica com o Supabase e com fornecedores autorizados.

### Base de dados — Supabase

- PostgreSQL para dados persistentes.
- Supabase Auth para autenticação, quando aplicável.
- Storage para ficheiros autorizados.
- Row Level Security (RLS) para proteção dos dados.
- Migrações versionadas no repositório.

## 3. Comunicação

1. O utilizador interage com a aplicação móvel ou painel web.
2. A interface envia um pedido HTTPS ao backend.
3. O backend autentica e valida o pedido.
4. O backend aplica as regras de negócio.
5. A base de dados guarda a operação de forma consistente.
6. O backend devolve o resultado.
7. A interface apresenta a confirmação.

As operações financeiras nunca devem depender apenas de cálculos feitos no dispositivo do utilizador.

## 4. Princípios financeiros

- Utilizar um livro financeiro imutável para registar movimentos.
- Registar débitos e créditos equilibrados.
- Usar transações de base de dados para operações relacionadas.
- Impedir duplicações através de chaves de idempotência.
- Validar saldo, limites, estado da conta e destinatário.
- Usar valores monetários em unidades inteiras mínimas, nunca números de ponto flutuante.
- Registar referências únicas e datas de cada operação.
- Implementar reconciliação com parceiros externos.
- Separar operações simuladas de operações reais.

## 5. Segurança

- Utilizar HTTPS em produção.
- Guardar segredos apenas nas variáveis de ambiente do servidor.
- Nunca expor a chave Supabase Service Role no cliente.
- Aplicar autenticação e autorização em cada operação protegida.
- Validar entradas e limitar tentativas abusivas.
- Proteger sessões e implementar revogação de acesso.
- Registar ações administrativas.
- Minimizar e proteger dados pessoais.
- Não guardar PINs ou palavras-passe em texto simples.
- Não armazenar dados completos de cartões bancários.

## 6. Ambientes

### Desenvolvimento

Execução local ou no Replit, utilizando dados de teste.

### Testes

Ambiente separado para testes automatizados e integração.

### Produção

- Backend: Render.
- Base de dados: Supabase.
- Painel web: Vercel.
- Aplicação móvel: distribuição própria para Android e iOS.

Cada ambiente terá as suas próprias credenciais e configurações.

## 7. Repositório

- apps/mobile: aplicação móvel.
- apps/admin: painel web.
- backend: API e regras de negócio.
- supabase: migrações, políticas e funções SQL.
- packages: módulos partilhados.
- docs: documentação.
- infrastructure: configurações de publicação.
- scripts: ferramentas de desenvolvimento.

## 8. Integrações externas

Pagamentos, SMS, email, depósitos, levantamentos e transferências externas serão implementados através de fornecedores compatíveis e autorizados.

As credenciais serão configuradas fora do código-fonte. As respostas dos fornecedores serão verificadas no servidor.

## 9. Disponibilidade e monitorização

- Registos estruturados e sem segredos.
- Monitorização de erros e disponibilidade.
- Alertas para falhas críticas.
- Cópias de segurança e procedimentos de recuperação.
- Monitorização de operações pendentes e reconciliação.

## 10. Limites do projeto

Esta arquitetura não representa, por si só, autorização para prestar serviços financeiros.

A operação com dinheiro real dependerá das licenças, autorizações, parceiros, controlos de segurança e requisitos legais aplicáveis na Guiné-Bissau.

## Estado

Arquitetura inicial — sujeita a evolução durante o desenvolvimento.
