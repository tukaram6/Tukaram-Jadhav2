"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Shield, Mail, Lock, User, ArrowRight, Code, Globe } from "lucide-react"
import { Button } from "@/components/lb/button"
import { Input } from "@/components/lb/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/lb/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/lb/tabs"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { signIn as nextAuthSignIn } from "next-auth/react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Logged in successfully!")
      router.push("/dashboard")
    }, 1500)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Account created successfully!")
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20 relative overflow-hidden bg-mesh">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full animate-pulse duration-[5000ms]" />
      </div>

      <div className="w-full max-w-[450px] relative z-10">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-2xl shadow-2xl shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-8 w-8" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-foreground">LearnByDoing</span>
          </Link>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground mt-3 text-lg font-medium">Continue your journey to mastery.</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 p-1.5 bg-card/50 backdrop-blur-xl rounded-2xl h-14 border border-border/50 shadow-xl">
            <TabsTrigger value="login" className="rounded-xl font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Login</TabsTrigger>
            <TabsTrigger value="register" className="rounded-xl font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="border-border/50 shadow-3xl bg-card/60 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="space-y-2 pt-8">
                <CardTitle className="text-2xl font-black text-foreground">Account Login</CardTitle>
                <CardDescription className="text-base">Enter your details to access your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pb-8">
                <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input className="pl-12 h-14 rounded-2xl bg-background/50 border-border/50 focus:bg-background transition-all text-base" placeholder="Email address" type="email" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input className="pl-12 h-14 rounded-2xl bg-background/50 border-border/50 focus:bg-background transition-all text-base" placeholder="Password" type="password" />
                  </div>
                  <div className="flex justify-end">
                    <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
                  </div>
                </div>
                
                <Button variant="premium" className="w-full h-14 rounded-2xl text-lg font-black shadow-2xl gap-3 overflow-hidden group" onClick={handleLogin}>
                  {isLoading ? "Authenticating..." : (
                    <>
                      Sign In
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50"></span></div>
                  <span className="relative bg-transparent px-4 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mx-auto block w-fit">Or connect with</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-14 rounded-2xl gap-3 font-bold border-border/50 bg-background/30 backdrop-blur-md hover:bg-secondary transition-all" onClick={() => toast.info("GitHub integration coming soon!")}>
                    <Code className="h-5 w-5" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="h-14 rounded-2xl gap-3 font-bold border-border/50 bg-background/30 backdrop-blur-md hover:bg-secondary transition-all" onClick={() => nextAuthSignIn("google")}>
                    <Globe className="h-5 w-5 text-red-500" />
                    Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="border-border/50 shadow-3xl bg-card/60 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="space-y-2 pt-8">
                <CardTitle className="text-2xl font-black text-foreground">Create Account</CardTitle>
                <CardDescription className="text-base">Start your journey with a free account today.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pb-8">
                <div className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input className="pl-12 h-14 rounded-2xl bg-background/50 border-border/50 focus:bg-background transition-all text-base" placeholder="Full name" />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input className="pl-12 h-14 rounded-2xl bg-background/50 border-border/50 focus:bg-background transition-all text-base" placeholder="Email address" type="email" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input className="pl-12 h-14 rounded-2xl bg-background/50 border-border/50 focus:bg-background transition-all text-base" placeholder="Create password" type="password" />
                  </div>
                </div>
                
                <Button variant="premium" className="w-full h-14 rounded-2xl text-lg font-black shadow-2xl gap-3 overflow-hidden group" onClick={handleRegister}>
                  {isLoading ? "Creating..." : (
                    <>
                      Create Free Account
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground font-medium px-4">
                  By signing up, you agree to our <Link href="#" className="text-primary hover:underline font-bold">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline font-bold">Privacy Policy</Link>.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
