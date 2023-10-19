import {StoreProvider, useStoreRehydrated} from "easy-peasy"
import PropTypes from "prop-types"
import React from "react"
import BillComponent from "../components/Bill"
import Rehydrating from "../components/Rehydrating"
import getParams from "../helpers/getParams"
import store from "../stores"

const Bill = ({location}) => {
  return (
    <StoreProvider store={store}>
      <BillScreen congress={getParams("congress", location.search)} slug={getParams("slug", location.search)} />
    </StoreProvider>
  )
}

const BillScreen = ({congress, slug}) => {
  return useStoreRehydrated() ? <BillComponent congress={congress} slug={slug} /> : <Rehydrating />
}

BillScreen.propTypes = {
  congress: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}

export default Bill
