import axios from "axios"
import {action, computed, thunk} from "easy-peasy"
import moment from "moment"
import mapBills from "../helpers/mapBills"
import mapBill from "../helpers/mapBill"
// import notify from "../helpers/notify"
import prepareApiCall from "../helpers/prepareApiCall"
import prepareBillId from "../helpers/prepareBillId"
import validateBill from "../helpers/validateBill"
import validateBills from "../helpers/validateBills"

const state = {
  error: "",
  fetchDateTime: "",
  isFetching: false,
  offset: 0,
  keys: [],
  payload: {},
}

const selectors = {
  bill: computed((state) => (congress, slug) => state.payload[prepareBillId(slug, congress)]),
  list: computed((state) => (keysFollowing, followingFilterIsActive) => {
    // Prepare keys based on filters
    const keys = followingFilterIsActive ? keysFollowing : state.keys

    // Map correct keys to payload
    return keys.map((key) => state.payload[key])
  }),
}

const actions = {
  fetchBills: thunk(async (actions, inputs = {}, helpers) => {
    // Deconstruct helpers
    const {getState} = helpers

    // Prepare state
    const state = getState()

    // Set is fetching bills
    actions.storeBills({
      isFetching: true,
    })

    // Fetch
    try {
      // Calculate new offset
      const newOffset = inputs.shouldIncrementOffset ? state.offset + 20 : 0

      // Prepare API call
      const apiCall = prepareApiCall("bills", {offset: newOffset})

      // Fetch
      const {data} = await axios(apiCall)

      // Validate fetched data
      const validationError = validateBills(data)

      // If validation error, notify
      if (!!validationError) {
        console.error(validationError)
      }

      // Map results
      const {keys, payload} = mapBills(data.results[0].bills, state.payload, state.keys)

      // Store bills
      actions.storeBills({
        error: "",
        fetchDateTime: moment().format(),
        isFetching: false,
        keys,
        offset: newOffset,
        payload,
      })
    } catch (error) {
      // Store error
      actions.storeBills({
        error: error.toString(),
        isFetching: false,
      })
    }
  }),
  fetchBill: thunk(async (actions, inputs = {}, helpers) => {
    // Deconstruct helpers
    const {getState} = helpers

    // Prepare state
    const state = getState()

    // Prepare bill id
    const id = prepareBillId(inputs.slug, inputs.congress)

    // Prepare bill
    const bill = state.payload[id]

    // If bill exists in state
    if (bill) {
      // Update bill
      actions.storeBill({
        id,
        error: "",
        isFetching: true,
      })
    } else {
      // Initialize bill
      actions.storeBill({
        id,
        error: "",
        fetchDateTime: "",
        isFetching: true,
      })
    }

    try {
      // Prepare API call
      const apiCall = prepareApiCall("bill", {id, slug: inputs.slug})

      // Fetch
      const {data} = await axios(apiCall)

      // Validate fetched data
      const validationError = validateBill(data)

      // If validation error, notify
      if (!!validationError) {
        console.error(validationError)
      }
      // Map results
      const mappedBill = mapBill(data.results[0], bill)

      // Store bill
      actions.storeBill({
        id,
        error: "",
        fetchDateTime: moment().format(),
        isFetching: false,
        payload: mappedBill.payload,
      })
    } catch (error) {
      // Store error
      actions.storeBill({
        id,
        error: error.toString(),
        isFetching: false,
      })
    }
  }),
  storeBills: action((state, inputs) => {
    // Map input object keys
    Object.keys(inputs).forEach((key) => {
      // For each input key, set key value pair in store
      state[key] = inputs[key]
    })
  }),
  storeBill: action((state, inputs) => {
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
