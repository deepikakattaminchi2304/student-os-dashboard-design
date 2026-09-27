'use client'

import { useState } from 'react'
import { CheckCircle2, Gift, History, Sparkles } from 'lucide-react'
import { FunIcon, type FunIconName } from '@/components/os/fun-icon'
import { Button } from '@/components/ui/button'
import { ProgressRing } from '@/components/os/progress-ring'
import { cn } from '@/lib/utils'

const NEXT_TIER = 3000

type Reward = { id: string; name: string; cost: number; icon: FunIconName }

const rewards: Reward[] = [
  { id: 'coffee', name: 'Canteen Chai Pass', cost: 150, icon: 'chai' },
  { id: 'print', name: '50 Free Prints', cost: 300, icon: 'printer' },
  { id: 'notes', name: 'Premium Notes Pack', cost: 600, icon: 'notebook' },
  { id: 'hoodie', name: 'ALLEN Campus Hoodie', cost: 1800, icon: 'hoodie' },
]

const history = [
  { id: 1, mission: 'Bhasha Learn: Chapter 4 quiz', date: 'Today', coins: 120 },
  { id: 2, mission: 'Recycled 12 plastic bottles', date: 'Yesterday', coins: 80 },
  { id: 3, mission: '5 day learning streak', date: 'Sep 24', coins: 250 },
  { id: 4, mission: 'Helped a peer in Physics doubt forum', date: 'Sep 22', coins: 60 },
  { id: 5, mission: 'Scanned new textbook page', date: 'Sep 20', coins: 40 },
]

export function WalletView() {
  const [coins, setCoins] = useState(2550)
  const [panel, setPanel] = useState<'redeem' | 'history' | null>(null)
  const [redeemed, setRedeemed] = useState<string[]>([])

  const redeem = (reward: Reward) => {
    if (coins < reward.cost) return
    setCoins((c) => c - reward.cost)
    setRedeemed((r) => [...r, reward.id])
  }

  return (
    <>
      <h1 className="sr-only">Pocket Bank wallet</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <section
          aria-labelledby="balance-title"
          className="glass-card flex flex-col items-center gap-6 p-6 md:p-8 lg:col-span-3"
        >
          <div className="flex w-full items-center justify-between">
            <h2 id="balance-title" className="text-sm font-medium text-muted-foreground">
              Pocket Bank · Mock Campus Wallet
            </h2>
            <span className="rounded-full bg-amber/15 px-2.5 py-1 text-xs font-semibold text-amber">Silver tier</span>
          </div>

          <ProgressRing value={(coins / NEXT_TIER) * 100} label="Progress to Gold tier" size={260} tone="amber">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Balance</span>
            <span className="font-mono text-5xl font-bold text-foreground">{coins.toLocaleString('en-IN')}</span>
            <span className="text-sm font-medium text-amber">coins</span>
          </ProgressRing>

          <p className="text-center text-sm text-muted-foreground">
            {coins >= NEXT_TIER ? (
              'Gold tier unlocked!'
            ) : (
              <>
                <span className="font-mono font-semibold text-foreground">
                  {(NEXT_TIER - coins).toLocaleString('en-IN')}
                </span>{' '}
                coins to unlock Gold tier rewards
              </>
            )}
          </p>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="flex-1"
              aria-expanded={panel === 'redeem'}
              aria-controls="wallet-panel"
              onClick={() => setPanel(panel === 'redeem' ? null : 'redeem')}
            >
              <Gift className="size-4" aria-hidden="true" />
              Redeem Rewards
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-border bg-transparent hover:bg-white/5"
              aria-expanded={panel === 'history'}
              aria-controls="wallet-panel"
              onClick={() => setPanel(panel === 'history' ? null : 'history')}
            >
              <History className="size-4" aria-hidden="true" />
              View Mission History
            </Button>
          </div>
        </section>

        <section id="wallet-panel" aria-live="polite" className="glass-card flex flex-col gap-4 p-6 lg:col-span-2">
          {panel === 'history' ? (
            <>
              <h2 className="text-lg font-semibold text-foreground">Mission History</h2>
              <ul className="flex flex-col divide-y divide-border">
                {history.map((h) => (
                  <li key={h.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground">{h.mission}</span>
                      <span className="text-xs text-muted-foreground">{h.date}</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-neon-soft">+{h.coins}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  {panel === 'redeem' ? 'Redeem Rewards' : 'Rewards Store'}
                </h2>
                <Sparkles className="size-4 text-amber" aria-hidden="true" />
              </div>
              <ul className="flex flex-col gap-3">
                {rewards.map((r) => {
                  const done = redeemed.includes(r.id)
                  const affordable = coins >= r.cost
                  return (
                    <li
                      key={r.id}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-3 transition-colors hover:border-amber/40"
                    >
                      <FunIcon name={r.icon} size={48} />
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium text-foreground">{r.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{r.cost} coins</span>
                      </div>
                      {done ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-neon-soft">
                          <CheckCircle2 className="size-4" aria-hidden="true" />
                          Redeemed
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant={panel === 'redeem' ? 'default' : 'outline'}
                          disabled={!affordable}
                          onClick={() => redeem(r)}
                          className={cn(panel !== 'redeem' && 'border-border bg-transparent')}
                        >
                          {affordable ? 'Redeem' : 'Locked'}
                        </Button>
                      )}
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </section>
      </div>
    </>
  )
}
