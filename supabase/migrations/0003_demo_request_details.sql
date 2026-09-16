-- Capture the structured details collected by the Schedule a Free Demo Class form.
alter table public.demo_requests add column if not exists grade text;
alter table public.demo_requests add column if not exists board text;
alter table public.demo_requests add column if not exists subject text;
alter table public.demo_requests add column if not exists competition text;
