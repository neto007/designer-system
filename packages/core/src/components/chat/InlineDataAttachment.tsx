import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { FileText, Image, File, Table2, Download, ExternalLink } from 'lucide-react'
import { cn } from '../../lib/cn'

export type AttachmentType = 'image' | 'csv' | 'json' | 'pdf' | 'file'

export interface InlineDataAttachmentProps {
  filename: string
  size?: string
  type?: AttachmentType
  href?: string
  previewSrc?: string
  className?: string
}

const typeConfig: Record<AttachmentType, { icon: typeof FileText; color: string; label: string }> = {
  image: { icon: Image,    color: 'text-ds-pink',   label: 'Image' },
  csv:   { icon: Table2,   color: 'text-ds-green',  label: 'CSV' },
  json:  { icon: FileText, color: 'text-ds-yellow', label: 'JSON' },
  pdf:   { icon: FileText, color: 'text-ds-red',    label: 'PDF' },
  file:  { icon: File,     color: 'text-ds-comment',label: 'File' },
}

function inferType(filename: string): AttachmentType {
  const ext = filename.split('.').pop()?.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext ?? '')) return 'image'
  if (ext === 'csv') return 'csv'
  if (ext === 'json') return 'json'
  if (ext === 'pdf') return 'pdf'
  return 'file'
}

export const InlineDataAttachment = forwardRef<
  HTMLAnchorElement,
  InlineDataAttachmentProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof InlineDataAttachmentProps>
>(({ filename, size, type, href, previewSrc, className, ...props }, ref) => {
  const resolved = type ?? inferType(filename)
  const cfg = typeConfig[resolved]
  const Icon = cfg.icon

  return (
    <a
      ref={ref}
      href={href}
      download={href ? filename : undefined}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={cn(
        'group inline-flex items-center gap-2.5 px-3 py-2 rounded-ds-lg',
        'bg-ds-panel border border-ds-current hover:border-ds-purple/40',
        'transition-all duration-fast cursor-pointer no-underline',
        'max-w-xs',
        className
      )}
      {...props}
    >
      {/* Icon / preview */}
      <div className={cn('flex-shrink-0 w-8 h-8 rounded-ds-md flex items-center justify-center', 'bg-ds-bg border border-ds-current')}>
        {previewSrc && resolved === 'image' ? (
          <img src={previewSrc} alt="" className="w-full h-full object-cover rounded-ds-md" />
        ) : (
          <Icon className={cn('h-4 w-4', cfg.color)} />
        )}
      </div>

      {/* Meta */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-ds-fg truncate leading-tight">{filename}</p>
        <p className="text-[10px] text-ds-comment font-mono">
          {cfg.label}{size ? ` · ${size}` : ''}
        </p>
      </div>

      {/* Action icon */}
      {href && (
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {props.download !== undefined
            ? <Download className="h-3.5 w-3.5 text-ds-comment" />
            : <ExternalLink className="h-3.5 w-3.5 text-ds-comment" />
          }
        </div>
      )}
    </a>
  )
})
InlineDataAttachment.displayName = 'InlineDataAttachment'
