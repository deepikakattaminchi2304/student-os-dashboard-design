'use client'

import { useState } from 'react'
import { ArrowRight, BookOpen, ChevronDown, Languages, ScanLine } from 'lucide-react'
import { ProgressBar } from './progress-bar'

const languages = ['Hindi', 'English', 'Marathi', 'Tamil', 'Telugu', 'Bengali']

export function BhashaLearnCard() {
  const [language, setLanguage] = useState('Hindi')
  const progress = 65

  return (
    <section
      aria-labelledby="bhasha-title"
      className="glass-card relative flex flex-col gap-6 overflow-hidden p-6 lg:col-span-2"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-neon/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="flex w-fit items-center gap-1.5 rounded-full border border-neon/25 bg-neon/10 px-2.5 py-1 text-xs font-semibold text-neon-soft">
            <BookOpen className="size-3.5" aria-hidden="true" />
            Bhasha Learn
          </span>
          <h2 id="bhasha-title" className="text-2xl font-bold tracking-tight text-foreground text-balance md:text-3xl">
            Plant Biology: Chloroplasts
          </h2>
          <p className="text-sm text-muted-foreground">
            Chapter 5 &middot; Photosynthesis &amp; cell organelles &middot; 12 lessons
          </p>
        </div>

        <label className="relative flex w-fit items-center gap-2 rounded-xl border border-border bg-secondary/70 py-2 pl-3 pr-9 text-sm text-foreground focus-within:ring-2 focus-within:ring-ring">
          <Languages className="size-4 text-neon-soft" aria-hidden="true" />
          <span className="sr-only">Learning language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none bg-transparent font-medium outline-none"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang} className="bg-popover">
                {lang}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted-foreground" aria-hidden="true" />
        </label>
      </div>

      <div className="relative flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Module progress</span>
          <span className="font-mono font-semibold text-neon-soft">{progress}%</span>
        </div>
        <ProgressBar value={progress} label="Module progress" size="lg" />
        <p className="text-xs text-muted-foreground">
          8 of 12 lessons complete &middot; Learning in {language}
        </p>
      </div>

      <div className="relative flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-neon/40 px-5 py-3 text-sm font-semibold text-neon-soft transition-colors hover:bg-neon/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ScanLine className="size-4" aria-hidden="true" />
          Scan New Page
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-neon px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px_#10B981] transition-colors hover:bg-neon-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Continue Module
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
