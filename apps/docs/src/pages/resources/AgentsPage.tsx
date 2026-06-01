import { CodeBlock, CopyToClipboard } from '@shieldai/ds'
import { DocSection } from '../../components/docs'

const INSTALL = `pnpm add @shieldai/ds`

const IMPORT = `// In your entry file — imports tokens.css automatically
import '@shieldai/ds'

// Import components
import { Button, Badge, AgentNode, StatusDot } from '@shieldai/ds'
import type { AgentType } from '@shieldai/ds'`

const TOKEN_REF = `/* CSS custom properties — use in any style context */
--ds-bg:       #050101   /* Page background */
--ds-panel:    #0b0b11   /* Card / panel surface */
--ds-fg:       #f8f8f2   /* Primary text */
--ds-comment:  #6272a4   /* Secondary text */
--ds-purple:   #bd93f9   /* Primary accent */
--ds-green:    #50fa7b   /* Success / positive */
--ds-pink:     #ff79c6   /* Highlight / hover */
--ds-cyan:     #8be9fd   /* Info / workflow */
--ds-orange:   #ffb86c   /* Warning / loop */
--ds-yellow:   #f1fa8c   /* Notice / sequential */
--ds-red:      #ff5555   /* Error / danger */
--ds-current:  rgba(98,114,164,.25)  /* Border / divider */`

const AGENT_TYPES = `/* 7 agent types — use agentType prop on AgentNode and AgentBadge */
llm        → green  (#50fa7b)  — Language model node
a2a        → purple (#bd93f9)  — Agent-to-agent call
sequential → yellow (#f1fa8c)  — Step-by-step execution
parallel   → pink   (#ff79c6)  — Concurrent branches
loop       → orange (#ffb86c)  — Iterative execution
workflow   → cyan   (#8be9fd)  — Orchestrated pipeline
task       → red    (#ff5555)  — Discrete unit of work`

const COMPONENT_SNIPPETS = `/* ── Primitives ──────────────────────────────────────────── */
<Button variant="neu-purple" size="md">Deploy</Button>
<Badge variant="green">live</Badge>
<Avatar role="bot" size="md" />
<NeuCard variant="purple"><p>Content</p></NeuCard>
<Spinner color="purple" label="Loading agents..." />
<Divider label="or" />
<Box variant="panel" padding="md">...</Box>
<Icon icon={<Zap />} size="lg" className="text-ds-yellow" />
<Link href="#" variant="external">Docs</Link>

/* ── Forms ───────────────────────────────────────────────── */
<Input placeholder="Agent name" leftElement={<Search />} />
<Textarea placeholder="Prompt…" />
<Select items={items} placeholder="Choose type" />
<Checkbox label="Enable logging" />
<RadioGroup name="mode" items={[{value:'a',label:'Auto'},{value:'m',label:'Manual'}]} />
<Toggle label="Active" checked={on} onCheckedChange={setOn} />
<ToggleButton pressed={p} onChange={setP}>Bold</ToggleButton>
<Slider min={0} max={100} value={val} onChange={setVal} />
<Multiselect items={items} value={selected} onChange={setSelected} />
<Autosuggest options={opts} onSelect={setVal} />
<DateInput value={date} onChange={setDate} />
<TimeInput value={time} onChange={setTime} showSeconds />
<TagEditor fields={fields} value={rows} onChange={setRows} />
<AttributeEditor fields={fields} value={rows} onChange={setRows} />
<Form onSubmit={handleSubmit}>...</Form>
<FormField label="Name" required error={err}><Input /></FormField>
<TextFilter onChange={setQuery} matchCount={n} />
<PropertyFilter properties={props} value={filters} onChange={setFilters} />

/* ── Feedback ────────────────────────────────────────────── */
<Alert variant="error"><AlertTitle>Failed</AlertTitle></Alert>
<Progress value={60} color="green" showLabel glow />
<Skeleton className="h-8 w-full" />
<Flashbar items={notifications} />
<ErrorBoundary fallback={(e, reset) => <button onClick={reset}>Retry</button>}>
<LiveRegion>{message}</LiveRegion>

/* ── Overlays ────────────────────────────────────────────── */
<Tooltip content="Details"><Button>Hover me</Button></Tooltip>
<Popover trigger={<Button>Open</Button>}><PopoverItem>Action</PopoverItem></Popover>
<Dialog open={open} onOpenChange={setOpen}><DialogContent>...</DialogContent></Dialog>
<Drawer open={open} onClose={close} side="right">...</Drawer>
<HelpPanel open={open} onClose={close} title="Help">...</HelpPanel>
<CollectionPreferences open={open} onClose={close} columns={cols} onColumnsChange={setCols} />

/* ── Navigation ──────────────────────────────────────────── */
<Tabs defaultValue="a"><TabsList>...</TabsList><TabsContent value="a">...</TabsContent></Tabs>
<SegmentedControl items={items} value={val} onChange={setVal} />
<BreadcrumbGroup items={[{label:'Home',href:'/'},{label:'Agents'}]} />
<Pagination currentPage={p} totalPages={10} onChange={setP} />
<Steps steps={steps} activeStep={2} orientation="horizontal" />
<ExpandableSection title="Advanced"><p>...</p></ExpandableSection>
<ButtonGroup><Button>A</Button><Button>B</Button></ButtonGroup>
<ButtonDropdown label="Actions" groups={groups} />
<AnchorNav items={tocItems} />

/* ── Data display ────────────────────────────────────────── */
<Table columns={cols} data={rows} sortable selectable />
<Cards items={cards} onSelect={setSelected} />
<KeyValuePairs items={[{label:'Region',value:'us-east-1'}]} />
<StatusIndicator status="positive">All systems nominal</StatusIndicator>

/* ── Layout ──────────────────────────────────────────────── */
<TopNavigation logo={<Logo />} links={links} />
<SideNavigation sections={sections} width={240} />
<SplitPanel first={<Left />} second={<Right />} defaultSplit={35} />
<ColumnLayout columns={3}><Card /><Card /><Card /></ColumnLayout>
<Grid cols={12} gap="md"><GridItem span={6}>...</GridItem></Grid>
<Container header={<h2>Title</h2>} footer={<Button>Save</Button>}>...</Container>
<SpaceBetween direction="horizontal" size="md"><Badge /><Badge /></SpaceBetween>

/* ── Tokens / misc ───────────────────────────────────────── */
<Token label="tag" variant="purple" onDismiss={remove} />
<TokenGroup label="Filters" tokens={tokens} onDismiss={dismiss} />
<Tiles items={tileItems} value={selected} onChange={setSelected} />
<List items={listItems} selected={sel} onSelect={setSel} />
<FileUpload accept=".json,.csv" onChange={setFiles} />
<CopyToClipboard value="pnpm add @shieldai/ds" />
<CodeBlock code={snippet} lang="tsx" showLineNumbers />

/* ── Agent / AI ──────────────────────────────────────────── */
<AgentBadge agentType="llm" size="md" />
<StatusDot status="live" label="Online" />
<AgentNode agentType="workflow" label="Orchestrator" status="live" description="..." />
<ChatMessage role="assistant" content="Hello!" timestamp="10:42 AM" />
<ChatInput value={msg} onChange={setMsg} onSubmit={send} />
<JSONViewer data={result} />
<EmptyChatState suggestions={['Deploy agent', 'Show metrics']} onSuggestionClick={send} />`

const STYLING_RULES = `/* DO ✓ */
className="text-ds-purple bg-ds-panel border-ds-current"
className={cn('text-ds-fg', isActive && 'text-ds-purple')}

/* DON'T ✗ */
style={{ color: '#bd93f9' }}           // never hex literals outside tokens
className="text-purple-500"           // never Tailwind palette classes
className="bg-[#0b0b11]"              // never arbitrary values for DS colors`

const NEW_COMPONENT = `1. Create  packages/core/src/components/primitives/MyComponent.tsx
2. Export  from packages/core/src/components/primitives/index.ts
3. Verify  pnpm typecheck passes
4. Build   pnpm build:lib — check dist/index.js exports
5. Create  apps/docs/src/pages/components/MyComponentPage.tsx
6. Route   add <Route path="components/my-component" element={<MyComponentPage />} /> in App.tsx
7. Nav     add entry to apps/docs/src/layouts/nav.ts
8. Test    pnpm dev → verify live preview, code block, props table`

export default function AgentsPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-ds-purple mb-1">08 · Resources</div>
        <h1 className="text-3xl font-bold text-ds-fg mb-3">AGENTS.md</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Reference for AI coding agents. Covers install, token palette, agent type mapping, full component API cheatsheet, styling rules, and the checklist for adding a new component.
        </p>
      </div>

      <DocSection title="Install">
        <div className="flex items-center gap-2">
          <CodeBlock code={INSTALL} lang="bash" />
          <CopyToClipboard value={INSTALL} />
        </div>
        <p className="text-xs text-ds-comment mt-2">Then import <code className="text-ds-purple font-mono">@shieldai/ds</code> once at your app entry — this injects all CSS tokens as a side effect.</p>
      </DocSection>

      <DocSection title="Entry import">
        <CodeBlock code={IMPORT} lang="tsx" />
      </DocSection>

      <DocSection title="Token reference">
        <CodeBlock code={TOKEN_REF} lang="css" />
        <p className="text-xs text-ds-comment mt-2">Use Tailwind classes like <code className="text-ds-purple font-mono">text-ds-purple</code>, <code className="text-ds-purple font-mono">bg-ds-panel</code>, <code className="text-ds-purple font-mono">border-ds-current</code>. Never use hex literals outside <code className="font-mono">tokens.css</code>.</p>
      </DocSection>

      <DocSection title="Agent type mapping">
        <CodeBlock code={AGENT_TYPES} lang="css" />
      </DocSection>

      <DocSection title="Component API cheatsheet">
        <CodeBlock code={COMPONENT_SNIPPETS} lang="tsx" showLineNumbers />
      </DocSection>

      <DocSection title="Styling rules">
        <CodeBlock code={STYLING_RULES} lang="tsx" />
      </DocSection>

      <DocSection title="Adding a new component — checklist">
        <CodeBlock code={NEW_COMPONENT} lang="bash" />
      </DocSection>
    </div>
  )
}
