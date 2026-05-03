import { Module, MOCK_MODULES } from "./data"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api"

export async function getModules(): Promise<Module[]> {
  try {
    const response = await fetch(`${API_BASE}/modules`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!response.ok) {
      console.warn("API not available, using mock data")
      return MOCK_MODULES
    }
    
    const result = await response.json()
    return result.data || result
  } catch (error) {
    console.warn("Failed to fetch modules, using mock data:", error)
    return MOCK_MODULES
  }
}

export async function getModuleById(id: string): Promise<Module | null> {
  try {
    const response = await fetch(`${API_BASE}/modules/${id}`, {
      next: { revalidate: 3600 },
    })
    
    if (!response.ok) return null
    
    const result = await response.json()
    return result.data
  } catch (error) {
    console.error("Failed to fetch module:", error)
    return null
  }
}

export async function getConceptsByModule(moduleId: string) {
  try {
    const response = await fetch(`${API_BASE}/concepts/${moduleId}`)
    if (!response.ok) return []
    const result = await response.json()
    return result.data
  } catch (error) {
    return []
  }
}

export async function getPracticeByModule(moduleId: string) {
  try {
    const response = await fetch(`${API_BASE}/practice/${moduleId}`)
    if (!response.ok) return []
    const result = await response.json()
    return result.data
  } catch (error) {
    return []
  }
}
