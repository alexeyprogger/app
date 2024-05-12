export default {
    mutations: {
        setItem(state, item) {
            state.item = item
          },
        changeDialogState(state){
            state.dialogState = !state.dialogState
        },
        changeOverlayState(state){
            state.overlayState = !state.overlayState
        },
        changeMapStateTrue(state){
          state.isWholeMap = true
        },
        changeMapStateFalse(state){
          state.isWholeMap = false
        }
    },

    state: {
    item: [],
    dialogState: false,
    overlayState: false,
    isWholeMap: false
    },

    getters: {
      getIsWholeMap(state){
        return state.isWholeMap
      },
      getItem(state){
        return state.item
      },
      getDialogState(state){
        return state.dialogState
      },
      getOverlayState(state){
        return state.overlayState
      }
    }
  }
  