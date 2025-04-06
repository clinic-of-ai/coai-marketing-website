import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yxkvxzijwkupwucznpvu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4a3Z4emlqd2t1cHd1Y3pucHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjE5MTQsImV4cCI6MjA1OTUzNzkxNH0.GaQv3FXJ5Z0Fa5JkE_F_YOrwqydycOU8-0x_xmIjgRI";

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
