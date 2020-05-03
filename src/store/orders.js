import db from '@/firebase/init'

export default {
  state: {
    orders: [],
    stats: [
      'New',
      'Fulfilled',
      'Hold',
      'Cancelled'
    ]
  },

  actions: {
    getOrders({commit}) {
      let orders = [];
      // fetch data from firestore
      db.collection('order').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let order = doc.data();
            order.id = doc.id;
            orders.push(order)
          })
        }).then(() => {
        commit('SET_ORDERS', orders)
      }).catch(e => {
        console.log('error' + e)
      })
    },

    addOrder({commit}, order) {
      db.collection('order').add(order)
        .then(() => {
          commit('ADD_ORDER', order);
          window.alert('Order Added Successfully')
        }).catch(e => {
        console.log('error' + e)
      })
    },

    removeOrder({commit}, id) {
      db.collection('order').doc(id).delete()
        .then(() => {
          commit('REMOVE_ORDER', id);
          window.alert('Order removed')
        }).catch(e => {
        console.log('error' + e)
      })
    },

    changeOrderState({commit}, {id, value}) {
      db.collection('order').doc(id).update({
        state: value
      })
        .then(() => {
          commit('CHANGE_ORDER_STATE', {id, value});
          window.alert('Order state changed successfully')
        }).catch(e => {
        console.log('error' + e)
      })
    },

    editOrder({commit}, order) {
      db.collection('order').doc(order.id).update(order)
        .then(() => {
          commit('EDIT_ORDER', order);
          window.alert('Order edited successfully')
        }).catch(e => {
        console.log('error' + e)
      })

    }
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders
    },

    ADD_ORDER(state, order) {
      state.orders.push(order)
    },

    REMOVE_ORDER(state, id) {
      state.orders = state.orders.filter(order => {
        return order.id !== id
      })
    },

    CHANGE_ORDER_STATE(state, {id, value}) {
      for (let order of state.orders) {
        if (order.id == id) {
          order.state = value;
          break
        }
      }
    },

    EDIT_ORDER(state, order) {
      for (let o of state.orders) {
        if (o.id == order.id) {
          o = order;
          break
        }
      }
    }
  },
  getters: {},
}