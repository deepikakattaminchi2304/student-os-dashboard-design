import Image from 'next/image'
import { cn } from '@/lib/utils'

export type FunIconName =
  | 'trophy'
  | 'coins'
  | 'leaf'
  | 'atom'
  | 'dna'
  | 'flask'
  | 'calculator'
  | 'languages'
  | 'book'
  | 'chai'
  | 'printer'
  | 'notebook'
  | 'hoodie'
  | 'recycle'
  | 'bike'
  | 'bolt'
  | 'water'
  | 'flame'
  | 'target'
  | 'crown'

type FunIconProps = {
  name: FunIconName
  size?: number
  float?: boolean
  className?: string
}

export function FunIcon({ name, size = 40, float = false, className }: FunIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex shrink-0', float && 'fun-icon-float', className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/icons/${name}.png`}
        alt=""
        width={size * 2}
        height={size * 2}
        className="fun-icon size-full rounded-[28%] object-cover"
      />
    </span>
  )
}
