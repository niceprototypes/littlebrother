import {StoreProvider, useStoreRehydrated} from "easy-peasy"
import PropTypes from "prop-types"
import React from "react"
import Rehydrating from "../components/Rehydrating"
import VoteComponent from "../components/Vote"
import getParams from "../helpers/getParams"
import store from "../stores"

const Vote = ({location}) => {
  return (
    <StoreProvider store={store}>
      <VoteScreen id={getParams("id", location.search)} />
    </StoreProvider>
  )
}

const VoteScreen = ({id}) => {
  return useStoreRehydrated() ? <VoteComponent id={id} /> : <Rehydrating />
}

VoteScreen.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Vote
