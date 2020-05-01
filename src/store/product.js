import db, {storage} from '@/firebase/init'

export default {
  state: {
    products: []
  },
  actions: {
    addProduct({commit}, p) {

      let imgs = []
      // Upload images
      for (let i = 0; i < p.images.length; i++) {
        let file = p.images[i]
        let productRef = storage.ref(`products/${file.name}`)
        let uploadTask = productRef.put(file)
        uploadTask.on('state_changed', snapshot => {
          },
          e => {
            console.log('error' + e)
          }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log(downloadURL.toString())
              imgs.push(downloadURL.toString())
            })
          })
      }

      let product = {
        name: p.name,
        category: p.category,
        quantity: parseInt(p.quantity),
        slug: p.slug,
        images: imgs
      }

      console.log(product)

      db.collection('product').add(product)
        .then(() => {
          commit('ADD_PRODUCT', product)
        }).catch(e => {
        console.log('error' + e)
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