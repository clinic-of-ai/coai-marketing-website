'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';

type AuthFormProps = {
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  email: string;
  password: string;
  name: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onNameChange: (name: string) => void;
  rememberMe: boolean;
  onRememberMeChange: (remember: boolean) => void;
};

export function AuthForm({
  activeTab,
  onTabChange,
  onSubmit,
  isLoading,
  email,
  password,
  name,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  rememberMe,
  onRememberMeChange,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-[0_0_40px_rgba(8,_112,_184,_0.2)] overflow-hidden">
      {/* Tabs with animated indicator */}
      <div className="flex relative mb-6">
        <button
          className={`flex-1 py-5 text-center transition-colors relative z-10 ${
            activeTab === "login" 
              ? "text-gray-800 dark:text-white font-medium" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          }`}
          onClick={() => onTabChange("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-5 text-center transition-colors relative z-10 ${
            activeTab === "signup" 
              ? "text-gray-800 dark:text-white font-medium" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          }`}
          onClick={() => onTabChange("signup")}
        >
          Sign Up
        </button>
        <div
          className="absolute bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-out"
          style={{
            left: activeTab === "login" ? "0%" : "50%",
            width: "50%",
          }}
        />
      </div>

      <div className="px-8 pb-8">
        <form onSubmit={onSubmit} className="space-y-5 mb-8">
          {activeTab === "signup" && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative group">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity"></div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative group">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="name@example.com"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              {activeTab === "login" && (
                <Link
                  href="/forgot-password"
                  className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity"></div>
            </div>
          </div>

          {activeTab === "login" && (
            <div className="flex items-center">
              <div className="relative inline-flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => onRememberMeChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                />
                <div className="absolute inset-0 rounded bg-cyan-500/20 opacity-0 peer-checked:opacity-100 -z-10 blur-sm transition-opacity"></div>
              </div>
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3.5 px-4 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(8,_112,_184,_0.5)] hover:shadow-[0_0_25px_rgba(8,_112,_184,_0.7)] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {activeTab === "login" ? "Sign In" : "Create Account"}
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center mb-8">
          <div className="border-t border-gray-200 dark:border-white/10 absolute w-full"></div>
          <span className="bg-gray-200 dark:bg-gray-700 backdrop-blur-sm text-gray-500 dark:text-gray-400 text-sm px-4 relative">Or continue with</span>
        </div>

        {/* Social login buttons */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-gray-800 dark:text-white py-3.5 px-4 rounded-xl border border-gray-200 dark:border-white/10 transition-all hover:shadow-[0_0_10px_rgba(8,_112,_184,_0.3)]">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center gap-3 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-gray-800 dark:text-white py-3.5 px-4 rounded-xl border border-[#5865F2]/30 transition-all hover:shadow-[0_0_15px_rgba(88,101,242,0.4)]">
            <svg className="h-5 w-5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Continue with Discord
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => onTabChange(activeTab === "login" ? "signup" : "login")}
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
          >
            {activeTab === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
          By continuing, you agree to our{" "}
          <Link href="/auth/login" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/auth/login" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
} 