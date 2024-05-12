export default {
  mutations: {
    getCartFromStorage(state) {
      const localCart = localStorage.getItem('cart')
      const result = localCart ? JSON.parse(localCart) : []
      state.cart = result
    },
    closeDrawer(state){
      state.drawerOpen = false
      },
      openDrawer(state){
        state.drawerOpen = true
      },
      addToCart(state, item){
        state.cart.push(item)
        item.isAdded = true
      },
      resetCart(state) {
        state.cart.map(el => el.isAdded = false)
        state.cart = [];
      },
      removeFromCart(state, item){
        state.cart.splice(state.cart.map(e => e.id).indexOf(item.id), 1)
        item.isAdded = false
      }
  },
  state: {
    cart: [],
    drawerOpen: false
  },
  getters: {
    cartGetter(state) {
      return state.cart
    },
    drawerOpen(state){
      return state.drawerOpen
    }
  }
}
