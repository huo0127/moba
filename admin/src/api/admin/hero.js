import http from '../http'

export function getHeroList (params) {
  return http({
    url: 'rest/heroes',
    methods: 'get',
    params
  })
}
