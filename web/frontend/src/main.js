import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from '@/store'


import DefaultRecorder from './components/DefaultRecorder'
import VideoMain from './views/VideoMain'
import vuetify from './plugins/vuetify';
import searchPage from './views/searchPage'


Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
    { path: '/default-recorder', component: DefaultRecorder },
    { path: '/', component: VideoMain },
    { path: '/searchPage',component: searchPage}
]


export const router = new VueRouter({
  routes
})

new Vue({
  router: router,
  render: h => h(App),
  vuetify,
  store: store
}).$mount('#app')

