import {StoreProvider, useStoreRehydrated} from "easy-peasy"
import PropTypes from "prop-types"
import React from "react"
import ChamberComponent from "../components/Chamber"
import Rehydrating from "../components/Rehydrating"
import getParams from "../helpers/getParams"
import store from "../stores"

const Chamber = ({location}) => {
  return (
    <StoreProvider store={store}>
      <ChamberScreen id={getParams("id", location.search)} />
    </StoreProvider>
  )
}

const ChamberScreen = ({id}) => {
  return useStoreRehydrated() ? <ChamberComponent id={id} /> : <Rehydrating />
}

ChamberScreen.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Chamber
