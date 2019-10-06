import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store.js';
import Home from './views/main.vue'


Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/auth.vue')
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (!store.getters['user/auth'] && to.name !== 'auth') {
    next({ name: 'auth' });
  } else if (store.getters['user/auth'] && to.name === 'auth') {
    next({ name: 'home' });
  } else {
    next();
  }
});
