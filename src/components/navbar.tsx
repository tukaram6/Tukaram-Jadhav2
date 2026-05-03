"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, LayoutDashboard, Settings, User, Moon, Sun, Search, Bell } from "lucide-react"
import { Button } from "@/components/lb/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Practice", href: "/practice", icon: BookOpen },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="hidden font-black sm:inline-block text-xl tracking-tighter text-foreground">
              LearnByDoing
            </span>
          </Link>
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-semibold transition-all hover:text-primary rounded-lg",
                  pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search concepts..."
              className="w-full h-10 pl-11 pr-4 rounded-full border border-border bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full" asChild>
              <Link href="/dashboard">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-muted-foreground hover:text-foreground rounded-full"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            <div className="h-8 w-[1px] bg-border/50 mx-1 hidden sm:block" />

            {session?.user ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-foreground leading-none">{session.user.name}</span>
                  <button 
                    onClick={() => signOut()}
                    className="text-[10px] text-muted-foreground hover:text-primary font-bold uppercase tracking-wider transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
                <div className="h-9 w-9 rounded-full overflow-hidden border border-primary/20 shadow-lg shadow-primary/10">
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name || "User"} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all" asChild>
                <Link href="/login">
                    <User className="h-5 w-5 text-muted-foreground" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
