import {useStoreActions, useStoreState} from "easy-peasy"
import {navigate} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import fetchTimes from "../constants/fetchTimes.json"
import determineShouldFetch from "../helpers/determineShouldFetch"
import notify from "../helpers/notify"
import houseSrc from "../images/chambers/house.svg"
import senateSrc from "../images/chambers/senate.svg"
import Card from "./Card"
import ChamberChart from "./ChamberChart"
import ErrorWindow from "./ErrorWindow"
import Fetching from "./Fetching"
import Flex from "./Flex"
import FollowButton from "./FollowButton"
import Gutter from "./Gutter"
import LegislatorProfile from "./LegislatorProfile"
import Screen from "./Screen"
import SearchInput from "./SearchInput"
import Spacer from "./Spacer"
import TapTarget from "./TapTarget"
import Text from "./Text"
import Separator from "./Separator"

const Chambers = ({chamber}) => {
  // Prepare actions
  const actions = useStoreActions((actions) => ({
    fetchLegislators: actions.legislators.fetchLegislators,
    onClickFollow: actions.following.onClickFollow,
    updateSearch: actions.legislators.updateSearch,
  }))

  // Prepare state
  const state = useStoreState((state) => ({
    counts: state.legislators.chamberCounts(chamber),
    determineIsFollowing: state.following.determineIsFollowing,
    error: state.legislators.error,
    fetchDateTime: state.legislators.fetchDateTime,
    isFetching: state.legislators.isFetching,
    // list: state.legislators.list(chamber),
    search: state.legislators.search,
    list: state.legislators.searchedLegislators(chamber, state.legislators.search),
  }))

  // Determine if should fetch
  const shouldFetch = !state.fetchDateTime || determineShouldFetch(state.fetchDateTime, fetchTimes.legislators)

  React.useEffect(() => {
    // Fetch if needed
    if (shouldFetch) {
      actions.fetchLegislators()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Screen
      navBarConfig={{
        tabs: [
          {
            isActive: chamber === "senate",
            label: "Senate",
            onClick: () => navigate("/chambers?chamber=senate"),
          },
          {
            isActive: chamber === "house",
            label: "House",
            onClick: () => navigate("/chambers?chamber=house"),
          },
        ],
      }}
      tabBarConfig={{
        selected: "chambers",
      }}
    >
      {state.isFetching ? (
        <Fetching />
      ) : state.error ? (
        <ErrorWindow buttonLabel="Retry" error={state.error} onClickButton={() => window.location.reload()} />
      ) : (
        <>
          <Card>
            <Gutter>
              <Gutter>
                <Text align="center" fontSize="h1" fontWeight="bold" isBlock>
                  118th U.S. {chamber === "house" ? "House" : "Senate"}
                </Text>
                <Text align="center" isBlock>
                  Jan 3, 2023 – Jan 3, 2025
                </Text>
                <Spacer size="small" />
                <ChamberChart
                  chartSrc={chamber === "house" ? houseSrc : senateSrc}
                  countDemocrats={state.counts.D}
                  countRepublicans={state.counts.R}
                  countIndependents={state.counts.ID}
                  countVacancies={state.counts.V}
                />
              </Gutter>
            </Gutter>
          </Card>
          <Spacer size="small" />
          <Card>
            <Gutter>
              <Flex alignItems="center">
                <Text fontWeight="black" style={{flexGrow: 1}}>
                  Members
                </Text>
                <SearchInput
                  onChange={actions.updateSearch}
                  placeholder="Search by name or state"
                  value={state.search}
                  width={15}
                />
              </Flex>
            </Gutter>
            {state.list.map((legislator) => {
              const {displayName, id, /*lastUpdated, */ party, partyName, srcAvatar, stateName} = legislator.payload

              // Determine if following legislator
              const isFollowing = state.determineIsFollowing("legislators", id)

              // Prepare follow handler
              const onClickFollow = () => {
                actions.onClickFollow({id, key: "legislators"})

                if (!isFollowing) {
                  notify(`Following ${displayName}`)
                }
              }

              // Prepare navigation handler
              const onClickLegislator = () => navigate(`/legislator?id=${id}`)

              return (
                <div key={id}>
                  <Gutter vertical="none">
                    <Separator />
                  </Gutter>
                  <Gutter all="small">
                    <Flex>
                      <ProfileDiv>
                        <TapTarget isWide onClick={onClickLegislator}>
                          <Gutter all="small">
                            <LegislatorProfile
                              name={displayName}
                              party={party}
                              partyName={partyName}
                              srcAvatar={srcAvatar}
                              stateName={stateName}
                            />
                          </Gutter>
                        </TapTarget>
                      </ProfileDiv>
                      <FollowButton isFollowing={isFollowing} onClickFollow={onClickFollow} />
                    </Flex>
                  </Gutter>
                </div>
              )
            })}
          </Card>
        </>
      )}
    </Screen>
  )
}

const ProfileDiv = styled.div`
  flex-grow: 1;
`

Chambers.propTypes = {
  chamber: PropTypes.oneOf(["house", "senate"]).isRequired,
}

export default Chambers
