import { create } from 'zustand'

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'offline'

interface EditorStore {
  activeNoteId: string | null
  autosaveStatus: AutosaveStatus
  pendingChanges: boolean
  lastSavedAt: Date | null
  setActiveNote: (id: string | null) => void
  setAutosaveStatus: (status: AutosaveStatus) => void
  setPendingChanges: (pending: boolean) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  activeNoteId: null,
  autosaveStatus: 'idle',
  pendingChanges: false,
  lastSavedAt: null,
  setActiveNote: (id) => set({ activeNoteId: id }),
  setAutosaveStatus: (status) => set((state) => ({ 
    autosaveStatus: status,
    lastSavedAt: status === 'saved' ? new Date() : state.lastSavedAt
  })),
  setPendingChanges: (pending) => set({ pendingChanges: pending }),
}))
