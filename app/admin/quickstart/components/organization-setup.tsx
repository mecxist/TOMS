'use client'

import { useState } from 'react'
import { generateSlug } from '@/lib/organization'

interface OrganizationSetupProps {
  data?: {
    name: string
    slug: string
    domain?: string
  }
  onNext: (data: { name: string; slug: string; domain?: string }) => void
}

export function OrganizationSetup({ data, onNext }: OrganizationSetupProps) {
  const [name, setName] = useState(data?.name || '')
  const [slug, setSlug] = useState(data?.slug || '')
  const [domain, setDomain] = useState(data?.domain || '')
  const [autoSlug, setAutoSlug] = useState(true)

  const handleNameChange = (value: string) => {
    setName(value)
    if (autoSlug) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      return
    }
    onNext({ name, slug, domain: domain || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
          Organization Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          placeholder="Acme Inc."
          required
        />
        <p className="mt-1 text-xs text-[#666] dark:text-[#aaa]">
          This is your organization's display name
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
          URL Slug *
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value)
            setAutoSlug(false)
          }}
          className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          placeholder="acme-inc"
          required
          pattern="[a-z0-9-]+"
        />
        <p className="mt-1 text-xs text-[#666] dark:text-[#aaa]">
          Used in URLs: yourdomain.com/{slug}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
          Domain (Optional)
        </label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full px-4 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          placeholder="acme.com"
        />
        <p className="mt-1 text-xs text-[#666] dark:text-[#aaa]">
          If provided, users with this email domain will be automatically assigned to your organization
        </p>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors"
        >
          Continue
        </button>
      </div>
    </form>
  )
}
