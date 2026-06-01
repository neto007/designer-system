import '@testing-library/jest-dom'

// Radix UI requires pointer capture APIs not present in jsdom
window.HTMLElement.prototype.hasPointerCapture = () => false
window.HTMLElement.prototype.setPointerCapture = () => undefined
window.HTMLElement.prototype.releasePointerCapture = () => undefined
// Radix UI uses scrollIntoView
window.HTMLElement.prototype.scrollIntoView = () => undefined

const originalWarn = console.warn.bind(console)
console.warn = (...args: unknown[]) => {
  const msg = String(args[0])
  if (msg.includes('Not implemented') || msg.includes('CSS')) return
  originalWarn(...args)
}
