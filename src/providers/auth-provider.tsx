'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  AuthUser, 
  SignInCredentials, 
  SignUpCredentials, 
  AuthError,
  getCurrentUser,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  resetPassword,
  signInWithGoogle,
  signInWithDiscord,
  onAuthStateChange,
  updatePassword as updateUserPassword
} from '@/libs/auth';

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: SignInCredentials) => Promise<{ success: boolean; error?: string }>;
  signup: (credentials: SignUpCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  googleLogin: () => Promise<void>;
  discordLogin: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    initializeAuth();

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: SignInCredentials) => {
    try {
      const { user, error } = await signInWithEmail(credentials);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to sign in' 
      };
    }
  };

  const signup = async (credentials: SignUpCredentials) => {
    try {
      const { user, error } = await signUpWithEmail(credentials);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to sign up' 
      };
    }
  };

  const logout = async () => {
    try {
      const { error } = await signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to sign out' 
      };
    }
  };

  const googleLogin = async () => {
    await signInWithGoogle();
  };

  const discordLogin = async () => {
    await signInWithDiscord();
  };

  const forgotPassword = async (email: string) => {
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to reset password' 
      };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await updateUserPassword(newPassword);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update password' 
      };
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        googleLogin,
        discordLogin,
        forgotPassword,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 