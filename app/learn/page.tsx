import type { Metadata } from 'next'
import { ModuleGallery } from '@/components/learn/module-gallery'

export const metadata: Metadata = { title: 'Learn' }

export default function LearnPage() {
  return <ModuleGallery />
}
