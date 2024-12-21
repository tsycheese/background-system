import axios from 'axios'

export function getCaptcha() {
  return axios({
    url: '/res/captcha',
    method: 'get',
    responseType: 'blob'
  })
}
