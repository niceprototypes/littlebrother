import {StoreProvider, useStoreRehydrated} from "easy-peasy"
import React from "react"
import Rehydrating from "../components/Rehydrating"
import SettingsComponent from "../components/Settings"
import store from "../stores"

const Settings = () => {
  return (
    <StoreProvider store={store}>
      <SettingsScreen />
    </StoreProvider>
  )
}

const SettingsScreen = () => {
  return useStoreRehydrated() ? <SettingsComponent /> : <Rehydrating />
}

export default Settings
