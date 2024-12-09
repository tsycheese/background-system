import request from '@/utils/request'

export function getProjects() {
  return request({
    url: '/api/project',
    method: 'get'
  })
}

export function postProject(data) {
  return request({
    url: '/api/project',
    method: 'post',
    data
  })
}
