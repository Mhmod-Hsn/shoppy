import Vue from 'vue'
import Vuex from 'vuex'
import {fb} from '@/firebase/init'
// import modules
import category from './category'
import product from './product'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category,
    product
  },
  state: {
    title: 'Shoppy',
    darkMode: true,
    currency: 'EGP',
    dummyImage: 'https://lh3.googleusercontent.com/proxy/3inDg_SqHs5630hZEiUZk6X7rawX1va1KSen6i8VZQlpDq3zJF3mrrgkuDuAqrvfKiZ8_dKoGArSwVfoqtgcwWPKQ8645nDnYtDobNkXlHiWFBwqrwvUauGH7jQ0nrA_E0Aa2noF'
  },
  actions: {},
  mutations: {},
  getters: {
    currentUser() {
      return fb.auth().currentUser.email.substr(0, 1)
    },
  },

})
