"use client"

import { useState } from "react"
import { CheckCircle2, Play, RefreshCcw, Send, AlertCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/lb/button"
import { Input } from "@/components/lb/input"
import { toast } from "sonner"
import { useProgressStore } from "@/lib/store"
import { cn } from "@/lib/utils"

interface InteractiveBoxProps {
  moduleId: string
  type: 'quiz' | 'code' | 'answer'
  task: string
  correctAnswer: string
  instructions: string
}

/**
 * Normalizes a string for comparison:
 * - trims whitespace
 * - lowercases
 * - removes surrounding quotes (single or double)
 */
function normalize(s: string): string {
  let result = s.trim().toLowerCase()
  // Remove surrounding quotes
  if ((result.startsWith('"') && result.endsWith('"')) ||
      (result.startsWith("'") && result.endsWith("'"))) {
    result = result.slice(1, -1)
  }
  return result
}

/**
 * Smart answer matching that handles different input formats.
 * For code-type questions, tries multiple strategies:
 * 1. Direct match
 * 2. Extracting content from print("...") / print('...')
 * 3. Comparing just the meaningful content, ignoring wrappers
 * 4. Handling variable declarations with different quote styles
 */
function checkAnswer(userInput: string, correctAnswer: string, type: 'quiz' | 'code' | 'answer'): boolean {
  const normalizedInput = normalize(userInput)
  const normalizedCorrect = normalize(correctAnswer)

  // Strategy 1: Direct match
  if (normalizedInput === normalizedCorrect) return true

  if (type === 'code') {
    // Strategy 2: Extract content from print(...) wrapper
    // User typed: print("Hello World") → extract "Hello World"
    const printMatch = userInput.trim().match(/^print\s*\(\s*(['"])(.*?)\1\s*\)$/i)
    if (printMatch) {
      const extractedContent = printMatch[2].toLowerCase()
      if (extractedContent === normalizedCorrect) return true
    }

    // Strategy 3: Extract content from print(...) without quotes (for f-strings etc.)
    const printMatchNoQuote = userInput.trim().match(/^print\s*\(\s*(.*?)\s*\)$/i)
    if (printMatchNoQuote) {
      const inner = normalize(printMatchNoQuote[1])
      if (inner === normalizedCorrect) return true
    }

    // Strategy 4: Handle variable declarations
    // User types: const language = "JavaScript" 
    // Correct:    const language = "JavaScript"
    // Normalize by collapsing spaces and unifying quotes
    const normalizeCode = (s: string) => {
      return s.trim().toLowerCase()
        .replace(/\s+/g, ' ')          // collapse multiple spaces
        .replace(/'/g, '"')            // normalize quotes to double
        .replace(/;\s*$/, '')          // remove trailing semicolons
    }
    if (normalizeCode(userInput) === normalizeCode(correctAnswer)) return true

    // Strategy 5: Check if the correct answer is contained in the user input
    // e.g., correctAnswer = "Hello World", user typed print("Hello World")
    if (normalizedInput.includes(normalizedCorrect) && normalizedCorrect.length > 2) return true
  }

  if (type === 'answer') {
    // For math answers, try parsing as numbers
    const numInput = parseFloat(normalizedInput)
    const numCorrect = parseFloat(normalizedCorrect)
    if (!isNaN(numInput) && !isNaN(numCorrect) && numInput === numCorrect) return true

    // Handle answers with units or extra text
    // e.g., user types "5 m/s²" but correct is "5"
    if (normalizedInput.startsWith(normalizedCorrect) || normalizedCorrect.startsWith(normalizedInput)) {
      // Only if the shorter one is meaningful (at least 1 char)
      if (normalizedCorrect.length >= 1 && normalizedInput.length >= 1) return true
    }
  }

  return false
}

export function InteractiveBox({ moduleId, type, task, correctAnswer, instructions }: InteractiveBoxProps) {
  const [value, setValue] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null)
  const completeModule = useProgressStore((state) => state.completeModule)
  const addPoints = useProgressStore((state) => state.addPoints)

  // Parse quiz options from the task field (comma-separated)
  const quizOptions = type === 'quiz' ? task.split(',').map((o) => o.trim()) : []

  const handleSubmit = () => {
    const answerToCheck = type === 'quiz' ? (selectedQuizOption || '') : value
    if (!answerToCheck) return
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      const isMatch = checkAnswer(answerToCheck, correctAnswer, type)
      setIsCorrect(isMatch)
      setIsSubmitting(false)

      if (isMatch) {
        toast.success("Correct! Well done. 🎉", {
          description: "You've earned 50 XP and completed this activity.",
        })
        completeModule(moduleId)
        addPoints(50)
      } else {
        toast.error("Not quite right", {
          description: `The correct answer is: ${correctAnswer}`,
        })
      }
    }, 800)
  }

  const handleReset = () => {
    setValue("")
    setSelectedQuizOption(null)
    setIsCorrect(null)
  }

  return (
    <div className="rounded-3xl border border-border bg-secondary/30 overflow-hidden shadow-2xl shadow-primary/5">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest">Interactive Playground</span>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full cursor-pointer" onClick={handleReset}>
                <RefreshCcw className="h-4 w-4" />
            </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                <Play className="h-3.5 w-3.5 fill-primary" />
                Instructions
            </h4>
            <p className="text-muted-foreground font-medium">{instructions}</p>
        </div>

        <div className="relative group">
            {/* ═══ CODE INPUT ═══ */}
            {type === 'code' && (
                <div className="relative font-mono text-sm">
                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-secondary flex flex-col items-center py-4 text-muted-foreground select-none rounded-l-2xl">
                        <span>1</span>
                    </div>
                    <textarea 
                        className="w-full h-32 pl-14 pr-4 py-4 bg-[oklch(0.05_0_0)] text-foreground rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none border border-border"
                        value={value}
                        onChange={(e) => { setValue(e.target.value); if (isCorrect !== null) setIsCorrect(null) }}
                        placeholder={task}
                    />
                </div>
            )}

            {/* ═══ QUIZ OPTIONS (clickable buttons) ═══ */}
            {type === 'quiz' && (
                <div className="flex flex-col gap-3">
                    <div className="p-4 bg-card border border-border rounded-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-wider text-primary mb-1">Choose the correct answer</p>
                    </div>
                    {quizOptions.map((option, i) => {
                        const letter = String.fromCharCode(65 + i) // A, B, C, ...
                        const isSelected = selectedQuizOption === option
                        const isCorrectOption = isCorrect !== null && option.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
                        const isWrongSelected = isCorrect === false && isSelected

                        let optionStyle = "border-border bg-secondary/50 hover:border-primary/30 hover:bg-secondary"
                        if (isCorrect !== null) {
                            if (isCorrectOption) {
                                optionStyle = "border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/20"
                            } else if (isWrongSelected) {
                                optionStyle = "border-red-500/50 bg-red-500/10 ring-1 ring-red-500/20"
                            } else {
                                optionStyle = "border-border bg-secondary/30 opacity-50"
                            }
                        } else if (isSelected) {
                            optionStyle = "border-primary bg-primary/10 ring-2 ring-primary/20"
                        }

                        return (
                            <button
                                key={option}
                                onClick={() => { if (isCorrect === null) setSelectedQuizOption(option) }}
                                disabled={isCorrect !== null}
                                className={cn(
                                    "w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all cursor-pointer",
                                    optionStyle,
                                    isCorrect === null && "hover:scale-[1.01]"
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 transition-colors",
                                    isCorrect !== null && isCorrectOption ? "bg-emerald-500 text-white" :
                                    isWrongSelected ? "bg-red-500 text-white" :
                                    isSelected ? "bg-primary text-primary-foreground" :
                                    "bg-secondary text-muted-foreground"
                                )}>
                                    {isCorrect !== null && isCorrectOption ? <CheckCircle2 className="h-5 w-5" /> :
                                     isWrongSelected ? <AlertCircle className="h-5 w-5" /> :
                                     letter}
                                </div>
                                <span className="text-base font-medium text-foreground">{option}</span>
                            </button>
                        )
                    })}
                </div>
            )}

            {/* ═══ TEXT ANSWER INPUT ═══ */}
            {type === 'answer' && (
                <div className="relative flex flex-col gap-4">
                    <div className="p-6 bg-card border border-border rounded-2xl shadow-inner text-lg font-mono text-center text-foreground">
                        {task}
                    </div>
                    <Input 
                        className="h-14 rounded-2xl border-2 border-border focus-visible:ring-primary/30 text-lg px-6 bg-secondary text-foreground placeholder:text-muted-foreground"
                        placeholder="Your answer here..."
                        value={value}
                        onChange={(e) => { setValue(e.target.value); if (isCorrect !== null) setIsCorrect(null) }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                </div>
            )}
        </div>

        {/* ═══ Feedback & Actions ═══ */}
        <div className="mt-8 flex flex-col gap-4">
            {/* Correct / Incorrect feedback */}
            {isCorrect === true && (
                <div className="flex items-start gap-3 p-4 bg-emerald-950/30 border border-emerald-900/50 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-emerald-400">Correct! Well done! 🎉</p>
                        <p className="text-xs text-emerald-300/80 mt-1">You earned 50 XP for completing this activity.</p>
                    </div>
                </div>
            )}
            {isCorrect === false && (
                <div className="flex items-start gap-3 p-4 bg-red-950/30 border border-red-900/50 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-red-400">Not quite right</p>
                        <p className="text-xs text-red-300/80 mt-1">
                            The correct answer is: <span className="font-mono font-bold text-red-300">{correctAnswer}</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-between">
                <div>
                    {isCorrect === false && (
                        <Button 
                            variant="ghost" 
                            onClick={handleReset} 
                            className="rounded-full gap-2 text-muted-foreground cursor-pointer"
                        >
                            <RefreshCcw className="h-4 w-4" />
                            Try Again
                        </Button>
                    )}
                </div>
                <Button 
                    onClick={handleSubmit} 
                    disabled={
                        (type === 'quiz' ? !selectedQuizOption : !value) || 
                        isSubmitting || 
                        isCorrect === true
                    }
                    className={cn(
                        "rounded-full px-8 h-12 gap-2 font-bold shadow-lg shadow-primary/20 cursor-pointer",
                        isCorrect === true && "bg-emerald-600 hover:bg-emerald-700"
                    )}
                >
                    {isSubmitting ? "Checking..." : isCorrect === true ? (
                        <>
                            Completed
                            <CheckCircle2 className="h-4 w-4" />
                        </>
                    ) : (
                        <>
                            Submit Answer
                            <Send className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
