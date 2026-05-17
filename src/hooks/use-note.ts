import useSWR from 'swr'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditorStore } from '@/stores/editor-store'

const fetcher = (url: string) => fetch(url).then(res => res.json())
const AUTOSAVE_DELAY = 1500
const OFFLINE_QUEUE_KEY = 'peblo_offline_queue'

export function useNote(noteId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    noteId ? `/api/notes/${noteId}` : null,
    fetcher,
    { revalidateOnFocus: false }
  )

  const note = data?.data

  const { setAutosaveStatus, pendingChanges, setPendingChanges } = useEditorStore()
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Offline sync queue
  useEffect(() => {
    if (!noteId) return;
    
    const handleOnline = async () => {
      const queueStr = localStorage.getItem(OFFLINE_QUEUE_KEY)
      const queue = queueStr ? JSON.parse(queueStr) : {}
      
      if (queue[noteId]) {
        try {
          await fetch(`/api/notes/${noteId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(queue[noteId]),
          })
          delete queue[noteId]
          localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue))
          setAutosaveStatus('saved')
          mutate()
        } catch (e) {
          setAutosaveStatus('error')
        }
      }
    }
    
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [noteId, mutate, setAutosaveStatus])

  const saveChanges = useCallback((changes: any) => {
    if (!noteId) return;
    
    if (!navigator.onLine) {
      const queueStr = localStorage.getItem(OFFLINE_QUEUE_KEY)
      const queue = queueStr ? JSON.parse(queueStr) : {}
      queue[noteId] = { ...queue[noteId], ...changes }
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue))
      setAutosaveStatus('offline')
      return
    }

    setAutosaveStatus('saving')
    
    // We use a promise here to allow synchronous flushing via sendBeacon if needed
    fetch(`/api/notes/${noteId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    })
    .then(async res => {
      if (!res.ok) throw new Error('Save failed')
      setAutosaveStatus('saved')
      setPendingChanges(false)
      
      // Mutate the SWR cache optimistically so if the user refreshes or navigates,
      // the new content is already there. We don't revalidate to avoid cursor jumps.
      mutate((currentData: any) => {
        if (!currentData) return currentData;
        return {
          ...currentData,
          data: { ...currentData.data, ...changes }
        }
      }, false)
    })
    .catch(() => {
      setAutosaveStatus('error')
    })
  }, [noteId, setAutosaveStatus, setPendingChanges, mutate])

  const handleEditorChange = useCallback((content: string, contentText: string) => {
    if (!noteId) return;
    
    setPendingChanges(true)
    
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    
    saveTimeoutRef.current = setTimeout(() => {
      saveChanges({ content, contentText })
    }, AUTOSAVE_DELAY)
    
  }, [noteId, saveChanges, setPendingChanges])
  
  // Flush pending saves on unmount or window unload
  useEffect(() => {
    const flushSave = () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
        saveTimeoutRef.current = null
        // If there are pending changes, flush them synchronously (best effort)
        if (useEditorStore.getState().pendingChanges && note) {
          const content = document.querySelector('.ProseMirror')?.innerHTML || note.content;
          const contentText = document.querySelector('.ProseMirror')?.textContent || '';
          
          // Use sendBeacon for reliable delivery during page unload
          navigator.sendBeacon(
            `/api/notes/${noteId}`, 
            JSON.stringify({ content, contentText })
          );
        }
      }
    };

    window.addEventListener('beforeunload', flushSave);
    return () => {
      window.removeEventListener('beforeunload', flushSave);
      flushSave(); // Also flush when component unmounts (e.g. switching notes)
    };
  }, [noteId, note]);

  const updateNote = useCallback((changes: any) => {
     if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
     saveChanges(changes);
  }, [saveChanges])

  return { note, error, isLoading, handleEditorChange, updateNote, mutate }
}
