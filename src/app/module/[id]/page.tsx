"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, ChevronRight, Share2, Bookmark, CheckCircle, BarChart, Clock, Lightbulb } from "lucide-react"
import { Button } from "@/components/lb/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/lb/tabs"
import { Sidebar } from "@/components/sidebar"
import { MOCK_MODULES } from "@/lib/data"
import { InteractiveBox } from "@/components/interactive-box"
import { useProgressStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

import { useState } from "react"

export default function ModulePage() {
  const { id } = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("explanation")
  const module = MOCK_MODULES.find((m) => m.id === id)
  const completedModules = useProgressStore((state) => state.completedModules)
  const toggleBookmark = useProgressStore((state) => state.toggleBookmark)
  const bookmarks = useProgressStore((state) => state.bookmarks)
  const isCompleted = completedModules.includes(id as string)
  const isBookmarked = bookmarks.includes(id as string)

  if (!module) {
    return (
      <div className="container flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Module not found</h2>
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex bg-background">
      <Sidebar />
      <div className="flex-1 lg:pl-72">
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          {/* Breadcrumbs & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <button onClick={() => router.push("/dashboard")} className="hover:text-primary transition-colors cursor-pointer">Dashboard</button>
                <ChevronRight className="h-4 w-4" />
                <button onClick={() => router.push("/practice")} className="capitalize hover:text-primary transition-colors cursor-pointer">{module.subject}</button>
                <ChevronRight className="h-4 w-4 text-primary" />
                <span className="text-primary font-bold">{module.title}</span>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className={cn("rounded-full gap-2 border-border hover:bg-secondary cursor-pointer", isBookmarked && "bg-primary/10 border-primary/30 text-primary")} onClick={() => { toggleBookmark(id as string); toast.success(isBookmarked ? "Bookmark removed" : "Module saved to bookmarks!") }}>
                    <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-primary")} />
                    {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm" className="rounded-full gap-2 border-border hover:bg-secondary cursor-pointer" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied to clipboard!") }}>
                    <Share2 className="h-4 w-4" />
                    Share
                </Button>
            </div>
          </div>

          {/* Module Header */}
          <div className="relative rounded-3xl bg-card border border-border text-foreground p-8 md:p-12 mb-10 overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/30">
                        Module
                    </div>
                    {isCompleted && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Completed
                        </div>
                    )}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{module.title}</h1>
                <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-8">
                    {module.description}
                </p>
                <div className="flex flex-wrap gap-8 py-6 border-t border-border">
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Duration</p>
                            <p className="text-sm font-bold">{module.concepts.reduce((sum, c) => sum + c.readingTime, 0)} min read</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <BarChart className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Difficulty</p>
                            <p className="text-sm font-bold">Beginner</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground">XP Reward</p>
                            <p className="text-sm font-bold">50 XP</p>
                        </div>
                    </div>
                </div>
             </div>
             {/* Decorative Background */}
             <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
             <div className="absolute top-1/2 -left-10 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full" />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-secondary p-1 rounded-2xl h-auto border border-border">
              <TabsTrigger value="explanation" className="rounded-xl px-8 py-3 text-sm font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all capitalize">
                Explanation
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-xl px-8 py-3 text-sm font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all capitalize">
                Activity
              </TabsTrigger>
              <TabsTrigger value="resources" className="rounded-xl px-8 py-3 text-sm font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all capitalize">
                Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="explanation" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                      <BookOpen className="h-6 w-6 text-primary" />
                      Key Concepts
                    </h3>
                    <span className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-1.5 rounded-full border border-border">
                      {module.concepts.length} concepts • {module.concepts.reduce((sum, c) => sum + c.readingTime, 0)} min total
                    </span>
                  </div>

                  {/* Introduction */}
                  <div className="mb-10">
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                        {module.content}
                    </p>
                  </div>

                  {/* Concept Cards */}
                  <div className="space-y-8">
                    {module.concepts.map((concept, index) => (
                      <div key={index} className="group relative border border-border rounded-2xl p-6 md:p-8 bg-secondary/30 hover:border-primary/30 transition-all">
                        {/* Concept Header */}
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary font-black text-lg flex items-center justify-center">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold group-hover:text-primary transition-colors text-foreground">
                                {concept.title}
                              </h4>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground bg-card px-2.5 py-1 rounded-full border border-border flex-shrink-0">
                            <Clock className="h-3 w-3" />
                            {concept.readingTime} min
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="pl-14 space-y-5">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {concept.explanation}
                          </p>

                          {/* Example Block */}
                          {concept.example && (
                            <div className="bg-[oklch(0.05_0_0)] text-foreground rounded-xl p-5 font-mono text-sm leading-relaxed overflow-x-auto border border-border">
                              <div className="flex items-center gap-2 mb-3 text-[10px] uppercase tracking-widest text-muted-foreground font-sans font-bold">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                Example
                              </div>
                              <pre className="whitespace-pre-wrap">{concept.example}</pre>
                            </div>
                          )}

                          {/* Key Takeaway */}
                          {concept.keyTakeaway && (
                            <div className="flex items-start gap-3 p-4 bg-amber-950/30 border border-amber-900/50 rounded-xl">
                              <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Key Takeaway</p>
                                <p className="text-sm text-amber-200 font-medium">{concept.keyTakeaway}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Learning method comparison */}
                  <div className="grid gap-4 md:grid-cols-2 mt-10">
                      <div className="p-6 bg-secondary rounded-2xl border border-border">
                          <h4 className="font-bold mb-2 text-foreground">📖 Passive Learning</h4>
                          <p className="text-sm text-muted-foreground">Reading or watching videos without interaction. Retention rate: ~10-20%</p>
                      </div>
                      <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                          <h4 className="font-bold mb-2 text-primary">🚀 Active Learning</h4>
                          <p className="text-sm text-primary/80">Engaging with content through practice and application. Retention rate: ~75-90%</p>
                      </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                    <Button 
                      onClick={() => {
                        setActiveTab("activity")
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }} 
                      className="rounded-full px-8 h-12 gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        Continue to Activity
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-8">
                <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm">
                    <h3 className="text-2xl font-bold mb-4 capitalize text-foreground">{module.activity.title}</h3>
                    <p className="text-muted-foreground mb-8">
                        Now that you've learned the basics, let's put it into practice. 
                        Complete the task below to test your understanding.
                    </p>
                    <InteractiveBox 
                      moduleId={module.id}
                      type={module.activity.type}
                      task={module.activity.task}
                      correctAnswer={module.activity.correctAnswer}
                      instructions={module.activity.instructions}
                    />
                    <div className="mt-8 pt-8 border-t border-border">
                      <Button variant="outline" onClick={() => router.push('/practice')} className="rounded-full px-8 h-12 gap-2 font-bold border-border cursor-pointer">
                        <BookOpen className="h-4 w-4" />
                        Take Practice Quiz ({module.subject})
                      </Button>
                    </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 text-foreground">Additional Materials</h3>
                    <div className="grid gap-4">
                        {[
                            { name: "Concept Cheat Sheet", size: "1.2 MB", type: "PDF" },
                            { name: "Advanced Practice Problems", size: "2.4 MB", type: "PDF" },
                            { name: "External Reference Guide", size: "3.1 MB", type: "DOC" },
                        ].map((res) => (
                            <div key={res.name} className="flex items-center justify-between p-4 bg-secondary rounded-2xl hover:bg-secondary/80 transition-colors cursor-pointer group" onClick={() => toast.info(`Downloading ${res.name}...`)}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center text-xs font-bold text-primary border border-border">
                                        {res.type}
                                    </div>
                                    <div>
                                        <h4 className="font-bold group-hover:text-primary transition-colors text-foreground">{res.name}</h4>
                                        <p className="text-[10px] text-muted-foreground font-mono uppercase">{res.size}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
