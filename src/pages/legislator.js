import {StoreProvider, useStoreRehydrated} from "easy-peasy"
import PropTypes from "prop-types"
import React from "react"
import LegislatorComponent from "../components/Legislator"
import Rehydrating from "../components/Rehydrating"
import getParams from "../helpers/getParams"
import store from "../stores"

const Legislator = ({location}) => {
  return (
    <StoreProvider store={store}>
      <LegislatorScreen id={getParams("id", location.search)} />
    </StoreProvider>
  )
}

const LegislatorScreen = ({id}) => {
  return useStoreRehydrated() ? <LegislatorComponent id={id} /> : <Rehydrating />
}

LegislatorScreen.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Legislator
