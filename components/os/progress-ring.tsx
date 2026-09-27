import { cn } from '@/lib/utils'

type ProgressRingProps = {
  value: number
  label: string
  size?: number
  stroke?: number
  tone?: 'neon' | 'amber'
  children?: React.ReactNode
  className?: string
}

export function ProgressRing({
  value,
  label,
  size = 240,
  stroke = 16,
  tone = 'neon',
  children,
  className,
}: ProgressRingProps) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))
  const offset = circumference * (1 - clamped / 100)
  const color = tone === 'neon' ? '#10B981' : '#F59E0B'

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size, maxWidth: '100%' }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 size-full -rotate-90 overflow-visible" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 10px ${color})`, transition: 'stroke-dashoffset 700ms ease' }}
        />
      </svg>
      <div className="relative flex flex-col items-center text-center">{children}</div>
    </div>
  )
}
