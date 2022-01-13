import { myAxios } from '@/utils/request'

export const getRunes = (mainRuneId, runeFirstId, runeSecondId, runeThirdId, runeFourthId, SecondRuneId) => {
  return myAxios({
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

