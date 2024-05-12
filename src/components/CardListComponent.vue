<script>
import CardComponent from './CardComponent.vue'

export default {
  name: 'CardListComponent',
  props: {
  items: Array,
  isFav: Boolean
  },
  components:{
    CardComponent
  }
}
</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <CardComponent
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isAdded="item.isAdded"
      :isFavourite="item.isFavourite"
      :onClickAdd="isFav ? null : () => $emit('addToCart', item)"
      :onClickFavourite="isFav ? null : () => $emit('addToFavourite', item)"
      :onClickCard="() => $emit('addToDialog', item)"
    />
  </div>
</template>
