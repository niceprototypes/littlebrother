import {useStoreActions, useStoreState} from "easy-peasy"
import {navigate} from "gatsby"
import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import fetchTimes from "../constants/fetchTimes.json"
import determineShouldFetch from "../helpers/determineShouldFetch"
import notify from "../helpers/notify"
import BillsItem from "./BillsItem"
import ErrorWindow from "./ErrorWindow"
import Fetching from "./Fetching"
import Screen from "./Screen"
import Spacer from "./Spacer"
import Text from "./Text"

const Bills = () => {
  // Prepare actions
  const actions = useStoreActions((actions) => ({
    fetchBills: actions.bills.fetchBills,
    onClickFollow: actions.following.onClickFollow,
    toggleFilter: actions.settings.toggleFilter,
  }))

  // Prepare state
  const state = useStoreState((state) => ({
    determineIsFollowing: state.following.determineIsFollowing,
    error: state.bills.error,
    fetchDateTime: state.bills.fetchDateTime,
    followingFilterIsActive: state.settings.filterIsActive("bills", "following"),
    isFetching: state.bills.isFetching,
    list: state.bills.list(state.following.keysFollowing("bills"), state.settings.filterIsActive("bills", "following")),
  }))

  // Determine if should fetch
  const shouldFetch = !state.fetchDateTime || determineShouldFetch(state.fetchDateTime, fetchTimes.bills)

  React.useEffect(() => {
    // Fetch if needed
    if (shouldFetch) {
      actions.fetchBills({shouldIncrementOffset: false})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Screen
      isError={!!state.error}
      isFetching={state.isFetching && !state.list.length}
      navBarConfig={{
        tabs: [
          {
            isActive: true,
            label: `Filter by ${state.followingFilterIsActive ? "None" : "Following"}`,
            onClick: () =>
              actions.toggleFilter({
                listKey: "bills",
                filterKey: "following",
              }),
          },
        ],
      }}
      renderError={() => (
        <ErrorWindow buttonLabel="Retry" error={state.error} onClickButton={() => window.location.reload()} />
      )}
      renderFetching={() => <Fetching />}
      tabBarConfig={{
        selected: "bills",
      }}
    >
      <InfiniteScroll
        dataLength={state.list.length} //This is important field to render the next data
        endMessage={<Text>Yay! You have seen it all</Text>}
        hasMore={true}
        loader={!state.followingFilterIsActive && <div style={{height: 100}}>Loading...</div>}
        next={() => actions.fetchBills({shouldIncrementOffset: true})}
      >
        {state.list.map((bill) => {
          const {
            congress,
            id,
            slug,
            latestMajorActionDateAgo,
            latestMajorAction,
            latestMajorActionDate,
            number,
            sponsorId,
            sponsorName,
            sponsorParty,
            sponsorPartyName,
            sponsorState,
            sponsorTitle,
            srcAvatar,
            srcCover,
            status,
            tags,
            title,
          } = bill.payload

          // Determine if following bill
          const isFollowing = state.determineIsFollowing("bills", id)

          // Prepare bill click handler
          const onClickBill = () => navigate(`/bill?congress=${congress}&slug=${slug}`)

          // Prepare bill follow handler
          const onClickFollow = () => {
            actions.onClickFollow({id, key: "bills"})

            if (!isFollowing) {
              notify(`Following ${number}`)
            }
          }

          // Prepare navigation handler
          const onClickLegislator = () => navigate(`/legislator?id=${sponsorId}`)

          return (
            <div key={id}>
              <BillsItem
                date={latestMajorActionDateAgo}
                isFollowing={isFollowing}
                latestMajorAction={latestMajorAction}
                latestMajorActionDate={latestMajorActionDate}
                number={number}
                onClickBill={onClickBill}
                onClickFollow={onClickFollow}
                onClickLegislator={onClickLegislator}
                sponsorName={sponsorName}
                sponsorParty={sponsorParty}
                sponsorPartyName={sponsorPartyName}
                sponsorState={sponsorState}
                sponsorTitle={sponsorTitle}
                srcAvatar={srcAvatar}
                srcCover={srcCover}
                status={status}
                tags={tags}
                title={title}
              />
              <Spacer size="small" />
            </div>
          )
        })}
        <Spacer />
      </InfiniteScroll>
    </Screen>
  )
}

export default Bills
