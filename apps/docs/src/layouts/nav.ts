export interface NavItem {
  label: string
  href: string
  badge?: string
  status?: 'done' | 'wip' | 'planned'
}

export interface NavGroup {
  label: string
  num: string
  icon: string  // lucide icon name, e.g. 'Home'
  items: NavItem[]
}

export const NAV: NavGroup[] = [
  {
    label: 'Introduction',
    num: '00',
    icon: 'Home',
    items: [
      { label: 'Overview',    href: '/',             status: 'done' },
      { label: 'Quick start', href: '/quick-start',  status: 'done' },
      { label: 'Tokens',      href: '/tokens',       status: 'done' },
    ],
  },
  {
    label: 'Foundations',
    num: '01',
    icon: 'Layers',
    items: [
      { label: 'Colors',      href: '/foundations/colors',      status: 'done' },
      { label: 'Typography',  href: '/foundations/typography',  status: 'done' },
      { label: 'Spacing',     href: '/foundations/spacing',     status: 'done' },
      { label: 'Elevation',   href: '/foundations/elevation',   status: 'done' },
      { label: 'Motion',      href: '/foundations/motion',      status: 'done' },
      { label: 'Iconography', href: '/foundations/iconography', status: 'done' },
    ],
  },
  {
    label: 'Components',
    num: '02',
    icon: 'Package',
    items: [
      // Primitivos
      { label: 'Button',           href: '/components/button',           status: 'done' },
      { label: 'Badge',            href: '/components/badge',            status: 'done' },
      { label: 'Avatar',           href: '/components/avatar',           status: 'done' },
      { label: 'NeuCard',          href: '/components/neu-card',         status: 'done' },
      { label: 'Divider',          href: '/components/divider',          status: 'done' },
      { label: 'Spinner',          href: '/components/spinner',          status: 'done' },
      { label: 'Box',              href: '/components/box',              status: 'done' },
      { label: 'Link',             href: '/components/link',             status: 'done' },
      { label: 'Icon',             href: '/components/icon',             status: 'done' },
      { label: 'Space Between',    href: '/components/space-between',    status: 'done' },
      // Form
      { label: 'Input',            href: '/components/input',            status: 'done' },
      { label: 'Textarea',         href: '/components/textarea',         status: 'done' },
      { label: 'Select',           href: '/components/select',           status: 'done' },
      { label: 'Checkbox',         href: '/components/checkbox',         status: 'done' },
      { label: 'Radio Group',      href: '/components/radio-group',      status: 'done' },
      { label: 'Toggle',           href: '/components/toggle',           status: 'done' },
      { label: 'Toggle Button',    href: '/components/toggle-button',    status: 'done' },
      { label: 'Slider',           href: '/components/slider',           status: 'done' },
      { label: 'Multiselect',      href: '/components/multiselect',      status: 'done' },
      { label: 'Autosuggest',      href: '/components/autosuggest',      status: 'done' },
      { label: 'Date Picker',      href: '/components/date-picker',      status: 'done' },
      { label: 'Date Range Picker',href: '/components/date-range-picker',status: 'done' },
      { label: 'Date Input',       href: '/components/date-input',       status: 'done' },
      { label: 'Time Input',       href: '/components/time-input',       status: 'done' },
      { label: 'Tag Editor',       href: '/components/tag-editor',       status: 'done' },
      { label: 'Attribute Editor', href: '/components/attribute-editor', status: 'done' },
      { label: 'Form',             href: '/components/form',             status: 'done' },
      { label: 'Form Field',       href: '/components/form',             status: 'done' },
      // Feedback
      { label: 'Alert',            href: '/components/alert',            status: 'done' },
      { label: 'Toast',            href: '/components/toast',            status: 'done' },
      { label: 'Progress',         href: '/components/progress',         status: 'done' },
      { label: 'Skeleton',         href: '/components/skeleton',         status: 'done' },
      { label: 'Flashbar',         href: '/components/flashbar',         status: 'done' },
      { label: 'Live Region',      href: '/components/live-region',      status: 'done' },
      // Overlays
      { label: 'Tooltip',          href: '/components/tooltip',          status: 'done' },
      { label: 'Popover',          href: '/components/popover',          status: 'done' },
      { label: 'Dialog',           href: '/components/dialog',           status: 'done' },
      { label: 'Drawer',           href: '/components/drawer',           status: 'done' },
      { label: 'Help Panel',       href: '/components/help-panel',       status: 'done' },
      // Navigation
      { label: 'Tabs',             href: '/components/tabs',             status: 'done' },
      { label: 'Segmented Control',href: '/components/segmented-control',status: 'done' },
      { label: 'Breadcrumb',       href: '/components/breadcrumb',       status: 'done' },
      { label: 'Anchor Nav',       href: '/components/anchor-nav',       status: 'done' },
      { label: 'Button Group',     href: '/components/button-group',     status: 'done' },
      { label: 'Button Dropdown',  href: '/components/button-dropdown',  status: 'done' },
      { label: 'Steps',            href: '/components/steps',            status: 'done' },
      { label: 'Pagination',       href: '/components/pagination',       status: 'done' },
      { label: 'Expandable Section',href:'/components/expandable-section',status:'done'},
      // Data display
      { label: 'Table',            href: '/components/table',            status: 'done' },
      { label: 'Cards',            href: '/components/cards',            status: 'done' },
      { label: 'Item Card',        href: '/components/cards',            status: 'done' },
      { label: 'Action Card',      href: '/components/cards',            status: 'done' },
      { label: 'Key-Value Pairs',  href: '/components/key-value-pairs',  status: 'done' },
      { label: 'Status Indicator', href: '/components/status-indicator', status: 'done' },
      { label: 'Charts',           href: '/components/charts',           status: 'done' },
      { label: 'Charts Legacy',    href: '/components/charts-legacy',    status: 'done' },
      { label: 'Text Filter',           href: '/components/text-filter',           status: 'done' },
      { label: 'Property Filter',       href: '/components/property-filter',       status: 'done' },
      { label: 'Collection Select',     href: '/components/collection-select',     status: 'done' },
      // Tokens/misc
      { label: 'Token',            href: '/components/token',            status: 'done' },
      { label: 'Token Group',      href: '/components/token-group',      status: 'done' },
      { label: 'Tiles',            href: '/components/tiles',            status: 'done' },
      { label: 'List',             href: '/components/list',             status: 'done' },
      { label: 'Calendar',         href: '/components/calendar',         status: 'done' },
      { label: 'Code Block',       href: '/components/code-block',       status: 'done' },
      { label: 'Code Editor',      href: '/components/code-editor',      status: 'done' },
      { label: 'Copy to Clipboard',href: '/components/copy-to-clipboard',status: 'done' },
      { label: 'File Upload',      href: '/components/file-upload',      status: 'done' },
      { label: 'Error Boundary',   href: '/components/error-boundary',   status: 'done' },
      { label: 'Collection Prefs', href: '/components/collection-prefs', status: 'done' },
    ],
  },
  {
    label: 'Layout',
    num: '03',
    icon: 'Layout',
    items: [
      { label: 'App Layout',         href: '/layout/app-layout',         status: 'done' },
      { label: 'App Layout Toolbar', href: '/layout/app-layout-toolbar', status: 'done' },
      { label: 'Content Layout',   href: '/layout/content-layout',   status: 'done' },
      { label: 'Top Navigation',   href: '/layout/top-navigation',   status: 'done' },
      { label: 'Side Navigation',  href: '/layout/side-navigation',  status: 'done' },
      { label: 'Panel Layout',     href: '/layout/panel-layout',     status: 'done' },
      { label: 'Split Panel',      href: '/layout/split-panel',      status: 'done' },
      { label: 'Column Layout',    href: '/components/column-layout', status: 'done' },
      { label: 'Grid',             href: '/layout/grid',             status: 'done' },
      { label: 'Container',        href: '/layout/container',        status: 'done' },
    ],
  },
  {
    label: 'Patterns',
    num: '04',
    icon: 'Grid2X2',
    items: [
      { label: 'App Header',       href: '/patterns/app-header',      status: 'done' },
      { label: 'Agent Type Coding',href: '/patterns/agent-types',     status: 'done' },
      { label: 'Agent Card',       href: '/patterns/agent-card',      status: 'done' },
      { label: 'Content States',   href: '/patterns/content-states',  status: 'done' },
      { label: 'Data Surfaces',    href: '/patterns/data-surfaces',   status: 'done' },
    ],
  },
  {
    label: 'Chat',
    num: '05',
    icon: 'MessageSquare',
    items: [
      { label: 'Message Bubbles',   href: '/chat/messages',         status: 'done' },
      { label: 'Agent Execution',   href: '/chat/execution',        status: 'done' },
      { label: 'JSON Viewer',       href: '/chat/messages',         status: 'done' },
      { label: 'Chat Input',        href: '/chat/messages',         status: 'done' },
      { label: 'Generative AI',     href: '/chat/generative',       status: 'done' },
      { label: 'Attachments',       href: '/chat/attachments',      status: 'done' },
      { label: 'Empty State',       href: '/chat/empty',            status: 'done' },
    ],
  },
  {
    label: 'Workflow',
    num: '06',
    icon: 'GitBranch',
    items: [
      { label: 'Node Types',       href: '/workflow/nodes',       status: 'done' },
      { label: 'Handles & Edges',  href: '/workflow/edges',       status: 'done' },
      { label: 'Full Canvas',      href: '/workflow/canvas',      status: 'done' },
      { label: 'Interactions',     href: '/workflow/interactions', status: 'done' },
    ],
  },
  {
    label: 'Voice & A11y',
    num: '07',
    icon: 'Eye',
    items: [
      { label: 'Voice Principles', href: '/a11y/voice',          status: 'done' },
      { label: 'Tone in Practice', href: '/a11y/tone',           status: 'done' },
      { label: 'Microcopy',        href: '/a11y/microcopy',      status: 'done' },
      { label: 'Error Messages',   href: '/a11y/errors',         status: 'done' },
      { label: 'Accessibility',    href: '/a11y/accessibility',  status: 'done' },
      { label: 'Touch Targets',    href: '/a11y/touch-targets',  status: 'done' },
    ],
  },
  {
    label: 'Resources',
    num: '08',
    icon: 'Download',
    items: [
      { label: 'Downloads',        href: '/resources/downloads',  status: 'done' },
      { label: 'AGENTS.md',        href: '/resources/agents',     status: 'done' },
      { label: 'Changelog',        href: '/resources/changelog',  status: 'done' },
    ],
  },
  {
    label: 'Examples',
    num: '09',
    icon: 'MonitorPlay',
    items: [
      { label: 'Dashboard',      href: '/examples/dashboard',     status: 'done' },
      { label: 'Agent Monitor',  href: '/examples/agent-monitor', status: 'done' },
      { label: 'Data Explorer',  href: '/examples/data-explorer', status: 'done' },
      { label: 'Settings',       href: '/examples/settings',      status: 'done' },
    ],
  },
]
