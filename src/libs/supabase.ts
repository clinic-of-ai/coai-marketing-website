import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a Supabase client with auto session refresh and persistent storage
export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
