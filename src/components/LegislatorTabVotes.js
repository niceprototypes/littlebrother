import {useStoreActions} from "easy-peasy"
// import PropTypes from "prop-types"
import React from "react"
import Card from "./Card"

const LegislatorTabVotes = ({id}) => {
  // Prepare actions
  const actions = useStoreActions((actions) => ({
    legislators: actions.legislators,
  }))

  // Deconstruct store
  const {fetchLegislatorVotes} = actions.legislators

  // Fetch if needed
  React.useEffect(() => {
    fetchLegislatorVotes({legislatorId: id})
  }, [id])

  return <Card>LegislatorTabVotes</Card>
}

LegislatorTabVotes.propTypes = {}

LegislatorTabVotes.defaultProps = {}

export default LegislatorTabVotes
