'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    const currentTheme = resolvedTheme || theme
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="h-10 w-10 rounded-xl text-slate-400 hover:bg-white/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
        disabled
      >
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  const isDark = (resolvedTheme || theme) === 'dark'

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="h-10 w-10 rounded-xl text-slate-400 hover:bg-white/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors relative"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
      <Moon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
    </button>
  )
}
