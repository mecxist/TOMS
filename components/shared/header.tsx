'use client'

import { Search, Plus, Bell, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface HeaderProps {
  title?: string
  onNewClick?: () => void
}

export function Header({ title, onNewClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="bg-white dark:bg-[#1e1e1e] h-16 border-b border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] shrink-0 z-10">
      <div className="h-full px-8 flex items-center justify-between gap-8">
        {/* Left: Breadcrumb */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#999] dark:text-[#888]">TOMS</span>
          <span className="text-xs text-[#999] dark:text-[#888]">/</span>
          {title && <h1 className="text-xs text-[#111] dark:text-[#e5e5e5] font-medium">{title}</h1>}
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#999] dark:text-[#888]" />
            <input
              type="text"
              placeholder="Search candidate, id, project k"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2 bg-[#f5f5f5] dark:bg-[#2a2a2a] border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] rounded-md text-xs text-[#111] dark:text-[#e5e5e5] placeholder:text-[#999] dark:placeholder:text-[#888] focus:outline-none focus:border-[rgba(0,0,0,0.15)] dark:focus:border-[rgba(255,255,255,0.2)] transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#27272a] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded text-[10px] text-[#666] dark:text-[#aaa]">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#27272a] border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded text-[10px] text-[#666] dark:text-[#aaa]">K</kbd>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors"
            suppressHydrationWarning
          >
            {!mounted ? (
              <Moon className="size-[18px] text-[#666] dark:text-[#aaa]" />
            ) : theme === 'light' ? (
              <Moon className="size-[18px] text-[#666] dark:text-[#aaa]" />
            ) : (
              <Sun className="size-[18px] text-[#666] dark:text-[#aaa]" />
            )}
          </button>

          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors">
            <Bell className="size-[18px] text-[#666] dark:text-[#aaa]" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-[#eb3a14] rounded-full border-2 border-white dark:border-[#1e1e1e]" />
          </button>

          {/* New Candidate Button */}
          <button
            onClick={onNewClick}
            className="bg-[#111] dark:bg-white text-white dark:text-[#111] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors"
          >
            <Plus className="size-4" />
            <span className="text-xs font-medium">New Candidate</span>
          </button>
        </div>
      </div>
    </header>
  )
}
