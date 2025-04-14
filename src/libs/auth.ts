import { supabase } from './supabase';
import { User, AuthChangeEvent } from '@supabase/supabase-js';

// Types
export type AuthUser = User;

export type SignInCredentials = {
  email: string;
  password: string;
  turnstileToken?: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  name?: string;
  turnstileToken?: string;
};

export type AuthError = {
  message: string;
  status?: number;
};

// Current session/user helpers
export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getCurrentSession();
  return !!session;
}

// Authentication methods
export async function signInWithEmail({ email, password, turnstileToken }: SignInCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
    // Store the turnstile token in a variable we can pass to metadata if needed
    // Currently Supabase doesn't directly support turnstile in signInWithPassword
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } };
    }

    return { user: data.user, error: null };
  } catch (err) {
    return { 
      user: null, 
      error: { message: err instanceof Error ? err.message : 'An unknown error occurred during sign in' } 
    };
  }
}

export async function signUpWithEmail({ email, password, name, turnstileToken }: SignUpCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
    if (!email || !password) {
      return { 
        user: null, 
        error: { message: 'Email and password are required' } 
      };
    }
    
    if (password.length < 6) {
      return { 
        user: null, 
        error: { message: 'Password must be at least 6 characters long' } 
      };
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          // Include turnstile token in user metadata
          turnstile_token: turnstileToken,
        },
      },
    });

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } };
    }

    // If email confirmation is required
    if (data.user && !data.user.confirmed_at) {
      return { 
        user: data.user, 
        error: { message: 'Please check your email to confirm your account' } 
      };
    }

    return { user: data.user, error: null };
  } catch (err) {
    return { 
      user: null, 
      error: { message: err instanceof Error ? err.message : 'An unknown error occurred during sign up' } 
    };
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { error: { message: error.message, status: error.status } };
    }
    
    return { error: null };
  } catch (err) {
    return { 
      error: { message: err instanceof Error ? err.message : 'An unknown error occurred during sign out' } 
    };
  }
}

// Helper to get the base URL safely in both client and server contexts
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for server-side rendering
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.clinicofai.com';
  return url;
}

export async function resetPassword(email: string, turnstileToken?: string): Promise<{ error: AuthError | null }> {
  try {
    if (!email) {
      return { error: { message: 'Email is required' } };
    }
    
    const baseUrl = getBaseUrl();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/auth/reset-password`,
      captchaToken: turnstileToken,
    });
    
    if (error) {
      return { error: { message: error.message, status: error.status } };
    }
    
    return { error: null };
  } catch (err) {
    return { 
      error: { message: err instanceof Error ? err.message : 'An unknown error occurred during password reset' } 
    };
  }
}

export async function updatePassword(new_password: string): Promise<{ error: AuthError | null }> {
  try {
    if (!new_password) {
      return { error: { message: 'New password is required' } };
    }
    
    if (new_password.length < 6) {
      return { error: { message: 'Password must be at least 6 characters long' } };
    }
    
    const { error } = await supabase.auth.updateUser({
      password: new_password,
    });
    
    if (error) {
      return { error: { message: error.message, status: error.status } };
    }
    
    return { error: null };
  } catch (err) {
    return { 
      error: { message: err instanceof Error ? err.message : 'An unknown error occurred while updating password' } 
    };
  }
}

// Social logins
export async function signInWithGoogle(): Promise<{ error: AuthError | null }> {
  try {
    const baseUrl = getBaseUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });
    
    if (error) {
      return { error: { message: error.message, status: error.status } };
    }
    
    return { error: null };
  } catch (err) {
    return { 
      error: { message: err instanceof Error ? err.message : 'Failed to initiate Google login' } 
    };
  }
}

export async function signInWithDiscord(): Promise<{ error: AuthError | null }> {
  try {
    const baseUrl = getBaseUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });
    
    if (error) {
      return { error: { message: error.message, status: error.status } };
    }
    
    return { error: null };
  } catch (err) {
    return { 
      error: { message: err instanceof Error ? err.message : 'Failed to initiate Discord login' } 
    };
  }
}

// Auth state change listener
export function onAuthStateChange(callback: (event: AuthChangeEvent, session: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
} 