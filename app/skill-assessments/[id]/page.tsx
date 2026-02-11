'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AppLayout } from '@/components/shared/app-layout'
import { Award, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getAssessmentModule,
  scoreAssessment,
  type AssessmentModule,
  type AssessmentQuestion,
} from '@/lib/assessment-modules'

export default function TakeAssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === 'string' ? params.id : ''
  const [module, setModule] = useState<AssessmentModule | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<{ score: number; maxScore: number; percentage: number } | null>(null)

  useEffect(() => {
    const m = getAssessmentModule(id)
    setModule(m || null)
  }, [id])

  if (module === undefined) return null
  if (module === null) {
    return (
      <AppLayout>
        <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
          <p className="text-sm text-[#666] dark:text-[#aaa]">Assessment not found.</p>
          <Button variant="link" size="sm" className="mt-2" onClick={() => router.push('/skill-assessments')}>
            <ArrowLeft className="size-3.5" />
            Back to Skill Assessments
          </Button>
        </div>
      </AppLayout>
    )
  }

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const r = scoreAssessment(module, answers)
    setResult(r)
    setSubmitted(true)
  }

  if (submitted && result) {
    return (
      <AppLayout>
        <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
          <div className="max-w-xl mx-auto">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                <CheckCircle2 className="size-8" />
              </div>
              <h2 className="text-lg font-semibold text-[#111] dark:text-[#e5e5e5] mb-2">
                Assessment complete
              </h2>
              <p className="text-sm text-[#666] dark:text-[#aaa] mb-6">
                {module.skill}
              </p>
              <div className="text-3xl font-bold text-[#111] dark:text-[#e5e5e5] mb-1">
                {result.score} / {result.maxScore}
              </div>
              <p className="text-sm text-[#666] dark:text-[#aaa] mb-8">
                {result.percentage}%
              </p>
              <Button
                variant="default"
                size="default"
                onClick={() => router.push('/skill-assessments')}
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft className="size-4" />
                Back to Skill Assessments
              </Button>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-8 bg-[#f5f5f5] dark:bg-[#2a2a2a] min-h-full">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => router.push('/skill-assessments')}
            className="inline-flex items-center gap-2 text-sm text-[#666] dark:text-[#aaa] hover:text-[#111] dark:hover:text-[#e5e5e5] mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to Skill Assessments
          </button>

          <div className="flex items-center gap-3 mb-2">
            <Award className="size-6 text-[#6366f1]" />
            <h1 className="text-xl font-semibold text-[#111] dark:text-[#e5e5e5]">{module.skill}</h1>
          </div>
          <p className="text-sm text-[#666] dark:text-[#aaa] mb-8">{module.description}</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {module.questions.map((q, index) => (
              <QuestionBlock
                key={q.id}
                question={q}
                index={index + 1}
                value={answers[q.id] ?? ''}
                onChange={(value) => updateAnswer(q.id, value)}
              />
            ))}

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="ghost" size="sm" onClick={() => router.push('/skill-assessments')}>
                Cancel
              </Button>
              <Button type="submit" variant="default" size="default">
                Submit assessment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

function QuestionBlock({
  question,
  index,
  value,
  onChange,
}: {
  question: AssessmentQuestion
  index: number
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)] p-6">
      <p className="text-xs font-medium text-[#6366f1] mb-2">Question {index}</p>
      <p className="text-sm font-medium text-[#111] dark:text-[#e5e5e5] mb-4">{question.question}</p>

      {question.type === 'multiple_choice' && question.options && (
        <ul className="space-y-2">
          {question.options.map((opt) => (
            <li key={opt}>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  value={opt}
                  checked={value === opt}
                  onChange={() => onChange(opt)}
                  className="size-4 text-[#6366f1] focus:ring-2 focus:ring-[#6366f1]"
                />
                <span className="text-sm text-[#111] dark:text-[#e5e5e5]">{opt}</span>
              </label>
            </li>
          ))}
        </ul>
      )}

      {question.type === 'short_answer' && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer..."
          rows={3}
          className="w-full rounded-lg border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-white dark:bg-[#1e1e1e] px-3 py-2 text-sm text-[#111] dark:text-[#e5e5e5] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#6366f1] resize-none"
        />
      )}
    </div>
  )
}
