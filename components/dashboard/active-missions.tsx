'use client'

import { useState } from 'react'
import { Check, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

const initialMissions = [
  { id: 'quiz', title: 'Complete Quiz', detail: 'Chloroplast structure · 10 Qs', reward: '+1250 XP', done: false },
  { id: 'carbon', title: 'Log Carbon Action', detail: 'Cycled to campus today', reward: '+350 PTS', done: true },
  { id: 'scan', title: 'Scan Page', detail: 'Add notes from textbook p. 84', reward: '+450 PTS', done: false },
]

export function ActiveMissions() {
  const [missions, setMissions] = useState(initialMissions)
  const completed = missions.filter((m) => m.done).length

  const toggle = (id: string) =>
    setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)))

  return (
    <section aria-labelledby="missions-title" className="glass-card flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h2 id="missions-title" className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Target className="size-4 text-neon-soft" aria-hidden="true" />
          Active Missions
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          {completed}/{missions.length} done
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {missions.map((mission) => (
          <li key={mission.id}>
            <button
              type="button"
              role="checkbox"
              aria-checked={mission.done}
              onClick={() => toggle(mission.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                mission.done
                  ? 'border-neon/30 bg-neon/5'
                  : 'border-border bg-secondary/40 hover:bg-secondary/80',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center rounded-md border',
                  mission.done ? 'border-neon bg-neon text-primary-foreground' : 'border-muted-foreground/50',
                )}
              >
                {mission.done && <Check className="size-3.5" strokeWidth={3} />}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span
                  className={cn(
                    'text-sm font-medium',
                    mission.done ? 'text-muted-foreground line-through' : 'text-foreground',
                  )}
                >
                  {mission.title}
                </span>
                <span className="truncate text-xs text-muted-foreground">{mission.detail}</span>
              </span>
              <span className="shrink-0 rounded-full border border-neon/25 bg-neon/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-neon-soft">
                {mission.reward}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
