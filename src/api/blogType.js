import request from '@/utils/request'

export function getBlogTypes() {
  return request({
    url: '/api/blogtype',
    method: 'get'
  })
}

export function addBlogType(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}

export function deleteBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete'
  })
}

export function updateBlogType(id, data) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'put',
    data
  })
}
