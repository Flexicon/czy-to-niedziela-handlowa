/**
 * Ripped straight from StackOverflow because I'm lazy and this is more complicated than it needs to be.
 *
 * Source: https://stackoverflow.com/a/1284335/3112167
 */
export const getEasterSunday = (Y: number): Date => {
  const C = Math.floor(Y / 100)
  const N = Y - 19 * Math.floor(Y / 19)
  const K = Math.floor((C - 17) / 25)
  let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15
  I = I - 30 * Math.floor(I / 30)
  I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11))
  let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4)
  J = J - 7 * Math.floor(J / 7)
  const L = I - J
  const M = 3 + Math.floor((L + 40) / 44)
  const D = L + 28 - 31 * Math.floor(M / 4)

  return new Date(Y, M - 1, D)
}
