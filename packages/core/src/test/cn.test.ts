import { describe, it, expect } from 'vitest'
import { cn } from '../lib/cn'

describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('resolves Tailwind conflicts — last wins', () => {
    expect(cn('text-red-500', 'text-green-500')).toBe('text-green-500')
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('ignores falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
  })

  it('handles conditional objects', () => {
    expect(cn({ 'text-red-500': true, 'text-green-500': false })).toBe('text-red-500')
  })

  it('handles arrays', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c')
  })
})
