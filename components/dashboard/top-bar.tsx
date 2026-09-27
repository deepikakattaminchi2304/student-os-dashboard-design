import Image from 'next/image'
import { FunIcon, type FunIconName } from '@/components/os/fun-icon'
import { cn } from '@/lib/utils'

type Metric = {
  label: string
  value: string
  icon: FunIconName
  tone: 'amber' | 'green' | 'emerald'
}

const metrics: Metric[] = [
  { label: 'Campus XP', value: '1250 XP', icon: 'trophy', tone: 'amber' },
  { label: 'Pocket Bank', value: '₹1500', icon: 'coins', tone: 'green' },
  { label: 'Green Points', value: '450 PTS', icon: 'leaf', tone: 'emerald' },
]

const toneStyles: Record<Metric['tone'], string> = {
  amber: 'text-amber bg-amber/10 border-amber/25',
  green: 'text-neon bg-neon/10 border-neon/25',
  emerald: 'text-neon-soft bg-neon-soft/10 border-neon-soft/25',
}

export function TopBar() {
  return (
    <header className="glass-card flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex size-9 items-center justify-center rounded-lg bg-neon text-sm font-bold text-primary-foreground shadow-[0_0_20px_-4px_#10B981]"
        >
          A
        </div>
        <p className="text-lg font-bold tracking-tight text-foreground text-balance">
          ALLEN 2040 <span className="font-medium text-muted-foreground">Student OS</span>
        </p>
      </div>

      <div className="flex w-fit items-center gap-3 rounded-full border border-border bg-secondary/60 py-1.5 pl-1.5 pr-2">
        <Image
          src="/avatars/aarav.png"
          alt="Aarav Sharma"
          width={32}
          height={32}
          className="size-8 rounded-full object-cover ring-2 ring-neon/40"
        />
        <span className="text-sm font-medium text-foreground">Aarav Sharma</span>
        <span className="group flex items-center gap-1.5 rounded-full bg-amber/15 py-1 pl-1 pr-2.5 text-xs font-semibold text-amber">
          <FunIcon name="flame" size={20} className="rounded-full" />5 day streak
        </span>
      </div>

      <ul className="flex flex-wrap items-center gap-3" aria-label="Your metrics">
        {metrics.map(({ label, value, icon, tone }) => (
          <li
            key={label}
            className={cn('group flex items-center gap-2.5 rounded-xl border py-1.5 pl-1.5 pr-3', toneStyles[tone])}
          >
            <FunIcon name={icon} size={34} />
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
              <span className="font-mono text-sm font-semibold">{value}</span>
            </div>
          </li>
        ))}
      </ul>
    </header>
  )
}
