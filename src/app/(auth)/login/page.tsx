"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { useNotification } from "@/components/video-platform/notification"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const notification = useNotification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (activeTab === "login") {
        notification.success("Welcome back!", "You've successfully logged in to your account.")
      } else {
        notification.success("Account created!", "Your account has been successfully created.")
      }

      router.push("/")
    } catch (error) {
      notification.error("Authentication failed", "Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[hsl(222.2,84%,4.9%)]">
      {/* Static background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-[0.03]" />

      {/* Static gradient blobs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-700/30 via-violet-600/20 to-transparent blur-3xl"
        style={{
          top: `calc(50% - 250px)`,
          left: `calc(50% - 250px)`,
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-fuchsia-600/20 via-pink-600/10 to-transparent blur-3xl animate-pulse [animation-delay:2s]" />

      {/* Static particles with constant animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: "20%", left: "15%", opacity: 0.4, duration: 12, delay: 2 },
          { top: "30%", left: "85%", opacity: 0.5, duration: 15, delay: 1 },
          { top: "45%", left: "25%", opacity: 0.6, duration: 18, delay: 3 },
          { top: "60%", left: "75%", opacity: 0.3, duration: 14, delay: 4 },
          { top: "75%", left: "35%", opacity: 0.5, duration: 16, delay: 2 },
          { top: "85%", left: "65%", opacity: 0.4, duration: 13, delay: 1 },
          { top: "25%", left: "45%", opacity: 0.5, duration: 17, delay: 3 },
          { top: "40%", left: "55%", opacity: 0.3, duration: 11, delay: 2 },
          { top: "55%", left: "15%", opacity: 0.4, duration: 14, delay: 1 },
          { top: "70%", left: "85%", opacity: 0.5, duration: 16, delay: 4 },
          { top: "15%", left: "25%", opacity: 0.3, duration: 13, delay: 2 },
          { top: "35%", left: "75%", opacity: 0.4, duration: 15, delay: 1 },
          { top: "50%", left: "35%", opacity: 0.5, duration: 17, delay: 3 },
          { top: "65%", left: "65%", opacity: 0.3, duration: 12, delay: 2 },
          { top: "80%", left: "15%", opacity: 0.4, duration: 14, delay: 1 },
          { top: "90%", left: "85%", opacity: 0.5, duration: 16, delay: 4 },
          { top: "10%", left: "45%", opacity: 0.3, duration: 13, delay: 2 },
          { top: "45%", left: "55%", opacity: 0.4, duration: 15, delay: 1 },
          { top: "60%", left: "25%", opacity: 0.5, duration: 17, delay: 3 },
          { top: "75%", left: "75%", opacity: 0.3, duration: 12, delay: 2 }
        ].map((config, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/50 rounded-full"
            style={{
              top: config.top,
              left: config.left,
              opacity: config.opacity,
              animation: `staticFloat ${config.duration}s linear infinite`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo with glow effect */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center relative">
            <div className="absolute inset-0 bg-cyan-500/30 blur-xl"></div>
            <div className="flex items-center relative">
              <div className="bg-[#00d2e6] text-white rounded-tl-[20px] text-[2rem] font-bold px-4 pt-[0.3rem] pb-[0.2rem] mr-1">Clinic</div>
              <div className="ml-1 text-[2rem] font-bold text-white flex items-start">
                <span>of</span>
                <span className="ml-2 relative">
                  AI
                  <span className="absolute right-[-0.7rem] top-[0.1rem] flex">
                    <span className="bg-black rounded-full w-[0.4rem] h-[0.4rem]  border border-white ml-0.5" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(8,_112,_184,_0.2)] overflow-hidden">
          {/* Tabs with animated indicator */}
          <div className="flex relative mb-6">
            <button
              className={`flex-1 py-5 text-center transition-colors relative z-10 ${
                activeTab === "login" ? "text-white font-medium" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-5 text-center transition-colors relative z-10 ${
                activeTab === "signup" ? "text-white font-medium" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("signup")}
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
            {/* Regular auth form - moved to the top */}
            <form onSubmit={handleSubmit} className="space-y-5 mb-8">
              {activeTab === "signup" && (
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity"></div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    placeholder="name@example.com"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  {activeTab === "login" && (
                    <Link
                      href="/forgot-password"
                      className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
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
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500/50"
                    />
                    <div className="absolute inset-0 rounded bg-cyan-500/20 opacity-0 peer-checked:opacity-100 -z-10 blur-sm transition-opacity"></div>
                  </div>
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
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
                    {activeTab === "login" ? "Sign in" : "Create account"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="relative flex items-center justify-center mb-8">
              <div className="border-t border-white/10 absolute w-full"></div>
              <span className="bg-black/20 backdrop-blur-sm text-gray-400 text-sm px-4 relative">Or continue with</span>
            </div>

            {/* Social login buttons - moved to the bottom */}
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white py-3.5 px-4 rounded-xl border border-white/10 transition-all hover:shadow-[0_0_10px_rgba(8,_112,_184,_0.3)]">
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

              <button className="w-full flex items-center justify-center gap-3 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-white py-3.5 px-4 rounded-xl border border-[#5865F2]/30 transition-all hover:shadow-[0_0_15px_rgba(88,101,242,0.4)]">
                <svg className="h-5 w-5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Continue with Discord
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-8">
              {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {activeTab === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          By continuing, you agree to our{" "}
          <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Add keyframes for static floating animation */}
      <style jsx global>{`
        @keyframes staticFloat {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(10px);
          }
          50% {
            transform: translateY(0px) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
      `}</style>
    </div>
  )
}
