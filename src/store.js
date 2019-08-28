import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nm: window.localStorage.getItem('nowNm') || '北京',
    id: window.localStorage.getItem('nowId') || 1,
    movieId:0,
    isLoging:false,
    loginUser:''
  },
  mutations: {
    CITY_INFO(state, payload){
      state.nm = payload.nm;
      state.id = payload.id;
    },
    setNmAndId(state,{nm,id}){
      state.nm = nm;
      state.id = id;
    },
    login(state,name){
      state.isLoging = true;
      state.loginUser = name;
    }
  },
  actions: {

  }
})
