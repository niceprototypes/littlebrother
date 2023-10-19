import {StoreProvider, useStoreRehydrated} from "easy-peasy"
import React from "react"
import CommitteesComponent from "../components/Committees"
import Rehydrating from "../components/Rehydrating"
import store from "../stores"

const Committees = () => {
  return (
    <StoreProvider store={store}>
      <CommitteesScreen />
    </StoreProvider>
  )
}

const CommitteesScreen = () => {
  return useStoreRehydrated() ? <CommitteesComponent /> : <Rehydrating />
}

export default Committees
