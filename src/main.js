import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios);

Vue.filter('setWH',(url,arg)=>{
  if(url){
    return url.replace(/w\.h/,arg);
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
