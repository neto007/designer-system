# REFATORAÇÃO ENTERPRISE

---

# VISÃO GERAL

## Estatísticas do projeto

- **Quantidade total de arquivos**: 274 arquivos
- **Quantidade de arquivos críticos**: 6 arquivos (`Table.tsx`, `WorkflowCanvasPage.tsx`, `App.tsx` do Docs, `useTheme.ts`, `useToast.ts`, `tailwind-preset.ts`)
- **Quantidade de arquivos acima de 300 linhas**: 2 arquivos (`Table.tsx` — 342 linhas, `WorkflowCanvasPage.tsx` — 338 linhas)
- **Quantidade de arquivos acima de 500 linhas**: 0 arquivos
- **Quantidade de componentes**: 79 componentes no Core e 105 componentes de páginas no Docs
- **Quantidade de hooks**: 2 hooks no Core (`useTheme`, `useToast`)
- **Quantidade de services**: 0 (biblioteca de UI de frontend pura e estática)
- **Quantidade de contexts**: 3 contexts (`ThemeContext`, `ToastContext`, `FieldContext`)
- **Nível estimado de débito técnico**: Baixo-Médio. A base de código possui tipagem forte, é moderna, usa React 19 e Vite 8, porém apresenta acoplamento estático massivo no app de documentação e agrupamento monolítico plano nos primitivos do Core.

---

## Principais problemas encontrados

- **God Components / Mistura de Lógicas nos Primitivos**: Componentes como `Table.tsx` agrupam tipagem complexa, múltiplos subcomponentes auxiliares locais (`SortIcon`, `LoadingRows`), hooks de negócio/comportamento (`useTableSorting`) e o componente de UI principal em um único arquivo.
- **Monólito de Primitivos**: A pasta `/packages/core/src/components/primitives` abriga 61 arquivos diretamente em uma estrutura plana ("flat"). A falta de sub-categorização por domínios de design dificulta a navegação para novos desenvolvedores e para agentes de IA contextuais.
- **Acoplamento Extremo e Gargalo de Bundle no Roteador**: O arquivo `App.tsx` da documentação importa de forma estática e síncrona 105 páginas de uma só vez, criando um build de carregamento inicial inflado e limitando a performance.
- **Códigos Legados Coexistindo Sem Depreciação**: A coexistência de componentes como `ChartsLegacy.tsx` e `Charts.tsx` sem documentação ou deprecation markers claros, gerando duplicidade técnica de dependências.
- **Acoplamento UI + Comportamento em Páginas de Docs**: A página `WorkflowCanvasPage.tsx` mistura a declaração de animações de bordas, cálculos complexos de trigonometria/caminhos bezier, event listeners nativos do mouse para zoom/pan e o layout visual em si.

---

## Prioridades de refatoração

### Alta prioridade

- **Code-Splitting e Dynamic Imports no Docs**: Substituir imports estáticos por `React.lazy` no roteador do docs para otimização extrema do carregamento de páginas.
- **Modularização de Primitivos de Alta Complexidade (`Table.tsx`)**: Decompor o componente Table e seu hook acoplado em submódulos específicos.
- **Categorização Semântica de Componentes Primitivos**: Reorganizar os 61 primitivos em subpastas categorizadas na biblioteca Core.

### Média prioridade

- **Abstração de Lógicas de Alta Complexidade em Hooks**: Extrair a lógica de pan, zoom e mouse do canvas interativo de `WorkflowCanvasPage.tsx` para um hook customizado `useCanvas.ts`.
- **Limpeza de Componentes Legados**: Depreciar formalmente ou remover o arquivo `ChartsLegacy.tsx` para unificação da API de visualização de dados.

### Baixa prioridade

- **Melhorias de Nomenclatura e Tipagem Genérica**: Padronizar propriedades e tipagem de listas/tabelas para evitar qualquer declaração baseada em `Record<string, unknown>`.

---

# ESTRUTURA ATUAL

## Estrutura de pastas

```txt
packages/core/src/
├── components/
│   ├── agent/
│   ├── chat/
│   ├── data/
│   ├── feedback/
│   ├── overlay/
│   └── primitives/      # 61 arquivos de componentes planos
├── hooks/
│   ├── useTheme.ts
│   └── useToast.ts
├── lib/
│   ├── cn.ts
│   └── formatCode.ts
├── tokens/
│   ├── agentTypes.ts
│   ├── tailwind-preset.ts
│   └── tokens.css
└── index.ts
```

---

## Análise das pastas

### `/packages/core/src/components/primitives`

#### Problemas

- Mistura de componentes com propósitos totalmente distintos na raiz do diretório.
- Arquivos extensos agrupando lógica visual, comportamental e definições de dados de forma estrita.

#### Melhorias sugeridas

- Criação de sub-categorização semântica por domínios de design do design system:
  - `data-entry/` (ex: `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Select`, `Multiselect`, `Slider`, `Toggle`)
  - `data-display/` (ex: `Table`, `Cards`, `Calendar`, `Charts`, `Badge`, `Avatar`, `KeyValuePairs`)
  - `navigation/` (ex: `Breadcrumb`, `Pagination`, `Steps`, `AnchorNav`, `SideNavigation`)
  - `layouts/` (ex: `Box`, `Grid`, `Container`, `Divider`, `SpaceBetween`, `ColumnLayout`)
  - `visuals/` (ex: `Icon`, `Spinner`, `Skeleton`, `Progress`)

---

### `/apps/docs/src`

#### Problemas

- O arquivo `App.tsx` centraliza todos os roteamentos de forma monolítica e síncrona.
- Os tempos de inicialização (cold start) em ambiente de desenvolvimento local e compilação do bundle final são prejudicados pelo tamanho das árvores de importação síncrona.

#### Melhorias sugeridas

- Implementação imediata de lazy load.
- Divisão do arquivo `App.tsx` para carregar as páginas em blocos sob demanda através de carregamento assíncrono.

---

# ARQUIVOS CRÍTICOS

## `packages/core/src/components/primitives/Table.tsx`

### Tipo de problema

- Arquivo de responsabilidade múltipla
- Alto acoplamento comportamental e visual
- Extensão excessiva (342 linhas)

---

### Problemas encontrados

- Lógica do helper `getItemKey` acoplada ao escopo do arquivo.
- Subcomponentes `SortIcon` e `LoadingRows` declarados de forma privada localmente, impedindo qualquer reaproveitamento em outras interfaces tabulares.
- Hook customizado `useTableSorting` exposto no fim do arquivo visual, combinando manipulação de arrays/algoritmos de ordenação com rendering elements.

---

### Refatoração sugerida

#### Divisão recomendada

```txt
primitives/table/
├── subcomponents/
│   ├── SortIcon.tsx
│   └── LoadingRows.tsx
├── hooks/
│   └── useTableSorting.ts
├── types.ts
├── Table.tsx
└── index.ts
```

---

### Benefícios esperados

- Redução do tamanho de `Table.tsx` de 342 linhas para aproximadamente 140 linhas de marcação visual limpa.
- Reutilização flexível do hook de ordenação (`useTableSorting`) em outras tabelas ou componentes de grade do ecossistema.
- Modularização isolada permitindo manutenção rápida de bugs de rendering ou performance de re-renderização.

---

### Tarefas

- [ ] Criar subdiretório `packages/core/src/components/primitives/table/`
- [ ] Criar arquivo `types.ts` e exportar as interfaces `TableColumn`, `SortingState` e `TableProps`
- [ ] Criar submódulo `hooks/useTableSorting.ts` e transferir a lógica pura de ordenação e o estado controlado
- [ ] Mover subcomponente `SortIcon.tsx` e `LoadingRows.tsx` para a pasta `subcomponents/`
- [ ] Refatorar o componente principal `Table.tsx` para importar os novos componentes auxiliares, tipos e hooks
- [ ] Ajustar o arquivo `index.ts` da pasta de tabela para exportar `Table` e `useTableSorting`
- [ ] Atualizar o index central do core em `packages/core/src/index.ts` para refletir as novas origens de imports

---

## `apps/docs/src/pages/workflow/WorkflowCanvasPage.tsx`

### Tipo de problema

- Arquivo gigante de documentação (338 linhas)
- Lógica comportamental e física acoplada à visualização do demo
- Declaração embutida de subcomponentes de renderização gráfica complexa

---

### Problemas encontrados

- O componente `AnimatedEdge` e o canvas interativo `MiniCanvas` disputam escopo com a página de apresentação do design system.
- Efeitos colaterais (`useEffect`) para gerenciamento de frames de animações de bordas ativas controlados diretamente no mesmo arquivo.
- Complexidade trigonométrica e manipulação de eventos nativos do mouse (`onWheel`, `onMouseDown`, `onMouseMove`, `onMouseUp`) acoplada na camada de exibição.

---

### Refatoração sugerida

#### Divisão recomendada

```txt
pages/workflow/canvas/
├── hooks/
│   └── useCanvasPanZoom.ts
├── components/
│   ├── AnimatedEdge.tsx
│   └── MiniCanvas.tsx
├── mockData.ts
└── index.tsx (WorkflowCanvasPage)
```

---

### Benefícios esperados

- Desacoplamento da física e matemática do Canvas das estruturas puras de documentação.
- Capacidade de reutilizar `useCanvasPanZoom.ts` em outros módulos gráficos do monorepo (ex: editores de grafos de workflows).
- Código das páginas de documentação focado puramente em explicar o design, e não em implementar engines gráficas complexas.

---

### Tarefas

- [ ] Criar diretório `apps/docs/src/pages/workflow/canvas/`
- [ ] Mapear e isolar lógicas matemáticas de pan/zoom de mouse no hook `useCanvasPanZoom.ts`
- [ ] Mover o componente de caminhos bezier `AnimatedEdge.tsx` para subpasta dedicada
- [ ] Migrar `MiniCanvas.tsx` e injetar o hook customizado de controle de zoom/pan
- [ ] Refatorar a página principal `index.tsx` para importar os componentes gráficos do canvas de forma modular
- [ ] Isolar as constantes de nós e arestas estáticas em `mockData.ts`

---

# OPORTUNIDADES DE UNIFICAÇÃO

## Unificação e Limpeza de Componentes de Visualização (Charts)

### Arquivos envolvidos

- `packages/core/src/components/primitives/Charts.tsx`
- `packages/core/src/components/primitives/ChartsLegacy.tsx`

---

### Problema

Existem dois componentes de gráficos concorrentes usando a biblioteca Recharts de formas diferentes. `ChartsLegacy.tsx` representa uma versão anterior de gráficos menos performáticos e com estilos neobrutalistas menos maduros, criando duplicação desnecessária de responsabilidades visuais.

---

### Estratégia de unificação

Criar uma camada robusta e moderna de Charts unificada sob o mesmo módulo com presets pré-definidos:

```txt
primitives/charts/
├── components/
│   ├── AreaChartDS.tsx
│   ├── BarChartDS.tsx
│   ├── LineChartDS.tsx
│   └── PieChartDS.tsx
├── types.ts
└── index.ts
```

---

### Benefícios

- Eliminação de ~150 linhas de código legado.
- Centralização dos estilos Dracula-neon e Neobrutalistas para todas as variantes de gráficos em um único local.
- Menor overhead mental para os desenvolvedores e IA agents ao construir dashboards de observabilidade de agentes.

---

### Tarefas

- [ ] Criar estrutura modular `primitives/charts`
- [ ] Consolidar todas as propriedades de customização de estilos da Recharts em arquivos focados por tipo de gráfico
- [ ] Injetar tipagem forte e flexível em `types.ts`
- [ ] Migrar referências do `ChartsLegacy.tsx` em páginas de docs para o módulo unificado de `Charts`
- [ ] Remover permanentemente `ChartsLegacy.tsx` da árvore do repositório
- [ ] Validar compatibilidade visual de todos os gráficos após migração

---

# PLANO DE MODULARIZAÇÃO

## Estrutura enterprise sugerida

Para escalabilidade no nível enterprise do monorepo, propomos a transição para uma estrutura baseada em domínios arquiteturais robustos no core do ShieldAI Design System:

```txt
packages/core/src/
├── components/
│   ├── primitives/
│   │   ├── data-entry/      # Input, Textarea, Select, Checkbox, Toggle...
│   │   ├── data-display/    # Table, Cards, Calendar, Charts, Badge...
│   │   ├── navigation/      # Breadcrumb, Pagination, Steps, AnchorNav...
│   │   ├── layouts/         # Box, Grid, Container, SpaceBetween, ColumnLayout...
│   │   └── visuals/         # Icon, Spinner, Skeleton, Progress...
│   ├── agent/               # Componentes especializados em IA / Agentes
│   ├── chat/                # Elementos de conversação e chat de agentes
│   └── overlay/             # Dialog, Drawer, Tooltip, Popover, SplitPanel
│
├── hooks/                   # Hooks reutilizáveis globais (useTheme, useToast)
├── lib/                     # Utilitários de lógica pura (cn, formatters)
├── tokens/                  # Variáveis CSS, presets e definições de tokens
└── index.ts                 # Exportação unificada de APIs do Design System
```

---

## Responsabilidade das camadas

### `primitives/`

Responsável por componentes atômicos fundamentais e reutilizáveis de controle e exibição.

### `agent/`

Responsável por componentes e widgets de alto nível focados no monitoramento de sistemas autônomos (ex: `AgentNode`, `AgentWorkflowVisualizer`).

### `chat/`

Responsável pela camada conversacional, histórico, balões de diálogo, visualizadores JSON de payloads estruturados e attachments para LLMs.

### `overlay/`

Responsável por elementos flutuantes de feedback e interação flutuante na tela (ex: gavetas laterais de split screens, panels de ajuda e tooltips contextualizados).

---

# REFATORAÇÕES PRIORITÁRIAS

# PRIORIDADE ALTA

## Refatoração 1 — Decomposição e Code-Splitting de Rotas (`App.tsx`)

### Impacto

Altíssimo (otimização de build, redução drástica de bundles e melhoria na renderização inicial do app Docs)

### Complexidade

Média

### Tarefas

- [ ] Identificar todas as 105 páginas importadas de forma síncrona
- [ ] Converter as declarações de rotas para `React.lazy` dinâmicos
- [ ] Envolver o roteador principal em um componente `<Suspense>` com skeleton de carregamento customizado
- [ ] Validar o comportamento de transição suave de rotas em tempo de execução
- [ ] Medir a redução no bundle size gerada pelos arquivos assíncronos no build de produção

---

## Refatoração 2 — Modularização Isolada do Componente Table

### Impacto

Alto (clean code no componente mais denso de primitivos, melhoria de testabilidade e desacoplamento)

### Complexidade

Média

### Tarefas

- [ ] Criar estrutura modular para o subdiretório de Tabela
- [ ] Extrair e documentar o hook de ordenação `useTableSorting`
- [ ] Decompor subcomponentes de status e renderização interna
- [ ] Adicionar tipagem genérica forte nas chamadas de dados tabulares
- [ ] Validar as implementações e chamadas na Tabela original sem quebrar contratos de props existentes

---

# PRIORIDADE MÉDIA

## Refatoração 3 — Criação do Módulo Unificado de Charts

### Impacto

Médio (redução do débito técnico legada, consistência de design system)

### Complexidade

Média

### Tarefas

- [ ] Definir a nova especificação da API de Charts
- [ ] Remover e limpar o arquivo `ChartsLegacy.tsx`
- [ ] Unificar os Tooltips estilizados do Dracula-neon na nova interface de Charts
- [ ] Ajustar as páginas de exemplo de visualização gráfica

---

# PRIORIDADE BAIXA

## Refatoração 4 — Padronização de Nomenclaturas de Tipos e Constantes

### Impacto

Médio (facilidade para IA agents, inteligibilidade do código)

### Complexidade

Baixa

### Tarefas

- [ ] Ajustar variáveis com nomes genéricos ou sub-especificados
- [ ] Garantir tipagens TypeScript sólidas eliminando `any` implícitos e `Record<string, unknown>` não-descritivos

---

# PADRÕES RECOMENDADOS

## Arquitetura

- **Modular Monolith**: Estrutura de pacotes isolados com domínios bem delimitados.
- **Single Responsibility Principle (SRP)**: Cada módulo deve possuir apenas um motivo para ser modificado.
- **Render Delegation**: Componentes visuais delegam lógicas complexas e de processamento de dados para custom hooks dedicados.

---

## Convenções

### Componentes

- Pasta com nome em minúsculo/kebab-case contendo index de exportação e subcomponentes em `PascalCase.tsx`.

### Hooks

- Prefixo `use` seguido por camelCase (ex: `useCanvasPanZoom.ts`).

### Utils

- camelCase (ex: `formatCode.ts`).

### Constantes

- Letras maiúsculas separadas por underline em arquivos focados `constants.ts` (ex: `UPPER_CASE`).

---

## Regras

- **Máximo 200 linhas** por arquivo para alta testabilidade e acting simples de AI Coding Agents.
- **Máximo 50 linhas** por função para legibilidade imediata.
- **Zero efeitos colaterais (side-effects) na renderização** (uso cuidadoso de hooks com dependências explícitas).

---

# ANTI-PATTERNS IDENTIFICADOS

## Problemas encontrados

- **God Files**: Componentes com hooks internos e estruturas secundárias que poderiam rodar de forma isolada.
- **Massive Static Bundling**: Ausência total de lazy loading para carregar mais de 100 páginas estáticas de uma só vez no navegador.
- **Flat Structure Overcrowding**: Demasiados arquivos no mesmo nível de diretório primitivo sem ordenação semântica ou agrupamento temático.

---

# ROADMAP DE EXECUÇÃO

# FASE 1 — Organização estrutural e Roteamento

- [ ] Implementar carregamento dinâmico assíncrono das páginas no Docs (`React.lazy`)
- [ ] Testar builds locais e medir o split chunk
- [ ] Criar a hierarquia de pastas semânticas em `packages/core/src/components/primitives`

---

# FASE 2 — Refatoração e Decomposição de Componentes Complexos

- [ ] Separar tipos, hooks e subcomponentes em `Table.tsx`
- [ ] Extrair hooks comportamentais do Canvas de `WorkflowCanvasPage.tsx`
- [ ] Refatorar os layouts originais garantindo retrocompatibilidade total com as aplicações consumidoras

---

# FASE 3 — Unificação e Limpeza de Código

- [ ] Concluir o módulo de gráficos unificados `Charts`
- [ ] Depreciar e excluir em definitivo o `ChartsLegacy.tsx`
- [ ] Atualizar referências de tipagem

---

# FASE 4 — Governança e Validação

- [ ] Rodar testes unitários via Vitest para assegurar que não houve regressões
- [ ] Verificar integridade e compilação do design system (`pnpm build`)
- [ ] Validar a experiência de desenvolvimento local no app docs

---

# RESULTADO ESPERADO

## Ganhos esperados

### Manutenção

- Código extremamente desacoplado e enxuto.
- Maior velocidade no onboarding de novos engenheiros.
- Facilidade de escrita de testes automatizados e isolados.

### Produtividade

- Hot Module Replacement (HMR) mais responsivo no app docs devido aos dynamic imports.
- Reuso em alto nível de hooks matemáticos/gráficos.

### Arquitetura

- Estrutura clara e semântica que reflete diretamente os princípios e a taxonomia de Design Tokens e UI Elements.

### IA Agents

- Divisão em blocos de até 200 linhas permite que agentes inteligentes (como o Claude/Gemini) leiam, modifiquem e corrijam bugs com segurança e precisão infinitamente maiores, evitando limites de contexto e geração de erros colaterais.

### Débito técnico

- Redução de complexidade ciclomática e eliminação de componentes obsoletos redundantes (`ChartsLegacy`).
