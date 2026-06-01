import { Check } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface Step {
  label: string
  description?: string
  status?: 'completed' | 'current' | 'pending' | 'error'
}

export interface StepsProps {
  steps: Step[]
  current?: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Steps({ steps, current = 0, orientation = 'horizontal', className }: StepsProps) {
  const getStatus = (i: number): Step['status'] => {
    if (steps[i].status) return steps[i].status
    if (i < current) return 'completed'
    if (i === current) return 'current'
    return 'pending'
  }

  const dotClass: Record<NonNullable<Step['status']>, string> = {
    completed: 'bg-ds-green border-ds-green shadow-[0_0_8px_rgba(80,250,123,.5)]',
    current:   'bg-ds-panel border-ds-purple shadow-[0_0_8px_rgba(189,147,249,.5)]',
    pending:   'bg-ds-panel border-ds-current',
    error:     'bg-ds-red border-ds-red shadow-[0_0_8px_rgba(255,85,85,.5)]',
  }

  const labelClass: Record<NonNullable<Step['status']>, string> = {
    completed: 'text-ds-green',
    current:   'text-ds-purple',
    pending:   'text-ds-comment',
    error:     'text-ds-red',
  }

  if (orientation === 'vertical') {
    return (
      <ol className={cn('flex flex-col', className)}>
        {steps.map((step, i) => {
          const status = getStatus(i)
          const isLast = i === steps.length - 1
          return (
            <li key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={cn('flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center', dotClass[status!])}>
                  {status === 'completed' ? <Check className="h-3 w-3 text-ds-on-accent" strokeWidth={3} /> :
                   status === 'current'   ? <span className="w-2 h-2 rounded-full bg-ds-purple" /> :
                   status === 'error'     ? <span className="font-mono text-[10px] text-white font-bold">!</span> :
                                            <span className="font-mono text-[10px] text-ds-comment">{i + 1}</span>}
                </div>
                {!isLast && <div className="w-px flex-1 mt-1 mb-1 bg-ds-current" />}
              </div>
              <div className={cn('pb-6', isLast && 'pb-0')}>
                <p className={cn('text-sm font-medium', labelClass[status!])}>{step.label}</p>
                {step.description && <p className="text-[12px] text-ds-comment mt-0.5">{step.description}</p>}
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <ol className={cn('flex items-start gap-0', className)}>
      {steps.map((step, i) => {
        const status = getStatus(i)
        const isLast = i === steps.length - 1
        return (
          <li key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={cn('w-6 h-6 rounded-full border-2 flex items-center justify-center', dotClass[status!])}>
                {status === 'completed' ? <Check className="h-3 w-3 text-ds-on-accent" strokeWidth={3} /> :
                 status === 'current'   ? <span className="w-2 h-2 rounded-full bg-ds-purple" /> :
                 status === 'error'     ? <span className="font-mono text-[10px] text-white font-bold">!</span> :
                                          <span className="font-mono text-[10px] text-ds-comment">{i + 1}</span>}
              </div>
              <span className={cn('text-[10px] font-mono whitespace-nowrap', labelClass[status!])}>{step.label}</span>
            </div>
            {!isLast && <div className="flex-1 h-px bg-ds-current mx-1 mb-5" />}
          </li>
        )
      })}
    </ol>
  )
}
