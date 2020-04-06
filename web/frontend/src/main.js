import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'

import VueCoreVideoPlayer from 'vue-core-video-player'
import DefaultRecorder from './components/DefaultRecorder'
import Video from './components/Video'
import Customer from './components/Customer'

Vue.use(VueRouter)
Vue.use(VueCoreVideoPlayer)

Vue.config.productionTip = false

const routes = [
    { path: '/default-recorder', component: DefaultRecorder },
    { path: '/video', component: Video },
    { path: '/', component: Customer }
]


const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
