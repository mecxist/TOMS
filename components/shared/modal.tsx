'use client'

import { X } from 'lucide-react'
import { ReactNode, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  /** 'lg' uses max-w-2xl for wider content (e.g. detail views) */
  size?: 'default' | 'lg'
}

export function Modal({ isOpen, onClose, title, children, footer, size = 'default' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300"
      style={{ opacity: isOpen ? 1 : 0 }}
      onClick={onClose}
    >
      <div
        className={`bg-surface dark:bg-dark-surface w-full rounded-xl shadow-2xl transition-transform duration-300 border border-black/5 dark:border-white/5 overflow-hidden ${size === 'lg' ? 'max-w-2xl' : 'max-w-lg'}`}
        style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
          <h3 className="text-sm font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && (
          <div className="px-6 py-4 bg-black/5 dark:bg-white/5 flex justify-end gap-3 w-full [&>*]:min-w-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
