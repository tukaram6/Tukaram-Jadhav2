"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/lb/button"
import { CheckCircle2, XCircle, Trophy, ArrowRight, ArrowLeft, BookOpen, Search, Filter, Timer, Lightbulb, RotateCcw, Flame, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { PRACTICE_QUESTIONS, getQuestionsBySubject } from "@/lib/questions"
import { useProgressStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

type SubjectFilter = 'all' | 'math' | 'science' | 'programming'

export default function PracticePage() {
  const router = useRouter()
  const [activeSubject, setActiveSubject] = useState<SubjectFilter>('all')
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [effectIntensity, setEffectIntensity] = useState(1)
  const addPoints = useProgressStore((state) => state.addPoints)

  const questions = useMemo(() => {
    if (activeSubject === 'all') return PRACTICE_QUESTIONS
    return getQuestionsBySubject(activeSubject)
  }, [activeSubject])

  const currentQuestion = questions[currentIndex]

  const subjectLabels: Record<string, string> = {
    all: 'All Subjects',
    math: 'Mathematics',
    science: 'Science',
    programming: 'Programming',
  }

  const subjectColors: Record<string, string> = {
    math: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    science: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    programming: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  }

  const difficultyColors: Record<string, string> = {
    easy: 'text-emerald-400 bg-emerald-500/10',
    medium: 'text-amber-400 bg-amber-500/10',
    hard: 'text-red-400 bg-red-500/10',
  }

  const handleStartQuiz = (subject: SubjectFilter) => {
    setActiveSubject(subject)
    setQuizStarted(true)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowHint(false)
    setCorrectCount(0)
    setAnsweredCount(0)
    setQuizFinished(false)
  }

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return
    setSelectedAnswer(option)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return
    setIsAnswered(true)
    setAnsweredCount((c) => c + 1)

    const isCorrect = selectedAnswer === currentQuestion.answer
    if (isCorrect) {
      setCorrectCount((c) => c + 1)
      addPoints(10)
      toast.success("Correct! +10 XP", { duration: 2000 })
    } else {
      toast.error(`Incorrect. The answer was: ${currentQuestion.answer}`, { duration: 3000 })
    }
  }

  const handleNextQuestion = () => {
    if (currentIndex >= questions.length - 1) {
      setQuizFinished(true)
      return
    }
    setCurrentIndex((i) => i + 1)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowHint(false)
  }

  const handleRestartQuiz = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowHint(false)
    setCorrectCount(0)
    setAnsweredCount(0)
    setQuizFinished(false)
  }

  const scorePercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0

  // ──── Results Screen ────
  if (quizFinished) {
    return (
      <div className="flex bg-background min-h-screen">
        <Sidebar />
        <div className="flex-1 lg:pl-72">
          <div className="container max-w-2xl mx-auto p-6 md:p-10 flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="w-full p-10 md:p-14 bg-card border border-border rounded-[3rem] shadow-2xl shadow-primary/5 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-4xl font-black mb-2 text-foreground">Quiz Complete!</h2>
              <p className="text-muted-foreground text-lg mb-10">
                {subjectLabels[activeSubject]} — {answeredCount} Questions
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="p-5 bg-secondary rounded-3xl border border-border">
                  <p className="text-3xl font-black text-primary mb-1">{scorePercent}%</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Accuracy</p>
                </div>
                <div className="p-5 bg-secondary rounded-3xl border border-border">
                  <p className="text-3xl font-black text-emerald-400 mb-1">{correctCount}</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Correct</p>
                </div>
                <div className="p-5 bg-secondary rounded-3xl border border-border">
                  <p className="text-3xl font-black text-primary mb-1">+{correctCount * 10}</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase">XP Earned</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={handleRestartQuiz} className="rounded-full h-14 text-lg font-bold cursor-pointer gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Retake Quiz
                </Button>
                <Button variant="outline" onClick={() => { setQuizStarted(false); setQuizFinished(false) }} className="rounded-full h-14 text-lg font-bold cursor-pointer border-border">
                  Choose Another Subject
                </Button>
                <Button variant="ghost" onClick={() => router.push("/dashboard")} className="rounded-full h-14 text-lg font-bold text-muted-foreground cursor-pointer">
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ──── Quiz In Progress ────
  if (quizStarted && currentQuestion) {
    return (
      <div className="flex bg-background min-h-screen">
        <Sidebar />
        <div className="flex-1 lg:pl-72">
          <div className="container max-w-3xl mx-auto p-6 md:p-10">
            {/* Quiz Header */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => { setQuizStarted(false); setQuizFinished(false) }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Exit Quiz</span>
              </button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {correctCount}/{answeredCount}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20">
                  <Flame className="h-3.5 w-3.5" />
                  {correctCount * 10} XP
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-2">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span className={cn("px-2 py-0.5 rounded-full text-[10px] uppercase", difficultyColors[currentQuestion.difficulty])}>
                  {currentQuestion.difficulty}
                </span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Effects Slider */}
            <div className="flex items-center gap-4 mb-8 bg-secondary/50 px-4 py-3 rounded-2xl border border-border">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Effects</span>
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1" 
                value={effectIntensity} 
                onChange={(e) => setEffectIntensity(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-background rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs font-bold text-primary w-8 text-right">{effectIntensity.toFixed(1)}x</span>
            </div>

            {/* Question Card Stack */}
            <div className="relative grid w-full mb-6 perspective-1000" style={{ gridTemplateAreas: '"stack"' }}>
              <AnimatePresence mode="popLayout">
                {questions.slice(currentIndex, currentIndex + 3).reverse().map((q) => {
                  const qIndex = questions.indexOf(q)
                  const isTop = qIndex === currentIndex
                  const offset = qIndex - currentIndex

                  return (
                    <motion.div
                      key={q.id}
                      style={{ gridArea: 'stack' }}
                      initial={{ scale: 0.8, opacity: 0, y: 100 * effectIntensity, rotate: (offset % 2 === 0 ? -2 : 2) * effectIntensity }}
                      animate={{ 
                        scale: 1 - offset * 0.05, 
                        y: offset * 22,
                        opacity: 1 - offset * 0.15,
                        rotate: isTop ? 0 : (offset % 2 === 0 ? -2 : 2) * effectIntensity,
                        zIndex: 10 - offset 
                      }}
                      exit={{ x: -500 - 300 * effectIntensity, opacity: 0, rotate: -45 * effectIntensity, scale: 0.8, transition: { duration: 0.4, ease: "easeOut" } }}
                      transition={{ type: "spring", stiffness: 150 + 150 * effectIntensity, damping: 30 - 8 * effectIntensity }}
                      drag={isTop ? "x" : false}
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.7 * Math.min(1, effectIntensity + 0.2)}
                      onDragEnd={(e, info) => {
                        // Swipe to skip if not answered, or next if answered
                        if (isTop && (info.offset.x > 120 || info.offset.x < -120)) {
                          if (isAnswered) {
                            handleNextQuestion()
                          } else {
                            toast("Question skipped!")
                            handleNextQuestion()
                          }
                        }
                      }}
                      whileDrag={{ scale: 1 + 0.04 * effectIntensity, rotate: 3 * effectIntensity, cursor: "grabbing", boxShadow: effectIntensity > 0 ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "none" }}
                      className={cn(
                        "bg-card border border-border rounded-3xl p-8 md:p-10 shadow-2xl",
                        !isTop && "pointer-events-none",
                        isTop && isAnswered && selectedAnswer === q.answer && "shadow-emerald-500/20 border-emerald-500/30",
                        isTop && isAnswered && selectedAnswer !== q.answer && "shadow-red-500/20 border-red-500/30",
                        !isAnswered && "shadow-primary/10"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase border", subjectColors[q.subject])}>
                          {q.subject}
                        </span>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 leading-relaxed whitespace-pre-line">
                        {q.question}
                      </h2>

                      {/* Options */}
                      <div className="grid gap-3">
                        {q.options.map((option, i) => {
                          const letter = String.fromCharCode(65 + i)
                          const isSelected = isTop ? selectedAnswer === option : false
                          const isCorrectAnswer = option === q.answer
                          
                          let optionStyle = "border-border bg-secondary/50 hover:border-primary/30 hover:bg-secondary"
                          if (isTop && isAnswered) {
                            if (isCorrectAnswer) {
                              optionStyle = "border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/20"
                            } else if (isSelected && !isCorrectAnswer) {
                              optionStyle = "border-red-500/50 bg-red-500/10 ring-1 ring-red-500/20"
                            } else {
                              optionStyle = "border-border bg-secondary/30 opacity-50"
                            }
                          } else if (isSelected) {
                            optionStyle = "border-primary bg-primary/10 ring-2 ring-primary/20"
                          }

                          return (
                            <motion.button
                              key={option}
                              whileHover={isTop && !isAnswered && effectIntensity > 0 ? { scale: 1 + 0.015 * effectIntensity, x: 4 * effectIntensity } : {}}
                              whileTap={isTop && !isAnswered && effectIntensity > 0 ? { scale: 1 - 0.02 * effectIntensity } : {}}
                              onClick={() => isTop && handleSelectAnswer(option)}
                              disabled={!isTop || isAnswered}
                              className={cn(
                                "w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl border text-left transition-colors cursor-pointer",
                                optionStyle
                              )}
                            >
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 transition-all duration-300",
                                isTop && isAnswered && isCorrectAnswer ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/40" :
                                isTop && isAnswered && isSelected && !isCorrectAnswer ? "bg-red-500 text-white scale-110 shadow-lg shadow-red-500/40" :
                                isSelected ? "bg-primary text-primary-foreground scale-110 shadow-md shadow-primary/30" :
                                "bg-secondary text-muted-foreground"
                              )}>
                                {isTop && isAnswered && isCorrectAnswer ? <CheckCircle2 className="h-5 w-5" /> :
                                 isTop && isAnswered && isSelected && !isCorrectAnswer ? <XCircle className="h-5 w-5" /> :
                                 letter}
                              </div>
                              <span className={cn(
                                "text-sm md:text-base font-medium transition-colors",
                                isSelected ? "text-foreground" : "text-foreground/80"
                              )}>{option}</span>
                            </motion.button>
                          )
                        })}
                      </div>

                      {/* Hint */}
                      {isTop && showHint && !isAnswered && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, height: 0 }} 
                          animate={{ opacity: 1, y: 0, height: "auto" }} 
                          className="mt-6 p-4 bg-amber-950/30 border border-amber-900/50 rounded-xl overflow-hidden"
                        >
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Hint</p>
                              <p className="text-sm text-amber-200 font-medium">{q.hint}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Correct answer explanation after answering */}
                      {isTop && isAnswered && selectedAnswer !== q.answer && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, height: 0 }} 
                          animate={{ opacity: 1, y: 0, height: "auto" }} 
                          className="mt-6 p-4 bg-emerald-950/30 border border-emerald-900/50 rounded-xl overflow-hidden"
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Explanation</p>
                              <p className="text-sm text-emerald-200 font-medium">{q.hint}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              {!isAnswered ? (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowHint(!showHint)} 
                    className="rounded-full gap-2 text-muted-foreground cursor-pointer"
                  >
                    <Lightbulb className="h-4 w-4" />
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </Button>
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="rounded-full px-8 h-12 gap-2 font-bold shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    Submit Answer
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div />
                  <motion.div whileHover={effectIntensity > 0 ? { scale: 1 + 0.05 * effectIntensity } : {}} whileTap={effectIntensity > 0 ? { scale: 1 - 0.05 * effectIntensity } : {}}>
                    <Button
                      onClick={handleNextQuestion}
                      className="rounded-full px-8 h-12 gap-2 font-bold shadow-lg shadow-primary/20 cursor-pointer"
                    >
                      {currentIndex >= questions.length - 1 ? 'See Results' : 'Next Question'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ──── Subject Selection / Landing ────
  const subjectCards = [
    { id: 'math' as const, title: 'Mathematics', icon: '📐', count: getQuestionsBySubject('math').length, color: 'from-blue-600/20 to-blue-500/5 border-blue-500/20', accent: 'text-blue-400' },
    { id: 'science' as const, title: 'Science', icon: '🔬', count: getQuestionsBySubject('science').length, color: 'from-emerald-600/20 to-emerald-500/5 border-emerald-500/20', accent: 'text-emerald-400' },
    { id: 'programming' as const, title: 'Programming', icon: '💻', count: getQuestionsBySubject('programming').length, color: 'from-purple-600/20 to-purple-500/5 border-purple-500/20', accent: 'text-purple-400' },
  ]

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-72">
        <div className="container max-w-5xl mx-auto p-6 md:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Practice Playground</h1>
              <p className="text-muted-foreground">Choose a subject and test your knowledge with {PRACTICE_QUESTIONS.length} questions.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-2xl shadow-sm">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">{PRACTICE_QUESTIONS.length} Questions</span>
            </div>
          </div>

          {/* Quick-start: All Subjects */}
          <section className="bg-primary/5 border border-primary/10 rounded-3xl p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter mb-2">
                  <Timer className="h-4 w-4" />
                  Full Challenge
                </div>
                <h2 className="text-2xl font-bold mb-3 text-foreground">Mixed Subject Challenge</h2>
                <p className="text-muted-foreground mb-6">
                  Answer all {PRACTICE_QUESTIONS.length} questions across Math, Science, and Programming. 
                  Earn 10 XP per correct answer!
                </p>
                <Button
                  className="rounded-full px-8 h-12 shadow-lg shadow-primary/20 font-bold cursor-pointer gap-2"
                  onClick={() => handleStartQuiz('all')}
                >
                  Start Full Challenge
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="hidden md:flex w-40 h-40 rounded-full bg-card border-8 border-primary/10 items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-black text-primary">{PRACTICE_QUESTIONS.length}</p>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Questions</p>
                </div>
              </div>
            </div>
          </section>

          {/* Subject Cards */}
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-foreground">
            <BookOpen className="h-5 w-5 text-primary" />
            Choose a Subject
          </h2>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {subjectCards.map((subject) => (
              <button
                key={subject.id}
                onClick={() => handleStartQuiz(subject.id)}
                className={cn(
                  "group p-8 rounded-3xl border bg-gradient-to-br text-left transition-all hover:scale-[1.02] cursor-pointer",
                  subject.color
                )}
              >
                <div className="text-4xl mb-4">{subject.icon}</div>
                <h3 className={cn("text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors")}>
                  {subject.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {subject.count} practice questions
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  Start Quiz
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* All Questions Overview */}
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-foreground">
            <Flame className="h-5 w-5 text-primary" />
            Question Bank Preview
          </h2>

          <div className="grid gap-3">
            {PRACTICE_QUESTIONS.slice(0, 6).map((q) => (
              <div key={q.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-black text-sm flex items-center justify-center flex-shrink-0">
                    Q{q.questionNumber}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground line-clamp-1">{q.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border", subjectColors[q.subject])}>
                        {q.subject}
                      </span>
                      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", difficultyColors[q.difficulty])}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
            <button
              onClick={() => handleStartQuiz('all')}
              className="p-4 text-center text-primary font-bold text-sm border border-dashed border-primary/30 rounded-2xl hover:bg-primary/5 transition-colors cursor-pointer"
            >
              View all {PRACTICE_QUESTIONS.length} questions →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
