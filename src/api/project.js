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

export function deleteProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: 'delete'
  })
}

export function updateProject(id, data) {
  return request({
    url: `/api/project/${id}`,
    method: 'put',
    data
  })
}
