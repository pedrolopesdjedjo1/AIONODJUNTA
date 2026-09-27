# AIONÔDJUNTA — Security Policy

## 1. Objetivo

Proteger as contas, os dados pessoais e as operações financeiras dos utilizadores.

Este documento define as regras de segurança que deverão ser implementadas e testadas antes da publicação.

## 2. Segredos e credenciais

- Nunca colocar palavras-passe, chaves privadas ou tokens secretos no GitHub.
- Guardar os segredos em variáveis de ambiente protegidas.
- Nunca expor SUPABASE_SERVICE_ROLE_KEY na aplicação móvel ou no painel administrativo.
- Se um segredo for exposto, revogá-lo e substituí-lo imediatamente.
- Manter os ficheiros .env fora do controlo de versões.

## 3. Autenticação e contas

- Utilizar autenticação segura.
- Proteger as sessões e os tokens de acesso.
- Implementar recuperação segura de conta.
- Aplicar limites às tentativas de login.
- Exigir verificação adicional para operações sensíveis, quando aplicável.

## 4. Autorização e acesso

- Aplicar o princípio do menor privilégio.
- Cada utilizador só pode consultar e alterar os dados que está autorizado a aceder.
- Proteger todas as rotas administrativas no servidor.
- Ativar e testar as políticas Row Level Security (RLS) do Supabase.
- Nunca confiar apenas na validação feita pela aplicação móvel ou pelo navegador.

## 5. Operações financeiras

- Não permitir saldos ou transferências alterados diretamente pelo cliente.
- Processar operações financeiras exclusivamente no backend seguro.
- Utilizar valores inteiros na unidade monetária mínima; nunca usar números de vírgula flutuante para dinheiro.
- Garantir atomicidade e consistência das operações.
- Implementar idempotência para evitar operações duplicadas.
- Manter registos contabilísticos imutáveis e reconciliáveis.
- Registar auditorias das operações sensíveis.
- Não ativar dinheiro real antes da validação legal, técnica e operacional.

## 6. Proteção de dados

- Recolher apenas os dados necessários.
- Proteger dados pessoais e documentos de identidade.
- Limitar o acesso a documentos e ficheiros privados.
- Definir regras de retenção e eliminação de dados.
- Não incluir dados pessoais ou segredos nos logs.

## 7. API e infraestrutura

- Utilizar HTTPS em produção.
- Validar todos os dados recebidos pela API.
- Aplicar limites de pedidos e proteção contra abuso.
- Configurar CORS apenas para origens autorizadas.
- Manter dependências atualizadas.
- Utilizar mensagens de erro que não revelem informações internas.

## 8. Painel administrativo

- Exigir autenticação e permissões específicas.
- Registar ações administrativas relevantes.
- Restringir operações de alto risco.
- Não permitir que um administrador altere silenciosamente o histórico financeiro.

## 9. Testes de segurança

Antes da publicação, testar:
- Acesso não autorizado a contas e dados.
- Políticas RLS.
- Permissões administrativas.
- Transferências duplicadas ou concorrentes.
- Validação de valores e limites.
- Recuperação de conta.
- Exposição acidental de segredos.

## 10. Incidentes

Perante um incidente:
1. Limitar o acesso comprometido.
2. Revogar credenciais afetadas.
3. Investigar o alcance do incidente.
4. Corrigir a vulnerabilidade.
5. Documentar o incidente e as medidas tomadas.

## 11. Estado

Este documento define requisitos planeados. A sua existência não significa que os controlos já estejam implementados ou que o sistema tenha sido auditado.
