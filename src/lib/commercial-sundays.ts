import { eachWeekendOfMonth, isSameDay, isSunday, nextSunday, setMonth, sub } from 'date-fns'
import { getEasterSunday } from './holidays'

const JANUARY = 0
const APRIL = 3
const JUNE = 5
const AUGUST = 7
const DECEMBER = 11

const getSundaysForMonth = (year: number, month: number): Date[] =>
  eachWeekendOfMonth(setMonth(new Date(year, 0, 1), month)).filter((d) => isSunday(d))

const getLastSundayForMonth = (year: number, month: number): Date => getSundaysForMonth(year, month).at(-1)!

export const getCommercialSundays = (year: number): Date[] => {
  const palmSunday = sub(getEasterSunday(year), { weeks: 1 })
  const christmasDay = new Date(year, DECEMBER, 25)
  const decemberSundaysBeforeChristmas = getSundaysForMonth(year, DECEMBER).filter((d) => d < christmasDay)

  const lastTwoDecember = decemberSundaysBeforeChristmas.slice(-2)

  return [
    getLastSundayForMonth(year, JANUARY),
    palmSunday,
    getLastSundayForMonth(year, APRIL),
    getLastSundayForMonth(year, JUNE),
    getLastSundayForMonth(year, AUGUST),
    lastTwoDecember[0],
    lastTwoDecember[1],
  ].sort((a, b) => a.getTime() - b.getTime())
}

export const isCommercialSunday = (date: Date, sundays: Date[]): boolean => sundays.some((d) => isSameDay(d, date))

export const formatDate = (date: Date): string => date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' })

export const getNearestSunday = (today: Date): Date => (isSunday(today) ? today : nextSunday(today))
