import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueCoreVideoPlayer from 'vue-core-video-player'

import DefaultRecorder from './components/DefaultRecorder'
import Test from './components/Test'

Vue.use(VueRouter)
Vue.use(VueCoreVideoPlayer)

Vue.config.productionTip = false

const routes = [
    { path: '/default-recorder', component: DefaultRecorder },
    { path: '/test', component: Test }
]


const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
