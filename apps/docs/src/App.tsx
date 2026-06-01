import '@shieldai/ds'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider, Toaster, TooltipProvider, ThemeProvider } from '@shieldai/ds'
import { DocsLayout } from './layouts/DocsLayout'

// Top-level pages
import OverviewPage    from './pages/OverviewPage'
import QuickStartPage  from './pages/QuickStartPage'
import TokensPage      from './pages/TokensPage'
import PlaceholderPage from './pages/PlaceholderPage'

// Foundation pages
import ColorsPage      from './pages/foundations/ColorsPage'
import TypographyPage  from './pages/foundations/TypographyPage'
import SpacingPage     from './pages/foundations/SpacingPage'
import ElevationPage   from './pages/foundations/ElevationPage'
import MotionPage      from './pages/foundations/MotionPage'
import IconographyPage from './pages/foundations/IconographyPage'

// Component pages (done)
import ButtonPage    from './pages/components/ButtonPage'
import BadgePage     from './pages/components/BadgePage'
import AvatarPage    from './pages/components/AvatarPage'
import NeuCardPage   from './pages/components/NeuCardPage'
import InputPage     from './pages/components/InputPage'
import TextareaPage  from './pages/components/TextareaPage'
import SelectPage    from './pages/components/SelectPage'
import ProgressPage  from './pages/components/ProgressPage'
import SkeletonPage  from './pages/components/SkeletonPage'
import TabsPage      from './pages/components/TabsPage'
import AlertPage     from './pages/components/AlertPage'
import ToastPage     from './pages/components/ToastPage'
import TooltipPage   from './pages/components/TooltipPage'
import PopoverPage   from './pages/components/PopoverPage'
import DialogPage    from './pages/components/DialogPage'
import CodeBlockPage         from './pages/components/CodeBlockPage'
import SpinnerPage           from './pages/components/SpinnerPage'
import DividerPage           from './pages/components/DividerPage'
import CheckboxPage          from './pages/components/CheckboxPage'
import RadioGroupPage        from './pages/components/RadioGroupPage'
import TogglePage            from './pages/components/TogglePage'
import SegmentedControlPage  from './pages/components/SegmentedControlPage'
import StatusIndicatorPage   from './pages/components/StatusIndicatorPage'
import ExpandableSectionPage from './pages/components/ExpandableSectionPage'
import KeyValuePairsPage     from './pages/components/KeyValuePairsPage'
import BreadcrumbPage        from './pages/components/BreadcrumbPage'
import PaginationPage        from './pages/components/PaginationPage'
import StepsPage             from './pages/components/StepsPage'
import FlashbarPage          from './pages/components/FlashbarPage'
import DrawerPage            from './pages/components/DrawerPage'
import CopyToClipboardPage   from './pages/components/CopyToClipboardPage'
import TablePage             from './pages/components/TablePage'
import SliderPage            from './pages/components/SliderPage'
import MultiselectPage       from './pages/components/MultiselectPage'
import ButtonGroupPage       from './pages/components/ButtonGroupPage'
import ButtonDropdownPage    from './pages/components/ButtonDropdownPage'
import FormPage              from './pages/components/FormPage'
import CardsPage             from './pages/components/CardsPage'
import TopNavigationPage     from './pages/components/TopNavigationPage'
import ToggleButtonPage      from './pages/components/ToggleButtonPage'
import TextFilterPage        from './pages/components/TextFilterPage'
import ErrorBoundaryPage     from './pages/components/ErrorBoundaryPage'
import TilesPage             from './pages/components/TilesPage'
import ListPage              from './pages/components/ListPage'
import TagEditorPage         from './pages/components/TagEditorPage'
import SideNavigationPage    from './pages/layout/SideNavigationPage'
import DateInputPage         from './pages/components/DateInputPage'
import FileUploadPage        from './pages/components/FileUploadPage'
import HelpPanelPage         from './pages/components/HelpPanelPage'
import AnchorNavPage         from './pages/components/AnchorNavPage'
import CollectionPrefsPage   from './pages/components/CollectionPrefsPage'
import ContainerPage         from './pages/layout/ContainerPage'
import GridPage              from './pages/layout/GridPage'
import SplitPanelPage        from './pages/layout/SplitPanelPage'
import AppLayoutPage         from './pages/layout/AppLayoutPage'
import ContentLayoutPage     from './pages/layout/ContentLayoutPage'
import AttributeEditorPage   from './pages/components/AttributeEditorPage'
import PropertyFilterPage    from './pages/components/PropertyFilterPage'
import AgentsPage            from './pages/resources/AgentsPage'
import ChartsPage            from './pages/components/ChartsPage'
import ChartsLegacyPage     from './pages/components/ChartsLegacyPage'
import AppLayoutToolbarPage from './pages/layout/AppLayoutToolbarPage'
import CalendarPage          from './pages/components/CalendarPage'
import AttachmentsPage       from './pages/chat/AttachmentsPage'
import CodeEditorPage        from './pages/components/CodeEditorPage'
import CollectionSelectPage  from './pages/components/CollectionSelectPage'
import AgentExecutionPage    from './pages/chat/AgentExecutionPage'
import GenerativeAIPage      from './pages/chat/GenerativeAIPage'
import ToneInPracticePage    from './pages/a11y/ToneInPracticePage'
import BoxPage              from './pages/components/BoxPage'
import LinkPage             from './pages/components/LinkPage'
import IconPage             from './pages/components/IconPage'
import TokenPage            from './pages/components/TokenPage'
import SpaceBetweenPage     from './pages/components/SpaceBetweenPage'
import ColumnLayoutPage      from './pages/components/ColumnLayoutPage'
import LiveRegionPage        from './pages/components/LiveRegionPage'
import AutosuggestPage       from './pages/components/AutosuggestPage'
import ChatDemoPage          from './pages/chat/ChatDemoPage'
import EmptyChatPage         from './pages/chat/EmptyChatPage'
import WorkflowDemoPage        from './pages/workflow/WorkflowDemoPage'
import WorkflowEdgesPage       from './pages/workflow/WorkflowEdgesPage'
import WorkflowCanvasPage      from './pages/workflow/WorkflowCanvasPage'
import WorkflowInteractionsPage from './pages/workflow/WorkflowInteractionsPage'
import DownloadsPage         from './pages/resources/DownloadsPage'
import ChangelogPage         from './pages/resources/ChangelogPage'
// Patterns
import AppHeaderPage         from './pages/patterns/AppHeaderPage'
import AgentTypesPage        from './pages/patterns/AgentTypesPage'
import AgentCardPage         from './pages/patterns/AgentCardPage'
import ContentStatesPage     from './pages/patterns/ContentStatesPage'
import DataSurfacesPage      from './pages/patterns/DataSurfacesPage'
// Voice & A11y
import VoicePrinciplesPage   from './pages/a11y/VoicePrinciplesPage'
import MicrocopyPage         from './pages/a11y/MicrocopyPage'
import ErrorMessagesPage     from './pages/a11y/ErrorMessagesPage'
import A11yIndexPage         from './pages/a11y/A11yIndexPage'
import TouchTargetsPage      from './pages/a11y/TouchTargetsPage'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
      <ToastProvider>
        <TooltipProvider delayDuration={300}>
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
          </Routes>
          <Toaster />
        </TooltipProvider>
      </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
