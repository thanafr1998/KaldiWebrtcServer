import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import DefaultRecorder from './components/DefaultRecorder'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
    { path: '/default-recorder', component: DefaultRecorder }
]


const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
