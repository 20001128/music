export default {
  namespaced: true,
  state: {
   songData:[]
  },
  mutations: {
    setSongData(state, params){
      state.songData = params
    }
  }
}
