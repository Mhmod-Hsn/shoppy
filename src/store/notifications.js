import db from '@/firebase/init'

export default {
  state: {
    notifications: [],
    showLoadMore: true,
    loadingState: true,
    lastVisible: {},
    first: db.collection('notifications')
      .orderBy('timestamp', "desc")
      .limit(2)
  },

  actions: {
    // Realtime Notifications ( but no scrolling )
    /*getNotifications({commit}) {
      let notifications = [];
      let ref = db.collection('notifications')
        .orderBy('timestamp', "desc")
        .limit(2)
      ref.onSnapshot(snapshot=>{
        snapshot.docChanges().forEach(change=>{
          if (change.type==='added'){
            let doc = change.doc

            notifications.push({
              id: doc.id,
              product : doc.data().product,
              quantity : doc.data().quantity,
              timestamp : doc.data().timestamp,
              read : doc.data().read,
            })
          }
        })
        commit('SET_NOTIFICATIONS', notifications)
      })


    },
*/

    getNotifications({commit, state}) {
      state.loadingState = true;

      state.first.startAfter(state.lastVisible).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let notification = doc.data();
            notification.id = doc.id;
            state.notifications.push(notification)
          });
          state.loadingState = false;
          // Get the last visible document
          state.lastVisible = snapshot.docs[snapshot.docs.length - 1];

          // no more data to load, hide the button
          if (!state.lastVisible) {
            state.showLoadMore = false
          }

        });

      commit('SET_NOTIFICATIONS', state.notifications)

    },

    addNotification({commit}, notification) {
      db.collection('notifications').add(notification)
        .then(() => {
          commit('ADD_NOTIFICATION', notification);
        }).catch(e => {
        console.log('error' + e)
      })
    },

    changeNotificationState({commit}, {id, value}) {
      db.collection('notifications').doc(id).update({read: value})
        .then(() => {
          commit('CHANGE_NOTIFICATION_STATE', {id, value});
          window.alert('notification state changed')
        }).catch(e => {
        console.log('error' + e)
      })
    },

  },
  mutations: {
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications
    },

    ADD_NOTIFICATION(state, notifications) {
      // dont need to push new notification .. firebase realtime database
      // doing this thing for us
      // state.notifications.push(notifications)
    },

    CHANGE_NOTIFICATION_STATE(state, {id, value}) {
      for (let notification of state.notifications) {
        if (notification.id == id) {
          notification.read = value;
          break
        }
      }
    },

  },
  getters: {
    unreadNotifications(state) {
      return state.notifications.filter(n => !n.read).length
    },
  },
}