'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: string; visible: boolean } | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, visible: true })
  }, [])

  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => prev ? { ...prev, visible: false } : null)
        setTimeout(() => setToast(null), 300)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast?.visible])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 bg-surface dark:bg-dark-surface border border-black/5 dark:border-white/5 shadow-lg rounded-lg py-3 px-4 flex items-center gap-3 z-50 transition-all duration-300 ${
            toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <CheckCircle2 className="text-green-500" size={18} />
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
