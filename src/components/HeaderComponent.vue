<script>
export default {
  name: 'HeaderComponent',
  props: {
    totalPrice: Number
  },
}
</script>

<template>
  <header class="flex justify-between border-b border-slate-100 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-5">
        <img src="/logo.jpg" alt="Logo" class="w-20" />
        <div class="max-md:hidden">
          <h2 class="text-xl font-bold uppercase">Самара трэвел</h2>
          <p class="text-slate-400">Лучшее экскурсии в 63 регионе</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-7">
      <li
      @click="() => this.$emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} р.</b>
      </li>
      <router-link to="/favourites">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Cart" />
          <span>Избранное</span>
        </li>
      </router-link>
      <router-link to="/map">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/map.svg" alt="Cart" />
          <span>Карта</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
