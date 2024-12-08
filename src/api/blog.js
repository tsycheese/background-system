import request from '@/utils/request'

export function getBlogs(page = 1, limit = 10) {
  return request({
    url: `/api/blog`,
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

export function deleteBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}

export function postBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}

export function getBlogById(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}

export function updateBlog(id, data) {
  return request({
    url: `/api/blog/${id}`,
    method: 'put',
    data
  })
}
