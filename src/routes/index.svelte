<script lang="ts">
  import { eachWeekendOfMonth, isSameDay, isSunday, nextSunday, setMonth, sub } from 'date-fns'
  import { getEasterSunday } from '$utils/holidays'

  const JANUARY = 0
  const APRIL = 3
  const JUNE = 5
  const AUGUST = 7
  const DECEMBER = 11

  const today = new Date()
  const isTodaySunday = isSunday(today)
  const nextSundayFromToday = nextSunday(today)
  const christmasDay = new Date(today.getFullYear(), DECEMBER, 25)

  $: nearestSunday = isTodaySunday ? today : nextSundayFromToday

  const getSundaysForMonth = (month: number): Date[] => eachWeekendOfMonth(setMonth(today, month)).filter(isSunday)
  const getLastSundayForMonth = (month: number): Date => getSundaysForMonth(month).pop()!

  const sundayBeforeEaster = sub(getEasterSunday(today.getFullYear()), { weeks: 1 })
  const decemberSundaysBeforeChristmas = getSundaysForMonth(DECEMBER).filter((d) => d < christmasDay)

  const commercialSundays: Date[] = [
    getLastSundayForMonth(JANUARY),
    sundayBeforeEaster,
    getLastSundayForMonth(APRIL),
    getLastSundayForMonth(JUNE),
    getLastSundayForMonth(AUGUST),
    decemberSundaysBeforeChristmas.pop()!,
    decemberSundaysBeforeChristmas.pop()!,
  ]
    .filter(Boolean)
    .sort((a, b) => a.getTime() - b.getTime())

  const isCommercialSunday = (date: Date): boolean => !!commercialSundays.find((d) => isSameDay(d, date))
  const formatDate = (date: Date): string =>
    date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' })
</script>

<svelte:head>
  <title>Czy to niedziela handlowa?</title>
</svelte:head>

<h1>Czy to niedziela handlowa?</h1>

<p>Najbliższa niedziela: {formatDate(nearestSunday)}</p>
<p>Handlowa? {isCommercialSunday(nearestSunday) ? 'tak 🤩' : 'nie 😢'}</p>

<details>
  <summary>Niedziele handlowe w 2022r.</summary>
  <ul>
    {#each commercialSundays as sunday}
      <li>
        <span>{formatDate(sunday)}</span>
        {#if isSameDay(sunday, today)}
          <span>(dzisiaj)</span>
        {/if}
      </li>
    {/each}
  </ul>
</details>
