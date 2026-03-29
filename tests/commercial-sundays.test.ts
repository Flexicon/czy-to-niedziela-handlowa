import { describe, it, expect } from 'vite-plus/test'
import { getCommercialSundays, isCommercialSunday, getNearestSunday, formatDate } from '../src/lib/commercial-sundays'

describe('getCommercialSundays', () => {
  it('returns exactly 7 Sundays for 2022', () => {
    const sundays = getCommercialSundays(2022)
    expect(sundays).toHaveLength(7)
  })

  it('returns exactly 7 Sundays for 2026', () => {
    const sundays = getCommercialSundays(2026)
    expect(sundays).toHaveLength(7)
  })

  it('returns sorted Sundays for 2022', () => {
    const sundays = getCommercialSundays(2022)
    for (let i = 1; i < sundays.length; i++) {
      expect(sundays[i].getTime()).toBeGreaterThan(sundays[i - 1].getTime())
    }
  })

  it('returns correct commercial Sundays for 2022', () => {
    const sundays = getCommercialSundays(2022)
    const dates = sundays.map((d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)

    expect(dates).toContain('2022-0-30') // Last Sunday of January
    expect(dates).toContain('2022-3-24') // Palm Sunday (Easter Apr 17 - 7 days)
    expect(dates).toContain('2022-3-24') // Last Sunday of April
    expect(dates).toContain('2022-5-26') // Last Sunday of June
    expect(dates).toContain('2022-7-28') // Last Sunday of August
    expect(dates).toContain('2022-11-11') // Second-to-last Sunday before Dec 25
    expect(dates).toContain('2022-11-18') // Last Sunday before Dec 25
  })

  it('returns correct commercial Sundays for 2026', () => {
    const sundays = getCommercialSundays(2026)
    const dates = sundays.map((d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)

    expect(dates).toContain('2026-0-25') // Last Sunday of January
    expect(dates).toContain('2026-2-29') // Palm Sunday (Easter Apr 5 - 7 days)
    expect(dates).toContain('2026-3-26') // Last Sunday of April
    expect(dates).toContain('2026-5-28') // Last Sunday of June
    expect(dates).toContain('2026-7-30') // Last Sunday of August
    expect(dates).toContain('2026-11-13') // Second-to-last Sunday before Dec 25
    expect(dates).toContain('2026-11-20') // Last Sunday before Dec 25
  })

  it('December Sundays are always before December 25', () => {
    const christmas = new Date(2026, 11, 25)
    const sundays = getCommercialSundays(2026)
    const decemberSundays = sundays.filter((d) => d.getMonth() === 11)
    decemberSundays.forEach((sunday) => {
      expect(sunday.getTime()).toBeLessThan(christmas.getTime())
    })
  })
})

describe('isCommercialSunday', () => {
  it('returns true for a known commercial Sunday', () => {
    const commercialSundays = getCommercialSundays(2022)
    const commercialSunday = commercialSundays[0]
    expect(isCommercialSunday(commercialSunday, commercialSundays)).toBe(true)
  })

  it('returns false for a non-commercial Sunday', () => {
    const commercialSundays = getCommercialSundays(2022)
    const nonCommercial = new Date(2022, 0, 9) // First Sunday that is not commercial
    expect(isCommercialSunday(nonCommercial, commercialSundays)).toBe(false)
  })
})

describe('getNearestSunday', () => {
  it('returns today when today is Sunday', () => {
    const sunday = new Date(2022, 0, 30) // A Sunday
    expect(getNearestSunday(sunday)).toEqual(sunday)
  })

  it('returns next Sunday when today is not Sunday', () => {
    const monday = new Date(2022, 0, 31) // A Monday
    const expected = new Date(2022, 1, 6) // Next Sunday
    expect(getNearestSunday(monday).getTime()).toBe(expected.getTime())
  })
})

describe('formatDate', () => {
  it('formats a date in Polish locale', () => {
    const date = new Date(2022, 0, 30) // January 30, 2022
    const formatted = formatDate(date)
    expect(formatted).toContain('30')
    expect(formatted).toContain('stycznia')
  })
})
