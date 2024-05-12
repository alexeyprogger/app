<script>
import DrawerHeadComponent from './DrawerHeadComponent.vue';
import InfoEmptyComponent from './infoEmptyComponent.vue';
import CartItemListComponent from './CartItemListComponent.vue';
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'DrawerComponent',
  props: {
  totalPrice: Number
  },
components:{
  DrawerHeadComponent,
  InfoEmptyComponent,
  CartItemListComponent
},
  data(){
    return{
      orderId: null,
      isCreating: false
    }
  },
  computed: {
    ...mapGetters(['cartGetter']),
    buttonDisabled(){
      return this.isCreating ? true : false
    }
  },
  methods:{
    ...mapMutations(["resetCart"]),
    async createOrder() {
  try {
    this.isCreating = true
    const { data } = await axios.post(`https://21d6dab34fae5924.mokky.dev/orders`, {
      items: this.cartGetter,
      totalPrice: this.totalPrice
    })
    this.resetCart()
    this.orderId = data.id
  } catch (err) {
    console.log(err)
  } finally {
    this.isCreating = false
  }
}
  }
}
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-98 h-full fixed right-0 top-0 z-20 p-8 overflow-auto">
      <DrawerHeadComponent />
      <div v-if="!totalPrice || orderId" class="flex h-full items-center">
        <InfoEmptyComponent
          v-if="!totalPrice && !orderId"
          title="Корзина пустая"
          description="Добавьте хоть что-то"
          image-url="/package-icon.png"
        />
        <InfoEmptyComponent
          v-if="orderId"
          title="Заказ оформлен"
          :description="`Ваш заказ №${orderId} находится в обработке. Счастливого экскурсионного времяпрепровождения!`"
          image-url="/order-success-icon.png"
        />
      </div>
      <div v-else>
        <CartItemListComponent />
        <div class="flex flex-col gap-4 mt-7">
          <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} руб.</b>
          </div>
          <button
            :disabled="buttonDisabled"
            @click="createOrder"
            class="mt-4 bg-lime-500 w-full disabled:bg-slate-300 cursor-pointer rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
