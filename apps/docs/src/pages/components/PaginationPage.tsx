import { useState } from 'react'
import { Pagination } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Pagination } from '@shieldai/ds'

const [page, setPage] = useState(1)

<Pagination
  page={page}
  totalPages={20}
  onPageChange={setPage}
/>

// Fewer siblings (compact)
<Pagination
  page={page}
  totalPages={20}
  onPageChange={setPage}
  siblings={0}
/>`

const PROPS = [
  { name: 'page', type: 'number', required: true, description: 'Current active page (1-indexed)' },
  { name: 'totalPages', type: 'number', required: true, description: 'Total page count' },
  { name: 'onPageChange', type: '(page: number) => void', required: true, description: 'Called when user navigates to a new page' },
  { name: 'siblings', type: 'number', default: '1', description: 'Number of page buttons shown on each side of the current page' },
]

function Demo() {
  const [page, setPage] = useState(5)
  const [page2, setPage2] = useState(5)

  return (
    <div className="space-y-4 w-full">
      <PreviewRow label="default · siblings=1">
        <Pagination page={page} totalPages={20} onPageChange={setPage} />
      </PreviewRow>
      <PreviewRow label="compact · siblings=0">
        <Pagination page={page2} totalPages={20} onPageChange={setPage2} siblings={0} />
      </PreviewRow>
      <PreviewRow label="few pages (no ellipsis)">
        <Pagination page={2} totalPages={5} onPageChange={() => {}} />
      </PreviewRow>
    </div>
  )
}

export default function PaginationPage() {
  return (
    <ComponentBlock
      num="02.27"
      title="Pagination"
      tag="ellipsis · siblings · accessible"
      description="Page navigation with smart ellipsis collapse. Active page gets a purple fill. Siblings controls how many pages show on each side before collapsing to ellipsis."
      preview={<Demo />}
      code={CODE}
      filename="Pagination.tsx"
      props={PROPS}
    />
  )
}
