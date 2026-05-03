"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, GraduationCap, LayoutDashboard, Settings, User, BarChart3, Clock, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const sidebarItems = [
    { name: "My Progress", href: "/dashboard", icon: LayoutDashboard },
    { name: "Browse Subjects", href: "/practice", icon: BookOpen },
    { name: "Certificates", href: "/dashboard?tab=certificates", icon: GraduationCap },
    { name: "Statistics", href: "/dashboard?tab=statistics", icon: BarChart3 },
  ]

  const recentModules = [
    { id: "algebra-1", name: "Algebra Basics", progress: 60 },
    { id: "newtons-laws", name: "Newton's Laws", progress: 40 },
  ]

  return (
    <aside className="hidden lg:flex w-72 flex-col fixed left-0 top-16 bottom-0 border-r border-border bg-[oklch(0.07_0_0)] p-6 overflow-y-auto">
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">Menu</h3>
          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all group",
                  pathname === item.href 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 px-4">
             <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">Recent Learning</h3>
             <Link href="/dashboard" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-tighter">View All</Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentModules.map((module) => (
              <Link
                key={module.id}
                href={`/module/${module.id}`}
                className="group p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-sm"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors">{module.name}</span>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Started 2 days ago</span>
                    </div>
                    <span>{module.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/80 to-primary text-primary-foreground shadow-xl shadow-primary/20">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded bg-white/20">
                        <Star className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold">Pro Account</span>
                </div>
                <p className="text-xs text-white/80 mb-3 leading-relaxed">Unlock advanced simulations and real-world projects today.</p>
                <Link href="/login">
                  <button className="w-full py-2 bg-white text-primary rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer">Upgrade Now</button>
                </Link>
            </div>
        </div>
      </div>
    </aside>
  )
}
