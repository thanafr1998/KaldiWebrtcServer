import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from '@/store'

import DefaultRecorder from './views/DefaultRecorder'
import Favourite from './views/Favourite'
import VideoMain from './views/VideoMain'
import vuetify from './plugins/vuetify';
// import VueWaves from 'vue-waves';

Vue.use(VueRouter)
// Vue.use(require('vue-script2'))

Vue.config.productionTip = false

const routes = [
    { path: '/default-recorder', component: DefaultRecorder },
    { path: '/', component: VideoMain },
    { path: '/Favourite', component: Favourite}
]


const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router: router,
  vuetify,
  store: store,
  icons: {
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
}).$mount('#app')
