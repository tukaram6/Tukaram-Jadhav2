import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Code, Lightbulb, Puzzle, Zap } from "lucide-react"
import { Button } from "@/components/lb/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/lb/card"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 lg:pt-32">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container relative z-10 px-4 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary border border-primary/20 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Zap className="h-4 w-4 fill-primary" />
                <span className="tracking-wide uppercase text-[10px]">Next-Gen Learning Platform</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight sm:text-7xl text-foreground leading-[1.1]">
                Master Concepts <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400 italic font-serif">by Doing</span>
              </h1>
              <p className="max-w-[550px] text-xl text-muted-foreground mx-auto lg:mx-0 leading-relaxed">
                Break through the complexity of difficult subjects with interactive simulations, hands-on practice, and real-world logic.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
                <Button size="lg" variant="premium" className="rounded-full px-10 gap-3 group text-lg" asChild>
                  <Link href="/dashboard">
                    Start Learning
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10 border-border/50 bg-background/50 backdrop-blur-md hover:bg-secondary hover:scale-[1.02] transition-all duration-300" asChild>
                  <Link href="/practice">
                    Explore Courses
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-12 pt-8">
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-black text-foreground">50+</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Concepts</span>
                </div>
                <div className="w-px h-10 bg-border/50" />
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-black text-foreground">100+</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Tasks</span>
                </div>
                <div className="w-px h-10 bg-border/50" />
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-black text-foreground">5k+</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Students</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-background/50 backdrop-blur-3xl p-3 shadow-2xl">
                <div className="overflow-hidden rounded-2xl aspect-square relative">
                  <Image
                    src="/images/hero.png"
                    alt="Interactive Learning Dashboard"
                    width={800}
                    height={800}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </div>
              
              {/* Floating UI Elements for premium feel */}
              <div className="absolute -top-8 -right-8 bg-card border border-border/50 p-4 rounded-2xl shadow-2xl animate-bounce duration-[3000ms] hidden md:block backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Code className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Code Runner</p>
                    <p className="text-[10px] text-muted-foreground">Active now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 md:px-8">
        <div className="text-center max-w-[800px] mx-auto mb-20">
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl mb-6">
            Learning that actually <span className="text-primary italic">sticks</span>.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Forget passive video watching. We focus on active engagement where you build, test, and break things to truly understand how they work.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Interactive Learning",
              description: "Engage with interactive simulations and examples that respond to your input in real-time.",
              icon: Lightbulb,
              color: "from-amber-500/20 to-amber-500/5",
              iconColor: "text-amber-500",
              shadow: "shadow-amber-500/10",
              href: "/dashboard"
            },
            {
              title: "Practice Tasks",
              description: "Apply what you've learned immediately with bite-sized tasks, puzzles, and structured quizzes.",
              icon: Puzzle,
              color: "from-blue-500/20 to-blue-500/5",
              iconColor: "text-blue-500",
              shadow: "shadow-blue-500/10",
              href: "/practice"
            },
            {
              title: "Real-world Examples",
              description: "Understand the 'why' behind concepts with real-world case studies and industry-standard projects.",
              icon: Code,
              color: "from-emerald-500/20 to-emerald-500/5",
              iconColor: "text-emerald-500",
              shadow: "shadow-emerald-500/10",
              href: "/practice"
            },
          ].map((feature, i) => (
            <Link key={i} href={feature.href} className="block group">
              <Card className={cn(
                "relative border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden h-full hover:-translate-y-2 transition-all duration-500 cursor-pointer",
                feature.shadow
              )}>
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", feature.color)} />
                <CardHeader className="relative z-10">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-background border border-border group-hover:scale-110 transition-transform duration-500", feature.iconColor)}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

      </section>

      {/* Subjects Teaser */}
      <section className="container px-4 md:px-8">
        <div className="rounded-[3rem] bg-gradient-to-br from-card to-background border border-border p-8 md:p-20 relative overflow-hidden shadow-3xl">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl font-black mb-6 leading-tight">Ready to dive in?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-[500px] mx-auto lg:mx-0">
                Choose a subject and start your journey of discovery today. Each path is curated for depth and clarity.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {["Mathematics", "Science", "Programming", "Physics", "Chemistry", "Logic"].map((tag) => (
                  <Button 
                    key={tag} 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full bg-background/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 px-5"
                    asChild
                  >
                    <Link href={`/practice?subject=${tag.toLowerCase()}`}>
                      {tag}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <Button size="lg" variant="premium" className="rounded-full px-16 h-16 text-xl font-bold shadow-2xl" asChild>
                <Link href="/dashboard">
                  Get Started for Free
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">No credit card required • Instant access</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

