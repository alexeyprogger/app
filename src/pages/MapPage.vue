<script>
import VueLayersMapComponent from '../components/VueLayersMapComponent.vue'
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'MapPage',
  components:{
    VueLayersMapComponent
  },
methods: {
    ...mapMutations(["changeMapStateTrue"]),
    ...mapActions(["fetchItems"])
},

async mounted (){
        this.changeMapStateTrue()
        await this.fetchItems()
},

}
</script>

<template>
  <div><h2 class="text-3xl font-bold mb-8">Наши экскурсии на карте</h2>
    <hr>
        <h2 class="text-2xl font-bold mb-8 mt-8">Все экскурсии:</h2>
        <VueLayersMapComponent :mapZoom="12" :coordinates="[50.095869897579, 53.193821561533]"/>
        <h2 class="text-2xl font-bold mb-8 mt-8">Экскурсии, которые Вы выбрали:</h2>
        <VueLayersMapComponent :mapZoom="12" :coordinates="[50.095869897579, 53.193821561533]" :isPartical="true"/>
        <router-link to="/">
            <button class="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 mt-8 rounded">Вернуться на главную</button>
        </router-link>
</div>
  
</template>
