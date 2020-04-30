import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  // check if route require authentication
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // require auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // user signed in,, proceed to route
      next()
    } else {
      // no user , redirect to login
      next({name: 'Login'})
    }
  } else {
    next()
  }
})


export default router
