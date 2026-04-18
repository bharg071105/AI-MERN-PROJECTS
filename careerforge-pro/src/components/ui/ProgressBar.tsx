
import { cn } from '../../lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const colors = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    success: 'bg-gradient-to-r from-green-500 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    danger: 'bg-gradient-to-r from-red-500 to-red-600',
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-sm font-medium text-slate-700">Progress</span>
          <span className="text-sm font-semibold text-slate-900">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-slate-200 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
