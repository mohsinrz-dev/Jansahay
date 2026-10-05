# JANSAHAY

React + Vite application.

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

Requires a local `.env` file with the Supabase project URL and publishable key:
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Never put a Supabase secret or service-role key in this frontend project. `.env` is
excluded from Git.

## Supabase database setup

In the Supabase Dashboard, open **SQL Editor**, paste and run
[`supabase/migrations/20261005000000_user_data.sql`](./supabase/migrations/20261005000000_user_data.sql).
The migration creates:

- `public.profiles` for account display names and eligibility questionnaire answers.
- `public.saved_schemes` for each account's saved scheme IDs.

Both tables have row-level security policies restricting access to the authenticated
owner. A database trigger creates the profile row when a Supabase Auth user signs up.

In **Authentication → URL Configuration**, allow `http://localhost:5173/**` as a
redirect URL for email confirmation (and add your deployed site's `/auth` callback before
production use). Email/password sign-in is implemented; when email confirmation is
enabled, users must confirm their email before signing in.
