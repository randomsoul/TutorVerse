-- Tutor profile fields used for internal admin filtering and public approved directory.
alter table public.tutors
  add column if not exists grades text[] default '{}',
  add column if not exists boards text[] default '{}',
  add column if not exists subjects text[] default '{}',
  add column if not exists custom_subjects text[] default '{}',
  add column if not exists max_travel_km numeric,
  add column if not exists availability text;

alter table public.tutor_applications
  add column if not exists other_subjects text[] default '{}',
  add column if not exists city text,
  add column if not exists area text,
  add column if not exists address_line text,
  add column if not exists state text,
  add column if not exists pincode text,
  add column if not exists latitude double precision,
  add column if not exists longitude double precision,
  add column if not exists location_accuracy_m double precision,
  add column if not exists max_travel_km numeric,
  add column if not exists boards text[] default '{}';

create index if not exists idx_tutors_approved on public.tutors(approved);
create index if not exists idx_tutors_area on public.tutors(area);
create index if not exists idx_tutors_custom_subjects on public.tutors using gin(custom_subjects);

create or replace function public.public_approved_tutors()
returns table(id uuid, name text, subjects text[], bio text)
language sql stable security definer set search_path = public
as $$
  select t.id, p.full_name,
         coalesce(t.subjects, '{}') || coalesce(t.custom_subjects, '{}'),
         t.bio
  from public.tutors t
  join public.profiles p on p.id = t.profile_id
  where t.approved = true
    and coalesce(p.is_active, true) = true
    and p.archived_at is null;
$$;

grant execute on function public.public_approved_tutors() to anon, authenticated;
