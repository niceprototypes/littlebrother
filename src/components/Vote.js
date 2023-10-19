import {useStoreActions, useStoreState} from "easy-peasy"
import {navigate} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import fetchTimes from "../constants/fetchTimes.json"
import determineShouldFetch from "../helpers/determineShouldFetch"
import ErrorWindow from "./ErrorWindow"
import Fetching from "./Fetching"
import Screen from "./Screen"

const Vote = ({chamber, congress, rollCall, session}) => {
  // Prepare actions
  const actions = useStoreActions((actions) => ({
    fetchVote: actions.votes.fetchVote,
    onClickFollow: actions.following.onClickFollow,
  }))

  // Prepare state
  const state = useStoreState((state) => ({
    vote: state.votes.vote(congress, chamber, session, rollCall),
    determineIsFollowing: state.following.determineIsFollowing,
  }))

  // Should fetch if no vote, no fetch date time, or fetch date time expired
  const shouldFetch =
    !state.vote || !state.vote.fetchDateTime || determineShouldFetch(state.vote.fetchDateTime, fetchTimes.votes)

  React.useEffect(() => {
    // Fetch if needed
    if (shouldFetch) {
      actions.fetchVote({chamber: "senate", congress: 118, rollCall: 199, session: 1})
    }
  }, [])

  // If bill does not exist
  if (!state.bill) {
    return <div></div>
    return (
      <ErrorWindow
        buttonLabel="Go back home"
        error={`Vote ${rollCall} does not exist`}
        onClickButton={() => navigate("/")}
      />
    )
  }

  // If is fetching
  if (state.vote.isFetching) {
    return <div></div>
    return <Fetching />
  }

  // If error
  if (state.bill.error) {
    return <div></div>
    return <ErrorWindow buttonLabel="Retry" error={state.vote.error} onClickButton={() => window.location.reload()} />
  }

  // Deconstruct vote
  const {} = state.vote.payload

  return <Screen>Vote</Screen>
}

Vote.propTypes = {
  chamber: PropTypes.string.isRequired,
  congress: PropTypes.string.isRequired,
  rollCall: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
}

export default Vote
