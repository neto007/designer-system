---
name: feedback-docs-layout
description: User quer landing page como site de documentação profissional (shadcn/ui, Radix, Mantine) com sidebar, props table, code snippets e preview ao vivo
metadata:
  type: feedback
---

A landing page do ShieldAI DS deve ser um **site de documentação profissional**, não uma página de showcase simples.

Referências: shadcn/ui, Radix UI docs, Mantine docs.

Estrutura obrigatória:
- Sidebar fixa com navegação por categoria e sub-itens
- Cada componente = página própria com: título + descrição + tabs Preview/Code + props table
- Props table com colunas: Prop · Type · Default · Description
- Code snippets com copy button e syntax highlight (Shiki tema Dracula)
- Preview area com bg ds-bg, borda ds-current, isolada do resto
- React Router para roteamento entre páginas de componentes

**Why:** O usuário quer algo equivalente a shadcn/ui ou Radix UI docs, não um scroll-showcase.

**How to apply:** Ao construir a Fase 11 (landing page), sempre usar `DocsLayout` com sidebar + roteamento por componente, nunca um App.tsx flat com scroll.
