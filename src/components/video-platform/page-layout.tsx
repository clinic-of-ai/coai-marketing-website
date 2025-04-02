"use client"

import type { ReactNode } from "react"
import Sidebar from "@/components/video-platform/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, LogOut, Menu, Moon, Search, Settings, Sun, Upload, User, Video } from "lucide-react"
import { useTheme } from "next-themes"

interface PageLayoutProps {
  children: ReactNode
  title: string
  count: number
}

export default function PageLayout({ children, title, count }: PageLayoutProps) {
  const { setTheme, theme } = useTheme()
  const isAuthenticated = true // This would come from your auth context

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar for desktop */}
        <div className="hidden md:block ">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1">
          <div className="p-4 md:p-6">
            {/* Header with title, actions, and search */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                {/* Mobile menu trigger and title */}
                <div className="flex items-center gap-3">
                  <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-[240px]">
                      <Sidebar />
                    </SheetContent>
                  </Sheet>
                  <h1 className="text-2xl font-bold">
                    {title} <span className="text-muted-foreground">({count})</span>
                  </h1>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {isAuthenticated ? (
                    <>
                      <Button variant="ghost" size="icon" asChild>
                        <a href="/video-platform/upload">
                          <Upload className="h-5 w-5" />
                          <span className="sr-only">Upload</span>
                        </a>
                      </Button>

                      <Button variant="ghost" size="icon" asChild>
                        <a href="/video-platform/live">
                          <Video className="h-5 w-5" />
                          <span className="sr-only">Go Live</span>
                        </a>
                      </Button>

                      <Button variant="ghost" size="icon" className="hidden">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                      </Button>


                      {false && <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                              <a href="/video-platform/profile">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href="/video-platform/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>}
                    </>
                  ) : (
                    <Button asChild>
                      <a href="/video-platform/auth/login">Sign in</a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Search bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="Search" className="w-full pl-10 pr-4" />
              </div>
            </div>

            {/* Page content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

