-- Store structured academic and location details from free-demo requests.
alter table public.demo_requests
  add column if not exists grade text,
  add column if not exists board text,
  add column if not exists subject text,
  add column if not exists exam text,
  add column if not exists preferred_mode text,
  add column if not exists city text,
  add column if not exists area text;
