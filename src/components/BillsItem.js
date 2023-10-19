import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Card from "./Card"
import Flex from "./Flex"
import FollowButton from "./FollowButton"
import Gutter from "./Gutter"
import LatestMajorAction from "./LatestMajorAction"
import LegislatorAvatar from "./LegislatorAvatar"
import Tags from "./Tags"
import TapTarget from "./TapTarget"
import Text from "./Text"
import PartyBadge from "./PartyBadge"

const BillsItem = ({
  date,
  isFollowing,
  latestMajorAction,
  // latestMajorActionDate,
  number,
  onClickBill,
  onClickFollow,
  onClickLegislator,
  sponsorName,
  sponsorParty,
  sponsorPartyName,
  sponsorState,
  sponsorTitle,
  srcAvatar,
  srcCover,
  // status,
  tags,
  title,
}) => {
  return (
    <Card>
      <Flex isWrapped={false}>
        <Gutter right="none">
          <TapTarget onClick={onClickLegislator}>
            <LegislatorAvatar partyName={sponsorPartyName} size="small" src={srcAvatar} />
          </TapTarget>
        </Gutter>
        <ContentColumnDiv>
          <Gutter all="none" bottom="medium" left="small">
            <Gutter all="small" bottom="none" left="none">
              <Flex>
                <div style={{flexGrow: 1}}>
                  <TapTarget onClick={onClickLegislator}>
                    <Gutter all="small" horizontal="none">
                      <Flex isWrapped={false}>
                        <PartyBadge party={sponsorParty} size="small" />
                        <LegislatorHeaderFlex>
                          <Text fontSize="p2" fontWeight="bold">
                            {sponsorTitle} {sponsorName}, {sponsorState}
                            <Text color="content.tertiary" fontSize="p2" fontWeight="bold">
                              &nbsp;·&nbsp;{date}
                            </Text>
                          </Text>
                        </LegislatorHeaderFlex>
                      </Flex>
                    </Gutter>
                  </TapTarget>
                </div>
                <FollowButton isFollowing={isFollowing} onClickFollow={onClickFollow} />
              </Flex>
            </Gutter>
            <Gutter all="none" right="medium">
              {srcCover && (
                <Gutter all="none" bottom="small">
                  <TapTarget onClick={onClickBill}>
                    <CoverImg alt="TODO" src={srcCover.large} />
                  </TapTarget>
                </Gutter>
              )}
              {tags.length > 0 && (
                <Gutter all="none" bottom="small">
                  <Tags isShowingAll={false} tags={tags} />
                </Gutter>
              )}
              <TapTarget onClick={onClickBill}>
                <Text fontWeight="black">{number}&nbsp;</Text>
                <Text fontWeight="medium">{title}</Text>
              </TapTarget>
              <Gutter all="none" top="small">
                <LatestMajorAction message={latestMajorAction} />
              </Gutter>
            </Gutter>
          </Gutter>
        </ContentColumnDiv>
      </Flex>
    </Card>
  )
}

const ContentColumnDiv = styled.div`
  @media only screen and (min-width: 720px) {
    width: calc(
      ${(props) => props.theme.desktop.viewportWidth}px -
        ${(props) => props.theme.avatarSize.small + props.theme.gutter.medium}px
    );
  }
`

const CoverImg = styled.img`
  border-radius: ${(props) => props.theme.borderRadius.medium}px;
  display: block;
  width: 100%;
`

const LegislatorHeaderFlex = styled(Flex)`
  padding-top: 1px;
`

BillsItem.propTypes = {
  date: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  latestMajorAction: PropTypes.string.isRequired,
  latestMajorActionDate: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClickBill: PropTypes.func.isRequired,
  onClickFollow: PropTypes.func.isRequired,
  onClickLegislator: PropTypes.func.isRequired,
  srcAvatar: PropTypes.string.isRequired,
  srcCover: PropTypes.shape({
    large: PropTypes.string.isRequired,
    small: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
  sponsorName: PropTypes.string.isRequired,
  sponsorParty: PropTypes.string.isRequired,
  sponsorState: PropTypes.string.isRequired,
  sponsorTitle: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      emoji: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.string]).isRequired,
      root: PropTypes.string.isRequired,
    })
  ).isRequired,
  type: PropTypes.shape({
    chamber: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
}

BillsItem.defaultProps = {
  tags: [],
}

export default BillsItem
