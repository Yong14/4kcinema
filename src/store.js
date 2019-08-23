import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nm: '北京',
    id: 1
  },
  mutations: {
    CITY_INFO(state, payload){
      state.nm = payload.nm;
      state.id = payload.id;
    }
  },
  actions: {

  }
})
