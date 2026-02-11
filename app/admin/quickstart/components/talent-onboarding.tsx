'use client'

import { useState } from 'react'
import { Upload, X, CheckCircle2, AlertCircle, Download, Plus } from 'lucide-react'
import { parseTalentCSV, downloadCSVTemplate, type ParsedTalentData } from '@/lib/csv-import'
import { UserRole } from '@prisma/client'

interface TalentOnboardingProps {
  organizationId?: string
  onNext: (data: { invitations: Array<{ email: string; name: string; role: UserRole }> }) => void
  onBack: () => void
}

interface ManualEntry {
  email: string
  firstName: string
  lastName: string
  role: UserRole
}

export function TalentOnboarding({
  organizationId,
  onNext,
  onBack,
}: TalentOnboardingProps) {
  const [mode, setMode] = useState<'manual' | 'csv'>('manual')
  const [manualEntries, setManualEntries] = useState<ManualEntry[]>([
    { email: '', firstName: '', lastName: '', role: 'TALENT' },
  ])
  const [csvData, setCsvData] = useState<ParsedTalentData[]>([])
  const [csvErrors, setCsvErrors] = useState<Array<{ row: number; email: string; error: string }>>([])
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)

  const addManualEntry = () => {
    setManualEntries([...manualEntries, { email: '', firstName: '', lastName: '', role: 'TALENT' }])
  }

  const removeManualEntry = (index: number) => {
    setManualEntries(manualEntries.filter((_, i) => i !== index))
  }

  const updateManualEntry = (index: number, field: keyof ManualEntry, value: string | UserRole) => {
    const updated = [...manualEntries]
    updated[index] = { ...updated[index], [field]: value }
    setManualEntries(updated)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const result = await parseTalentCSV(file)
      setCsvData(result.valid)
      setCsvErrors(result.errors)
    } catch (error: any) {
      setCsvErrors([{ row: 0, email: '', error: error.message || 'Failed to parse CSV' }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setImporting(true)

    try {
      let invitations: Array<{ email: string; name: string; role: UserRole }> = []

      if (mode === 'manual') {
        // Validate manual entries
        const validEntries = manualEntries.filter(
          (entry) => entry.email && entry.firstName && entry.lastName
        )

        if (validEntries.length === 0) {
          alert('Please add at least one valid talent entry')
          setImporting(false)
          return
        }

        invitations = validEntries.map((entry) => ({
          email: entry.email,
          name: `${entry.firstName} ${entry.lastName}`,
          role: entry.role,
        }))
      } else {
        if (csvData.length === 0) {
          alert('Please import a valid CSV file')
          setImporting(false)
          return
        }

        invitations = csvData.map((data) => ({
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
          role: data.role as UserRole,
        }))
      }

      onNext({ invitations })
    } catch (error: any) {
      alert(error.message || 'Failed to process invitations')
      setImporting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
          Onboard Existing Talent
        </h2>
        <p className="text-sm text-[#666] dark:text-[#aaa] mb-6">
          Add existing talent to your organization. You can enter them manually or import from a CSV file.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]">
        <button
          type="button"
          onClick={() => setMode('manual')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            mode === 'manual'
              ? 'border-[#6366f1] text-[#6366f1]'
              : 'border-transparent text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
          }`}
        >
          Manual Entry
        </button>
        <button
          type="button"
          onClick={() => setMode('csv')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            mode === 'csv'
              ? 'border-[#6366f1] text-[#6366f1]'
              : 'border-transparent text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5]'
          }`}
        >
          CSV Import
        </button>
      </div>

      {mode === 'manual' ? (
        /* Manual Entry Form */
        <div className="space-y-4">
          {manualEntries.map((entry, index) => (
            <div
              key={index}
              className="p-4 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg bg-white dark:bg-[#1e1e1e]"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-[#666] dark:text-[#aaa]">
                  Talent #{index + 1}
                </span>
                {manualEntries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeManualEntry(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111] dark:text-[#e5e5e5] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={entry.firstName}
                    onChange={(e) => updateManualEntry(index, 'firstName', e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5]"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111] dark:text-[#e5e5e5] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={entry.lastName}
                    onChange={(e) => updateManualEntry(index, 'lastName', e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5]"
                    placeholder="Doe"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#111] dark:text-[#e5e5e5] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={entry.email}
                    onChange={(e) => updateManualEntry(index, 'email', e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5]"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#111] dark:text-[#e5e5e5] mb-1">
                    Role
                  </label>
                  <select
                    value={entry.role}
                    onChange={(e) => updateManualEntry(index, 'role', e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5]"
                  >
                    <option value="TALENT">Talent</option>
                    <option value="COORDINATOR">Coordinator</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addManualEntry}
            className="w-full px-4 py-2 border border-dashed border-[rgba(0,0,0,0.2)] dark:border-[rgba(255,255,255,0.2)] rounded-md text-[#666] dark:text-[#aaa] hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="size-4" />
            Add Another
          </button>
        </div>
      ) : (
        /* CSV Import */
        <div className="space-y-4">
          <div className="p-6 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg bg-[#f5f5f5] dark:bg-[#2a2a2a]">
            <h3 className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
              CSV Format Instructions
            </h3>
            <ul className="text-xs text-[#666] dark:text-[#aaa] space-y-1 mb-4">
              <li>• Required columns: <code className="bg-white dark:bg-[#1e1e1e] px-1 py-0.5 rounded">email</code>, <code className="bg-white dark:bg-[#1e1e1e] px-1 py-0.5 rounded">name</code></li>
              <li>• Optional columns: <code className="bg-white dark:bg-[#1e1e1e] px-1 py-0.5 rounded">firstName</code>, <code className="bg-white dark:bg-[#1e1e1e] px-1 py-0.5 rounded">lastName</code>, <code className="bg-white dark:bg-[#1e1e1e] px-1 py-0.5 rounded">role</code></li>
              <li>• Role must be one of: TALENT, COORDINATOR, MANAGER, ADMIN (defaults to TALENT)</li>
              <li>• Email addresses must be valid</li>
            </ul>
            <button
              type="button"
              onClick={downloadCSVTemplate}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md bg-white dark:bg-[#1e1e1e] text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              <Download className="size-3.5" />
              Download Template
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-2">
              Upload CSV File
            </label>
            <div className="border-2 border-dashed border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={loading}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="size-8 text-[#666] dark:text-[#aaa]" />
                <span className="text-sm text-[#666] dark:text-[#aaa]">
                  {loading ? 'Processing...' : 'Click to upload or drag and drop'}
                </span>
                <span className="text-xs text-[#999] dark:text-[#666]">CSV files only</span>
              </label>
            </div>
          </div>

          {/* CSV Preview */}
          {csvData.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">
                  {csvData.length} valid entries
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md">
                <table className="w-full text-xs">
                  <thead className="bg-[#f5f5f5] dark:bg-[#2a2a2a] sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-[#111] dark:text-[#e5e5e5]">Email</th>
                      <th className="px-3 py-2 text-left font-medium text-[#111] dark:text-[#e5e5e5]">Name</th>
                      <th className="px-3 py-2 text-left font-medium text-[#111] dark:text-[#e5e5e5]">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.map((row, index) => (
                      <tr
                        key={index}
                        className="border-t border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]"
                      >
                        <td className="px-3 py-2 text-[#666] dark:text-[#aaa]">{row.email}</td>
                        <td className="px-3 py-2 text-[#666] dark:text-[#aaa]">
                          {row.firstName} {row.lastName}
                        </td>
                        <td className="px-3 py-2 text-[#666] dark:text-[#aaa]">{row.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CSV Errors */}
          {csvErrors.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="size-4 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-[#111] dark:text-[#e5e5e5]">
                  {csvErrors.length} error(s) found
                </span>
              </div>
              <div className="max-h-32 overflow-y-auto border border-red-200 dark:border-red-800 rounded-md bg-red-50 dark:bg-red-900/20 p-3">
                <ul className="text-xs text-red-700 dark:text-red-400 space-y-1">
                  {csvErrors.map((error, index) => (
                    <li key={index}>
                      Row {error.row}: {error.email} - {error.error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] rounded-md text-[#111] dark:text-[#e5e5e5] hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={importing || (mode === 'csv' && csvData.length === 0)}
          className="px-6 py-2 bg-[#6366f1] text-white rounded-md hover:bg-[#4f46e5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {importing ? 'Sending Invitations...' : 'Send Invitations'}
        </button>
      </div>
    </form>
  )
}
