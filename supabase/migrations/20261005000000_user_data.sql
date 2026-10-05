create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_schemes (
  user_id uuid not null references auth.users (id) on delete cascade,
  scheme_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, scheme_id)
);

alter table public.profiles enable row level security;
alter table public.saved_schemes enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own profile" on public.profiles;
create policy "Users can create their own profile"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can view their own saved schemes" on public.saved_schemes;
create policy "Users can view their own saved schemes"
  on public.saved_schemes for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can save schemes to their own account" on public.saved_schemes;
create policy "Users can save schemes to their own account"
  on public.saved_schemes for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can remove their own saved schemes" on public.saved_schemes;
create policy "Users can remove their own saved schemes"
  on public.saved_schemes for delete to authenticated
  using ((select auth.uid()) = user_id);

grant usage on schema public to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, delete on public.saved_schemes to authenticated;

create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (user_id) do nothing;
  return new;
end;
$$;

revoke all on function public.create_profile_for_auth_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.create_profile_for_auth_user();
