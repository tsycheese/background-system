import request from '@/utils/request'

export function getBanners() {
  return request({
    url: '/api/banner',
    method: 'get'
  })
}
