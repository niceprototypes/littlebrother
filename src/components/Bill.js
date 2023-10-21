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
import BillsItem from "./BillsItem"

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

  // Deconstruct bill
  const {
    id,
    // latestMajorAction,
    // latestMajorActionDate,
    // latestMajorActionDateAgo,
    number,
    sponsorId,
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
  } = (state.bill && state.bill.payload) || {}

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
      isError={!state.bill || !!state.bill.error}
      isFetching={state.bill && state.bill.isFetching}
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
      renderError={() =>
        !state.bill ? (
          <ErrorWindow
            buttonLabel="Go to bills"
            error={`Bill ${slug} does not exist`}
            onClickButton={() => navigate("/bills")}
          />
        ) : (
          <ErrorWindow buttonLabel="Retry" error={state.bill.error} onClickButton={() => window.location.reload()} />
        )
      }
      renderFetching={() => <Fetching />}
      tabBarConfig={{
        selected: "bills",
      }}
    >
<<<<<<< Updated upstream
      <Card>
        {srcCover && (
          <CoverDiv>
            <img alt="TODO" src={srcCover ? srcCover.large : null} />
          </CoverDiv>
        )}
        <TapTarget onClick={() => navigate(`/legislator?id=${sponsorId}`)}>
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
        <Gutter top="none">
          <BillStatus status={status} />
        </Gutter>
      </Card>
=======
      {!!state.bill && !!state.bill.payload && (
        <>
          <Card>
            {srcCover && (
              <CoverDiv>
                <img alt="TODO" src={srcCover ? srcCover.large : null} />
              </CoverDiv>
            )}
            <TapTarget onClick={() => navigate(`/legislator?id=${sponsorId}`)}>
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
            {!!tags && tags.length > 0 && (
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
            <Gutter top="none">{status && <BillStatus status={status} />}</Gutter>
          </Card>
        </>
      )}
>>>>>>> Stashed changes
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
