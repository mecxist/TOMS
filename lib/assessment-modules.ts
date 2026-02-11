/**
 * Skill assessment module definitions: questions and scoring for each assessment.
 * Used by the talent "take assessment" flow.
 */

export type QuestionType = 'multiple_choice' | 'short_answer'

export interface AssessmentQuestion {
  id: string
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer?: string
  /** For short_answer, optional hint or accepted variants (demo: exact match or contains) */
  acceptedAnswers?: string[]
}

export interface AssessmentModule {
  id: string
  skill: string
  description: string
  maxScore: number
  questions: AssessmentQuestion[]
}

export const assessmentModules: AssessmentModule[] = [
  {
    id: 'sa1',
    skill: 'React',
    description: 'Assess your knowledge of React fundamentals, hooks, and patterns.',
    maxScore: 100,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'What is the correct way to create a state variable that triggers a re-render when updated?',
        options: ['useVariable()', 'useState()', 'setState()', 'createState()'],
        correctAnswer: 'useState()',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'Which hook should you use to perform side effects (e.g. data fetching) after render?',
        options: ['useEffect()', 'useLayout()', 'useSideEffect()', 'useRender()'],
        correctAnswer: 'useEffect()',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        question: 'In React, what is the recommended way to pass data from parent to child?',
        options: ['Global variables', 'Props', 'Context only', 'Refs'],
        correctAnswer: 'Props',
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        question: 'What does the key prop help React identify?',
        options: ['Which component to unmount', 'Which items have changed in a list', 'The primary button', 'The main layout'],
        correctAnswer: 'Which items have changed in a list',
      },
      {
        id: 'q5',
        type: 'short_answer',
        question: 'Name the React hook used to memoize a computed value so it is only recalculated when its dependencies change.',
        acceptedAnswers: ['useMemo', 'use memo'],
      },
    ],
  },
  {
    id: 'sa2',
    skill: 'TypeScript',
    description: 'Assess your understanding of TypeScript types, interfaces, and best practices.',
    maxScore: 100,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'Which keyword is used to define a type that cannot be changed after creation?',
        options: ['const', 'readonly', 'final', 'fixed'],
        correctAnswer: 'readonly',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'What is the TypeScript type for a function that returns a Promise of a number?',
        options: ['Promise<number>', 'Async<number>', 'Future<number>', 'NumberPromise'],
        correctAnswer: 'Promise<number>',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        question: 'How do you make a property optional in an interface?',
        options: ['Use the optional keyword', 'Add a ? after the property name', 'Wrap it in Optional<>', 'Use undefined type'],
        correctAnswer: 'Add a ? after the property name',
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        question: 'Which utility type creates a new type with all properties of T set to optional?',
        options: ['Partial<T>', 'Optional<T>', 'Pick<T>', 'Required<T>'],
        correctAnswer: 'Partial<T>',
      },
      {
        id: 'q5',
        type: 'short_answer',
        question: 'What keyword do you use in TypeScript to narrow the type of a variable (e.g. after a runtime check)?',
        acceptedAnswers: ['type guard', 'typeof', 'instanceof', 'assert', 'narrow'],
      },
    ],
  },
  {
    id: 'sa3',
    skill: 'Node.js',
    description: 'Assess your knowledge of Node.js, the event loop, and common APIs.',
    maxScore: 100,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'Which global object in Node.js is used to include modules from external files?',
        options: ['import', 'require', 'include', 'load'],
        correctAnswer: 'require',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'What does the fs module stand for?',
        options: ['File stream', 'File system', 'Fast sync', 'Function set'],
        correctAnswer: 'File system',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        question: 'Which method is used to schedule a callback to run after the current event loop turn?',
        options: ['setTimeout', 'setImmediate', 'process.nextTick', 'queueMicrotask'],
        correctAnswer: 'process.nextTick',
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        question: 'In Node.js, what is the default value of this in a module?',
        options: ['window', 'global', 'module.exports', 'undefined'],
        correctAnswer: 'module.exports',
      },
      {
        id: 'q5',
        type: 'short_answer',
        question: 'Name the built-in Node.js module used to work with file and directory paths in a cross-platform way.',
        acceptedAnswers: ['path', 'path module'],
      },
    ],
  },
  {
    id: 'sa4',
    skill: 'Communication',
    description: 'Assess written communication and professional collaboration.',
    maxScore: 100,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'When writing a status update to a stakeholder, what should you lead with?',
        options: ['The full history', 'The main outcome or ask', 'Technical details', 'Apologies'],
        correctAnswer: 'The main outcome or ask',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'If a deadline is at risk, when should you escalate?',
        options: ['Only after the deadline is missed', 'As soon as you see the risk', 'In the next weekly meeting', 'When the client asks'],
        correctAnswer: 'As soon as you see the risk',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        question: 'What is a good practice when giving feedback to a teammate?',
        options: ['Only give negative feedback in writing', 'Be specific and focus on behavior', 'Always do it in a group', 'Keep it vague to avoid conflict'],
        correctAnswer: 'Be specific and focus on behavior',
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        question: 'In a cross-functional project, who is typically responsible for clear communication of requirements?',
        options: ['Only the PM', 'The whole team', 'Only engineering lead', 'Only the client'],
        correctAnswer: 'The whole team',
      },
      {
        id: 'q5',
        type: 'short_answer',
        question: 'In one or two words, what should you do before sending an important email to a client?',
        acceptedAnswers: ['proofread', 'proof read', 'review', 'check', 'edit'],
      },
    ],
  },
]

export function getAssessmentModule(id: string): AssessmentModule | undefined {
  return assessmentModules.find((m) => m.id === id)
}

/** Score a multiple choice answer (exact match). */
function scoreMultipleChoice(question: AssessmentQuestion, answer: string): number {
  const correct = (question.correctAnswer || '').trim().toLowerCase()
  const given = (answer || '').trim().toLowerCase()
  return correct === given ? 1 : 0
}

/** Score a short answer (match accepted answers or contains). */
function scoreShortAnswer(question: AssessmentQuestion, answer: string): number {
  const given = (answer || '').trim().toLowerCase()
  if (!given) return 0
  const accepted = question.acceptedAnswers?.map((a) => a.trim().toLowerCase()) || []
  const match = accepted.some((a) => given === a || given.includes(a) || a.includes(given))
  return match ? 1 : 0
}

export function scoreAssessment(
  module: AssessmentModule,
  answers: Record<string, string>
): { score: number; maxScore: number; percentage: number } {
  let earned = 0
  const pointsPerQuestion = module.maxScore / module.questions.length
  for (const q of module.questions) {
    const answer = answers[q.id] ?? ''
    const correct =
      q.type === 'multiple_choice'
        ? scoreMultipleChoice(q, answer)
        : scoreShortAnswer(q, answer)
    earned += correct * pointsPerQuestion
  }
  const score = Math.round(earned)
  return {
    score,
    maxScore: module.maxScore,
    percentage: module.maxScore > 0 ? Math.round((score / module.maxScore) * 100) : 0,
  }
}
