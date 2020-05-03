import db from '@/firebase/init'

export default {
  state: {
    settings: {
      darkTheme: true,
      shopName: '',
      currency: '',
    }
  },
  actions: {
    getSettings({commit}) {
      // fetch data from firestore
      db.collection('settings').doc('1').get()
        .then(snapshot => {
          commit('SET_SETTINGS', snapshot.data())
      }).catch(e => {
        console.log('error' + e)
      })
    },
    updateSettings({commit}, settings) {
      db.collection('settings').doc('1').update(settings)
        .then(snapshot => {
          window.alert('Settings saved successfully');
          commit('UPDATE_SETTINGS', settings)
        }).catch(e => {
        console.log('error' + e)
      })
    }
  },
  mutations: {
    SET_SETTINGS(state, settings) {
      state.settings = settings
    },

    UPDATE_SETTINGS(state, settings) {
      state.settings = settings
    }
  },
  getters: {},
}