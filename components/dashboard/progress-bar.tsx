import { cn } from '@/lib/utils'

type ProgressBarProps = {
  value: number
  label: string
  size?: 'sm' | 'lg'
  tone?: 'neon' | 'amber'
}

export function ProgressBar({ value, label, size = 'sm', tone = 'neon' }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('w-full overflow-hidden rounded-full bg-white/5', size === 'lg' ? 'h-3' : 'h-1.5')}
    >
      <div
        className={cn(
          'h-full rounded-full',
          tone === 'neon'
            ? 'bg-gradient-to-r from-neon to-neon-soft shadow-[0_0_12px_#10B981]'
            : 'bg-amber shadow-[0_0_12px_#F59E0B]',
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
