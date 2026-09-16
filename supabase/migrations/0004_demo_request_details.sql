-- Structured details for demo leads.
alter table public.demo_requests add column if not exists grade text;
alter table public.demo_requests add column if not exists board text;
alter table public.demo_requests add column if not exists subject text;
alter table public.demo_requests add column if not exists competition text;
