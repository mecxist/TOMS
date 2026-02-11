'use client'

import { AppLayout } from '@/components/shared/app-layout'
import { useState } from 'react'
import { Check, Copy, Sun, Moon } from 'lucide-react'

// Color definitions
const colors = {
  backgrounds: [
    { name: 'Background', light: '#F5F5F5', dark: '#2a2a2a', variable: 'bg-[#f5f5f5] dark:bg-[#2a2a2a]' },
    { name: 'Surface', light: '#FFFFFF', dark: '#1e1e1e', variable: 'bg-white dark:bg-[#1e1e1e]' },
    { name: 'Surface Alt', light: '#FAFAFA', dark: '#27272a', variable: 'bg-[#fafafa] dark:bg-[#27272a]' },
    { name: 'Muted', light: '#ECECF0', dark: '#27272a', variable: 'bg-[#ececf0] dark:bg-[#27272a]' },
  ],
  text: [
    { name: 'Primary', light: '#111111', dark: '#e5e5e5', variable: '--color-primary' },
    { name: 'Secondary', light: '#666666', dark: '#888888', variable: '--color-secondary' },
    { name: 'Muted', light: '#999999', dark: '#888888', variable: 'text-[#999]' },
  ],
  accent: [
    { name: 'Accent (Brand)', light: '#EB3A14', dark: '#EB3A14', variable: '--color-accent' },
  ],
  borders: [
    { name: 'Border Light', light: 'rgba(0,0,0,0.05)', dark: 'rgba(255,255,255,0.1)', variable: 'border-black/5' },
    { name: 'Border Medium', light: 'rgba(0,0,0,0.08)', dark: 'rgba(255,255,255,0.1)', variable: 'border-black/8' },
    { name: 'Border Strong', light: 'rgba(0,0,0,0.1)', dark: 'rgba(255,255,255,0.15)', variable: 'border-black/10' },
  ],
}

const gradients = [
  {
    name: 'Blue',
    gradient: 'linear-gradient(90deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)',
    usage: 'Applied stage, primary actions',
  },
  {
    name: 'Purple',
    gradient: 'linear-gradient(90deg, #c084fc 0%, #a855f7 50%, #8b5cf6 100%)',
    usage: 'Screening stage, match percentage',
  },
  {
    name: 'Purple Light',
    gradient: 'linear-gradient(90deg, #d8b4fe 0%, #c084fc 50%, #a855f7 100%)',
    usage: 'Interview stage',
  },
  {
    name: 'Green',
    gradient: 'linear-gradient(90deg, #6ee7b7 0%, #34d399 50%, #10b981 100%)',
    usage: 'Offer stage, success states',
  },
  {
    name: 'Green Light',
    gradient: 'linear-gradient(90deg, #a7f3d0 0%, #6ee7b7 50%, #34d399 100%)',
    usage: 'Hired stage, completion',
  },
  {
    name: 'Yellow/Warning',
    gradient: 'linear-gradient(90deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%)',
    usage: 'Partial allocation (80-99%)',
  },
  {
    name: 'Red/Danger',
    gradient: 'linear-gradient(90deg, #fca5a5 0%, #f87171 50%, #dc2626 100%)',
    usage: 'Full allocation (100%+)',
  },
]

const badges = [
  // Status badges
  { label: 'Approved', bgLight: '#d1fae5', bgDark: 'green-900/30', textLight: '#059669', textDark: 'green-400', category: 'Status' },
  { label: 'Pending', bgLight: '#fef3c7', bgDark: 'yellow-900/30', textLight: '#d97706', textDark: 'yellow-400', category: 'Status' },
  { label: 'Rejected', bgLight: '#fee2e2', bgDark: 'red-900/30', textLight: '#dc2626', textDark: 'red-400', category: 'Status' },
  { label: 'In Progress', bgLight: '#dbeafe', bgDark: 'blue-900/30', textLight: '#2563eb', textDark: 'blue-400', category: 'Status' },
  { label: 'Completed', bgLight: '#d1fae5', bgDark: 'green-900/30', textLight: '#059669', textDark: 'green-400', category: 'Status' },
  // Priority badges
  { label: 'High', bgLight: '#fee2e2', bgDark: 'red-900/30', textLight: '#dc2626', textDark: 'red-400', category: 'Priority' },
  { label: 'Medium', bgLight: '#fef3c7', bgDark: 'yellow-900/30', textLight: '#d97706', textDark: 'yellow-400', category: 'Priority' },
  { label: 'Low', bgLight: '#e0e7ff', bgDark: 'blue-900/30', textLight: '#6366f1', textDark: 'blue-400', category: 'Priority' },
  // Skill tags
  { label: 'React', bgLight: '#dbeafe', bgDark: 'blue-900/30', textLight: '#3b82f6', textDark: 'blue-400', category: 'Skills' },
  { label: 'TypeScript', bgLight: '#dbeafe', bgDark: 'blue-900/30', textLight: '#3b82f6', textDark: 'blue-400', category: 'Skills' },
  { label: 'Node.js', bgLight: '#d1fae5', bgDark: 'green-900/30', textLight: '#10b981', textDark: 'green-400', category: 'Skills' },
  { label: 'Figma', bgLight: '#ede9fe', bgDark: 'purple-900/30', textLight: '#8b5cf6', textDark: 'purple-400', category: 'Skills' },
  // Availability
  { label: 'Available', bgLight: '#d1fae5', bgDark: 'green-900/30', textLight: '#059669', textDark: 'green-400', category: 'Availability' },
  { label: 'Partial', bgLight: '#fef3c7', bgDark: 'yellow-900/30', textLight: '#d97706', textDark: 'yellow-400', category: 'Availability' },
  { label: 'Unavailable', bgLight: '#fee2e2', bgDark: 'red-900/30', textLight: '#dc2626', textDark: 'red-400', category: 'Availability' },
]

function ColorSwatch({ name, light, dark, variable }: { name: string; light: string; dark: string; variable: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group">
      <div className="flex gap-2 mb-2">
        <div
          className="h-12 flex-1 rounded border border-black/10 dark:border-white/10"
          style={{ backgroundColor: light }}
          title="Light mode"
        />
        <div
          className="h-12 flex-1 rounded border border-black/10 dark:border-white/10"
          style={{ backgroundColor: dark }}
          title="Dark mode"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-[#111] dark:text-[#e5e5e5]">{name}</div>
          <div className="text-[10px] text-[#666] dark:text-[#888] font-mono">{light}</div>
        </div>
        <button
          onClick={() => copyToClipboard(variable)}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-all"
        >
          {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3 text-[#666]" />}
        </button>
      </div>
    </div>
  )
}

function GradientSwatch({ name, gradient, usage }: { name: string; gradient: string; usage: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradient)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group">
      <div
        className="h-8 rounded-full mb-2"
        style={{ background: gradient }}
      />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-[#111] dark:text-[#e5e5e5]">{name}</div>
          <div className="text-[10px] text-[#666] dark:text-[#888]">{usage}</div>
        </div>
        <button
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-all"
        >
          {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3 text-[#666]" />}
        </button>
      </div>
    </div>
  )
}

export default function DesignSystemPage() {
  const badgeCategories = [...new Set(badges.map(b => b.category))]

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">Design System</h1>
            <p className="text-sm text-[#666] dark:text-[#888]">
              TOMS design tokens, components, and styling guidelines based on shadcn/ui conventions.
            </p>
          </div>

          {/* Theme Configuration */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-black/5 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-4 uppercase tracking-wide">
              Theme Configuration
            </h2>
            <div className="bg-[#1e1e1e] dark:bg-[#111] rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-[#e5e5e5]">
{`:root {
  /* Backgrounds */
  --background: #F5F5F5;
  --surface: #FFFFFF;
  --muted: #ECECF0;

  /* Text */
  --foreground: #111111;
  --muted-foreground: #666666;

  /* Accent */
  --accent: #EB3A14;

  /* Borders */
  --border: rgba(0, 0, 0, 0.05);
  --border-strong: rgba(0, 0, 0, 0.1);

  /* Radius */
  --radius: 0.25rem;
  --radius-lg: 0.5rem;
}

.dark {
  --background: #2a2a2a;
  --surface: #1e1e1e;
  --muted: #27272a;
  --foreground: #e5e5e5;
  --muted-foreground: #aaaaaa;
  --border: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.15);
}`}
              </pre>
            </div>
          </section>

          {/* Colors */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-black/5 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-6 uppercase tracking-wide">
              Color Palette
            </h2>

            <div className="space-y-8">
              {/* Backgrounds */}
              <div>
                <h3 className="text-xs font-medium text-[#666] dark:text-[#888] mb-4">Backgrounds</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {colors.backgrounds.map((color) => (
                    <ColorSwatch key={color.name} {...color} />
                  ))}
                </div>
              </div>

              {/* Text Colors */}
              <div>
                <h3 className="text-xs font-medium text-[#666] dark:text-[#888] mb-4">Text</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {colors.text.map((color) => (
                    <ColorSwatch key={color.name} {...color} />
                  ))}
                </div>
              </div>

              {/* Accent */}
              <div>
                <h3 className="text-xs font-medium text-[#666] dark:text-[#888] mb-4">Accent</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {colors.accent.map((color) => (
                    <ColorSwatch key={color.name} {...color} />
                  ))}
                </div>
              </div>

              {/* Borders */}
              <div>
                <h3 className="text-xs font-medium text-[#666] dark:text-[#888] mb-4">Borders</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {colors.borders.map((color) => (
                    <ColorSwatch key={color.name} {...color} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Gradients */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-black/5 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-6 uppercase tracking-wide">
              Progress Bar Gradients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradients.map((gradient) => (
                <GradientSwatch key={gradient.name} {...gradient} />
              ))}
            </div>

            {/* Progress Bar Examples */}
            <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10">
              <h3 className="text-xs font-medium text-[#666] dark:text-[#888] mb-4">Usage Examples</h3>
              <div className="space-y-4">
                {gradients.slice(0, 5).map((gradient, index) => (
                  <div key={gradient.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#111] dark:text-[#e5e5e5]">{gradient.name}</span>
                      <span className="text-xs text-[#666] dark:text-[#888]">{100 - index * 15}%</span>
                    </div>
                    <div className="h-2 bg-[#ececf0] dark:bg-[#27272a] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${100 - index * 15}%`,
                          background: gradient.gradient,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Badges */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-black/5 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-6 uppercase tracking-wide">
              Badges & Tags
            </h2>

            <div className="space-y-6">
              {badgeCategories.map((category) => (
                <div key={category}>
                  <h3 className="text-xs font-medium text-[#666] dark:text-[#888] mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {badges
                      .filter((badge) => badge.category === category)
                      .map((badge) => (
                        <span
                          key={badge.label}
                          className="px-2 py-1 rounded text-[10px] font-medium"
                          style={{
                            backgroundColor: badge.bgLight,
                            color: badge.textLight,
                          }}
                        >
                          {badge.label}
                        </span>
                      ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 p-3 bg-[#1e1e1e] rounded">
                    {badges
                      .filter((badge) => badge.category === category)
                      .map((badge) => (
                        <span
                          key={badge.label + '-dark'}
                          className={`px-2 py-1 rounded text-[10px] font-medium bg-${badge.bgDark} text-${badge.textDark}`}
                          style={{
                            backgroundColor: badge.bgDark.includes('/')
                              ? `rgba(${badge.textLight === '#059669' || badge.textLight === '#10b981' ? '34, 197, 94' : badge.textLight === '#d97706' ? '245, 158, 11' : badge.textLight === '#dc2626' ? '220, 38, 38' : badge.textLight === '#2563eb' || badge.textLight === '#3b82f6' ? '59, 130, 246' : badge.textLight === '#6366f1' ? '99, 102, 241' : '139, 92, 246'}, 0.2)`
                              : badge.bgDark,
                            color: badge.textLight === '#059669' || badge.textLight === '#10b981' ? '#4ade80' :
                                   badge.textLight === '#d97706' ? '#fbbf24' :
                                   badge.textLight === '#dc2626' ? '#f87171' :
                                   badge.textLight === '#2563eb' || badge.textLight === '#3b82f6' ? '#60a5fa' :
                                   badge.textLight === '#6366f1' ? '#818cf8' : '#c084fc',
                          }}
                        >
                          {badge.label}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-black/5 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-6 uppercase tracking-wide">
              Typography
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-semibold text-[#111] dark:text-[#e5e5e5]">Heading 1</span>
                  <span className="text-xs text-[#666] dark:text-[#888] font-mono">text-2xl font-semibold</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-xl font-semibold text-[#111] dark:text-[#e5e5e5]">Heading 2</span>
                  <span className="text-xs text-[#666] dark:text-[#888] font-mono">text-xl font-semibold</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5]">Heading 3</span>
                  <span className="text-xs text-[#666] dark:text-[#888] font-mono">text-lg font-semibold</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-base font-medium text-[#111] dark:text-[#e5e5e5]">Heading 4</span>
                  <span className="text-xs text-[#666] dark:text-[#888] font-mono">text-base font-medium</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-[#111] dark:text-[#e5e5e5]">Body Text</span>
                  <span className="text-xs text-[#666] dark:text-[#888] font-mono">text-sm</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-[#666] dark:text-[#888]">Small Text</span>
                  <span className="text-xs text-[#666] dark:text-[#888] font-mono">text-xs text-[#666]</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] text-[#666] dark:text-[#888] uppercase tracking-wide font-medium">Label</span>
                  <span className="text-xs text-[#666] dark:text-[#888] font-mono">text-[10px] uppercase tracking-wide</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-[#666] dark:text-[#888]">Monospace</span>
                  <span className="text-xs text-[#666] dark:text-[#888] font-mono">font-mono (JetBrains Mono)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-black/5 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-6 uppercase tracking-wide">
              Buttons
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-medium text-[#666] dark:text-[#888] mb-3">Primary</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-[#111] dark:bg-white text-white dark:text-[#111] px-4 py-2 rounded text-xs font-medium hover:bg-[#222] dark:hover:bg-[#e5e5e5] transition-colors">
                    Primary Button
                  </button>
                  <button className="bg-[#eb3a14] text-white px-4 py-2 rounded text-xs font-medium hover:bg-[#d63512] transition-colors">
                    Accent Button
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-[#666] dark:text-[#888] mb-3">Secondary</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded text-xs font-medium text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    Secondary Button
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-[#1e1e1e] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] rounded text-xs font-medium text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] transition-colors">
                    Ghost Button
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-[#666] dark:text-[#888] mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="bg-[#111] dark:bg-white text-white dark:text-[#111] px-3 py-1.5 rounded text-[10px] font-medium">
                    Small
                  </button>
                  <button className="bg-[#111] dark:bg-white text-white dark:text-[#111] px-4 py-2 rounded text-xs font-medium">
                    Medium
                  </button>
                  <button className="bg-[#111] dark:bg-white text-white dark:text-[#111] px-6 py-2.5 rounded text-sm font-medium">
                    Large
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Cards */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-black/5 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-6 uppercase tracking-wide">
              Cards
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pipeline Card */}
              <div className="p-3 bg-white dark:bg-[#1e1e1e] border border-black/5 dark:border-white/5 rounded shadow-sm hover:border-[#eb3a14]/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[10px] text-[#111] dark:text-[#e5e5e5] opacity-70">DEV-2025-01</span>
                  <span className="text-[10px] border border-black/10 dark:border-white/10 px-1 rounded text-[#111] dark:text-[#e5e5e5] opacity-70">2m ago</span>
                </div>
                <h4 className="text-sm font-medium mb-1 text-[#111] dark:text-[#e5e5e5]">Alex K.</h4>
                <p className="text-xs text-[#111] dark:text-[#e5e5e5] opacity-80 mb-3">Senior Frontend Engineer</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-mono bg-[#ececf0] dark:bg-white/10 px-1.5 py-0.5 rounded text-[#111] dark:text-[#e5e5e5]">React</span>
                  <span className="text-[10px] font-mono bg-[#ececf0] dark:bg-white/10 px-1.5 py-0.5 rounded text-[#111] dark:text-[#e5e5e5]">Node</span>
                </div>
              </div>

              {/* Card with accent border */}
              <div className="p-3 bg-white dark:bg-[#1e1e1e] border-l-2 border-l-[#eb3a14] border-y border-r border-black/5 dark:border-y-white/5 dark:border-r-white/5 rounded shadow-sm">
                <h4 className="text-sm font-medium mb-1 text-[#111] dark:text-[#e5e5e5]">Marcus T.</h4>
                <p className="text-xs text-[#111] dark:text-[#e5e5e5] opacity-80 mb-3">Backend Architect</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-xs bg-black text-white dark:bg-white dark:text-black rounded hover:bg-[#eb3a14] transition-colors">Accept</button>
                  <button className="flex-1 py-1.5 text-xs border border-black/10 dark:border-white/10 rounded hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors text-[#111] dark:text-[#e5e5e5]">Reject</button>
                </div>
              </div>

              {/* Stats card */}
              <div className="p-4 border border-black/5 dark:border-white/5 rounded bg-white dark:bg-[#1e1e1e]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#111] dark:text-[#e5e5e5]">Total Applied</span>
                  <span className="text-[#eb3a14]">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                </div>
                <div className="text-2xl font-medium tracking-tight text-[#111] dark:text-[#e5e5e5]">1,248</div>
                <div className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                  +12% this week
                </div>
              </div>
            </div>
          </section>

          {/* Form Elements */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-black/5 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-6 uppercase tracking-wide">
              Form Elements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#666] dark:text-[#888] mb-2 block">Text Input</label>
                  <input
                    type="text"
                    placeholder="Enter text..."
                    className="w-full px-3 py-2 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] rounded-lg text-sm text-[#111] dark:text-[#e5e5e5] placeholder-[#999] dark:placeholder-[#888] focus:outline-none focus:border-[#6366f1]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#666] dark:text-[#888] mb-2 block">Textarea</label>
                  <textarea
                    placeholder="Enter description..."
                    className="w-full min-h-[80px] px-3 py-2 bg-[#ececf0] dark:bg-[#27272a] rounded border-none outline-none text-sm text-[#111] dark:text-[#e5e5e5] placeholder-[#999] dark:placeholder-[#888] resize-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#666] dark:text-[#888] mb-2 block">Checkbox</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0" />
                      <span className="text-sm text-[#111] dark:text-[#e5e5e5]">Option 1</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="size-4 rounded border-[rgba(0,0,0,0.15)] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0" />
                      <span className="text-sm text-[#111] dark:text-[#e5e5e5]">Option 2 (checked)</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#666] dark:text-[#888] mb-2 block">Radio</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="radio" className="size-4" defaultChecked />
                      <span className="text-sm text-[#111] dark:text-[#e5e5e5]">Selected</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="radio" className="size-4" />
                      <span className="text-sm text-[#111] dark:text-[#e5e5e5]">Unselected</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Spacing & Border Radius */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-black/5 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-[#111] dark:text-[#e5e5e5] mb-6 uppercase tracking-wide">
              Border Radius
            </h2>

            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="size-16 bg-[#111] dark:bg-white rounded mb-2" />
                <span className="text-xs text-[#666] dark:text-[#888] font-mono">rounded</span>
              </div>
              <div className="text-center">
                <div className="size-16 bg-[#111] dark:bg-white rounded-lg mb-2" />
                <span className="text-xs text-[#666] dark:text-[#888] font-mono">rounded-lg</span>
              </div>
              <div className="text-center">
                <div className="size-16 bg-[#111] dark:bg-white rounded-xl mb-2" />
                <span className="text-xs text-[#666] dark:text-[#888] font-mono">rounded-xl</span>
              </div>
              <div className="text-center">
                <div className="size-16 bg-[#111] dark:bg-white rounded-full mb-2" />
                <span className="text-xs text-[#666] dark:text-[#888] font-mono">rounded-full</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  )
}
