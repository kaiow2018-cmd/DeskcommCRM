-- manifest: indice parcial para drain de event_log e lookups de contatos por org para mitigar disk IOPS
create index if not exists idx_event_log_pending_drain
on public.event_log (event_type, created_at)
where status = 'pending';

create index if not exists idx_contacts_org_created
on public.contacts (organization_id, created_at desc);
