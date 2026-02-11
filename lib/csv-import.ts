import Papa from 'papaparse'

export interface TalentImportRow {
  email: string
  name: string
  firstName?: string
  lastName?: string
  role?: string
}

export interface ParsedTalentData {
  email: string
  firstName: string
  lastName: string
  role: string
}

export interface ImportResult {
  valid: ParsedTalentData[]
  errors: Array<{ row: number; email: string; error: string }>
}

/**
 * Parse CSV file and validate talent data
 */
export async function parseTalentCSV(file: File): Promise<ImportResult> {
  return new Promise((resolve) => {
    const text = file.text()
    text.then((content) => {
      Papa.parse<TalentImportRow>(content, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const valid: ParsedTalentData[] = []
          const errors: Array<{ row: number; email: string; error: string }> = []

          results.data.forEach((row, index) => {
            const rowNumber = index + 2 // +2 because index is 0-based and we skip header

            // Extract email
            const email = row.email?.trim().toLowerCase()
            if (!email) {
              errors.push({
                row: rowNumber,
                email: row.email || '',
                error: 'Email is required',
              })
              return
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
              errors.push({
                row: rowNumber,
                email,
                error: 'Invalid email format',
              })
              return
            }

            // Extract name
            let firstName = ''
            let lastName = ''

            if (row.name) {
              // Split full name
              const nameParts = row.name.trim().split(/\s+/)
              firstName = nameParts[0] || ''
              lastName = nameParts.slice(1).join(' ') || ''
            } else if (row.firstName || row.lastName) {
              firstName = row.firstName?.trim() || ''
              lastName = row.lastName?.trim() || ''
            }

            if (!firstName && !lastName) {
              errors.push({
                row: rowNumber,
                email,
                error: 'Name is required (use "name" or "firstName" and "lastName" columns)',
              })
              return
            }

            // Default role to TALENT if not specified
            const role = row.role?.trim().toUpperCase() || 'TALENT'

            // Validate role
            const validRoles = ['ADMIN', 'MANAGER', 'COORDINATOR', 'TALENT']
            if (!validRoles.includes(role)) {
              errors.push({
                row: rowNumber,
                email,
                error: `Invalid role: ${role}. Must be one of: ${validRoles.join(', ')}`,
              })
              return
            }

            valid.push({
              email,
              firstName,
              lastName,
              role,
            })
          })

          resolve({ valid, errors })
        },
        error: (error: Error) => {
          resolve({
            valid: [],
            errors: [{ row: 0, email: '', error: error.message || 'Failed to parse CSV' }],
          })
        },
      })
    })
  })
}

/**
 * Generate CSV template for download
 */
export function generateCSVTemplate(): string {
  const headers = ['email', 'name', 'role']
  const exampleRow = ['john.doe@example.com', 'John Doe', 'TALENT']
  
  return Papa.unparse([headers, exampleRow])
}

/**
 * Download CSV template
 */
export function downloadCSVTemplate() {
  const csv = generateCSVTemplate()
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'talent-import-template.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}
