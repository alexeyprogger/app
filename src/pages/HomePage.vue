<script>
import VueLayersMapComponent from '@/components/VueLayersMapComponent.vue'
import CardListComponent from '../components/CardListComponent.vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    CardListComponent,
    VueLayersMapComponent
  },
  computed: {
  ...mapGetters(["itemsGetter", "getDialogState", "getOverlayState", 
  "filtersGetter", "cartGetter", "getItem"]),
  },
  methods: {
    handleClick(){
      this.changeDialogState(), 
      this.changeOverlayState()
    },

    addToDialog(item){
        this.handleClick()

        this.setItem(item)
        this.setTitle(item)
        this.setDescription(item)        
    },
    ...mapActions(["fetchItems", "fetchFavourites", "addToFavourite"]),
    ...mapMutations(["setItem", "changeOverlayState", 
    "changeDialogState", "onChangeSelect", 
    "onChangeSearchInput", "onClickAddPlus", "fetchMutation", "changeMapStateFalse"]),
  },

  async mounted(){
    await this.fetchItems()
    await this.fetchFavourites()
    
    this.changeMapStateFalse()
    
  this.fetchMutation(this.itemsGetter.map((item) => ({
    ...item,
    isAdded: this.cartGetter.some((cartItem) => cartItem.id === item.id)
  })))
  },

  watch: {
'filtersGetter.sortBy'() { 
  this.fetchItems()
  this.fetchFavourites()
},
'filtersGetter.searchQuery'() {
  this.fetchFavourites()
  this.fetchItems()
},
},
}



</script>
<template>
  <div>
    <div v-if="getOverlayState" class="fixed z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-70"></div>
    <div v-if="getDialogState" class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    bg-white rounded-lg px-10 py-6 space-y-5 overflow-auto max-h-full w-3/4"
    >
        <h1 class="text-xl font-semibold">{{getItem.title}}</h1>

        <div class="flex items-center">
          <div class="py-5 border-t border-b border-gray-300 p-10">
              <p class="text-sm text-justify">{{getItem.description}}</p>
          </div>
            <VueLayersMapComponent :coordinates="getItem.coords" :mapZoom="15"/>
        </div>
          <div class="flex justify-between">
          <button @click="onClickAddPlus(getItem)" class="px-5 py-2 min-w-48 text-white cursor-pointer rounded-md"
          :class="{'bg-orange-300 hover:bg-orange-400': !getItem.isAdded, 'bg-red-500 hover:bg-red-400': getItem.isAdded}"
          >
              {{getItem.isAdded ? 'Удалить из корзины' : 'В корзину'}}
          </button>
            <button @click="handleClick" class="px-5 py-2 bg-red-500 hover:bg-red-400 text-white cursor-pointer rounded-md">
                Закрыть
            </button>
        </div>
    </div>

    
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold mb-8">Все экскурсии</h2>
      <div class="flex gap-4 max-md:flex max-lg:flex-col">
        <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
          <option value="title">По названию</option>
          <option value="price">Дешёвые</option>
          <option value="-price">Дорогие</option>
        </select>
        <div class="relative">
          <img class="absolute left-3 top-3" src="/search.svg" />
          <input
            @input="onChangeSearchInput"
            class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            placeholder="Поиск"
          />
        </div>
      </div>
    </div>
    <div class="mt-10">
      <CardListComponent :items="itemsGetter" @addToFavourite="addToFavourite" @addToCart="onClickAddPlus" @addToDialog="addToDialog"/>
    </div>
  </div>
</template>
