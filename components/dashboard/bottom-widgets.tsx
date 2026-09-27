import Image from 'next/image'
import { TrendingUp } from 'lucide-react'
import { FunIcon } from '@/components/os/fun-icon'
import { cn } from '@/lib/utils'
import { ProgressBar } from './progress-bar'

function PocketBankWidget() {
  return (
    <section aria-labelledby="bank-title" className="glass-card flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h2 id="bank-title" className="text-sm font-medium text-muted-foreground">
          Pocket Bank
        </h2>
        <FunIcon name="coins" size={48} float />
      </div>
      <div className="flex items-baseline gap-2">
        <p className="font-mono text-3xl font-bold text-foreground">₹1500</p>
        <span className="flex items-center gap-1 text-xs font-medium text-neon-soft">
          <TrendingUp className="size-3.5" aria-hidden="true" />
          +₹200 this week
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <ProgressBar value={75} label="Savings goal progress" />
        <p className="text-xs text-muted-foreground">75% of ₹2000 monthly savings goal</p>
      </div>
    </section>
  )
}

function GreenMeterWidget() {
  return (
    <section aria-labelledby="green-title" className="glass-card flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h2 id="green-title" className="text-sm font-medium text-muted-foreground">
          Green Meter
        </h2>
        <FunIcon name="leaf" size={48} float />
      </div>
      <div className="flex items-baseline gap-2">
        <p className="font-mono text-3xl font-bold text-foreground">450</p>
        <span className="text-sm text-muted-foreground">Impact Pts</span>
      </div>
      <div className="flex flex-col gap-2">
        <ProgressBar value={45} label="Green level progress" />
        <p className="text-xs text-muted-foreground">550 pts to reach Eco Champion</p>
      </div>
    </section>
  )
}

const leaders = [
  { rank: 1, name: 'Priya Nair', xp: '3,420 XP', avatar: '/avatars/priya.png' },
  { rank: 2, name: 'Rohan Mehta', xp: '2,980 XP', avatar: '/avatars/rohan.png' },
  { rank: 3, name: 'Ananya Iyer', xp: '2,615 XP', avatar: '/avatars/ananya.png' },
]

const rankStyles: Record<number, string> = {
  1: 'bg-amber text-primary-foreground',
  2: 'bg-neon-soft text-primary-foreground',
  3: 'bg-neon/60 text-foreground',
}

function LeaderboardWidget() {
  return (
    <section aria-labelledby="leader-title" className="glass-card flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h2 id="leader-title" className="text-sm font-medium text-muted-foreground">
          Campus Leaderboard
        </h2>
        <FunIcon name="crown" size={48} float />
      </div>
      <ol className="flex flex-col gap-3">
        {leaders.map((leader) => (
          <li key={leader.rank} className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Image
                src={leader.avatar}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full object-cover ring-1 ring-border"
              />
              <span
                className={cn(
                  'absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full font-mono text-[10px] font-bold ring-2 ring-background',
                  rankStyles[leader.rank],
                )}
              >
                <span className="sr-only">Rank </span>
                {leader.rank}
              </span>
            </div>
            <span className="flex-1 truncate text-sm font-medium text-foreground">{leader.name}</span>
            <span className="font-mono text-xs text-muted-foreground">{leader.xp}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function BottomWidgets() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <PocketBankWidget />
      <GreenMeterWidget />
      <LeaderboardWidget />
    </div>
  )
}
