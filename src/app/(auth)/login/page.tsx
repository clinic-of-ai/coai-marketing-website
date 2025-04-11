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

      {/* Enhanced particles with multiple shapes and patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Small dots */}
        {[
          { top: "20%", left: "15%", opacity: 0.4, duration: 12, delay: 2, size: "w-1 h-1" },
          { top: "30%", left: "85%", opacity: 0.5, duration: 15, delay: 1, size: "w-1 h-1" },
          { top: "45%", left: "25%", opacity: 0.6, duration: 18, delay: 3, size: "w-1 h-1" },
          { top: "60%", left: "75%", opacity: 0.3, duration: 14, delay: 4, size: "w-1 h-1" },
          { top: "75%", left: "35%", opacity: 0.5, duration: 16, delay: 2, size: "w-1 h-1" },
          { top: "85%", left: "65%", opacity: 0.4, duration: 13, delay: 1, size: "w-1 h-1" },
          { top: "25%", left: "45%", opacity: 0.5, duration: 17, delay: 3, size: "w-1 h-1" },
          { top: "40%", left: "55%", opacity: 0.3, duration: 11, delay: 2, size: "w-1 h-1" },
          { top: "55%", left: "15%", opacity: 0.4, duration: 14, delay: 1, size: "w-1 h-1" },
          { top: "70%", left: "85%", opacity: 0.5, duration: 16, delay: 4, size: "w-1 h-1" }
        ].map((config, i) => (
          <div
            key={`dot-${i}`}
            className={`absolute ${config.size} bg-gray-800/50 dark:bg-white/50 rounded-full`}
            style={{
              top: config.top,
              left: config.left,
              opacity: config.opacity,
              animation: `staticFloat ${config.duration}s linear infinite`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}

        {/* Medium circles with glow */}
        {[
          { top: "15%", left: "25%", opacity: 0.3, duration: 20, delay: 0, size: "w-2 h-2" },
          { top: "35%", left: "75%", opacity: 0.4, duration: 18, delay: 1, size: "w-2 h-2" },
          { top: "50%", left: "35%", opacity: 0.5, duration: 22, delay: 2, size: "w-2 h-2" },
          { top: "65%", left: "65%", opacity: 0.3, duration: 19, delay: 3, size: "w-2 h-2" },
          { top: "80%", left: "15%", opacity: 0.4, duration: 21, delay: 4, size: "w-2 h-2" }
        ].map((config, i) => (
          <div
            key={`circle-${i}`}
            className={`absolute ${config.size} bg-gradient-to-r from-cyan-500/30 to-blue-500/30 dark:from-cyan-400/30 dark:to-blue-400/30 rounded-full shadow-[0_0_10px_rgba(8,112,184,0.3)]`}
            style={{
              top: config.top,
              left: config.left,
              opacity: config.opacity,
              animation: `floatAndGlow ${config.duration}s ease-in-out infinite`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}

        {/* Large hexagons */}
        {[
          { top: "10%", left: "45%", opacity: 0.3, duration: 25, delay: 0, size: "w-3 h-3" },
          { top: "45%", left: "55%", opacity: 0.4, duration: 23, delay: 1, size: "w-3 h-3" },
          { top: "60%", left: "25%", opacity: 0.5, duration: 27, delay: 2, size: "w-3 h-3" },
          { top: "75%", left: "75%", opacity: 0.3, duration: 24, delay: 3, size: "w-3 h-3" }
        ].map((config, i) => (
          <div
            key={`hex-${i}`}
            className={`absolute ${config.size} bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-400/20 dark:to-pink-400/20 clip-hexagon`}
            style={{
              top: config.top,
              left: config.left,
              opacity: config.opacity,
              animation: `floatAndRotate ${config.duration}s ease-in-out infinite`,
              animationDelay: `${config.delay}s`,
            }}
          />
        ))}

        {/* Sparkles */}
        {[
          { top: "20%", left: "60%", opacity: 0.6, duration: 2, delay: 0 },
          { top: "40%", left: "20%", opacity: 0.5, duration: 2.5, delay: 0.5 },
          { top: "60%", left: "80%", opacity: 0.7, duration: 3, delay: 1 },
          { top: "80%", left: "40%", opacity: 0.4, duration: 2.2, delay: 1.5 }
        ].map((config, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white dark:bg-cyan-400"
            style={{
              top: config.top,
              left: config.left,
              opacity: config.opacity,
              animation: `sparkle ${config.duration}s ease-in-out infinite`,
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

      {/* Add keyframes for enhanced animations */}
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

        @keyframes floatAndGlow {
          0% {
            transform: translateY(0px) translateX(0px);
            box-shadow: 0 0 10px rgba(8, 112, 184, 0.3);
          }
          25% {
            transform: translateY(-15px) translateX(15px);
            box-shadow: 0 0 20px rgba(8, 112, 184, 0.5);
          }
          50% {
            transform: translateY(0px) translateX(30px);
            box-shadow: 0 0 10px rgba(8, 112, 184, 0.3);
          }
          75% {
            transform: translateY(15px) translateX(15px);
            box-shadow: 0 0 20px rgba(8, 112, 184, 0.5);
          }
          100% {
            transform: translateY(0px) translateX(0px);
            box-shadow: 0 0 10px rgba(8, 112, 184, 0.3);
          }
        }

        @keyframes floatAndRotate {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(20px) rotate(90deg);
          }
          50% {
            transform: translateY(0px) translateX(40px) rotate(180deg);
          }
          75% {
            transform: translateY(20px) translateX(20px) rotate(270deg);
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(360deg);
          }
        }

        @keyframes sparkle {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0;
          }
        }

        .clip-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  )
}
