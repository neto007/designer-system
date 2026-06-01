import { InlineDataAttachment } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { InlineDataAttachment } from '@shieldai/ds'

// Auto-infers type from filename extension
<InlineDataAttachment filename="agents-report.csv" size="42 KB" />
<InlineDataAttachment filename="tool-output.json"  size="8.1 KB" />
<InlineDataAttachment filename="scan-result.pdf"   size="1.2 MB" />

// With download link
<InlineDataAttachment
  filename="threat-log.csv"
  size="128 KB"
  href="/downloads/threat-log.csv"
/>

// Explicit type
<InlineDataAttachment
  filename="dashboard.png"
  type="image"
  previewSrc="/img/dashboard.png"
  size="340 KB"
/>`

const PROPS = [
  { name: 'filename', type: 'string', default: '—', description: 'File name displayed and used to infer type from extension' },
  { name: 'size', type: 'string', default: '—', description: 'Human-readable file size (e.g. "42 KB")' },
  { name: 'type', type: '"image" | "csv" | "json" | "pdf" | "file"', default: 'inferred', description: 'Overrides auto-detection from filename extension' },
  { name: 'href', type: 'string', default: '—', description: 'Download URL — shows download icon on hover' },
  { name: 'previewSrc', type: 'string', default: '—', description: 'Image URL for image-type thumbnail preview' },
]

export default function AttachmentsPage() {
  return (
    <ComponentBlock
      num="05.A"
      title="Inline Data Attachment"
      tag="file card · type icon · size · download"
      description="File card for displaying attachments in chat messages. Automatically infers icon and label from the file extension (csv, json, pdf, image). Pass href to enable a download action. Renders as an accessible anchor element."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="file types">
            <InlineDataAttachment filename="agents-report.csv" size="42 KB" />
            <InlineDataAttachment filename="tool-output.json"  size="8.1 KB" />
            <InlineDataAttachment filename="scan-result.pdf"   size="1.2 MB" />
            <InlineDataAttachment filename="config.yaml"       size="3 KB" />
            <InlineDataAttachment filename="screenshot.png"    size="340 KB" />
          </PreviewRow>

          <PreviewRow label="in a chat message">
            <div className="bg-ds-panel border border-ds-current rounded-ds-xl p-4 space-y-3 max-w-sm">
              <p className="text-sm text-ds-fg">Here are the results from the last threat scan run:</p>
              <div className="flex flex-col gap-2">
                <InlineDataAttachment filename="threat-scan-2026-05-31.csv" size="128 KB" />
                <InlineDataAttachment filename="executive-summary.pdf"      size="2.4 MB" />
                <InlineDataAttachment filename="raw-events.json"            size="1.8 MB" />
              </div>
            </div>
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="InlineDataAttachment.tsx"
      props={PROPS}
    />
  )
}
