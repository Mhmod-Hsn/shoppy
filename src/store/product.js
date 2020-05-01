import db, {storage} from '@/firebase/init'

export default {
  state: {
    products: []
  },
  actions: {
    addProduct({commit}, product) {

      // Upload images
      let productRef = storage.ref('products/' + product.image.name);
      let uploadTask = productRef.put(product.image);
      uploadTask.on('state_changed', snapshot => {
        },
        e => {
          console.log('error' + e)
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL()
            .then(downloadURL => {
              product.image = downloadURL
            })
            .then(() => {
              // Upload to firebase
              db.collection('product').add(product)
                .then(() => {
                  commit('ADD_PRODUCT', product)
                }).catch(e => {
                console.log('error' + e)
              })
            })
        })


    },

    getProducts({commit}) {
      let products = [];
      // fetch data from firestore
      db.collection('product').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let p = doc.data();
            p.id = doc.id;
            products.push(p)
          })
        }).then(() => {
        commit('SET_PRODUCTS', products)
      }).catch(e => {
        console.log('error' + e)
      })

    },

    removeProduct({commit}, product) {
      db.collection('product').doc(product.id).delete()
        .then(() => {
          commit('REMOVE_PRODUCT', product)
        }).catch(e => {
        console.log('error' + e)
      })

    }
  },
  mutations: {

    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },

    SET_PRODUCTS(state, products) {
      state.products = products
    },

    REMOVE_PRODUCT(state, products) {
      state.products = state.products.filter(product => {
        return product.id !== products.id
      })

    }
  },
  getters: {},
}