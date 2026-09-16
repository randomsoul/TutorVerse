-- Each TutorVerse account can have at most one role-specific record.
-- Required by admin-create-account, which uses upsert(..., { onConflict: 'profile_id' }).
alter table public.students add constraint students_profile_id_key unique (profile_id);
alter table public.parents add constraint parents_profile_id_key unique (profile_id);
alter table public.tutors add constraint tutors_profile_id_key unique (profile_id);
