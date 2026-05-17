import { create } from 'zustand'

export type ActiveView = 'notes' | 'archive' | 'shared' | 'insights' | 'settings'

interface UIStore {
  sidebarOpen: boolean
  aiPanelOpen: boolean
  activeView: ActiveView
  toggleSidebar: () => void
  toggleAiPanel: () => void
  setActiveView: (view: ActiveView) => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  aiPanelOpen: false,
  activeView: 'notes',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleAiPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
  setActiveView: (view) => set({ activeView: view }),
}))
