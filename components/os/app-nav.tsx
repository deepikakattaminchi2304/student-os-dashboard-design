'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunIcon, type FunIconName } from '@/components/os/fun-icon'
import { cn } from '@/lib/utils'

const tabs: Array<{ href: string; label: string; icon: FunIconName }> = [
  { href: '/', label: 'Dashboard', icon: 'target' },
  { href: '/learn', label: 'Learn', icon: 'book' },
  { href: '/wallet', label: 'Wallet', icon: 'coins' },
  { href: '/green', label: 'Green Meter', icon: 'leaf' },
]

export function AppNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Primary" className="glass-card overflow-x-auto p-1.5">
      <ul className="flex min-w-max items-center gap-1">
        {tabs.map(({ href, label, icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-neon text-primary-foreground shadow-[0_0_20px_-6px_#10B981]'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
                )}
              >
                <FunIcon name={icon} size={24} className="rounded-lg" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
