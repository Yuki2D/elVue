import router from './router'
import Config from '@/config'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'// 进度条样式

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.webName
  }
  NProgress.start() // start progress bar
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
