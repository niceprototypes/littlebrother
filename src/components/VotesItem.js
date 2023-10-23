import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Card from "./Card"
import Flex from "./Flex"
import FollowButton from "./FollowButton"
import Gutter from "./Gutter"
import LatestMajorAction from "./LatestMajorAction"
import Separator from "./Separator"
import Spacer from "./Spacer"
import TapTarget from "./TapTarget"
import Text from "./Text"
// import CheckIcon from "./icons/Check"
import PartyDemocratIcon from "./icons/Party.Democrat"
import PartyIndependentIcon from "./icons/Party.Independent"
import PartyRepublicanIcon from "./icons/Party.Republican"

const VotesItem = ({
  // amendment,
  // bill,
  // chamber,
  // congress,
  // date,
  democratic,
  description,
  // documentNumber,
  // documentTitle,
  independent,
  isFollowing,
  // nomination,
  onClickFollow,
  onClickVote,
  // question,
  questionText,
  republican,
  // rollCall,
  // session,
  // source,
  // tieBreaker,
  // tieBreakerVote,
  // time,
  total,
  // url,
  voteResult,
  voteType,
}) => {
  return (
    <Card>
      <Gutter right="small" top="small">
        <Flex isWrapped={false}>
          <div style={{flexGrow: 1}}>
            <TapTarget onClick={onClickVote}>
              <Gutter all="small" horizontal="none">
                <Text fontWeight="black" isBlock>
                  {questionText}
                </Text>
              </Gutter>
            </TapTarget>
          </div>
          <FollowButton isFollowing={isFollowing} onClickFollow={onClickFollow} />
        </Flex>
        <TapTarget isWide onClick={onClickVote}>
          <Gutter all="none" right="small">
            <Text>{description}</Text>
          </Gutter>
        </TapTarget>
      </Gutter>
      <TapTarget isWide onClick={onClickVote}>
        <VotesTable democratic={democratic} independent={independent} republican={republican} total={total} />
      </TapTarget>
      <Gutter>
        <LatestMajorAction align="center" message={voteResult} />
      </Gutter>
    </Card>
  )
}

const VotesTable = ({democratic, independent, republican, total}) => {
  return (
    <>
      <VotesTableRow isHeader no="No" notVoting="No vote" present="Present" yes="Yes" />
      <VotesTableRow
        icon={<PartyDemocratIcon size="small" />}
        no={democratic.no}
        notVoting={democratic.notVoting}
        present={democratic.present}
        yes={democratic.yes}
      />
      <VotesTableRow
        icon={<PartyRepublicanIcon size="small" />}
        no={republican.no}
        notVoting={republican.notVoting}
        present={republican.present}
        yes={republican.yes}
      />
      <VotesTableRow
        icon={<PartyIndependentIcon size="small" />}
        no={independent.no}
        notVoting={independent.notVoting}
        present={independent.present}
        yes={independent.yes}
      />
      <VotesTableRow isTotal no={total.no} notVoting={total.notVoting} present={total.present} yes={total.yes} />
    </>
  )
}

const VotesTableRow = ({icon, isHeader, isTotal, no, notVoting, present, yes}) => {
  return (
    <Gutter bottom={isTotal ? "none" : "small"} top="none">
      <Flex alignItems="center">
        <CellDiv style={{width: 60}}>{icon}</CellDiv>
        <CellDiv>
          <Text fontSize={isHeader && "p2"} fontWeight={isTotal && "black"}>
            {yes}
          </Text>
        </CellDiv>
        <CellDiv>
          <Text fontSize={isHeader && "p2"} fontWeight={isTotal && "black"}>
            {no}
          </Text>
        </CellDiv>
        <CellDiv>
          <Text fontSize={isHeader && "p2"} fontWeight={isTotal && "black"}>
            {present}
          </Text>
        </CellDiv>
        <CellDiv>
          <Text fontSize={isHeader && "p2"} fontWeight={isTotal && "black"}>
            {notVoting}
          </Text>
        </CellDiv>
      </Flex>
      {!isTotal && (
        <>
          <Spacer size="small" />
          <Separator />
        </>
      )}
    </Gutter>
  )
}

const CellDiv = styled.div`
  padding-right: 1em;
  width: 20%;
`

VotesItem.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  onClickFollow: PropTypes.func.isRequired,
}

VotesItem.defaultProps = {}

export default VotesItem
