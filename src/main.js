import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import $ from 'jquery'
window.$ = $
window.jQuery = $
import '@/icons' // icon
import '@/permission' // permission control
import '../static/umeditor/themes/default/css/umeditor.css'
import '../static/umeditor/umeditor.config.js'
import '../static/umeditor/umeditor.js'
import '../static/umeditor/lang/zh-cn/zh-cn.js'
require('script-loader!../static/js/iconfont.js')
require('script-loader!../static/webuploader/webuploader-0.1.5.min.js')
// import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
