import { request } from '@/utils/request'

export const getRunes = (mainRune, runeFirstId, runeSecondId, runeThirdId, runeFourthId) => {
  return request({
    url: '/runes',
    params: {
      mainRune,
      runeFirstId,
      runeSecondId,
      runeThirdId,
      runeFourthId
    }
  })
}

// export const getRunes = (runeId) => {
//   return request({
//     url: '/runes/',
//     params: { runeId }
//   })
// }