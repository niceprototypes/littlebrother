import {useStoreActions, useStoreState} from "easy-peasy"
import {navigate} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import fetchTimes from "../constants/fetchTimes.json"
import determineShouldFetch from "../helpers/determineShouldFetch"
import ErrorWindow from "./ErrorWindow"
import Fetching from "./Fetching"
import Screen from "./Screen"
import notify from "../helpers/notify"
import prepareVoteId from "../helpers/prepareVoteId"

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

  const id = prepareVoteId(chamber, congress, session, rollCall)

  // Determine if following vote
  const isFollowing = state.determineIsFollowing("votes", id)

  // Prepare follow handler
  const onClickFollow = () => {
    actions.onClickFollow({id, key: "bills"})

    if (!isFollowing) {
      notify(`Following Roll Call #${rollCall}`)
    }
  }

  return (
    <Screen
      isError={!state.vote || !!state.vote.error}
      renderError={() =>
        !state.vote ? (
          <ErrorWindow
            buttonLabel="Go to votes"
            error={`Vote ${rollCall} does not exist`}
            onClickButton={() => navigate("/votes")}
          />
        ) : (
          <ErrorWindow buttonLabel="Retry" error={state.vote.error} onClickButton={() => window.location.reload()} />
        )
      }
      renderFetching={() => <Fetching />}
      navBarConfig={{
        goBack: () => navigate("/bills"),
        isFollowing,
        tabs: [
          {
            label: `Roll Call #${rollCall}`,
          },
        ],
        onClickFollow,
      }}
      tabBarConfig={{
        selected: "votes",
      }}
    >
      <div>Vote</div>
    </Screen>
  )
}

Vote.propTypes = {
  chamber: PropTypes.string.isRequired,
  congress: PropTypes.string.isRequired,
  rollCall: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
}

export default Vote
