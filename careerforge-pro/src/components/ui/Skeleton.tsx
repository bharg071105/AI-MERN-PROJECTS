
import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%]'
  
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={{
        width: width || (variant === 'text' ? '100%' : undefined),
        height: height || (variant === 'text' ? '1em' : undefined),
      }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/60 p-6 space-y-4">
      <Skeleton variant="rectangular" height="1.5rem" width="60%" />
      <div className="space-y-2">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="text" width="90%" />
      </div>
      <div className="flex gap-2">
        <Skeleton variant="circular" width="2rem" height="2rem" />
        <Skeleton variant="circular" width="2rem" height="2rem" />
        <Skeleton variant="circular" width="2rem" height="2rem" />
      </div>
    </div>
  )
}
