import {StoreProvider, useStoreRehydrated} from "easy-peasy"
import PropTypes from "prop-types"
import React from "react"
import ChambersComponent from "../components/Chambers"
import Rehydrating from "../components/Rehydrating"
import getParams from "../helpers/getParams"
import store from "../stores"

const Chambers = ({location}) => {
  return (
    <StoreProvider store={store}>
      <ChambersScreen chamber={getParams("chamber", location.search)} />
    </StoreProvider>
  )
}

const ChambersScreen = ({chamber}) => {
  return useStoreRehydrated() ? <ChambersComponent chamber={chamber} /> : <Rehydrating />
}

ChambersScreen.propTypes = {
  chamber: PropTypes.oneOf(["house", "senate"]).isRequired,
}

export default Chambers
