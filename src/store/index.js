import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import items from './modules/items'
import modal from './modules/modal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    items,
    modal
  }
})
