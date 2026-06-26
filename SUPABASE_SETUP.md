# Supabase Setup Guide

To persist your portfolio data, follow these steps in your Supabase project:

1. **Create the `app_state` table**:
   Run the following SQL in the Supabase SQL Editor:

   ```sql
   -- Create the table to store the app state
   create table app_state (
     id bigint primary key,
     data jsonb not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable Row Level Security (RLS)
   alter table app_state enable row level security;

   -- Create a policy that allows everyone to read (for public portfolio view)
   create policy "Allow public read access"
     on app_state for select
     using (true);

   -- Create a policy that allows authenticated users to read/write 
   -- (Note: For this app, we're using simple 'anon' key for writes in local dev. 
   -- In production, you should restrict write access to authorized users.)
   create policy "Allow anon write access"
     on app_state for all
     using (true)
     with check (true);
   ```

2. **Configure Environment Variables**:
   Update your environment variables in AI Studio with:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon/Public Key.

3. **Check the connection**:
   Refresh your app. It should now sync with your Supabase database!
