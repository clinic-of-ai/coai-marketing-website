"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNotification } from "@/components/video-platform/notification";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const notification = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      notification.success(
        "Reset link sent",
        "Check your email for instructions to reset your password.",
      );
    } catch (error) {
      notification.error(
        "Request failed",
        "We couldn't process your request. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 transition-colors duration-300 dark:bg-[hsl(222.2,84%,4.9%)]">
      {/* Static background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-[0.03] dark:opacity-[0.03]" />

      {/* Static gradient blobs */}
      <div
        className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-700/30 via-violet-600/20 to-transparent blur-3xl"
        style={{
          top: `calc(50% - 250px)`,
          left: `calc(50% - 250px)`,
        }}
      />
      <div className="absolute right-1/4 top-1/4 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl" />

      {/* Enhanced particles with multiple shapes and patterns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Small dots */}
        {[
          {
            top: "20%",
            left: "15%",
            opacity: 0.4,
            duration: 12,
            delay: 2,
            size: "w-1 h-1",
          },
          {
            top: "30%",
            left: "85%",
            opacity: 0.5,
            duration: 15,
            delay: 1,
            size: "w-1 h-1",
          },
          {
            top: "45%",
            left: "25%",
            opacity: 0.6,
            duration: 18,
            delay: 3,
            size: "w-1 h-1",
          },
          {
            top: "60%",
            left: "75%",
            opacity: 0.3,
            duration: 14,
            delay: 4,
            size: "w-1 h-1",
          },
          {
            top: "75%",
            left: "35%",
            opacity: 0.5,
            duration: 16,
            delay: 2,
            size: "w-1 h-1",
          },
          {
            top: "85%",
            left: "65%",
            opacity: 0.4,
            duration: 13,
            delay: 1,
            size: "w-1 h-1",
          },
          {
            top: "25%",
            left: "45%",
            opacity: 0.5,
            duration: 17,
            delay: 3,
            size: "w-1 h-1",
          },
          {
            top: "40%",
            left: "55%",
            opacity: 0.3,
            duration: 11,
            delay: 2,
            size: "w-1 h-1",
          },
          {
            top: "55%",
            left: "15%",
            opacity: 0.4,
            duration: 14,
            delay: 1,
            size: "w-1 h-1",
          },
          {
            top: "70%",
            left: "85%",
            opacity: 0.5,
            duration: 16,
            delay: 4,
            size: "w-1 h-1",
          },
        ].map((config, i) => (
          <div
            key={`dot-${i}`}
            className={`absolute ${config.size} rounded-full bg-gray-800/50 dark:bg-white/50`}
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
          {
            top: "15%",
            left: "25%",
            opacity: 0.3,
            duration: 20,
            delay: 0,
            size: "w-2 h-2",
          },
          {
            top: "35%",
            left: "75%",
            opacity: 0.4,
            duration: 18,
            delay: 1,
            size: "w-2 h-2",
          },
          {
            top: "50%",
            left: "35%",
            opacity: 0.5,
            duration: 22,
            delay: 2,
            size: "w-2 h-2",
          },
          {
            top: "65%",
            left: "65%",
            opacity: 0.3,
            duration: 19,
            delay: 3,
            size: "w-2 h-2",
          },
          {
            top: "80%",
            left: "15%",
            opacity: 0.4,
            duration: 21,
            delay: 4,
            size: "w-2 h-2",
          },
        ].map((config, i) => (
          <div
            key={`circle-${i}`}
            className={`absolute ${config.size} rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 shadow-[0_0_10px_rgba(8,112,184,0.3)] dark:from-cyan-400/30 dark:to-blue-400/30`}
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
          {
            top: "10%",
            left: "45%",
            opacity: 0.3,
            duration: 25,
            delay: 0,
            size: "w-3 h-3",
          },
          {
            top: "45%",
            left: "55%",
            opacity: 0.4,
            duration: 23,
            delay: 1,
            size: "w-3 h-3",
          },
          {
            top: "60%",
            left: "25%",
            opacity: 0.5,
            duration: 27,
            delay: 2,
            size: "w-3 h-3",
          },
          {
            top: "75%",
            left: "75%",
            opacity: 0.3,
            duration: 24,
            delay: 3,
            size: "w-3 h-3",
          },
        ].map((config, i) => (
          <div
            key={`hex-${i}`}
            className={`absolute ${config.size} clip-hexagon bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-400/20 dark:to-pink-400/20`}
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
          { top: "80%", left: "40%", opacity: 0.4, duration: 2.2, delay: 1.5 },
        ].map((config, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute h-1 w-1 bg-white dark:bg-cyan-400"
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
        <div className="mb-8 flex justify-center">
          <div className="relative flex items-center">
            <div className="absolute inset-0 bg-cyan-500/30 blur-xl"></div>
            <div className="relative flex items-center">
              <div className="mr-1 rounded-tl-[20px] bg-[#00d2e6] px-4 pb-[0.2rem] pt-[0.3rem] text-[2rem] font-bold text-white">
                Clinic
              </div>
              <div className="ml-1 flex items-start text-[2rem] font-bold text-gray-800 dark:text-white">
                <span>of</span>
                <span className="relative ml-2">
                  AI
                  <span className="absolute right-[-0.7rem] top-[0.1rem] flex">
                    <span className="ml-0.5 h-[0.4rem] w-[0.4rem] rounded-full border border-gray-800 bg-gray-800 dark:border-white dark:bg-black" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/10 bg-white/40 p-8 shadow-[0_0_40px_rgba(8,_112,_184,_0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <Link
            href="/login"
            className="mb-6 inline-flex items-center text-sm text-cyan-600 transition-colors hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </Link>

          {isSubmitted ? (
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                <svg
                  className="h-10 w-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Check your email
              </h1>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                We've sent a password reset link to{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {email}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-cyan-600 transition-colors hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
                >
                  try again
                </button>
              </p>
            </div>
          ) : (
            <>
              <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Reset your password
              </h1>
              <p className="mb-8 text-sm text-gray-600 dark:text-gray-300">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </label>
                  <div className="group relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-200/10 bg-white/5 px-4 py-3.5 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      placeholder="name@example.com"
                      required
                    />
                    <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 blur-xl transition-opacity group-focus-within:opacity-100"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3.5 font-medium text-white shadow-[0_0_15px_rgba(8,_112,_184,_0.5)] transition-all hover:from-cyan-600 hover:to-blue-700 hover:shadow-[0_0_25px_rgba(8,_112,_184,_0.7)]"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      Send reset link
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
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
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
        }
      `}</style>
    </div>
  );
}
