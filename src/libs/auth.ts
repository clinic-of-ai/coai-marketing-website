import { supabase } from './supabase';
import { User, AuthChangeEvent } from '@supabase/supabase-js';

// Types
export type AuthUser = User;

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  name?: string;
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
export async function signInWithEmail({ email, password }: SignInCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
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

export async function signUpWithEmail({ email, password, name }: SignUpCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
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

export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
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
export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function signInWithDiscord() {
  return supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

// Auth state change listener
export function onAuthStateChange(callback: (event: AuthChangeEvent, session: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
} 