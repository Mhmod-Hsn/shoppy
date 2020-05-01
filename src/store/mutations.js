
export const SET_CATEGORIES = (state, categories) => {
  state.categories = categories
}

export const ADD_CATEGORY = (state, category) => {
  state.categories.push(category)
}

export const REMOVE_CATEGORY = (state, category) => {
  state.categories = state.categories.filter(cat => {
    return cat.id !== category.id
  })

  // let index = null
  // for (let i = 0; i < state.categories.length; i++) {
  //   if (state.categories[i].id === category.id) {
  //     index = i;
  //     break
  //   }
  // }
  // state.categories.splice(index, 1)
}

export const EDIT_CATEGORY = (state, category) => {
  let index = null
  for (let i = 0; i < state.categories.length; i++) {
    if (state.categories[i].id === category.id) {
      state.categories[i].name = category.name
      state.categories[i].slug = category.slug
      break
    }
  }
  state.categories.splice(index, 1)
}

