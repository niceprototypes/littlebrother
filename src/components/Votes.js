import {useStoreActions, useStoreState} from "easy-peasy"
import React from "react"
import fetchTimes from "../constants/fetchTimes.json"
import determineShouldFetch from "../helpers/determineShouldFetch"
import ErrorWindow from "./ErrorWindow"
import Fetching from "./Fetching"
import Screen from "./Screen"
import Spacer from "./Spacer"
import VotesItem from "./VotesItem"
import notify from "../helpers/notify"

const Votes = () => {
  // Prepare actions
  const actions = useStoreActions((actions) => ({
    fetchVotes: actions.votes.fetchVotes,
    onClickFollow: actions.following.onClickFollow,
    toggleFilter: actions.settings.toggleFilter,
  }))

  // Prepare state
  const state = useStoreState((state) => ({
    determineIsFollowing: state.following.determineIsFollowing,
    error: state.votes.error,
    fetchDateTime: state.votes.fetchDateTime,
    followingFilterIsActive: state.settings.filterIsActive("votes", "following"),
    isFetching: state.votes.isFetching,
    list: state.votes.list(state.following.keysFollowing("votes"), state.settings.filterIsActive("votes", "following")),
  }))

  // Determine if should fetch
  const shouldFetch = !state.fetchDateTime || determineShouldFetch(state.fetchDateTime, fetchTimes.votes)

  React.useEffect(() => {
    // Fetch if needed
    if (shouldFetch) {
      actions.fetchVotes({chamber: "senate", shouldIncrementOffset: false})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // If is fetching for the first time
  if (state.isFetching && !state.list.length) {
    return <Fetching />
  }

  // If error, render error component
  if (state.error) {
    return <ErrorWindow buttonLabel="Retry" error={state.error} onClickButton={() => window.location.reload()} />
  }

  return (
    <Screen
      navBarConfig={{
        tabs: [
          {
            isActive: true,
            label: `Filter by ${state.followingFilterIsActive ? "None" : "Following"}`,
            onClick: () =>
              actions.toggleFilter({
                listKey: "votes",
                filterKey: "following",
              }),
          },
        ],
      }}
      tabBarConfig={{
        selected: "votes",
      }}
    >
      {state.list.map((vote) => {
        const {
          amendment,
          bill,
          chamber,
          congress,
          date,
          democratic,
          description,
          documentNumber,
          documentTitle,
          id,
          independent,
          nomination,
          question,
          questionText,
          republican,
          rollCall,
          session,
          source,
          tieBreaker,
          tieBreakerVote,
          time,
          total,
          url,
          voteResult,
          voteType,
          voteUri,
        } = vote.payload

        // Determine if following bill
        const isFollowing = state.determineIsFollowing("votes", id)

        // Prepare bill follow handler
        const onClickFollow = () => {
          actions.onClickFollow({id, key: "votes"})

          if (!isFollowing) {
            notify(`Following Roll Call #${rollCall}`)
          }
        }

        return (
          <div key={id}>
            <VotesItem
              amendment={amendment}
              bill={bill}
              chamber={chamber}
              congress={congress}
              date={date}
              democratic={democratic}
              description={description}
              documentNumber={documentNumber}
              documentTitle={documentTitle}
              independent={independent}
              isFollowing={isFollowing}
              onClickFollow={onClickFollow}
              nomination={nomination}
              question={question}
              questionText={questionText}
              republican={republican}
              rollCall={rollCall}
              session={session}
              source={source}
              tieBreaker={tieBreaker}
              tieBreakerVote={tieBreakerVote}
              time={time}
              total={total}
              url={url}
              voteResult={voteResult}
              voteType={voteType}
              voteUri={voteUri}
            />
            <Spacer size="small" />
          </div>
        )

        // return <Card></Card>
      })}
      {/*<Card>
        <Gutter>
          <Text align="center" fontSize="h1" isBlock>
            Votes
          </Text>
          <Text align="center" fontSize="p2" isBlock>
            Coming soon
          </Text>
        </Gutter>
      </Card>*/}
    </Screen>
  )
}

export default Votes
