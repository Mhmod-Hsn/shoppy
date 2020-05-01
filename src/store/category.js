import db from '@/firebase/init'

export default {
  state: {
    categories: []
  },
  actions: {
    addCategory({commit}, {category}) {
      db.collection('category').add({
        name: category.name,
        slug: category.slug
      }).then(() => {
        commit('ADD_CATEGORY', category)
      }).catch(e => {
        console.log('error' + e)
      })
    },
    getCategories({commit}) {
      let cats = []
      // fetch data from firestore
      db.collection('category').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let c = doc.data()
            c.id = doc.id
            cats.push(c)
          })
        }).then(() => {
        commit('SET_CATEGORIES', cats)
      }).catch(e => {
        console.log('error' + e)
      })

    },
    editCategory({commit}, category) {
      db.collection('category').doc(category.id).update({
        name: category.name,
        slug: category.slug
      })
        .then(() => {
          commit('EDIT_CATEGORY', category)

        }).catch(e => {
        console.log('error' + e)
      })
    },
    removeCategory({commit}, category) {
      db.collection('category').doc(category.id).delete()
        .then(() => {
          commit('REMOVE_CATEGORY', category)
        }).catch(e => {
        console.log('error' + e)
      })
    }
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },

    ADD_CATEGORY(state, category) {
      state.categories.push(category)
    },

    REMOVE_CATEGORY(state, category) {
      // state.categories = state.categories.filter(cat => {
      //   return cat.id !== category.id
      // })

      let index = null
      for (let i = 0; i < state.categories.length; i++) {
        if (state.categories[i].id === category.id) {
          index = i;
          break
        }
      }
      state.categories.splice(index, 1)
    },
    EDIT_CATEGORY(state, category) {
      let index = null
      for (let i = 0; i < state.categories.length; i++) {
        if (state.categories[i].id === category.id) {
          state.categories[i].name = category.name
          state.categories[i].slug = category.slug
          break
        }
      }
    }
  },
  getters: {},
}