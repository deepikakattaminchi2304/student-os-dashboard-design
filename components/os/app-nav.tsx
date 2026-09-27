'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, LayoutDashboard, Leaf, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/green', label: 'Green Meter', icon: Leaf },
]

export function AppNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Primary" className="glass-card overflow-x-auto p-1.5">
      <ul className="flex min-w-max items-center gap-1">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-neon text-primary-foreground shadow-[0_0_20px_-6px_#10B981]'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
