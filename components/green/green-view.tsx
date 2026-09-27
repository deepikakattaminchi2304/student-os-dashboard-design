'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUp, Bike, Droplets, Minus, Recycle, Zap } from 'lucide-react'
import { ProgressRing } from '@/components/os/progress-ring'
import { cn } from '@/lib/utils'

const breakdown = [
  { label: 'Recycling', value: '160 pts', icon: Recycle },
  { label: 'Cycling to campus', value: '140 pts', icon: Bike },
  { label: 'Energy saved', value: '90 pts', icon: Zap },
  { label: 'Water saved', value: '60 pts', icon: Droplets },
]

type Period = 'Week' | 'Month' | 'All time'
type Scope = 'Class' | 'Campus'

type Entry = { name: string; avatar: string; points: number; change: number; you?: boolean }

const people = {
  priya: { name: 'Priya Nair', avatar: '/avatars/priya.png' },
  rohan: { name: 'Rohan Mehta', avatar: '/avatars/rohan.png' },
  ananya: { name: 'Ananya Iyer', avatar: '/avatars/ananya.png' },
  aarav: { name: 'Aarav Sharma', avatar: '/avatars/aarav.png', you: true },
}

const boards: Record<Scope, Record<Period, Entry[]>> = {
  Class: {
    Week: [
      { ...people.aarav, points: 120, change: 2 },
      { ...people.priya, points: 110, change: -1 },
      { ...people.ananya, points: 95, change: 1 },
      { ...people.rohan, points: 70, change: -2 },
    ],
    Month: [
      { ...people.priya, points: 480, change: 0 },
      { ...people.aarav, points: 450, change: 1 },
      { ...people.rohan, points: 390, change: -1 },
      { ...people.ananya, points: 355, change: 0 },
    ],
    'All time': [
      { ...people.priya, points: 2140, change: 0 },
      { ...people.rohan, points: 1860, change: 1 },
      { ...people.aarav, points: 1720, change: -1 },
      { ...people.ananya, points: 1500, change: 0 },
    ],
  },
  Campus: {
    Week: [
      { ...people.ananya, points: 310, change: 3 },
      { ...people.rohan, points: 280, change: 0 },
      { ...people.priya, points: 240, change: -2 },
      { ...people.aarav, points: 120, change: 5 },
    ],
    Month: [
      { ...people.rohan, points: 1120, change: 1 },
      { ...people.ananya, points: 1045, change: -1 },
      { ...people.priya, points: 980, change: 0 },
      { ...people.aarav, points: 450, change: 4 },
    ],
    'All time': [
      { ...people.rohan, points: 6210, change: 0 },
      { ...people.priya, points: 5980, change: 0 },
      { ...people.ananya, points: 5400, change: 1 },
      { ...people.aarav, points: 1720, change: 2 },
    ],
  },
}

function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full border border-border p-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-colors',
            value === o ? 'bg-neon text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function RankChange({ change }: { change: number }) {
  if (change === 0)
    return (
      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
        <Minus className="size-3.5" aria-hidden="true" />
        <span className="sr-only">No change</span>
      </span>
    )
  const up = change > 0
  return (
    <span className={cn('flex items-center gap-0.5 font-mono text-xs font-semibold', up ? 'text-neon-soft' : 'text-destructive')}>
      {up ? <ArrowUp className="size-3.5" aria-hidden="true" /> : <ArrowDown className="size-3.5" aria-hidden="true" />}
      {Math.abs(change)}
      <span className="sr-only">{up ? 'places up' : 'places down'}</span>
    </span>
  )
}

export function GreenView() {
  const [period, setPeriod] = useState<Period>('Month')
  const [scope, setScope] = useState<Scope>('Class')
  const entries = boards[scope][period]

  return (
    <>
      <h1 className="sr-only">Green Meter and leaderboard</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <section aria-labelledby="impact-title" className="glass-card flex flex-col items-center gap-6 p-6 md:p-8 lg:col-span-2">
          <h2 id="impact-title" className="self-start text-sm font-medium text-muted-foreground">
            Carbon Impact
          </h2>
          <ProgressRing value={45} label="Progress to Eco Champion" size={240}>
            <span className="font-mono text-5xl font-bold text-foreground">450</span>
            <span className="text-sm font-medium text-neon-soft">Impact Pts</span>
            <span className="mt-1 text-xs text-muted-foreground">18.4 kg CO<sub>2</sub> saved</span>
          </ProgressRing>
          <p className="text-center text-sm text-muted-foreground">
            <span className="font-mono font-semibold text-foreground">550</span> pts to reach Eco Champion
          </p>
          <ul className="grid w-full grid-cols-2 gap-3">
            {breakdown.map(({ label, value, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2.5 rounded-xl border border-border bg-white/[0.02] p-3">
                <Icon className="size-4 shrink-0 text-neon-soft" aria-hidden="true" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] text-muted-foreground">{label}</span>
                  <span className="font-mono text-sm font-semibold text-foreground">{value}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="board-title" className="glass-card flex flex-col gap-5 p-6 md:p-8 lg:col-span-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <h2 id="board-title" className="text-lg font-semibold text-foreground">
                Green Points Leaderboard
              </h2>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-neon-soft">
                <span className="size-1.5 animate-pulse rounded-full bg-neon-soft" aria-hidden="true" />
                Live
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Toggle label="Time period" options={['Week', 'Month', 'All time'] as Period[]} value={period} onChange={setPeriod} />
              <Toggle label="Scope" options={['Class', 'Campus'] as Scope[]} value={scope} onChange={setScope} />
            </div>
          </div>

          <ol aria-live="polite" className="flex flex-col gap-3">
            {entries.map((e, i) => (
              <li
                key={e.name}
                className={cn(
                  'flex items-center gap-4 rounded-xl border p-3',
                  e.you ? 'border-neon/50 bg-neon/10' : 'border-border bg-white/[0.02]',
                )}
              >
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold',
                    i === 0 ? 'bg-amber text-primary-foreground' : 'bg-white/5 text-muted-foreground',
                  )}
                >
                  {i + 1}
                </span>
                <Image src={e.avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {e.name}
                    {e.you && <span className="ml-2 text-xs text-neon-soft">(You)</span>}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{e.points.toLocaleString('en-IN')} pts</span>
                </div>
                <RankChange change={e.change} />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  )
}
