import Vue from 'vue'
import Router from 'vue-router'
import Movie from './views/Movie.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'movie',
      component: Movie,
      children: [
        {
          path: 'location',
          name: 'location',
          component: () => import('./views/Location.vue')
        },
        {
          path: 'newplay',
          name: 'newplay',
          component: () => import('./views/Newplay.vue')
        },
        {
          path: 'comingsoon',
          name: 'comingsoon',
          component: () => import('./views/Comingsoon.vue')
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('./views/Search.vue')
        },
      ]
    },
    {
      path: '/cinema/:id',
      name: 'cinema',
      component: () => import('./views/Cinema.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/particulars',
      name: 'particulars',
      component: ()=> import('./views/Particulars.vue')
    },
    {
      path:'/register',
      name:'register',
      component: ()=>import('./views/Register.vue')
    },
    {
      path:'/mine',
      name:'mine',
      component: ()=>import('./views/Mine.vue')
    },
    {
      path:'/buytickit',
      name:'buytickit',
      component: ()=>import('./views/BuyTickit.vue')
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
