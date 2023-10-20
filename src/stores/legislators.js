import axios from "axios"
import {action, computed, thunk} from "easy-peasy"
import moment from "moment"
import mapLegislators from "../helpers/mapLegislators"
import mapLegislator from "../helpers/mapLegislator"
// import notify from "../helpers/notify"
import prepareApiCall from "../helpers/prepareApiCall"
import validateLegislator from "../helpers/validateLegislator"
import validateLegislators from "../helpers/validateLegislators"

const state = {
  counts: {
    house: {
      D: 213,
      ID: 0,
      R: 222,
      V: 1,
    },
    senate: {
      D: 49,
      ID: 3,
      R: 48,
      V: 0,
    },
  },
  error: "",
  fetchDateTime: "",
  isFetching: false,
  keys: {
    house: [],
    senate: [],
  },
  payload: {},
  search: "",
}

const selectors = {
  chamberCounts: computed((state) => (chamber) => state.counts[chamber]),
  legislator: computed((state) => (id) => state.payload[id]),
  list: computed((state) => (chamber) => state.keys[chamber].map((key) => state.payload[key])),
  searchedLegislators: computed((state) => (chamber, search) => {
    // Initialize results
    const results = []
    // Convert search string to lowercase
    const lowerCaseSearch = search.toLowerCase()

    // Map chamber list
    state.keys[chamber].map((key) => {
      const legislator = state.payload[key]

      const {displayName, stateName} = legislator.payload

      if (displayName.toLowerCase().includes(lowerCaseSearch) || stateName.toLowerCase().includes(lowerCaseSearch)) {
        results.push(legislator)
      }
    })

    return results
  }),
}

const actions = {
  fetchLegislators: thunk(async (actions, inputs = {chamber: "senate"}, helpers) => {
    // Deconstruct helpers
    const {getState} = helpers

    // Prepare state
    const state = getState()

    // Set is fetching bills
    actions.storeLegislators({
      isFetching: true,
    })

    try {
      // Prepare API call
      const apiCall = prepareApiCall("legislators", {chamber: inputs.chamber})

      // Fetch
      const {data} = await axios(apiCall)

      // Validate fetched data
      const validationError = validateLegislators(data)

      // If validation error, notify
      if (!!validationError) {
        console.error(validationError)
      }

      // Map results
      const {keys, payload} = mapLegislators(data.results[0].members, state.payload, state.keys[inputs.chamber])

      // Store legislators
      actions.storeLegislators({
        error: "",
        fetchDateTime: moment().format(),
        isFetching: false,
        keys: {
          ...state.keys,
          [inputs.chamber]: keys,
        },
        payload: payload,
      })

      // If fetched house, fetch senate
      if (inputs.chamber === "senate") {
        actions.fetchLegislators({chamber: "house"})
      }
    } catch (error) {
      // Store error
      state.error = error.toString()
      state.isFetching = false
    }
  }),
  fetchLegislator: thunk(async (actions, inputs = {}, helpers) => {
    // Deconstruct helpers
    const {getState} = helpers

    // Prepare state
    const state = getState()

    // Prepare legislator
    const legislator = state.payload[inputs.id]

    // If legislator exists in state
    if (legislator) {
      // Update legislator
      actions.storeLegislator({
        id: inputs.id,
        error: "",
        isFetching: true,
      })
    } else {
      // Initialize legislator
      actions.storeLegislator({
        id: inputs.id,
        error: "",
        fetchDateTime: "",
        isFetching: true,
      })
    }

    try {
      // Prepare API call
      const apiCall = prepareApiCall("legislator", {id: inputs.id})

      // Fetch
      const {data} = await axios(apiCall)

      // Validate fetched data
      const validationError = validateLegislator(data)

      // If validation error, notify
      if (!!validationError) {
        console.error(validationError)
      }

      // Map results
      const mappedLegislator = mapLegislator(data.results[0], legislator)

      // Store legislator
      actions.storeLegislator({
        id: inputs.id,
        error: "",
        fetchDateTime: moment().format(),
        isFetching: false,
        payload: mappedLegislator.payload,
      })

      // actions.fetchLegislatorVotes()
    } catch (error) {
      // Store error
      actions.storeLegislator({
        id: inputs.id,
        error: error.toString(),
        isFetching: false,
      })
    }
  }),
  fetchLegislatorVotes: thunk(async (actions, inputs = {}, helpers) => {
    try {
    } catch (error) {}
  }),
  storeLegislators: action((state, inputs) => {
    // Map input object keys
    Object.keys(inputs).forEach((key) => {
      // For each input key, set key value pair in store
      state[key] = inputs[key]
    })
  }),
  storeLegislator: action((state, inputs) => {
    // If bill is not stored
    if (!state.payload[inputs.id]) {
      // Initialize legislator in store
      state.payload[inputs.id] = {}
    }

    // Map input object keys
    Object.keys(inputs).forEach((key) => {
      // For each input key that is not ID
      if (key !== "id") {
        // Set key value pair in store
        state.payload[inputs.id][key] = inputs[key]
      }
    })
  }),
  updateSearch: action((state, inputs) => {
    state.search = inputs.search
  }),
}

const store = {
  ...state,
  ...selectors,
  ...actions,
}

export default store
