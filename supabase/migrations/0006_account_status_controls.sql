-- Account lifecycle controls.
-- Admins can permanently delete accounts; Managers may only archive/deactivate.
alter table public.profiles
  add column if not exists is_active boolean not null default true;

alter table public.profiles
  add column if not exists archived_at timestamptz null;

alter table public.manager_permissions
  add column if not exists can_deactivate boolean not null default false;
