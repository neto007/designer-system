import { FileUpload } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { FileUpload } from '@shieldai/ds'

// Default — uncontrolled, any file type
<FileUpload onChange={(files) => console.log(files)} />

// Controlled with specific types and size limit
<FileUpload
  value={files}
  onChange={setFiles}
  accept=".json,.csv,.yaml"
  multiple={true}
  maxSizeMb={5}
/>

// Single file only
<FileUpload multiple={false} accept="image/*" />`

const PROPS = [
  { name: 'value', type: 'UploadedFile[]', default: '—', description: 'Controlled list of uploaded files' },
  { name: 'onChange', type: '(files: UploadedFile[]) => void', default: '—', description: 'Called whenever the file list changes' },
  { name: 'accept', type: 'string', default: '—', description: 'Native file input accept string (e.g. ".json,.csv" or "image/*")' },
  { name: 'multiple', type: 'boolean', default: 'true', description: 'Whether multiple files can be selected at once' },
  { name: 'maxSizeMb', type: 'number', default: '10', description: 'Per-file size limit in megabytes — shows an error if exceeded' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables drop zone and file input' },
]

export default function FileUploadPage() {
  return (
    <ComponentBlock
      num="02.FU"
      title="File Upload"
      tag="drag & drop · click to browse · size limit · file list"
      description="Drop zone with click-to-browse fallback. Validates file size against maxSizeMb, shows an error for oversized files, and renders a removable list of selected files with icon, name, and formatted size."
      preview={
        <div className="space-y-6 w-full">
          <div>
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">default (any file)</div>
            <FileUpload maxSizeMb={2} />
          </div>

          <PreviewRow label="disabled">
            <div className="w-full max-w-sm">
              <FileUpload disabled />
            </div>
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="FileUpload.tsx"
      props={PROPS}
    />
  )
}
