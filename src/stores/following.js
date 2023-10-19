import {action, computed} from "easy-peasy"

const state = {
  bills: [],
  chambers: [],
  legislators: [],
  votes: [],
}

const selectors = {
  determineIsFollowing: computed((state) => (model, key) => {
    return state[model].includes(key)
  }),
  keysFollowing: computed((state) => (model) => state[model]),
}

const actions = {
  onClickFollow: action((state, inputs) => {
    if (state[inputs.key].includes(inputs.id)) {
      state[inputs.key] = state[inputs.key].filter((id) => id !== inputs.id)
    } else {
      state[inputs.key].push(inputs.id)
    }
  }),
}

const store = {
  ...state,
  ...selectors,
  ...actions,
}

export default store
