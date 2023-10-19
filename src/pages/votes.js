import {StoreProvider, useStoreRehydrated} from "easy-peasy"
import React from "react"
import Rehydrating from "../components/Rehydrating"
import VotesComponent from "../components/Votes"
import store from "../stores"

const Votes = () => {
  return (
    <StoreProvider store={store}>
      <VotesScreen />
    </StoreProvider>
  )
}

const VotesScreen = () => {
  return useStoreRehydrated() ? <VotesComponent /> : <Rehydrating />
}

export default Votes
