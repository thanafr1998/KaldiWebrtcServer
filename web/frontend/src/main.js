import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from '@/store'

import DefaultRecorder from './components/DefaultRecorder'
import VideoMain from './views/VideoMain'


Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
    { path: '/default-recorder', component: DefaultRecorder },
    { path: '/', component: VideoMain },
]


const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router: router,
  store: store,
}).$mount('#app')
