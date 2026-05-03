import Link from "next/link"
import { Calculator, Code, FlaskConical, ArrowRight, User, BookOpen, Trophy, Flame } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { SUBJECTS } from "@/lib/data"
import { getModules } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/lb/card"
import { Button } from "@/components/lb/button"

const ICON_MAP = {
  Calculator: Calculator,
  Code: Code,
  TestTube: FlaskConical,
}

export default async function Dashboard() {
  const modules = await getModules()
  return (
    <div className="flex bg-background">
      <Sidebar />
      <div className="flex-1 lg:pl-72">
        <div className="container p-6 md:p-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Welcome back, Alex!</h1>
              <p className="text-muted-foreground">Continue your learning journey where you left off.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-2xl shadow-sm">
                 <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
                 <span className="font-bold text-foreground">12 Day Streak</span>
               </div>
               <div className="flex items-center gap-1.5 px-4 py-2 bg-card border border-border rounded-2xl shadow-sm">
                 <Trophy className="h-5 w-5 text-yellow-500" />
                 <span className="font-bold text-foreground">1,240 XP</span>
               </div>
            </div>
          </div>

          {/* Subject Categories */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <BookOpen className="h-5 w-5 text-primary" />
              Subjects to Explore
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {SUBJECTS.map((subject) => {
                const Icon = ICON_MAP[subject.icon as keyof typeof ICON_MAP] || BookOpen
                return (
                  <Link key={subject.id} href={`/practice?subject=${subject.id}`}>
                    <Card className="h-full border border-border shadow-xl shadow-primary/5 bg-card group cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                      <CardHeader>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${subject.color}`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{subject.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{subject.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center text-primary font-bold text-sm">
                        Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Featured/Recent Modules */}
          <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <Code className="h-5 w-5 text-primary" />
                  Available Modules
                </h2>
                <Link href="/practice">
                  <Button variant="ghost" size="sm" className="font-bold text-primary">View All Modules</Button>
                </Link>
            </div>
            <div className="grid gap-4">
              {modules.map((module) => (
                <Link key={module.id} href={`/module/${module.id}`}>
                    <div className="group flex items-center justify-between p-5 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/50 transition-all">
                        <div className="flex items-center gap-6">
                            <div className="hidden sm:flex w-16 h-16 rounded-xl bg-secondary items-center justify-center text-2xl font-bold text-muted-foreground">
                                {module.title.charAt(0)}
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-1 block">
                                    {module.subject}
                                </span>
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors text-foreground">{module.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-1">{module.description}</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="hidden sm:flex rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            Learn Now
                        </Button>
                        <ArrowRight className="sm:hidden h-5 w-5 text-muted-foreground" />
                    </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
