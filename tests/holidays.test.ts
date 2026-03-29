import { describe, it, expect } from 'vite-plus/test'
import { getEasterSunday } from '../src/lib/holidays'

describe('getEasterSunday', () => {
  it('returns the correct date for 2023', () => {
    const easter = getEasterSunday(2023)
    expect(easter.getFullYear()).toBe(2023)
    expect(easter.getMonth()).toBe(3) // April (0-indexed)
    expect(easter.getDate()).toBe(9)
  })

  it('returns the correct date for 2024', () => {
    const easter = getEasterSunday(2024)
    expect(easter.getFullYear()).toBe(2024)
    expect(easter.getMonth()).toBe(2) // March (0-indexed)
    expect(easter.getDate()).toBe(31)
  })

  it('returns the correct date for 2025', () => {
    const easter = getEasterSunday(2025)
    expect(easter.getFullYear()).toBe(2025)
    expect(easter.getMonth()).toBe(3) // April (0-indexed)
    expect(easter.getDate()).toBe(20)
  })

  it('returns the correct date for 2026', () => {
    const easter = getEasterSunday(2026)
    expect(easter.getFullYear()).toBe(2026)
    expect(easter.getMonth()).toBe(3) // April (0-indexed)
    expect(easter.getDate()).toBe(5)
  })

  it('returns the correct date for 2027', () => {
    const easter = getEasterSunday(2027)
    expect(easter.getFullYear()).toBe(2027)
    expect(easter.getMonth()).toBe(2) // March (0-indexed)
    expect(easter.getDate()).toBe(28)
  })

  it('handles boundary year 2000 (leap year)', () => {
    const easter = getEasterSunday(2000)
    expect(easter.getFullYear()).toBe(2000)
    expect(easter.getMonth()).toBe(3) // April (0-indexed)
    expect(easter.getDate()).toBe(23)
  })

  it('handles year 1900', () => {
    const easter = getEasterSunday(1900)
    expect(easter.getFullYear()).toBe(1900)
    expect(easter.getMonth()).toBe(3) // April (0-indexed)
    expect(easter.getDate()).toBe(15)
  })
})
