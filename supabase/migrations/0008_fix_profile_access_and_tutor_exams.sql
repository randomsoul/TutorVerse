-- Fixes production profile loading for signed-in students and aligns tutor profile schema with the dashboard.
alter table public.tutors
  add column if not exists competitive_exams text[] default '{}';

create policy students_self on public.students
  for select to authenticated
  using ((profile_id = auth.uid()) or is_admin());

create index if not exists idx_tutors_competitive_exams
  on public.tutors using gin(competitive_exams);
