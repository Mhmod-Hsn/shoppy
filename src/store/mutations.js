export const SET_CATEGORIES = (state, categories) => {
  state.categories = categories
}

export const ADD_CATEGORY = (state, category) => {
  state.categories.push(category)
}

export const REMOVE_CATEGORY = (state, category) => {
  let index = null
  for (let i = 0; i < state.categories.length; i++) {
    if (state.categories[i].id === category.id) {
      index = i;
      break
    }
  }
  console.log(index)
  state.categories.splice(index, 1)
}