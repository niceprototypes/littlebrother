import axios from "axios"
import {action, computed, thunk} from "easy-peasy"
import moment from "moment"
import mapVotes from "../helpers/mapVotes"
import mapVote from "../helpers/mapVote"
import prepareApiCall from "../helpers/prepareApiCall"
import prepareVoteId from "../helpers/prepareVoteId"
import validateVotes from "../helpers/validateVotes"
import validateVote from "../helpers/validateVote"

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
  vote: computed(
    (state) => (congress, chamber, session, rollCall) =>
      state.payload[prepareVoteId(chamber, congress, session, rollCall)]
  ),
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
        console.log(validationError)
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

    // Prepare state
    const state = getState()

    // Prepare vote id
    const id = prepareVoteId(inputs.chamber, inputs.congress, inputs.session, inputs.rollCall)

    // Prepare vote
    const vote = state.payload[id]

    // If vote exists in state
    if (vote) {
      // Update vote
      actions.storeVote({
        id,
        error: "",
        isFetching: true,
      })
    } else {
      // Initialize vote
      actions.storeVote({
        id,
        error: "",
        fetchDateTime: "",
        isFetching: true,
      })
    }

    try {
      // Prepare API call
      const apiCall = prepareApiCall("vote", {
        chamber: inputs.chamber,
        congress: inputs.congress,
        rollCall: inputs.rollCall,
        session: inputs.session,
      })

      // Fetch
      const {data} = await axios(apiCall)

      // Validate fetched data
      const validationError = validateVote(data)

      // If validation error, notify
      if (!!validationError) {
        console.error(validationError)
      }

      // Map results
      const mappedVote = mapVote({id, ...data.results.votes}, vote)

      // Store vote
      actions.storeVote({
        id,
        error: "",
        fetchDateTime: moment().format(),
        isFetching: false,
        payload: mappedVote.payload,
      })
    } catch (error) {
      // Store error
      actions.storeVote({
        id,
        error: error.toString(),
        isFetching: false,
      })
    }
  }),
  storeVotes: action((state, inputs) => {
    // Map input object keys
    Object.keys(inputs).forEach((key) => {
      // For each input key, set key value pair in store
      state[key] = inputs[key]
    })
  }),
  storeVote: action((state, inputs) => {
    // If vote is not stored
    if (!state.payload[inputs.id]) {
      // Initialize vote in store
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
