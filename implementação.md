# ShieldAI Design System — Implementação Completa

> React 18 · Vite · TypeScript · Tailwind CSS · CVA · Radix UI · Lucide React · Shiki  
> **85 componentes do catálogo + patterns + chat + workflow + a11y + landing page + AGENTS.md**

Legenda: ✅ concluído · [ ] pendente

---

## Fase 1 — Scaffolding e tokens ✅

### 1.1 Estrutura do workspace
- [x] Criar `package.json` raiz com `"workspaces": ["packages/*", "apps/*"]` e pnpm
- [x] Criar pasta `packages/core/` com `package.json` nomeado `@shieldai/ds`
- [x] Criar pasta `apps/docs/` via `pnpm create vite apps/docs --template react-ts`
- [x] Configurar `pnpm-workspace.yaml` listando `packages/*` e `apps/*`
- [x] Criar `.gitignore` cobrindo `node_modules`, `dist`, `.turbo`
- [x] Instalar dependências raiz: `typescript`, `eslint`, `prettier`

### 1.2 Pacote core (`packages/core`)
- [x] Instalar dependências: `react`, `react-dom` como peerDeps
- [x] Instalar devDeps: `tsup`, `typescript`, `@types/react`
- [x] Instalar deps: `class-variance-authority`, `clsx`, `tailwind-merge`
- [x] Instalar Radix UI: dialog, popover, tabs, select, tooltip, progress
- [x] Instalar deps: `lucide-react`, `framer-motion`, `shiki`
- [x] Criar `tsconfig.json` com `"jsx": "react-jsx"`, `"strict": true`
- [x] Criar `tsup.config.ts` com entry, formats esm/cjs, dts, externals react
- [x] Configurar `package.json` exports

### 1.3 App docs (`apps/docs`)
- [x] Instalar deps: `react-router-dom`, `shiki`, `lucide-react`
- [x] Instalar `@shieldai/ds` via workspace (`"workspace:*"`)
- [x] Configurar `vite.config.ts` com alias `@shieldai/ds` + dedupe React
- [x] Configurar `tailwind.config.ts` importando o preset do core
- [x] Criar `postcss.config.cjs`

### 1.4 Tokens — CSS
- [x] Criar `packages/core/src/tokens/tokens.css` com todos os `--ds-*`
- [x] Adicionar variáveis `--ds-header-h`, `--ds-sidebar-w`, `--ds-max-w`
- [x] Importar `tokens.css` no entry `packages/core/src/index.ts` como side-effect

### 1.5 Tokens — TypeScript
- [x] Criar `packages/core/src/tokens/tokens.ts` com objeto `ds` tipado
- [x] Exportar tipos `DSColor`, `DSSignal`, `DSFont`, `DSSpacing`, `DSRadius`, `DSShadow`, `DSMotion`
- [x] Criar `packages/core/src/tokens/agentTypes.ts` com mapa `AGENT_TYPES` (7 tipos)
- [x] Exportar tipo `AgentType`

### 1.6 Tokens — Tailwind preset
- [x] Portar `ds/tailwind-preset.js` para `packages/core/src/tokens/tailwind-preset.ts`
- [x] Adicionar keyframes `pulse-glow` e `spin-slow`
- [x] Exportar como default

### 1.7 Utilitários
- [x] Criar `packages/core/src/lib/cn.ts` com `clsx` + `twMerge`
- [x] Criar `packages/core/src/lib/formatCode.ts`
- [x] Criar `packages/core/src/index.ts` barrel principal

### 1.8 Critério de aceite ✅
- [x] `pnpm dev` → `localhost:5173` com fundo `#050101`
- [x] Fonte JetBrains Mono carregando
- [x] Classe `bg-ds-panel` resolve para `#0b0b11`
- [x] Zero erros TypeScript

---

## Fase 2A — Primitivos base (16 componentes) ✅

> Todos já implementados em `packages/core/src/components/primitives/` e `feedback/` e `overlay/`

- [x] **Button** — 10 variantes (6 Dracula + 4 Neu), 4 sizes, loading, leftIcon, rightIcon
- [x] **Badge** — 8 cores signal + 4 solid, dot, icon
- [x] **Avatar** — user/bot/tool/default, 3 sizes, src com fallback, initials
- [x] **NeuCard** — 7 variantes de cor, `as` polimórfico
- [x] **Input** — 4 variantes, leftElement/rightElement
- [x] **Textarea** — 4 variantes, prop resize
- [x] **Select** — Radix Select, items e groups, check mark, search
- [x] **Progress** — 5 cores, showLabel, glow animado
- [x] **Skeleton** — shimmer 200% gradient, honours reduced-motion
- [x] **Tabs** — Radix Tabs, TabsList/TabsTrigger/TabsContent, counter, badge
- [x] **Alert** — 4 variantes + AlertTitle/AlertDescription
- [x] **Toast** + **useToast** — Context reducer, 4 variantes, auto-dismiss, Toaster, ToastProvider
- [x] **Tooltip** — Radix Tooltip, animações, 4 posições
- [x] **Popover** — Radix Popover, PopoverItem com danger, PopoverSeparator
- [x] **Dialog** — Radix Dialog, variante neu, DialogHeader/Footer/Title/Description
- [x] **CodeBlock** — Shiki + tema Dracula, copy button, line numbers, fallback

---

## Fase 2B — Primitivos faltantes (29 componentes)

### Controles booleanos e de seleção
- [x] **Checkbox** — boolean · indeterminate · group · label_right · focus-visible ring
- [x] **Radio Button** — single boolean within a group · 5 states (default/hover/focus/checked/disabled)
- [x] **Radio Group** — mutually exclusive set · vertical · with description · card style variant
- [x] **Toggle** — binary switch · instant apply · with description · colored variants (green/purple)
- [x] **Toggle Button** — button que mantém pressed state · binary toolbar actions · ativo = neu variant
- [x] **Segmented Control** — 2–5 opções exclusivas · single line · icon ou text · similar a TabsList mas horizontal

### Inputs avançados
- [x] **Slider** — numeric range · single thumb · dual thumb · stepped · with_marks · glow track
- [x] **Multiselect** — pick several from finite list · tokens in trigger · search inside · dismiss token
- [x] **Autosuggest** — free-text input com filtered suggestion list · accepts any value · debounced
- [x] **Date Input** — segmented yyyy/mm/dd · keyboard-first · no popover · arrow key increment
- [x] **Date Picker** — single date · input + calendar popover · month navigation
- [x] **Date Range Picker** — dual-pane calendar · relative options (last 7d, last 30d) · timezone-aware
- [x] **Time Input** — segmented hh:mm:ss · 24h ou 12h · keyboard-first
- [x] **Tag Editor** — key:value list · add/remove rows · typeahead on key + value
- [x] **Attribute Editor** — repeating row of form fields · key-value, tag-like, env-vars

### Layout utility
- [x] **Box** — primitive container · padding · margin · color · text variants · polimórfico
- [x] **Divider** — horizontal · vertical · labelled · dashed · com spacing
- [x] **Space Between** — utility layout · consistent gap entre siblings · vertical/horizontal
- [x] **Column Layout** — responsive equal-column grid · 1–4 cols · auto-collapse

### Navegação e ação
- [x] **Link** — inline · nav · external · disabled · with_icon · herda cor do contexto
- [x] **Button Dropdown** — button + chevron · groups multiple actions behind one trigger
- [x] **Button Group** — segmented set of related actions · toolbar · view switcher
- [x] **Breadcrumb Group** — hierarchical path · collapses on overflow · separador `/`

### Tokens / chips
- [x] **Token** — pill com text + dismiss · represents a removable selection · 7 cores
- [x] **Token Group** — labelled list of tokens · with collapse +N · dismiss all

### Formulário scaffold
- [x] **Form** — page-level form scaffold · header · sections · actions · errors summary
- [x] **Form Field** — label · description · control · constraint · error message · required marker

### Utilitários de sistema
- [x] **Copy to Clipboard** — inline · icon · button · with success toast (2s feedback)
- [x] **Live Region** — invisible aria-live container · announces dynamic updates · polite/assertive
- [x] **Spinner** — indeterminate icon · inline · with_label · 4 sizes · herda cor do contexto
- [x] **Icon** — wrapper Lucide · stroke 1.5–2 · inherits currentColor · size prop (sm/md/lg/xl)
- [x] **Expandable Section** — collapsible block · default · navigation · footer · inline variant

---

## Fase 3 — Data display (10 componentes)

- [x] **Table** — sortable columns · selectable rows · sticky header · expandable rows · cell editor inline · empty state · loading state com Skeleton
- [x] **Cards** (collection) — grid de cards · selection state · empty state · loading state
- [x] **Item Card** — single record card · thumbnail · meta · actions · dentro de Cards
- [x] **Action Card** — container com primary CTA · one-action-per-card surface
- [x] **Key-Value Pairs** — dense read-only attribute display · grouped · inline_or_stacked
- [x] **Status Indicator** — icon + label · 7 statuses (positive/negative/warning/info/stopped/in-progress/pending) · inline · inside_row
- [x] **Steps** — vertical ou horizontal step indicator · wizard · timeline · status por step
- [x] **Pagination** — page navigation · numbered · cursor · page_size_picker · info "X–Y de Z"
- [x] **Text Filter** — free-text search bound a collection · debounced · match count
- [x] **Property Filter** — query builder · attribute : operator : value · boolean combine · tokens

---

## Fase 4 — Charts (3 componentes)

- [x] **Charts** — line · area · bar · pie · mixed · neon-on-dark · usando recharts ou visx com cores do DS
- [ ] **Charts (Legacy)** — simpler embedded chart · frozen API · wrapper sobre Charts principal
- [x] **Collection Select Filter** — dropdown que filtra collection por single attribute · integra com Table e Cards

---

## Fase 5 — Layout e navegação (9 componentes)

- [x] **Top Navigation** — product chrome · logo · primary links · utility area · search · 64px · backdrop-blur
- [x] **Side Navigation** — vertical app nav · sections · nested · collapsible · expandable · badge count
- [x] **App Layout** — top-level shell · top-nav + sidebar + content + drawer · grid layout responsivo
- [ ] **App Layout Toolbar** — secondary toolbar dentro do shell · contextual actions da view atual
- [x] **Content Layout** — page-level scaffold · header band · breadcrumbs · main · secondary column
- [x] **Panel Layout** — split panel · bottom ou right · resizable · collapsible · drag handle
- [x] **Split Panel** — resizable two-pane layout · horizontal/vertical · collapsible · min-size respeitado
- [x] **Anchor Navigation** — sticky in-page TOC · scroll-spy · active link highlight
- [x] **Help Panel** — contextual docs sidecar · anchored ao campo em foco · collapsible

---

## Fase 6 — Overlays e feedback avançados (6 componentes)

- [x] **Drawer** — side-anchored panel · context para selection · stacked over content · left/right/bottom
- [x] **Flashbar** — stacked page-level notifications · persists across nav · stackable · dismiss individual/all
- [x] **Error Boundary** — catches render errors · fallback UI com retry button · telemetry hook opcional
- [x] **Collection Preferences** — dialog · configure columns visíveis · page size · wrap · density
- [x] **File Uploading Components** — drop zone · selected list · inline progress bar · validation errors
- [x] **Header** (section) — section header · h1/h2/h3 · description · counter badge · actions · info_link

---

## Fase 7 — Componentes avançados / especializados (7 componentes)

- [x] **Calendar** — month grid · single/range/multi select · keyboard nav · min/max date
- [x] **Code Editor** — Monaco-backed · syntax highlight · lint · multi-cursor · tema Dracula
- [x] **Tiles** — large radio cards · visual picker para one_of_many · icon + label + description
- [x] **List** — vertical row collection · selectable · reorderable (drag) · sectioned
- [x] **Grid** — 12-col responsive layout · spans · offsets · gap · helper classes
- [x] **Container** — generic surface · header · content · footer · optional media header
- [ ] **S3 Resource Selector** — pick bucket + path · type-ahead · browse tree (específico da plataforma EVO)

---

## Fase 8 — Componentes de agente e AI (15 componentes)

### Agente primitivos
- [x] **AgentBadge** — Badge com ícone + cor por `agentType` dos 7 tipos
- [x] **StatusDot** — live/idle/error/pending com animações
- [x] **AgentNode** — NeuCard com border colorida por tipo, StatusDot, handles de conexão
- [x] **WorkflowEdge** — SVG bezier path entre nós, colored por agentType, animated dash

### Chat surfaces (04)
- [x] **ChatMessage** — role user/bot/tool · Avatar correspondente · timestamp · suporte markdown · streaming skeleton
- [x] **ChatInput** — Textarea neu-purple · auto-resize · submit Enter · shift+Enter newline · disabled durante processing
- [x] **AgentExecutionView** — log de execução expandível · tool calls aninhados · timestamps · status por step
- [x] **JSONViewer** — read-only tree colapsável · syntax colored · copy node · busca dentro do JSON
- [x] **InlineDataAttachment** — file card no chat · ícone por tipo · tamanho · download · preview imagem
- [x] **EmptyChatState** — estado inicial do chat · prompt suggestions · ilustração

### Workflow canvas (05)
- [x] **WorkflowNodeTypes** — implementar os 7 tipos de AgentNode no canvas com layout específico
- [x] **WorkflowHandlesEdges** — handles de input/output por tipo · edges com label · animated quando live
- [x] **WorkflowFullCanvas** — canvas completo com zoom/pan · minimap · toolbar de controles
- [x] **WorkflowInteractions** — click para selecionar · drag para mover · connect nodes · context menu

### Generative AI
- [x] **GenerativeAIComponents** — prompt input com sugestões · streaming bubble com cursor blink · thinking indicator · sources list · feedback thumbs up/down

---

## Fase 9 — Patterns (03) — composições de componentes

- [x] **AppHeader** — 64px · backdrop-blur · logo · nav links · utility area · active link glow
- [x] **SecondarySidebar** — secondary nav panel · groups · nested items · collapsible sections
- [x] **AgentTypeCoding** — showcase dos 7 tipos com cor + ícone + label + uso
- [x] **AgentCardFullAnatomy** — card completo com todos os elementos anatomizados (header, body, footer, handles, status)
- [x] **ContentStates** — empty state · loading (Skeleton) · error (Alert + retry) · success
- [x] **DataSurfaces** — Table + Pagination + Filters + Stats cards compostos

---

## Fase 10 — Voice & A11y (06)

- [x] **VoicePrinciples** — página com os princípios de voz da plataforma (tom, pessoa, estilo)
- [x] **MicrocopyLibrary** — biblioteca de strings reutilizáveis categorizadas (labels, placeholders, erros)
- [x] **ErrorMessageFormat** — formato padrão de mensagens de erro com exemplos DO/DON'T
- [x] **ToneInPractice** — exemplos de tom correto vs. incorreto por contexto
- [x] **AccessibilityGuide** — ARIA live regions · focus management · color contrast table · keyboard map
- [x] **TouchTargetsSizing** — guia de tamanhos mínimos · 44px touch · densidade · responsive

---

## Fase 11 — Landing page de documentação (apps/docs)

### 11.1 Layout base
- [x] Criar `DocsLayout.tsx` com grid `260px 1fr`
- [x] Criar `Sidebar.tsx` com brand mark + navegação das 8 seções + links numerados
- [x] Link ativo com texto purple + barra esquerda purple
- [x] Sidebar sticky `height: 100vh`
- [x] Content area com `overflow-y: auto` e padding `48px`
- [x] Mobile: sidebar colapsável com hamburger

### 11.2 Componente ComponentBlock
- [x] Criar `ComponentBlock.tsx` com props: id, number, title, tag, preview, code, props table
- [x] Preview em área com `bg-ds-bg border-ds-current` e label no canto
- [x] `CodeBlock` com código de uso abaixo do preview
- [x] Tabela de props com colunas: prop · type · default · description
- [ ] Tabs `Preview | Code | Props` para mobile
- [ ] Âncora de deep-link pelo `id`

### 11.3 Página 00 — Hero
- [ ] `HeroSection.tsx` com grid-bg + scanline como React components
- [ ] Título clamp(56px, 8vw, 96px) · purple glow · green glow
- [ ] Terminal line com cursor blink
- [ ] 3 botões CTA
- [ ] Grid stats: Pages 08 / Components 85 / Agent_types 07 / Tokens 62
- [ ] `PrinciplesSection.tsx` com 5 cards de princípios

### 11.4 Página 01 — Foundations
- [x] `ColorSection.tsx` — swatches surface + text + signal com chip/nome/hex/uso
- [x] `TypographySection.tsx` — escala font-size + families + specimen
- [x] `SpacingSection.tsx` — barras horizontais para cada spacing token
- [x] `ShadowSection.tsx` — todos glows + neu shadows com exemplo ao vivo
- [x] `MotionSection.tsx` — demo interativo fast/default/slow + ease-out vs ease-spring
- [x] `IconographySection.tsx` — grid de todos os ícones Lucide usados no DS + stroke guide

### 11.5 Página 02 — Components (todos os 85)
- [ ] `ComponentsPage.tsx` com sidebar TOC interna por categoria
- [ ] Seção **Primitivos** — Button, Badge, Avatar, NeuCard, Box, Divider, Link, Icon, Spinner, Space Between
- [ ] Seção **Formulários** — Input, Textarea, Select, Multiselect, Autosuggest, Checkbox, Radio, Toggle, Toggle Button, Slider, Date Input, Date Picker, Date Range Picker, Time Input, Tag Editor, Attribute Editor, Form, Form Field, Copy to Clipboard
- [ ] Seção **Feedback** — Alert, Toast, Progress, Skeleton, Flashbar, Live Region, Error Boundary
- [ ] Seção **Overlays** — Tooltip, Popover, Dialog/Modal, Drawer, Help Panel, Collection Preferences
- [ ] Seção **Navegação** — Tabs, Segmented Control, Breadcrumb, Anchor Navigation, Button Group, Button Dropdown, Expandable Section, Steps, Pagination
- [ ] Seção **Layout** — App Layout, Content Layout, Side Navigation, Top Navigation, Panel Layout, Split Panel, Column Layout, Grid, Container
- [ ] Seção **Data Display** — Table, Cards, Item Card, Action Card, Key-Value Pairs, Status Indicator, Charts, Charts Legacy
- [ ] Seção **Filtros** — Text Filter, Property Filter, Collection Select Filter
- [ ] Seção **Inputs especializados** — Calendar, File Upload, Tiles, List, Token, Token Group, Segmented Control, Tag Editor
- [ ] Seção **Code** — CodeBlock, Code Editor
- [ ] Seção **Misc** — Header (section), Text Content, Board Components, S3 Resource Selector
- [ ] Cada componente com: `ComponentBlock` (live preview + código copiável + props table)

### 11.6 Página 03 — Patterns
- [x] `AppHeaderPattern.tsx` — header 64px com componentes reais
- [x] `SecondarySidebarPattern.tsx` — sidebar com grupos colapsáveis
- [x] `AgentTypeCodingPattern.tsx` — showcase dos 7 tipos com cores
- [x] `AgentCardAnatomyPattern.tsx` — card completo anatomizado
- [x] `ContentStatesPattern.tsx` — empty/loading/error ao vivo
- [x] `DataSurfacesPattern.tsx` — Table + Pagination + Filters compostos

### 11.7 Página 04 — Chat
- [x] `ChatDemoPage.tsx` com conversa completa: user → bot streaming → tool call → tool result
- [x] `ChatInput` funcional adicionando mensagens ao estado local
- [x] `AgentExecutionView` expandível com steps
- [x] `JSONViewer` para tool results
- [x] `InlineDataAttachment` com file cards
- [x] `EmptyChatState` como estado inicial
- [x] Scroll automático para última mensagem

### 11.8 Página 05 — Workflow
- [x] `WorkflowDemoPage.tsx` com canvas e 6+ AgentNodes conectados
- [x] Cobrir todos os 7 tipos de agente na demo
- [ ] Nó selecionado ao click mostra painel de propriedades
- [ ] Animação de edge para nós com status `live`
- [ ] Toolbar de zoom/pan/fit

### 11.9 Página 06 — Voice & A11y
- [x] `A11yPage.tsx` com as 6 seções da página original portadas em React
- [x] Exemplos interativos de ARIA live regions
- [ ] Toggle para ver componentes sem animação (reduced-motion)
- [x] Tabela de contraste WCAG
- [x] Mapa de atalhos por componente

### 11.10 Página 07 — Resources
- [x] `ResourcesPage.tsx` com cards de download
- [x] Download `tokens.css`, `tokens.json`, `tailwind-preset.ts`
- [x] Snippet `pnpm add @shieldai/ds` copiável
- [x] Viewer do `AGENTS.md` renderizado como markdown estilizado
- [x] Changelog da v1.0.0

### 11.11 Roteamento e qualidade
- [x] `App.tsx` com `<BrowserRouter>` + `<Routes>` e `DocsLayout` como Outlet
- [x] Rotas: `/`, `/foundations`, `/components`, `/patterns`, `/chat`, `/workflow`, `/a11y`, `/resources`
- [ ] Redirect `*` → `/`
- [ ] `vite.config.ts` com `base: './'` para deploy estático
- [ ] `404.html` para SPA routing
- [ ] Scroll to top em mudança de rota

---

## Fase 12 — AGENTS.md

- [x] Seção **Identity** — nome, stack, paleta, dois eixos visuais
- [x] Seção **Install** — `pnpm add @shieldai/ds` + import de `tokens.css`
- [x] Seção **Token reference** — tabela completa: var CSS · classe Tailwind · valor hex · uso semântico
- [x] Seção **Agent type mapping** — tabela dos 7 tipos: cor · ícone · caso de uso
- [x] Seção **Component API cheatsheet** — snippet mínimo de uso para cada um dos 85 componentes
- [x] Seção **Patterns — DO / DON'T** — decisões de composição corretas e erradas
- [x] Seção **File conventions** — PascalCase · barrel exports · tests co-located
- [x] Seção **Styling rules** — só `cn()` · jamais hex literal · jamais `style={{color: '#...'}}`
- [x] Seção **Accessibility baseline** — aria-label obrigatório em icon buttons · focus-visible obrigatório
- [x] Seção **Adding a new component** — checklist de 8 passos para agentes seguirem
- [ ] Validar AGENTS.md com agente de teste

---

## Fase 13 — Testes

- [ ] Configurar `vitest` com `jsdom` em `packages/core`
- [ ] Instalar `@testing-library/react`, `@testing-library/user-event`
- [ ] Teste **Button** — render · classes por variante · click handler · loading state
- [ ] Teste **Badge** — 8 variantes de cor renderizam · dot · icon
- [ ] Teste **Checkbox** — checked · indeterminate · disabled · onChange
- [ ] Teste **Input** — valor controlado · erro · leftElement
- [ ] Teste **Select** — abre · seleciona item · onChange
- [ ] Teste **Tabs** — troca de aba · conteúdo correto
- [ ] Teste **Toast / useToast** — adicionar · auto-dismiss · remover manualmente
- [ ] Teste **Dialog** — abre · fecha · trap de foco
- [ ] Teste **AgentBadge** — cada agentType renderiza cor e ícone corretos
- [ ] Teste **Table** — sort · select row · pagination
- [ ] Teste **cn()** — merge correto de classes conflitantes
- [ ] `pnpm test` passa 100%

---

## Fase 14 — Build e publicação

### 14.1 Build da lib
- [x] `pnpm build:lib` gera `packages/core/dist/` sem erros
- [x] Verificar `dist/index.js` (ESM) e `dist/index.cjs` (CJS)
- [x] Verificar `dist/index.d.ts` com todos os tipos
- [ ] Verificar `dist/tokens.css` copiado
- [ ] Testar instalação via `file:../packages/core` em projeto externo

### 14.2 Build da docs
- [ ] `pnpm build` em `apps/docs` gera `dist/` sem erros
- [ ] Todas as rotas funcionam com `index.html` fallback
- [ ] Fontes, tokens CSS e assets incluídos
- [ ] Lighthouse score ≥ 90 performance / 100 a11y

### 14.3 Scripts raiz
- [x] `"dev"`: `pnpm -C apps/docs dev`
- [x] `"build"`: `pnpm -C apps/docs build`
- [x] `"build:lib"`: `pnpm -C packages/core build`
- [ ] `"test"`: `pnpm -C packages/core test`
- [ ] `"lint"`: ESLint em packages/core + apps/docs
- [x] `"typecheck"`: tsc --noEmit nos dois pacotes

### 14.4 Publicação
- [ ] Adicionar `"publishConfig": { "access": "public" }` ao core
- [ ] `npm publish --dry-run` para verificar pacote
- [ ] Publicar com `npm publish`

---

## Critério de aceite global

- [x] `pnpm dev` → landing page completa em `localhost:5173` sem erros no console
- [ ] Todas as 8 rotas carregam e mostram demos funcionais
- [ ] Todos os 85 componentes têm `ComponentBlock` com preview ao vivo + código copiável + props table
- [ ] Copy button em `CodeBlock` funciona em todos os snippets
- [ ] `useToast` dispara e fecha toasts nas 4 variantes
- [ ] `Dialog` com trap de foco funciona via teclado
- [ ] `Table` sortável e com row selection funcional
- [x] `Charts` renderiza com as cores neon do DS
- [ ] Workflow canvas com zoom/pan e 7 tipos de nó
- [ ] Chat demo com streaming skeleton funcional
- [x] `pnpm build:lib` gera dist limpo sem erros TypeScript
- [ ] `pnpm test` passa todos os testes
- [x] `AGENTS.md` cobre todos os 85 componentes com snippets
- [ ] Nenhum valor hex hardcoded fora de `tokens.css` e `tailwind-preset.ts`
- [ ] Lighthouse a11y = 100 na landing page

---

## Resumo de componentes por fase

| Fase | Componentes | Total |
|---|---|---|
| 2A (✅ feito) | Button, Badge, Avatar, NeuCard, Input, Textarea, Select, Progress, Skeleton, Tabs, Alert, Toast, Tooltip, Popover, Dialog, CodeBlock | 16 |
| 2B | Checkbox, Radio Button, Radio Group, Toggle, Toggle Button, Segmented Control, Slider, Multiselect, Autosuggest, Date Input, Date Picker, Date Range Picker, Time Input, Tag Editor, Attribute Editor, Box, Divider, Space Between, Column Layout, Link, Button Dropdown, Button Group, Breadcrumb Group, Token, Token Group, Form, Form Field, Copy to Clipboard, Live Region, Spinner, Icon, Expandable Section | 32 |
| 3 | Table, Cards, Item Card, Action Card, Key-Value Pairs, Status Indicator, Steps, Pagination, Text Filter, Property Filter | 10 |
| 4 | Charts, Charts Legacy, Collection Select Filter | 3 |
| 5 | Top Navigation, Side Navigation, App Layout, App Layout Toolbar, Content Layout, Panel Layout, Split Panel, Anchor Navigation, Help Panel | 9 |
| 6 | Drawer, Flashbar, Error Boundary, Collection Preferences, File Uploading, Header (section) | 6 |
| 7 | Calendar, Code Editor, Tiles, List, Grid, Container, S3 Resource Selector | 7 |
| 8 | AgentBadge, StatusDot, AgentNode, WorkflowEdge, ChatMessage, ChatInput, AgentExecutionView, JSONViewer, InlineDataAttachment, EmptyChatState, WorkflowNodeTypes, WorkflowHandlesEdges, WorkflowFullCanvas, WorkflowInteractions, GenerativeAIComponents | 15 |
| **Total** | | **98** (85 catálogo + 13 agente/chat/workflow) |
