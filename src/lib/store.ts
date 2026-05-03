import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProgressState {
  completedModules: string[]
  points: number
  quizScores: Record<string, { correct: number; total: number; bestPercent: number }>
  bookmarks: string[]
  completeModule: (moduleId: string) => void
  addPoints: (points: number) => void
  saveQuizScore: (subject: string, correct: number, total: number) => void
  toggleBookmark: (moduleId: string) => void
  isBookmarked: (moduleId: string) => boolean
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedModules: [],
      points: 0,
      quizScores: {},
      bookmarks: [],
      completeModule: (moduleId) =>
        set((state) => ({
          completedModules: state.completedModules.includes(moduleId)
            ? state.completedModules
            : [...state.completedModules, moduleId],
        })),
      addPoints: (points) =>
        set((state) => ({
          points: state.points + points,
        })),
      saveQuizScore: (subject, correct, total) =>
        set((state) => {
          const prev = state.quizScores[subject]
          const percent = Math.round((correct / total) * 100)
          return {
            quizScores: {
              ...state.quizScores,
              [subject]: {
                correct,
                total,
                bestPercent: prev ? Math.max(prev.bestPercent, percent) : percent,
              },
            },
          }
        }),
      toggleBookmark: (moduleId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(moduleId)
            ? state.bookmarks.filter((id) => id !== moduleId)
            : [...state.bookmarks, moduleId],
        })),
      isBookmarked: (moduleId) => get().bookmarks.includes(moduleId),
    }),
    {
      name: 'lb-progress-storage',
    }
  )
)
