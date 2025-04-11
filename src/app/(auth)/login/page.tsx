"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/components/video-platform/notification"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-[hsl(222.2,84%,4.9%)] transition-colors duration-300">
      {/* Theme toggle button */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Static background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-[0.03] dark:opacity-[0.03]" />

      {/* Static gradient blobs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-700/30 via-violet-600/20 to-transparent blur-3xl dark:from-purple-700/30 dark:via-violet-600/20"
        style={{
          top: `calc(50% - 250px)`,
          left: `calc(50% - 250px)`,
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl animate-pulse dark:from-cyan-500/20 dark:via-blue-500/10" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-fuchsia-600/20 via-pink-600/10 to-transparent blur-3xl animate-pulse [animation-delay:2s] dark:from-fuchsia-600/20 dark:via-pink-600/10" />

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
            className="absolute w-1 h-1 bg-gray-800/50 dark:bg-white/50 rounded-full"
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
              <div className="ml-1 text-[2rem] font-bold text-gray-800 dark:text-white flex items-start">
                <span>of</span>
                <span className="ml-2 relative">
                  AI
                  <span className="absolute right-[-0.7rem] top-[0.1rem] flex">
                    <span className="bg-gray-800 dark:bg-black rounded-full w-[0.4rem] h-[0.4rem] border border-gray-800 dark:border-white ml-0.5" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <AuthForm
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          email={email}
          password={password}
          name={name}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onNameChange={setName}
          rememberMe={rememberMe}
          onRememberMeChange={setRememberMe}
        />
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
