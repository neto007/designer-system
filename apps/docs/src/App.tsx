import { lazy, Suspense } from 'react'
import '@shieldai/ds'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider, Toaster, TooltipProvider, ThemeProvider } from '@shieldai/ds'
import { DocsLayout } from './layouts/DocsLayout'

// ─── Page skeleton for Suspense fallback ──────────────────────────────────
function PageSkeleton() {
  return (
    <div className="p-8 space-y-6 max-w-4xl animate-pulse">
      <div className="h-8 bg-ds-current/20 rounded w-1/3" />
      <div className="h-4 bg-ds-current/20 rounded w-2/3" />
      <div className="space-y-3 pt-4">
        <div className="h-3 bg-ds-current/15 rounded w-full" />
        <div className="h-3 bg-ds-current/15 rounded w-5/6" />
        <div className="h-3 bg-ds-current/15 rounded w-4/6" />
      </div>
      <div className="h-32 bg-ds-current/10 rounded-xl" />
      <div className="space-y-3">
        <div className="h-3 bg-ds-current/15 rounded w-full" />
        <div className="h-3 bg-ds-current/15 rounded w-3/4" />
      </div>
    </div>
  )
}

// ─── Lazy imports (code-split at build time) ──────────────────────────────

// Example screens (full-page, outside DocsLayout)
const DashboardExamplePage    = lazy(() => import('./pages/examples/DashboardExamplePage'))
const AgentMonitorExamplePage = lazy(() => import('./pages/examples/AgentMonitorExamplePage'))
const DataExplorerExamplePage = lazy(() => import('./pages/examples/DataExplorerExamplePage'))
const SettingsExamplePage     = lazy(() => import('./pages/examples/SettingsExamplePage'))

// Top-level pages
const OverviewPage    = lazy(() => import('./pages/OverviewPage'))
const QuickStartPage  = lazy(() => import('./pages/QuickStartPage'))
const TokensPage      = lazy(() => import('./pages/TokensPage'))
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'))

// Foundation pages
const ColorsPage      = lazy(() => import('./pages/foundations/ColorsPage'))
const TypographyPage  = lazy(() => import('./pages/foundations/TypographyPage'))
const SpacingPage     = lazy(() => import('./pages/foundations/SpacingPage'))
const ElevationPage   = lazy(() => import('./pages/foundations/ElevationPage'))
const MotionPage      = lazy(() => import('./pages/foundations/MotionPage'))
const IconographyPage = lazy(() => import('./pages/foundations/IconographyPage'))

// Component pages (done)
const ButtonPage    = lazy(() => import('./pages/components/ButtonPage'))
const BadgePage     = lazy(() => import('./pages/components/BadgePage'))
const AvatarPage    = lazy(() => import('./pages/components/AvatarPage'))
const NeuCardPage   = lazy(() => import('./pages/components/NeuCardPage'))
const InputPage     = lazy(() => import('./pages/components/InputPage'))
const TextareaPage  = lazy(() => import('./pages/components/TextareaPage'))
const SelectPage    = lazy(() => import('./pages/components/SelectPage'))
const ProgressPage  = lazy(() => import('./pages/components/ProgressPage'))
const SkeletonPage  = lazy(() => import('./pages/components/SkeletonPage'))
const TabsPage      = lazy(() => import('./pages/components/TabsPage'))
const AlertPage     = lazy(() => import('./pages/components/AlertPage'))
const ToastPage     = lazy(() => import('./pages/components/ToastPage'))
const TooltipPage   = lazy(() => import('./pages/components/TooltipPage'))
const PopoverPage   = lazy(() => import('./pages/components/PopoverPage'))
const DialogPage    = lazy(() => import('./pages/components/DialogPage'))
const CodeBlockPage         = lazy(() => import('./pages/components/CodeBlockPage'))
const SpinnerPage           = lazy(() => import('./pages/components/SpinnerPage'))
const DividerPage           = lazy(() => import('./pages/components/DividerPage'))
const CheckboxPage          = lazy(() => import('./pages/components/CheckboxPage'))
const RadioGroupPage        = lazy(() => import('./pages/components/RadioGroupPage'))
const TogglePage            = lazy(() => import('./pages/components/TogglePage'))
const SegmentedControlPage  = lazy(() => import('./pages/components/SegmentedControlPage'))
const StatusIndicatorPage   = lazy(() => import('./pages/components/StatusIndicatorPage'))
const ExpandableSectionPage = lazy(() => import('./pages/components/ExpandableSectionPage'))
const KeyValuePairsPage     = lazy(() => import('./pages/components/KeyValuePairsPage'))
const BreadcrumbPage        = lazy(() => import('./pages/components/BreadcrumbPage'))
const PaginationPage        = lazy(() => import('./pages/components/PaginationPage'))
const StepsPage             = lazy(() => import('./pages/components/StepsPage'))
const FlashbarPage          = lazy(() => import('./pages/components/FlashbarPage'))
const DrawerPage            = lazy(() => import('./pages/components/DrawerPage'))
const CopyToClipboardPage   = lazy(() => import('./pages/components/CopyToClipboardPage'))
const TablePage             = lazy(() => import('./pages/components/TablePage'))
const SliderPage            = lazy(() => import('./pages/components/SliderPage'))
const MultiselectPage       = lazy(() => import('./pages/components/MultiselectPage'))
const ButtonGroupPage       = lazy(() => import('./pages/components/ButtonGroupPage'))
const ButtonDropdownPage    = lazy(() => import('./pages/components/ButtonDropdownPage'))
const FormPage              = lazy(() => import('./pages/components/FormPage'))
const CardsPage             = lazy(() => import('./pages/components/CardsPage'))
const TopNavigationPage     = lazy(() => import('./pages/components/TopNavigationPage'))
const ToggleButtonPage      = lazy(() => import('./pages/components/ToggleButtonPage'))
const TextFilterPage        = lazy(() => import('./pages/components/TextFilterPage'))
const ErrorBoundaryPage     = lazy(() => import('./pages/components/ErrorBoundaryPage'))
const TilesPage             = lazy(() => import('./pages/components/TilesPage'))
const ListPage              = lazy(() => import('./pages/components/ListPage'))
const TagEditorPage         = lazy(() => import('./pages/components/TagEditorPage'))
const SideNavigationPage    = lazy(() => import('./pages/layout/SideNavigationPage'))
const DateInputPage         = lazy(() => import('./pages/components/DateInputPage'))
const FileUploadPage        = lazy(() => import('./pages/components/FileUploadPage'))
const HelpPanelPage         = lazy(() => import('./pages/components/HelpPanelPage'))
const AnchorNavPage         = lazy(() => import('./pages/components/AnchorNavPage'))
const CollectionPrefsPage   = lazy(() => import('./pages/components/CollectionPrefsPage'))
const ContainerPage         = lazy(() => import('./pages/layout/ContainerPage'))
const GridPage              = lazy(() => import('./pages/layout/GridPage'))
const SplitPanelPage        = lazy(() => import('./pages/layout/SplitPanelPage'))
const AppLayoutPage         = lazy(() => import('./pages/layout/AppLayoutPage'))
const ContentLayoutPage     = lazy(() => import('./pages/layout/ContentLayoutPage'))
const AttributeEditorPage   = lazy(() => import('./pages/components/AttributeEditorPage'))
const PropertyFilterPage    = lazy(() => import('./pages/components/PropertyFilterPage'))
const AgentsPage            = lazy(() => import('./pages/resources/AgentsPage'))
const ChartsPage            = lazy(() => import('./pages/components/ChartsPage'))
const ChartsLegacyPage     = lazy(() => import('./pages/components/ChartsLegacyPage'))
const AppLayoutToolbarPage = lazy(() => import('./pages/layout/AppLayoutToolbarPage'))
const CalendarPage          = lazy(() => import('./pages/components/CalendarPage'))
const AttachmentsPage       = lazy(() => import('./pages/chat/AttachmentsPage'))
const CodeEditorPage        = lazy(() => import('./pages/components/CodeEditorPage'))
const CollectionSelectPage  = lazy(() => import('./pages/components/CollectionSelectPage'))
const AgentExecutionPage    = lazy(() => import('./pages/chat/AgentExecutionPage'))
const GenerativeAIPage      = lazy(() => import('./pages/chat/GenerativeAIPage'))
const ToneInPracticePage    = lazy(() => import('./pages/a11y/ToneInPracticePage'))
const BoxPage              = lazy(() => import('./pages/components/BoxPage'))
const LinkPage             = lazy(() => import('./pages/components/LinkPage'))
const IconPage             = lazy(() => import('./pages/components/IconPage'))
const TokenPage            = lazy(() => import('./pages/components/TokenPage'))
const SpaceBetweenPage     = lazy(() => import('./pages/components/SpaceBetweenPage'))
const ColumnLayoutPage      = lazy(() => import('./pages/components/ColumnLayoutPage'))
const LiveRegionPage        = lazy(() => import('./pages/components/LiveRegionPage'))
const AutosuggestPage       = lazy(() => import('./pages/components/AutosuggestPage'))
const ChatDemoPage          = lazy(() => import('./pages/chat/ChatDemoPage'))
const EmptyChatPage         = lazy(() => import('./pages/chat/EmptyChatPage'))
const WorkflowDemoPage        = lazy(() => import('./pages/workflow/WorkflowDemoPage'))
const WorkflowEdgesPage       = lazy(() => import('./pages/workflow/WorkflowEdgesPage'))
const WorkflowCanvasPage      = lazy(() => import('./pages/workflow/WorkflowCanvasPage'))
const WorkflowInteractionsPage = lazy(() => import('./pages/workflow/WorkflowInteractionsPage'))
const DownloadsPage         = lazy(() => import('./pages/resources/DownloadsPage'))
const ChangelogPage         = lazy(() => import('./pages/resources/ChangelogPage'))
// Patterns
const AppHeaderPage         = lazy(() => import('./pages/patterns/AppHeaderPage'))
const AgentTypesPage        = lazy(() => import('./pages/patterns/AgentTypesPage'))
const AgentCardPage         = lazy(() => import('./pages/patterns/AgentCardPage'))
const ContentStatesPage     = lazy(() => import('./pages/patterns/ContentStatesPage'))
const DataSurfacesPage      = lazy(() => import('./pages/patterns/DataSurfacesPage'))
// Voice & A11y
const VoicePrinciplesPage   = lazy(() => import('./pages/a11y/VoicePrinciplesPage'))
const MicrocopyPage         = lazy(() => import('./pages/a11y/MicrocopyPage'))
const ErrorMessagesPage     = lazy(() => import('./pages/a11y/ErrorMessagesPage'))
const A11yIndexPage         = lazy(() => import('./pages/a11y/A11yIndexPage'))
const TouchTargetsPage      = lazy(() => import('./pages/a11y/TouchTargetsPage'))

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
      <ToastProvider>
        <TooltipProvider delayDuration={300}>
          <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route element={<DocsLayout />}>
              {/* Introduction */}
              <Route index element={<OverviewPage />} />
              <Route path="quick-start" element={<QuickStartPage />} />
              <Route path="tokens"      element={<TokensPage />} />

              {/* Foundations */}
              <Route path="foundations/colors"      element={<ColorsPage />} />
              <Route path="foundations/typography"  element={<TypographyPage />} />
              <Route path="foundations/spacing"     element={<SpacingPage />} />
              <Route path="foundations/elevation"   element={<ElevationPage />} />
              <Route path="foundations/motion"      element={<MotionPage />} />
              <Route path="foundations/iconography" element={<IconographyPage />} />

              {/* Components — done */}
              <Route path="components/button"    element={<ButtonPage />} />
              <Route path="components/badge"     element={<BadgePage />} />
              <Route path="components/avatar"    element={<AvatarPage />} />
              <Route path="components/neu-card"  element={<NeuCardPage />} />
              <Route path="components/input"     element={<InputPage />} />
              <Route path="components/textarea"  element={<TextareaPage />} />
              <Route path="components/select"    element={<SelectPage />} />
              <Route path="components/progress"  element={<ProgressPage />} />
              <Route path="components/skeleton"  element={<SkeletonPage />} />
              <Route path="components/tabs"      element={<TabsPage />} />
              <Route path="components/alert"     element={<AlertPage />} />
              <Route path="components/toast"     element={<ToastPage />} />
              <Route path="components/tooltip"   element={<TooltipPage />} />
              <Route path="components/popover"   element={<PopoverPage />} />
              <Route path="components/dialog"    element={<DialogPage />} />
              <Route path="components/code-block"        element={<CodeBlockPage />} />
              <Route path="components/spinner"           element={<SpinnerPage />} />
              <Route path="components/divider"           element={<DividerPage />} />
              <Route path="components/checkbox"          element={<CheckboxPage />} />
              <Route path="components/radio-group"       element={<RadioGroupPage />} />
              <Route path="components/toggle"            element={<TogglePage />} />
              <Route path="components/segmented-control" element={<SegmentedControlPage />} />
              <Route path="components/status-indicator"  element={<StatusIndicatorPage />} />
              <Route path="components/expandable-section" element={<ExpandableSectionPage />} />
              <Route path="components/key-value-pairs"    element={<KeyValuePairsPage />} />
              <Route path="components/breadcrumb"         element={<BreadcrumbPage />} />
              <Route path="components/pagination"         element={<PaginationPage />} />
              <Route path="components/steps"              element={<StepsPage />} />
              <Route path="components/flashbar"            element={<FlashbarPage />} />
              <Route path="components/drawer"             element={<DrawerPage />} />
              <Route path="components/copy-to-clipboard"  element={<CopyToClipboardPage />} />
              <Route path="components/table"              element={<TablePage />} />
              <Route path="components/slider"             element={<SliderPage />} />
              <Route path="components/multiselect"        element={<MultiselectPage />} />
              <Route path="components/button-group"       element={<ButtonGroupPage />} />
              <Route path="components/button-dropdown"    element={<ButtonDropdownPage />} />
              <Route path="components/form"               element={<FormPage />} />
              <Route path="components/form-field"         element={<FormPage />} />
              <Route path="components/cards"              element={<CardsPage />} />
              <Route path="components/item-card"          element={<CardsPage />} />
              <Route path="components/action-card"        element={<CardsPage />} />

              <Route path="components/toggle-button"  element={<ToggleButtonPage />} />
              <Route path="components/text-filter"    element={<TextFilterPage />} />
              <Route path="components/error-boundary" element={<ErrorBoundaryPage />} />
              <Route path="components/tiles"          element={<TilesPage />} />
              <Route path="components/list"               element={<ListPage />} />
              <Route path="components/tag-editor"         element={<TagEditorPage />} />
              <Route path="components/date-input"         element={<DateInputPage />} />
              <Route path="components/date-picker"        element={<DateInputPage />} />
              <Route path="components/date-range-picker"  element={<DateInputPage />} />
              <Route path="components/time-input"         element={<DateInputPage />} />
              <Route path="components/file-upload"        element={<FileUploadPage />} />
              <Route path="components/help-panel"         element={<HelpPanelPage />} />
              <Route path="components/anchor-nav"         element={<AnchorNavPage />} />
              <Route path="components/collection-prefs"   element={<CollectionPrefsPage />} />
              <Route path="components/attribute-editor"   element={<AttributeEditorPage />} />
              <Route path="components/property-filter"    element={<PropertyFilterPage />} />
              <Route path="components/charts"             element={<ChartsPage />} />
              <Route path="components/charts-legacy"    element={<ChartsLegacyPage />} />
              <Route path="components/calendar"           element={<CalendarPage />} />
              <Route path="components/code-editor"        element={<CodeEditorPage />} />
              <Route path="components/collection-select"  element={<CollectionSelectPage />} />
              <Route path="components/box"            element={<BoxPage />} />
              <Route path="components/link"           element={<LinkPage />} />
              <Route path="components/icon"           element={<IconPage />} />
              <Route path="components/token"          element={<TokenPage />} />
              <Route path="components/token-group"    element={<TokenPage />} />
              <Route path="components/space-between"  element={<SpaceBetweenPage />} />
              <Route path="components/column-layout"  element={<ColumnLayoutPage />} />
              <Route path="components/live-region"    element={<LiveRegionPage />} />
              <Route path="components/autosuggest"    element={<AutosuggestPage />} />

              {/* Components — planned (catch-all placeholder) */}
              <Route path="components/*" element={<PlaceholderPage />} />

              {/* Layout */}
              <Route path="layout/top-navigation"  element={<TopNavigationPage />} />
              <Route path="layout/side-navigation" element={<SideNavigationPage />} />
              <Route path="layout/container"       element={<ContainerPage />} />
              <Route path="layout/grid"            element={<GridPage />} />
              <Route path="layout/split-panel"     element={<SplitPanelPage />} />
              <Route path="layout/panel-layout"    element={<SplitPanelPage />} />
              <Route path="layout/app-layout"         element={<AppLayoutPage />} />
              <Route path="layout/app-layout-toolbar" element={<AppLayoutToolbarPage />} />
              <Route path="layout/content-layout"  element={<ContentLayoutPage />} />
              <Route path="layout/*"               element={<PlaceholderPage />} />

              {/* Patterns */}
              <Route path="patterns/app-header"     element={<AppHeaderPage />} />
              <Route path="patterns/agent-types"    element={<AgentTypesPage />} />
              <Route path="patterns/agent-card"     element={<AgentCardPage />} />
              <Route path="patterns/content-states" element={<ContentStatesPage />} />
              <Route path="patterns/data-surfaces"  element={<DataSurfacesPage />} />
              <Route path="patterns/*"              element={<PlaceholderPage />} />

              {/* Chat */}
              <Route path="chat/messages"    element={<ChatDemoPage />} />
              <Route path="chat/json-viewer" element={<ChatDemoPage />} />
              <Route path="chat/input"       element={<ChatDemoPage />} />
              <Route path="chat/execution"   element={<AgentExecutionPage />} />
              <Route path="chat/generative"  element={<GenerativeAIPage />} />
              <Route path="chat/empty"       element={<EmptyChatPage />} />
              <Route path="chat/attachments" element={<AttachmentsPage />} />
              <Route path="chat/*"           element={<PlaceholderPage />} />

              {/* Workflow */}
              <Route path="workflow/nodes"        element={<WorkflowDemoPage />} />
              <Route path="workflow/edges"        element={<WorkflowEdgesPage />} />
              <Route path="workflow/canvas"       element={<WorkflowCanvasPage />} />
              <Route path="workflow/interactions" element={<WorkflowInteractionsPage />} />
              <Route path="workflow/*"            element={<PlaceholderPage />} />

              {/* Voice & A11y */}
              <Route path="a11y/voice"         element={<VoicePrinciplesPage />} />
              <Route path="a11y/tone"          element={<ToneInPracticePage />} />
              <Route path="a11y/microcopy"     element={<MicrocopyPage />} />
              <Route path="a11y/errors"        element={<ErrorMessagesPage />} />
              <Route path="a11y/accessibility" element={<A11yIndexPage />} />
              <Route path="a11y/touch-targets" element={<TouchTargetsPage />} />
              <Route path="a11y/*"             element={<PlaceholderPage />} />

              {/* Resources */}
              <Route path="resources/downloads" element={<DownloadsPage />} />
              <Route path="resources/agents"   element={<AgentsPage />} />
              <Route path="resources/changelog" element={<ChangelogPage />} />
              <Route path="resources/*"         element={<PlaceholderPage />} />

              {/* Catch-all → home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

            {/* Example screens — full-page, no DocsLayout chrome */}
            <Route path="examples/dashboard"     element={<DashboardExamplePage />} />
            <Route path="examples/agent-monitor" element={<AgentMonitorExamplePage />} />
            <Route path="examples/data-explorer" element={<DataExplorerExamplePage />} />
            <Route path="examples/settings"      element={<SettingsExamplePage />} />
          </Routes>
          </Suspense>
          <Toaster />
        </TooltipProvider>
      </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
