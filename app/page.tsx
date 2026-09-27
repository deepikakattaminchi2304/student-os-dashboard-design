import { BhashaLearnCard } from '@/components/dashboard/bhasha-learn-card'
import { ActiveMissions } from '@/components/dashboard/active-missions'
import { BottomWidgets } from '@/components/dashboard/bottom-widgets'

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BhashaLearnCard />
        <ActiveMissions />
      </div>
      <BottomWidgets />
    </>
  )
}
