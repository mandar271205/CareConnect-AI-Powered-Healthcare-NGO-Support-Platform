create extension if not exists "pgcrypto";

create table if not exists public.patient_registrations (
  id uuid primary key default gen_random_uuid(),
  ticket_id text not null unique,
  full_name text not null check (char_length(full_name) between 2 and 120),
  age_group text not null check (
    age_group in (
      'Under 18',
      '18-30',
      '31-50',
      '51-65',
      'Above 65',
      'Prefer not to say'
    )
  ),
  contact_number text not null check (char_length(contact_number) between 7 and 20),
  email text,
  city text not null check (char_length(city) between 2 and 120),
  support_types text[] not null check (array_length(support_types, 1) >= 1),
  description text check (description is null or char_length(description) <= 500),
  preferred_contact text not null check (preferred_contact in ('Phone', 'WhatsApp', 'Email')),
  priority text not null check (priority in ('Urgent Review', 'Priority Review', 'Normal Priority')),
  suggested_team text not null,
  generated_summary text not null,
  status text not null default 'New' check (status in ('New', 'In Review', 'Contacted', 'Resolved')),
  created_at timestamptz not null default now()
);

create table if not exists public.volunteer_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null,
  phone text not null check (char_length(phone) between 7 and 20),
  qualification text not null check (
    qualification in (
      'Doctor',
      'Dentist',
      'Pharmacist',
      'Nurse',
      'Student',
      'Community Volunteer',
      'Other'
    )
  ),
  expertise text[] not null check (array_length(expertise, 1) >= 1),
  experience_years integer check (experience_years is null or experience_years between 0 and 60),
  available_days text[] not null check (array_length(available_days, 1) >= 1),
  city text not null check (char_length(city) between 2 and 120),
  motivation text check (motivation is null or char_length(motivation) <= 300),
  status text not null default 'New' check (status in ('New', 'In Review', 'Contacted', 'Resolved')),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null,
  subject text not null check (
    subject in (
      'General enquiry',
      'Feedback',
      'Partnership',
      'Media',
      'Donation enquiry',
      'Other'
    )
  ),
  message text not null check (char_length(message) between 2 and 1000),
  status text not null default 'New' check (status in ('New', 'In Review', 'Contacted', 'Resolved')),
  created_at timestamptz not null default now()
);

create index if not exists patient_registrations_created_at_idx
  on public.patient_registrations (created_at desc);

create index if not exists patient_registrations_priority_idx
  on public.patient_registrations (priority);

create index if not exists volunteer_registrations_created_at_idx
  on public.volunteer_registrations (created_at desc);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.patient_registrations enable row level security;
alter table public.volunteer_registrations enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Allow anonymous patient inserts" on public.patient_registrations;
drop policy if exists "Allow anonymous volunteer inserts" on public.volunteer_registrations;
drop policy if exists "Allow anonymous contact inserts" on public.contact_messages;

create policy "Allow anonymous patient inserts"
  on public.patient_registrations
  for insert
  to anon
  with check (true);

create policy "Allow anonymous volunteer inserts"
  on public.volunteer_registrations
  for insert
  to anon
  with check (true);

create policy "Allow anonymous contact inserts"
  on public.contact_messages
  for insert
  to anon
  with check (true);

grant usage on schema public to anon;
grant insert on public.patient_registrations to anon;
grant insert on public.volunteer_registrations to anon;
grant insert on public.contact_messages to anon;
