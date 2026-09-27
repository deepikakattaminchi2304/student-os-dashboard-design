import { TopBar } from '@/components/dashboard/top-bar'
import { BhashaLearnCard } from '@/components/dashboard/bhasha-learn-card'
import { ActiveMissions } from '@/components/dashboard/active-missions'
import { BottomWidgets } from '@/components/dashboard/bottom-widgets'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
        <TopBar />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <BhashaLearnCard />
          <ActiveMissions />
        </div>
        <BottomWidgets />
      </div>
    </main>
  )
}
