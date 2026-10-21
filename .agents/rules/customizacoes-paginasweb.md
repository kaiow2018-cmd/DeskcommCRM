# Regra de Ouro: Preservação de Customizações (Essere Viagens & PaginasWeb)

> Esta regra é lida por toda IA (Antigravity, Cursor, Codex, OpenCode, Claude Code) neste repositório.

## 1. Funcionalidades Customizadas Proprietárias

Este clone do Deskcomm CRM possui funcionalidades exclusivas desenvolvidas para clientes da operação (como a **Essere Viagens e Turismo**) que **não devem ser apagadas ou sobrescritas**:

1. **Upload de Múltiplos Arquivos e Drag & Drop no Kanban:**
   - `components/kanban/FileUploadCustomField.tsx` (componente visual de arrastar/soltar arquivos)
   - `components/contacts/CustomFieldsEditor.tsx` (suporte ao tipo `file`)
   - `components/kanban/CamposObrigatoriosDialog.tsx` (validação de anexos obrigatórios por etapa de funil)
   - `components/kanban/LeadFieldsForm.tsx` (renderização de campos de arquivo)
   - `lib/schemas/settings.ts` (validação Zod do tipo `file`)
2. **API de Anexos de Leads:**
   - `app/api/v1/leads/[id]/attachments/route.ts` (upload, download e listagem no Supabase Storage `internal-media`)
3. **Índice Parcial de Drain de Event Log:**
   - `supabase/migrations/20261014120000_0655_indice_drain_event_log_e_contacts.sql` e `supabase/baseline.sql`

## 2. Diretriz Estrita para Atualizações e Migrações

- **NUNCA descartar ou reverter esses arquivos** em um `git checkout` ou merge cego com a `main` oficial do upstream (`melgarafael/DeskcommCRM`).
- Sempre mesclar (`git merge`) trazendo as novidades oficiais do Deskcomm e mantendo o suporte ao tipo `file` e seus componentes.
- No deploy da VPS, a imagem da aplicação (`app`) deve ser compilada contendo esses componentes para que o campo de anexo permaneça funcional no Kanban.
- Dados de clientes no banco (Supabase) residem em tabelas com RLS e nunca devem ser afetados por migrations de atualização.
