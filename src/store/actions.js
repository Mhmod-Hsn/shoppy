import db from '@/firebase/init'

export const getCategories = ({commit}) => {
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

}

export const addCategory = ({commit}, {category}) => {

  db.collection('category').add({
    name: category.name,
    slug: category.slug
  }).then(() => {
    commit('ADD_CATEGORY', category)
  }).catch(e => {
    console.log('error' + e)
  })
}

export const removeCategory = ({commit}, category) => {
  console.log(category)
  db.collection('category').doc(category.id).delete().then(() => {
    commit('REMOVE_CATEGORY', category)
  }).catch(e => {
    console.log('error' + e)
  })
}