import {action, computed} from "easy-peasy"

const state = {
  filters: {
    bills: [
      {
        key: "following",
        label: "Following",
        isActive: false,
      },
    ],
    votes: [
      {
        key: "following",
        label: "Following",
        isActive: false,
      },
    ],
  },
  isDarkMode: false,
}

const selectors = {
  filterIsActive: computed(
    (state) => (model, key) =>
      state.filters[model].find((filter) => {
        return filter.key === key
      }).isActive
  ),
}

const actions = {
  toggleFilter: action((state, inputs) => {
    state.filters[inputs.listKey] = state.filters[inputs.listKey].map((filter) => ({
      ...filter,
      isActive: filter.key === inputs.filterKey ? !filter.isActive : filter.isActive,
    }))
  }),
  toggleIsDarkMode: action((state) => {
    state.isDarkMode = !state.isDarkMode
  }),
}

const store = {
  ...state,
  ...selectors,
  ...actions,
}

export default store
