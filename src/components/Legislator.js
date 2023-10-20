/*eslint-disable react-hooks/exhaustive-deps*/
import {useStoreActions, useStoreState} from "easy-peasy"
import {navigate} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import fetchTimes from "../constants/fetchTimes.json"
import determineShouldFetch from "../helpers/determineShouldFetch"
import notify from "../helpers/notify"
import emailSrc from "../images/icons/email.svg"
import facebookSrc from "../images/icons/facebook.svg"
// import linkedinSrc from "../images/icons/linkedin.svg"
import twitterSrc from "../images/icons/twitter.svg"
import youtubeSrc from "../images/icons/youtube.svg"
import Card from "./Card"
import Flex from "./Flex"
import Gutter from "./Gutter"
import LegislatorAvatar from "./LegislatorAvatar"
import LegislatorCover from "./LegislatorCover"
import Spacer from "./Spacer"
import prepareOrdinal from "../helpers/prepareOrdinal"
import ErrorWindow from "./ErrorWindow"
import Fetching from "./Fetching"
import Screen from "./Screen"
import Text from "./Text"
import PartyBadge from "./PartyBadge"
import LegislatorScores from "./LegislatorScores"

const Legislator = ({id}) => {
  // Prepare actions
  const actions = useStoreActions((actions) => ({
    fetchLegislator: actions.legislators.fetchLegislator,
    onClickFollow: actions.following.onClickFollow,
  }))

  // Prepare state
  const state = useStoreState((state) => ({
    determineIsFollowing: state.following.determineIsFollowing,
    legislator: state.legislators.legislator(id),
    legislators: state.legislators,
  }))

  // Determine if should fetch
  const shouldFetch =
    !state.legislator ||
    !state.legislator.fetchDateTime ||
    determineShouldFetch(state.legislator.fetchDateTime, fetchTimes.legislators)

  React.useEffect(() => {
    // Fetch if needed
    if (shouldFetch) {
      actions.fetchLegislator({id})
    }
  }, [])

  const {
    accountFacebook,
    accountTwitter,
    accountYoutube,
    contactForm,
    district,
    displayName,
    party,
    partyName,
    scores,
    srcAvatar,
    srcCover,
    stateName,
  } = state.legislator.payload

  // Determine if following legislator
  const isFollowing = state.determineIsFollowing("legislators", id)

  // Prepare follow handler
  const onClickFollow = () => {
    actions.onClickFollow({id, key: "legislators"})

    if (!isFollowing) {
      notify(`Following ${displayName}`)
    }
  }

  return (
    <Screen
      navBarConfig={{
        goBack: () => navigate("/chambers?chamber=senate"),
        isFollowing,
        onClickFollow,
      }}
      tabBarConfig={{
        selected: "chambers",
      }}
    >
      {!state.legislator ? (
        <div>LEGISLATOR {id} DOES NOT EXIST</div>
      ) : state.legislator.isFetching ? (
        <Fetching />
      ) : state.legislator.error ? (
        <ErrorWindow
          buttonLabel="Retry"
          error={state.legislator.error}
          onClickButton={() => window.location.reload()}
        />
      ) : (
        <>
          <Card>
            <LegislatorCover src={srcCover} />
            <AvatarOuterDiv>
              <AvatarInnerDiv>
                <LegislatorAvatar partyName={partyName} size="medium" src={srcAvatar} />
              </AvatarInnerDiv>
            </AvatarOuterDiv>
            <Gutter>
              <NameDiv>
                <Flex alignItems="center" justifyContent="center">
                  <PartyBadge party={party} size="medium" />
                  <Text fontSize="h2" fontWeight="black">
                    {displayName}
                  </Text>
                </Flex>
              </NameDiv>
              <JurisdictionDiv>
                <Flex justifyContent="center">
                  <Text fontSize="p2">
                    {stateName} {district && `${district}${prepareOrdinal(parseInt(district))}`}
                  </Text>
                </Flex>
              </JurisdictionDiv>
              <Spacer />
              <Flex justifyContent="center">
                {accountFacebook && (
                  <ContactIconDiv>
                    <img src={facebookSrc} alt="Facebook icon" />
                  </ContactIconDiv>
                )}
                {accountTwitter && (
                  <ContactIconDiv>
                    <img src={twitterSrc} alt="Twitter icon" />
                  </ContactIconDiv>
                )}
                {accountYoutube && (
                  <ContactIconDiv>
                    <img src={youtubeSrc} alt="YouTube icon" />
                  </ContactIconDiv>
                )}
                {contactForm && (
                  <ContactIconDiv>
                    <img src={emailSrc} alt="Open envelope icon" />
                  </ContactIconDiv>
                )}
              </Flex>
            </Gutter>
            <Spacer />
          </Card>
          <Spacer size="small" />
          <LegislatorScores party={party} scores={scores} />
        </>
      )}
    </Screen>
  )
}

const AvatarInnerDiv = styled.div`
  border: 3px solid white;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  text-align: center;
  vertical-align: text-top;
`

const AvatarOuterDiv = styled.div`
  margin-top: -${(props) => (props.theme.avatarSize.medium * 1.75) / 2 + 3}px;
  text-align: center;
`

const ContactIconDiv = styled.div`
  height: 24px;
  margin: 0 10px;

  img {
    height: 100%;
  }
`

const JurisdictionDiv = styled.div`
  text-align: center;
`

const NameDiv = styled.div`
  text-align: center;
`

Legislator.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Legislator
