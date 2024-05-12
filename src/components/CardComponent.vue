<script>

export default {
  name: 'CardComponent',
  props:{
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavourite: Boolean,
  isAdded: Boolean,
  onClickFavourite: Function,
  onClickAdd: Function,
  onClickCard: Function
  }
}

</script>

<template>
  <div
    class="relative bg-white border border-slate-100 transition hover:shadow-xl hover:-translate-y-2 rounded-3xl p-8 cursor-pointer"
    @click="onClickCard"
  >
    <img
      v-if="onClickFavourite"
      :src="!isFavourite ? '/like-2.svg' : 'like-1.svg'"
      alt="Like 1"
      class="absolute top-8 left-8 w-10 h-10"
      @click.stop="onClickFavourite"
    />
    <img :src="imageUrl" alt="smr" class="rounded-xl" />
    <p class="mt-2 text-xl">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400 text-xl">Цена:</span>
        <b class="text-xl">{{ price }} руб.</b>
      </div>
      <img
        v-if="onClickAdd"
        @click.stop="onClickAdd"
        :src="!isAdded ? '/plus.svg' : 'checked.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>
