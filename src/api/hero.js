import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/lol/hero',
    method: 'get',
    params
  })
}

export function get(id) {
  return request({
    url: '/lol/hero/' + id,
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: '/lol/heroDetail/' + id,
    method: 'get'
  })
}

export function price(heroId) {
  return request({
    url: '/lol/hero/price',
    method: 'get',
    data: {
      heroId: heroId
    }
  })
}

export function getDetailList(data) {
  return request({
    url: '/lol/heroDetail/all',
    method: 'post',
    data
  })
}

export function getSpell(heroId) {
  return request({
    url: '/lol/heroSpell/' + heroId,
    method: 'get'
  })
}

export function getSkin(heroId) {
  return request({
    url: '/lol/heroSkin/' + heroId,
    method: 'get'
  })
}

