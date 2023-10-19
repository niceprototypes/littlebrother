import axios from "axios"
import {action, computed, thunk} from "easy-peasy"
import moment from "moment"
import mapVotes from "../helpers/mapVotes"
import notify from "../helpers/notify"
import prepareApiCall from "../helpers/prepareApiCall"
import validateVotes from "../helpers/validateVotes"
import inspect from "../utils/inspect"

const state = {
  error: "",
  fetchDateTime: "",
  isFetching: false,
  offset: 0,
  keys: [],
  payload: {},
}

const selectors = {
  list: computed((state) => (keysFollowing, followingFilterIsActive) => {
    // Prepare keys based on filters
    const keys = followingFilterIsActive ? keysFollowing : state.keys

    // Map correct keys to payload
    return keys.map((key) => state.payload[key])
  }),
}

const actions = {
  fetchVotes: thunk(async (actions, inputs = {}, helpers) => {
    // Deconstruct helpers
    const {getState} = helpers

    // Prepare state
    const state = getState()

    // Set is fetching bills
    actions.storeVotes({
      isFetching: true,
    })

    try {
      // Calculate new offset
      const newOffset = inputs.shouldIncrementOffset ? state.offset + 20 : 0

      // Prepare API call
      const apiCall = prepareApiCall("votes", {chamber: inputs.chamber, offset: newOffset})

      // Fetch
      const {data} = await axios(apiCall)

      // Validate fetched data
      const validationError = validateVotes(data)

      // If validation error, notify
      if (!!validationError) {
        notify(validationError)
      }

      // Map results
      const {keys, payload} = mapVotes(data.results.votes, state.payload, state.keys)

      // Store votes
      actions.storeVotes({
        error: "",
        fetchDateTime: moment().format(),
        isFetching: false,
        keys,
        offset: newOffset,
        payload,
      })
    } catch (error) {
      // Store error
      actions.storeVotes({
        error: error.toString(),
        isFetching: false,
      })
    }
  }),
  fetchVote: thunk(async (actions, inputs = {}, helpers) => {
    // Deconstruct helpers
    const {getState} = helpers

    // Set is fetching bills
    actions.storeVote({
      id: `${inputs.chamber}-${inputs.congress}-${inputs.rollCall}`,
      error: "",
      isFetching: true,
    })

    try {
      const apiCall = prepareApiCall("vote", {
        chamber: inputs.chamber.toLowerCase(),
        congress: inputs.congress,
        rollCall: inputs.rollCall,
      })

      // Fetch
      const {data} = await axios(apiCall)

      inspect(data)

      // Validate fetched data
    } catch (error) {}
  }),
  storeVotes: action((state, inputs) => {
    // Map input object keys
    Object.keys(inputs).forEach((key) => {
      // For each input key, set key value pair in store
      state[key] = inputs[key]
    })
  }),
  storeVote: action((state, inputs) => {
    // If bill is not stored
    if (!state.payload[inputs.id]) {
      // Initialize bill in store
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
}

const store = {
  ...state,
  ...selectors,
  ...actions,
}

export default store
