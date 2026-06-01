import { useState, useRef, type KeyboardEvent } from 'react'
import { Send, Paperclip, Square } from 'lucide-react'
import { cn } from '../../lib/cn'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatInputProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onStop?: () => void
  placeholder?: string
  disabled?: boolean
  processing?: boolean
  maxLength?: number
  attachments?: boolean
  onAttach?: () => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ChatInput({
  value: controlledValue,
  onChange,
  onSubmit,
  onStop,
  placeholder = 'Message ShieldAI…',
  disabled,
  processing,
  maxLength = 4000,
  attachments,
  onAttach,
  className,
}: ChatInputProps) {
  const [internalValue, setInternalValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const value = controlledValue ?? internalValue
  const setValue = onChange ?? setInternalValue

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    // Auto-resize
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || processing || disabled) return
    onSubmit?.(trimmed)
    if (!controlledValue) {
      setInternalValue('')
      if (textareaRef.current) textareaRef.current.style.height = 'auto'
    }
  }

  const charCount = value.length
  const nearLimit = charCount > maxLength * 0.85

  return (
    <div
      className={cn(
        'rounded-ds-lg border-2 bg-ds-panel transition-colors',
        disabled
          ? 'border-ds-current opacity-60'
          : 'border-ds-purple/30 focus-within:border-ds-purple',
        className
      )}
    >
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || processing}
        maxLength={maxLength}
        rows={1}
        className={cn(
          'w-full resize-none bg-transparent text-sm text-ds-fg placeholder:text-ds-comment',
          'px-4 pt-3 pb-1 outline-none leading-relaxed',
          'disabled:cursor-not-allowed',
          'min-h-[44px] max-h-[200px]'
        )}
        aria-label="Message input"
        aria-multiline="true"
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 pb-2 pt-1">
        <div className="flex items-center gap-1">
          {/* Attachment */}
          {attachments && (
            <button
              type="button"
              onClick={onAttach}
              disabled={disabled || processing}
              className={cn(
                'p-1.5 rounded-ds-sm text-ds-comment transition-colors',
                'hover:text-ds-fg hover:bg-ds-current/50',
                'disabled:opacity-40 disabled:cursor-not-allowed'
              )}
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          )}

          {/* Char count */}
          {nearLimit && (
            <span className={cn('text-[10px] font-mono ml-1', charCount >= maxLength ? 'text-ds-red' : 'text-ds-orange')}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] text-ds-comment/50 hidden sm:block">
            {processing ? 'Processing…' : 'Enter ↵ to send  ·  Shift+Enter for newline'}
          </span>

          {/* Stop / Send */}
          {processing ? (
            <button
              type="button"
              onClick={onStop}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-ds-md',
                'bg-ds-red text-ds-on-accent shadow-glow-red',
                'hover:brightness-110 transition-all active:scale-95'
              )}
              aria-label="Stop generation"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!value.trim() || disabled}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-ds-md',
                'bg-ds-purple text-ds-on-accent shadow-glow',
                'hover:bg-ds-pink hover:shadow-glow-pink transition-all active:scale-95',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none'
              )}
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
