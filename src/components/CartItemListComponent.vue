<script>
import { mapGetters, mapMutations } from 'vuex';
import CartItemComponent from './CartItemComponent.vue'
export default{
computed: mapGetters(['cartGetter']),
methods: mapMutations(['removeFromCart']),
name: 'CartItemListComponent',
components:{
  CartItemComponent
}
}
</script>

<template>
  <div class="flex flex-col flex-1 gap-4" v-auto-animate>
    <CartItemComponent
      v-for="item in cartGetter"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @onClickRemove="() => removeFromCart(item)"
    />
  </div>
</template>
