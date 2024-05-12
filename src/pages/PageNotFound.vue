<script>
export default {
  name: 'PageNotFound',
}
</script>

<template>

  <div>
    <h1 class="text-3xl font-bold mb-8">Страница не найдена</h1>
    <router-link to="/">
        <button class="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 mt-8 rounded">Вернуться на главную</button>
    </router-link>
  </div>
</template>
