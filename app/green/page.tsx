import type { Metadata } from 'next'
import { GreenView } from '@/components/green/green-view'

export const metadata: Metadata = { title: 'Green Meter' }

export default function GreenPage() {
  return <GreenView />
}
