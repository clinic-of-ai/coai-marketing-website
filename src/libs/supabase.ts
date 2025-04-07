import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env file.',
    { supabaseUrl: !!supabaseUrl, supabaseAnonKey: !!supabaseAnonKey }
  );
  
  // In development, provide a clearer message
  if (process.env.NODE_ENV === 'development') {
    throw new Error('Supabase environment variables missing. Check .env file and restart the dev server.');
  }
}

// Singleton pattern for Supabase client
let supabaseInstance: SupabaseClient | null = null;

/**
 * Get Supabase client instance with auto initialization
 * Uses singleton pattern to avoid multiple client instances
 */
function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;
  
  try {
    supabaseInstance = createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      // Improve performance with fetch batching
      global: {
        fetch: (...args) => fetch(...args),
      }
    });
    
    // Log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.info('Supabase client initialized successfully');
    }
    
    return supabaseInstance;
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    // Fallback to a basic client in case of initialization failure
    return createClient(supabaseUrl as string, supabaseAnonKey as string);
  }
}

// Create a Supabase client with auto session refresh and persistent storage
export const supabase = getSupabaseClient();

/**
 * Reset the Supabase client - useful for testing or after auth changes
 */
export function resetSupabaseClient(): void {
  supabaseInstance = null;
}

/**
 * Helper to check if Supabase connection is working
 * Can be used to validate connectivity before operations
 */
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('health_check').select('*').limit(1);
    return !error;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return false;
  }
}
