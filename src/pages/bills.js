import {StoreProvider, useStoreRehydrated} from "easy-peasy"
import React from "react"
import BillsComponent from "../components/Bills"
import Rehydrating from "../components/Rehydrating"
import store from "../stores"

const Bills = () => {
  return (
    <StoreProvider store={store}>
      <BillsScreen />
    </StoreProvider>
  )
}

const BillsScreen = () => {
  return useStoreRehydrated() ? <BillsComponent /> : <Rehydrating />
}

export default Bills
