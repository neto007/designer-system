import { type ReactNode, type HTMLAttributes, createContext, useContext } from 'react'
import { cn } from '../../lib/cn'

// ─── FormField context (for aria wiring) ─────────────────────────────────────

interface FieldCtx {
  id: string
  error?: string
  required?: boolean
}
const FieldContext = createContext<FieldCtx | null>(null)
export function useFormField() { return useContext(FieldContext) }

// ─── Form ─────────────────────────────────────────────────────────────────────

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  children: ReactNode
  className?: string
}

export function Form({ onSubmit, children, className, ...props }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn('space-y-6', className)}
      {...props}
    >
      {children}
    </form>
  )
}

// ─── FormSection ──────────────────────────────────────────────────────────────

export interface FormSectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <fieldset className={cn('space-y-4 border-0 m-0 p-0', className)}>
      {(title || description) && (
        <div className="pb-3 border-b border-ds-current/40 space-y-1">
          {title && (
            <legend className="text-sm font-semibold text-ds-fg">{title}</legend>
          )}
          {description && (
            <p className="text-xs text-ds-comment">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </fieldset>
  )
}

// ─── FormField ────────────────────────────────────────────────────────────────

export interface FormFieldProps {
  id: string
  label: string
  description?: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
  labelPlacement?: 'top' | 'left'
}

export function FormField({
  id,
  label,
  description,
  error,
  required,
  children,
  className,
  labelPlacement = 'top',
}: FormFieldProps) {
  return (
    <FieldContext.Provider value={{ id, error, required }}>
      <div
        className={cn(
          labelPlacement === 'left'
            ? 'grid grid-cols-[200px_1fr] gap-x-4 items-start'
            : 'space-y-1.5',
          className
        )}
      >
        {/* Label column */}
        <div className={cn(labelPlacement === 'left' && 'pt-2')}>
          <label
            htmlFor={id}
            className={cn(
              'block text-sm font-medium',
              error ? 'text-ds-red' : 'text-ds-fg'
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-ds-red" aria-hidden="true">*</span>
            )}
          </label>
          {description && (
            <p
              id={`${id}-description`}
              className="text-xs text-ds-comment mt-0.5"
            >
              {description}
            </p>
          )}
        </div>

        {/* Control column */}
        <div className="space-y-1.5">
          {children}
          {error && (
            <p
              id={`${id}-error`}
              role="alert"
              className="text-xs text-ds-red flex items-center gap-1"
            >
              <span aria-hidden="true">✕</span>
              {error}
            </p>
          )}
        </div>
      </div>
    </FieldContext.Provider>
  )
}

// ─── FormActions ──────────────────────────────────────────────────────────────

export interface FormActionsProps {
  children: ReactNode
  align?: 'left' | 'right' | 'between'
  className?: string
}

export function FormActions({ children, align = 'right', className }: FormActionsProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 pt-4 border-t border-ds-current/40',
        align === 'right' && 'justify-end',
        align === 'between' && 'justify-between',
        className
      )}
    >
      {children}
    </div>
  )
}
