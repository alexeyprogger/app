import debounce from 'lodash.debounce'
import axios from 'axios'
export default {
    actions: {
        async addToFavourite(ctx, item){
            try {
            item.isFavourite = !item.isFavourite
            if (item.isFavourite) {
              const obj = {
                item_id: item.id
              }
              const { data } = await axios.post('https://21d6dab34fae5924.mokky.dev/favourites', obj)
              item.favouriteId = data.id
            } else {
              await axios.delete(`https://21d6dab34fae5924.mokky.dev/favourites/${item.favouriteId}`)
              item.favouriteId = null
            }
          } catch (err) {
            console.log(err)
          }
          },

          async fetchFavourites({commit, state}){
            try {
            const { data: favourites } = await axios.get('https://21d6dab34fae5924.mokky.dev/favourites')
            const items = state.items.map((item) => {
              const favourite = favourites.find((favourite) => favourite.item_id === item.id)
        
              if (!favourite) {
                return item
              }
        return {...item,
                isFavourite: true,
                favouriteId: favourite.id}
              
            })
            commit('fetchMutation', items)
          } catch (err) {
            console.log(err)
          }
          },

          async fetchItems({commit, state}){
            try {
            const params = {
              sortBy: state.filters.sortBy
            }
        
            if (state.filters.searchQuery) {
              params.title = `*${state.filters.searchQuery}*`
            }
            const { data } = await axios.get('https://21d6dab34fae5924.mokky.dev/items', {
              params
            })
            const items = data.map((obj) => ({
              ...obj,
              isFavourite: false,
              isAdded: false,
              favouriteId: null
            }))
            commit('fetchMutation', items)
          } catch (err) {
            console.log(err)
          }
          },
          
    },

    mutations: {
        fetchMutation(state, items){
            state.items = items
        },

        onClickAddPlus (state, item){
            if (!item.isAdded) {
        this.commit('addToCart', item)
        } else {
            this.commit('removeFromCart', item);
        }
          },

 onChangeSelect(state, event){
    state.filters.sortBy = event.target.value
  },
  
  onChangeSearchInput: debounce(function(state, event) {
    state.filters.searchQuery = event.target.value;
    }, 800),

    },
    state: {
      items: [],
      filters: {
        sortBy: 'title',
        searchQuery: ''
      }
    },
    getters: {
      itemsGetter(state) {
        return state.items
      },
      filtersGetter(state){
        return state.filters
      }
    }
  }
  