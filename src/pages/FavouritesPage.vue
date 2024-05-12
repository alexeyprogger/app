<script>
import axios from 'axios'
import CardListComponent from '../components/CardListComponent.vue'

export default {
  name: 'FavouritesPage',
  components:{
    CardListComponent
  },
  data(){
    return {
     favourites: [],
     load: ''
    }
  }, 
  async mounted(){
  try {
    const { data } = await axios.get(
      'https://21d6dab34fae5924.mokky.dev/favourites?_relations=items'
    )
    this.favourites = data.map((obj) => obj.item)
    this.load = this.favourites.length > 0 ? 'есть' : 'нет' 
  } catch (err) {
    console.log(err)
    this.load = 'ошибка'
  }
}
}
</script>

<template>
  <div><h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
    <div>
  <CardListComponent :items="favourites" isFav />
</div>
    <div v-if="!favourites.length && load===''">
      <h1 class="text-3xl font-bold mb-8">Загрузка...</h1>
    </div>
    <div v-if="!favourites.length && load==='нет'">
      <h1 class="text-3xl mb-8">У вас нет ничего в избранном</h1>
    </div>
    <div v-if="load==='ошибка'">
      <h1 class="text-3xl mb-8">Ошибка загрузки. Повторите попытку позже.</h1>
      </div>
      <router-link to="/">
      <button class="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 mt-8 rounded">Вернуться на главную</button>
    </router-link>
</div>
  
</template>
