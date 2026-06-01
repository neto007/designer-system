declare module 'tailwindcss' {
  interface ThemeConfig {
    extend?: Record<string, unknown>
  }
  interface Config {
    theme?: ThemeConfig
    plugins?: unknown[]
    content?: string[]
    presets?: unknown[]
  }
}