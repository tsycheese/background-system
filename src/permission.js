import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  const hasGetUserInfo = store.getters.user
  const token = getToken()

  if (to.meta.auth) {
    // 需要权限
    if (hasGetUserInfo) {
      to.path === '/login' ? next({ path: '/' }) : next()
    } else {
      if (token) {
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // 移除 token，并跳转到登录页
          Message.error(error)
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          document.title = getPageTitle(to.meta.title)
          NProgress.done()
        }
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    // 不需要权限
    if (to.path === '/login') {
      hasGetUserInfo ? next({ path: '/' }) : next()
    } else {
      next()
    }
  }
  NProgress.done()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // vue-element-admin 的权限管理
  // // determine whether the user has logged in
  // const hasToken = getToken()

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
