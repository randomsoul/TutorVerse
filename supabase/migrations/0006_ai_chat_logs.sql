-- Private TutorVerse AI chat logs.
-- Anonymous visitors never receive direct table access; the Edge Function writes via service role.
create table if not exists public.ai_chat_logs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  user_message text not null,
  assistant_message text,
  escalated_to_whatsapp boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists ai_chat_logs_session_created_idx
  on public.ai_chat_logs (session_id, created_at);

alter table public.ai_chat_logs enable row level security;

drop policy if exists "public_ai_chat_logs_no_access" on public.ai_chat_logs;
create policy "public_ai_chat_logs_no_access"
  on public.ai_chat_logs
  for all
  to anon, authenticated
  using (false)
  with check (false);
