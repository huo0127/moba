import { request } from '@/utils/request'

export const getRunes = (mainRuneId, runeFirstId, runeSecondId, runeThirdId, runeFourthId, SecondRuneId) => {
  return request({
    url: '/runes',
    params: {
      mainRuneId,
      runeFirstId,
      runeSecondId,
      runeThirdId,
      runeFourthId,
      SecondRuneId,
    }
  })
}

