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
      <VoteScreen
        chamber={getParams("chamber", location.search)}
        congress={getParams("congress", location.search)}
        rollCall={getParams("rollCall", location.search)}
        session={getParams("session", location.search)}
      />
    </StoreProvider>
  )
}

const VoteScreen = ({chamber, congress, rollCall, session}) => {
  return useStoreRehydrated() ? (
    <VoteComponent chamber={chamber} congress={congress} rollCall={rollCall} session={session} />
  ) : (
    <Rehydrating />
  )
}

VoteScreen.propTypes = {
  chamber: PropTypes.string.isRequired,
  congress: PropTypes.string.isRequired,
  rollCall: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
}

export default Vote
