import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'
import moment from 'moment'


Vue.filter('priceText', value => {
  return value || value > 0 ? value + ' ' + store.state.settings.settings.currency : 'Free'
});
Vue.filter('fromTheMoment', value => {
  return moment(Number(value)).startOf('hour').fromNow()
});

Vue.config.productionTip = false;

let app = null;

// waith for firebase before starting the app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});
