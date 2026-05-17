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
  aiPanelOpen: typeof window !== 'undefined' ? localStorage.getItem('peblo_ai_panel_open') === 'true' : false,
  activeView: 'notes',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleAiPanel: () => set((state) => {
    const newState = !state.aiPanelOpen;
    if (typeof window !== 'undefined') {
      localStorage.setItem('peblo_ai_panel_open', String(newState));
    }
    return { aiPanelOpen: newState };
  }),
  setActiveView: (view) => set({ activeView: view }),
}))
