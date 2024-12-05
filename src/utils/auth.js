import Cookies from 'js-cookie'

// vue-element-admin 的 token 管理
// const TokenKey = 'vue_admin_template_token'
// my-site 的 token 管理
const TokenKey = 'adminToken'

export function getToken() {
  // return Cookies.get(TokenKey)
  const token = localStorage.getItem(TokenKey)
  return token
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  localStorage.removeItem(TokenKey)
}
