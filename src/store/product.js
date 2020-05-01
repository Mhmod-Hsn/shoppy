import db, {storage} from '@/firebase/init'

export default {
  state: {
    products: []
  },
  actions: {
    addProduct({commit}, productPayload) {

      let productRef = storage.ref('products/' + productPayload.image.name)
      let uploadTask = productRef.put(productPayload.image)
      uploadTask.on('state_changed', snapshot => {
        },
        e => {
          console.log('error' + e)
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL()
            .then(downloadURL => {
              productPayload.image = downloadURL
            })
            .then(() => {

              // Upload to firebase
              db.collection('product').add(productPayload)
                .then(() => {
                  commit('ADD_PRODUCT', productPayload)
                }).catch(e => {
                console.log('error' + e)
              })
            })


        })


    },


    getProducts({commit}) {
      let products = []
      // fetch data from firestore
      db.collection('product').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let p = doc.data()
            p.id = doc.id
            products.push(p)
          })
        }).then(() => {
        commit('SET_PRODUCTS', products)
      }).catch(e => {
        console.log('error' + e)
      })

    },
  },
  mutations: {

    ADD_PRODUCT(state, product) {
      console.log('mutation', product)
      state.products.push(product)
    },


    SET_PRODUCTS(state, products) {
      state.products = products
    },
  },
  getters: {},
}