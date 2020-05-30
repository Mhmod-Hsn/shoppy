import db from '@/firebase/init'

export default {
  state: {
    todos: []
  },
  actions: {
    addTodo({commit}, todo) {
      db.collection('todos').add(todo)
        .then(() => {
          commit('ADD_TODO', todo)
          window.alert('Todo added successfully')
        }).catch(e => {
          console.log('error' + e)
      })
    },
    getTodos({commit}) {
      let todos = [];
      // fetch data from firestore
      db.collection('todos').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let todo = doc.data();
            todo.id = doc.id;
            todos.push(todo)
          })
        }).then(() => {
        commit('SET_TODOS', todos)
      }).catch(e => {
        console.log('error' + e)
      })

    },
    editTodos({commit}, todo) {
      db.collection('todos').doc(todo.id)
        .update(todo)
        .then(() => {
          commit('EDIT_TODO', todo)
          window.alert('Todo Edited')
        }).catch(e => {
        console.log('error' + e)
      })
    },
    removeTodo({commit}, id) {
      db.collection('todos').doc(id)
        .delete()
        .then(() => {
          commit('REMOVE_TODO', id)
          window.alert('todo removed!')
        }).catch(e => {
        console.log('error' + e)
      })
    },

    changeTodoState({commit}, {id, value}) {
      db.collection('todos').doc(id).update({
        done: value
      })
        .then(() => {
          commit('CHANGE_TODO_STATE', {id, value});
          window.alert('Todo state changed successfully')
        }).catch(e => {
        console.log('error' + e)
      })
    },
  },

  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos
    },

    ADD_TODO(state, todo) {
      state.todos.push(todo)
    },

    REMOVE_TODO(state, id) {
      state.todos = state.todos.filter(todo => {
        return todo.id !== id
      })
    },
    EDIT_TODO(state, todo) {
      for (let i = 0; i < state.todos.length; i++) {
        if (state.todos[i].id === todo.id) {
          state.todos[i].name = todo.name;
          state.todos[i].slug = todo.slug;
          break
        }
      }
    },
    CHANGE_TODO_STATE(state, {id, value}) {
      for (let todo of state.todos) {
        if (todo.id == id) {
          todo.done = value;
          break
        }
      }
    },

  },
  getters: {},
}