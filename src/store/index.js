import Vue from 'vue'
import Vuex from 'vuex'
// import modules
import category from './category'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category
  },
  state: {
    title: 'Shoppy',
  },
  actions: {},
  mutations: {},
  getters: {},

})
