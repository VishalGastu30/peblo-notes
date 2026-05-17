import { useState } from 'react'

export type AiState = 'idle' | 'generating' | 'completed' | 'error'

export interface AiActionResult {
  summary?: string
  actionItems?: string[]
  suggestedTitle?: string
  alternatives?: string[]
  tokensUsed?: number
  actionId?: string
}

export function useAiAction(noteId: string | null) {
  const [state, setState] = useState<AiState>('idle')
  const [result, setResult] = useState<AiActionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generate = async (type: 'summary' | 'actions' | 'title') => {
    if (!noteId) return;
    
    setState('generating')
    setError(null)
    
    try {
      const endpoint = {
        summary: 'generate-summary',
        actions: 'extract-actions',
        title: 'suggest-title',
      }[type]
      
      const res = await fetch(`/api/notes/${noteId}/${endpoint}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error?.message || 'AI generation failed.')
      }
      
      setResult(data.data)
      setState('completed')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'AI generation failed.')
      setState('error')
    }
  }

  const reset = () => { 
    setState('idle') 
    setResult(null) 
    setError(null) 
  }
  
  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return { state, result, error, generate, reset, copy }
}
