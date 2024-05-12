import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import './assets/main.css'
import VueLayers  from 'vuelayers'

Vue.config.productionTip = false

const routes = [
  { path: '/', name: 'HomePage', component: () => import('./pages/HomePage.vue') },
  { path: '/favourites', name: 'FavouritesPage', component: ()=> import('./pages/FavouritesPage.vue') },
  { path: '/map', name: 'MapPage', component: () => import('./pages/MapPage.vue') },
  { path: "/:catchAll(.*)", name: "PageNotFound", component: () => import('./pages/PageNotFound.vue'),}
]
const router = new VueRouter({
routes
})

Vue.use(VueRouter)
Vue.use(VueLayers)


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
