<script>
import HeaderComponent from './components/HeaderComponent.vue'
import DrawerComponent from './components/DrawerComponent.vue'
import { mapGetters, mapMutations } from "vuex";
export default {
  name: 'App',
  components: {
    HeaderComponent,
    DrawerComponent,  
  },
methods: mapMutations(["getCartFromStorage", "openDrawer"]),
computed: {
  ...mapGetters(["cartGetter", "drawerOpen"]),
  totalPrice(){
    return this.cartGetter.reduce((acc, item) => acc + item.price, 0)
  }
},

async mounted(){
  this.getCartFromStorage()
}, 


watch:{
cartGetter(){
  localStorage.setItem('cart', JSON.stringify(this.cartGetter))
},
deep:true,
},

}
</script>

<template>
  <div>
  <DrawerComponent v-if="drawerOpen" :totalPrice="totalPrice"/>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <HeaderComponent :totalPrice="totalPrice" @openDrawer="openDrawer"/>

    <div class="p-10">
      <router-view></router-view>
    </div>

  </div>
  </div>
</template>
