import { AnchorNav, AnchorHeading } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { AnchorNav, AnchorHeading } from '@shieldai/ds'

// Sidebar TOC — links to headings on the page
<AnchorNav
  title="On this page"
  items={[
    { id: 'overview',  label: 'Overview',  level: 1 },
    { id: 'usage',     label: 'Usage',     level: 1 },
    { id: 'props',     label: 'Props',     level: 2 },
    { id: 'examples',  label: 'Examples',  level: 2 },
  ]}
/>

// In the main content — scrolls into view when clicked
<AnchorHeading id="overview" as="h2">Overview</AnchorHeading>
<AnchorHeading id="usage"    as="h2">Usage</AnchorHeading>`

const PROPS = [
  { name: 'items', type: 'AnchorNavItem[]', default: '—', description: 'Array of { id, label, level? } — id must match the target element\'s id' },
  { name: 'title', type: 'string', default: '"On this page"', description: 'Label above the nav links' },
  { name: 'offset', type: 'number', default: '80', description: 'Pixel offset from top when scrolling to a heading (accounts for sticky headers)' },
]

const HEADING_PROPS = [
  { name: 'id', type: 'string', default: '—', description: 'Must match the corresponding AnchorNavItem id' },
  { name: 'as', type: '"h1" | "h2" | "h3" | "h4"', default: '"h2"', description: 'Heading element tag' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Heading text' },
]

const TOC = [
  { id: 'anc-what',     label: 'What it does',  level: 1 as const },
  { id: 'anc-install',  label: 'Installation',  level: 1 as const },
  { id: 'anc-usage',    label: 'Basic usage',   level: 2 as const },
  { id: 'anc-advanced', label: 'Advanced',      level: 2 as const },
  { id: 'anc-a11y',     label: 'Accessibility', level: 3 as const },
]

export default function AnchorNavPage() {
  return (
    <ComponentBlock
      num="02.AN"
      title="Anchor Nav"
      tag="scroll-spy · IntersectionObserver · level indent"
      description="Sticky in-page table of contents with active link tracking. Uses IntersectionObserver to highlight the heading currently in view. Level prop controls indentation (1=flush, 2=indented, 3=deeply indented)."
      preview={
        <div className="flex gap-6 w-full" style={{ height: 320 }}>
          {/* TOC column */}
          <div className="w-44 flex-shrink-0 border-r border-ds-current pr-4 pt-2">
            <AnchorNav items={TOC} title="On this page" />
          </div>

          {/* Content column (static demo) */}
          <div className="flex-1 overflow-y-auto space-y-6 text-sm text-ds-comment">
            {TOC.map((item) => (
              <div key={item.id}>
                <AnchorHeading
                  id={item.id}
                  as={item.level === 1 ? 'h2' : item.level === 2 ? 'h3' : 'h4'}
                  className={`font-bold text-ds-fg mb-2 ${item.level === 1 ? 'text-base' : item.level === 2 ? 'text-sm pl-2' : 'text-xs pl-4'}`}
                >
                  {item.label}
                </AnchorHeading>
                <p className={item.level === 1 ? '' : item.level === 2 ? 'pl-2' : 'pl-4'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </div>
      }
      code={CODE}
      filename="AnchorNav.tsx"
      props={[...PROPS, ...HEADING_PROPS]}
    />
  )
}
