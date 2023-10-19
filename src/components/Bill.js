import {useStoreActions, useStoreState} from "easy-peasy"
import {navigate} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import fetchTimes from "../constants/fetchTimes.json"
import determineShouldFetch from "../helpers/determineShouldFetch"
import notify from "../helpers/notify"
import BillStatus from "./BillStatus"
import Card from "./Card"
import ErrorWindow from "./ErrorWindow"
import Fetching from "./Fetching"
import Gutter from "./Gutter"
import Screen from "./Screen"
import Spacer from "./Spacer"
import Tags from "./Tags"
import Text from "./Text"
import TapTarget from "./TapTarget"
import LegislatorProfile from "./LegislatorProfile"

const Bill = ({congress, slug}) => {
  // Prepare actions
  const actions = useStoreActions((actions) => ({
    fetchBill: actions.bills.fetchBill,
    onClickFollow: actions.following.onClickFollow,
  }))

  // Prepare state
  const state = useStoreState((state) => ({
    bill: state.bills.bill(congress, slug),
    determineIsFollowing: state.following.determineIsFollowing,
  }))

  // Should fetch if no bill, no fetch date time, or fetch date time expired
  const shouldFetch =
    !state.bill || !state.bill.fetchDateTime || determineShouldFetch(state.bill.fetchDateTime, fetchTimes.bills)

  React.useEffect(() => {
    // Fetch if needed
    if (shouldFetch) {
      actions.fetchBill({congress, slug})
    }
  }, [])

  // If bill does not exist
  if (!state.bill) {
    return (
      <ErrorWindow
        buttonLabel="Go back home"
        error={`Bill ${slug} does not exist`}
        onClickButton={() => navigate("/")}
      />
    )
  }

  // If is fetching
  if (state.bill.isFetching) {
    return <Fetching />
  }

  // If error
  if (state.bill.error) {
    return <ErrorWindow buttonLabel="Retry" error={state.bill.error} onClickButton={() => window.location.reload()} />
  }

  // Deconstruct bill
  const {
    id,
    // latestMajorAction,
    // latestMajorActionDate,
    // latestMajorActionDateAgo,
    number,
    // sponsorId,
    sponsorName,
    sponsorParty,
    sponsorPartyName,
    // sponsorState,
    // sponsorStateName,
    sponsorTitle,
    srcAvatar,
    srcCover,
    status,
    tags,
    title,
  } = state.bill.payload

  // Determine if following bill
  const isFollowing = state.determineIsFollowing("bills", id)

  // Prepare follow handler
  const onClickFollow = () => {
    actions.onClickFollow({id, key: "bills"})

    if (!isFollowing) {
      notify(`Following ${number}`)
    }
  }

  return (
    <Screen
      navBarConfig={{
        goBack: () => navigate("/bills"),
        isFollowing,
        tabs: [
          {
            label: number,
          },
        ],
        onClickFollow,
      }}
      tabBarConfig={{
        selected: "bills",
      }}
    >
      <Card>
        {srcCover && (
          <CoverDiv>
            <img alt="TODO" src={srcCover ? srcCover.large : null} />
          </CoverDiv>
        )}
        <TapTarget onClick={() => {}}>
          <Gutter>
            <LegislatorProfile
              name={sponsorName}
              party={sponsorParty}
              partyName={sponsorPartyName}
              srcAvatar={srcAvatar}
              stateName={`${sponsorTitle} ${sponsorName}`}
            />
          </Gutter>
        </TapTarget>
        {tags.length > 0 && (
          <Gutter bottom="small" top="none">
            <Tags tags={tags} />
          </Gutter>
        )}
        <Gutter top="none">
          <Text fontSize="h2" fontWeight="medium">
            {title}
          </Text>
        </Gutter>
      </Card>
      <Spacer size="small" />
      <Card title="Bill status">
        <Gutter>
          <BillStatus status={status} />
        </Gutter>
      </Card>
    </Screen>
  )
}

const CoverDiv = styled.div`
  img {
    display: block;
    width: 100%;
  }
`

Bill.propTypes = {
  congress: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}

Bill.defaultProps = {
  tags: [],
}

export default Bill
