import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react'
import { Upload, X, FileText, Image, File } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  file: File
}

export interface FileUploadProps {
  value?: UploadedFile[]
  onChange?: (files: UploadedFile[]) => void
  accept?: string
  multiple?: boolean
  maxSizeMb?: number
  disabled?: boolean
  className?: string
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileIcon(type: string) {
  if (type.startsWith('image/')) return <Image className="h-4 w-4" />
  if (type.startsWith('text/') || type.includes('json')) return <FileText className="h-4 w-4" />
  return <File className="h-4 w-4" />
}

export function FileUpload({
  value: controlled,
  onChange,
  accept,
  multiple = true,
  maxSizeMb = 10,
  disabled,
  className,
}: FileUploadProps) {
  const [internal, setInternal] = useState<UploadedFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const files = controlled ?? internal

  const addFiles = useCallback((incoming: FileList | File[]) => {
    setError(null)
    const list = Array.from(incoming)
    const maxBytes = maxSizeMb * 1024 * 1024

    const oversized = list.find((f) => f.size > maxBytes)
    if (oversized) {
      setError(`${oversized.name} exceeds ${maxSizeMb} MB limit`)
      return
    }

    const next: UploadedFile[] = list.map((f) => ({
      id: `${f.name}-${f.lastModified}`,
      name: f.name,
      size: f.size,
      type: f.type,
      file: f,
    }))

    const merged = multiple ? [...files, ...next] : next
    if (!controlled) setInternal(merged)
    onChange?.(merged)
  }, [files, multiple, maxSizeMb, controlled, onChange])

  const remove = (id: string) => {
    const next = files.filter((f) => f.id !== id)
    if (!controlled) setInternal(next)
    onChange?.(next)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (disabled || !e.dataTransfer.files.length) return
    addFiles(e.dataTransfer.files)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files)
    e.target.value = ''
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); !disabled && setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center gap-3 px-6 py-10 rounded-ds-xl border-2 border-dashed transition-all cursor-pointer',
          dragging
            ? 'border-ds-purple bg-ds-purple/10 scale-[1.01]'
            : 'border-ds-current hover:border-ds-purple/50 hover:bg-ds-panel',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Upload className={cn('h-8 w-8', dragging ? 'text-ds-purple' : 'text-ds-comment')} />
        <div className="text-center">
          <p className="text-sm font-medium text-ds-fg">
            {dragging ? 'Drop to upload' : 'Drop files here or click to browse'}
          </p>
          <p className="text-xs text-ds-comment mt-1">
            {accept ? `${accept} ` : ''} · max {maxSizeMb} MB{multiple ? ' per file' : ''}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="sr-only"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-ds-red">{error}</p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-ds-md bg-ds-panel border border-ds-current"
            >
              <span className="text-ds-comment flex-shrink-0">{fileIcon(f.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-ds-fg truncate">{f.name}</p>
                <p className="text-[10px] text-ds-comment font-mono">{formatSize(f.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(f.id)}
                className="flex-shrink-0 p-1 rounded text-ds-comment hover:text-ds-red hover:bg-ds-red/10 transition-colors"
                aria-label={`Remove ${f.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
