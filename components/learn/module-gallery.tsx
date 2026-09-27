'use client'

import { useState } from 'react'
import { Atom, BookOpen, Calculator, Dna, FlaskConical, Languages, Play } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/dashboard/progress-bar'
import { cn } from '@/lib/utils'

type Subject = 'Science' | 'Maths' | 'Languages'

type Module = {
  id: string
  title: string
  book: string
  subject: Subject
  chapters: number
  progress: number
  icon: LucideIcon
  live?: boolean
}

const modules: Module[] = [
  { id: 'phy', title: 'Physics', book: 'Laws of Motion · Class 11', subject: 'Science', chapters: 14, progress: 65, icon: Atom, live: true },
  { id: 'bio', title: 'Biology', book: 'Cell: The Unit of Life', subject: 'Science', chapters: 12, progress: 40, icon: Dna },
  { id: 'chem', title: 'Chemistry', book: 'Chemical Bonding', subject: 'Science', chapters: 10, progress: 22, icon: FlaskConical },
  { id: 'math', title: 'Mathematics', book: 'Calculus Foundations', subject: 'Maths', chapters: 16, progress: 81, icon: Calculator },
  { id: 'hin', title: 'Hindi Literature', book: 'Aaroh Bhaag 1', subject: 'Languages', chapters: 9, progress: 55, icon: Languages },
  { id: 'eng', title: 'English', book: 'Hornbill Reader', subject: 'Languages', chapters: 8, progress: 0, icon: BookOpen },
]

const filters: Array<'All' | Subject> = ['All', 'Science', 'Maths', 'Languages']

export function ModuleGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const visible = filter === 'All' ? modules : modules.filter((m) => m.subject === filter)

  return (
    <section aria-labelledby="library-title" className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 id="library-title" className="text-2xl font-bold tracking-tight text-foreground">
            Learning Library
          </h1>
          <p className="text-sm text-muted-foreground">
            Pick a textbook to continue in your preferred language with Bhasha Learn.
          </p>
        </div>
        <div role="group" aria-label="Filter by subject" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                filter === f
                  ? 'border-neon bg-neon/15 text-neon-soft'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((m) => (
          <li key={m.id}>
            <ModuleCard module={m} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ModuleCard({ module: m }: { module: Module }) {
  const Icon = m.icon
  const status = m.progress === 0 ? 'Start' : m.progress === 100 ? 'Review' : 'Continue'

  return (
    <article
      className={cn(
        'glass-card flex h-full flex-col gap-5 p-6 transition-colors hover:border-neon/50',
        m.live && 'border-neon/50',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-neon/10 text-neon-soft">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        {m.live ? (
          <span className="flex items-center gap-1.5 rounded-full bg-neon/15 px-2.5 py-1 text-[11px] font-semibold text-neon-soft">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-soft opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-neon-soft" />
            </span>
            Live progress
          </span>
        ) : (
          <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            {m.subject}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">{m.title}</h2>
        <p className="text-sm text-muted-foreground">{m.book}</p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{m.chapters} chapters</span>
          <span className={cn('font-mono font-semibold', m.live ? 'text-neon-soft' : 'text-foreground')}>
            {m.progress}% complete
          </span>
        </div>
        <ProgressBar value={m.progress} label={`${m.title} progress`} size={m.live ? 'lg' : 'sm'} />
      </div>

      <Button
        variant={m.live ? 'default' : 'outline'}
        className={cn(!m.live && 'border-border bg-transparent hover:bg-white/5')}
      >
        <Play className="size-4" aria-hidden="true" />
        {status}
      </Button>
    </article>
  )
}
