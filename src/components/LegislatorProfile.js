import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Flex from "./Flex"
import LegislatorAvatar from "./LegislatorAvatar"
import Text from "./Text"
import PartyBadge from "./PartyBadge"

const LegislatorProfile = ({name, party, partyName, srcAvatar, stateName}) => {
  return (
    <Flex alignItems="center">
      {srcAvatar && <LegislatorAvatar partyName={partyName} size="small" src={srcAvatar} />}
      <DetailsDiv>
        <Text fontWeight="bold" isBlock>
          {name}
        </Text>
        <Flex>
          <PartyBadge party={party} partyName={partyName} size="small" />
          <Text fontSize="p2">{stateName}</Text>
        </Flex>
      </DetailsDiv>
    </Flex>
  )
}

const DetailsDiv = styled.div`
  margin-left: 0.75em;
`

LegislatorProfile.propTypes = {
  name: PropTypes.string.isRequired,
  party: PropTypes.oneOf(["D", "I", "R"]).isRequired,
  partyName: PropTypes.oneOf(["democrat", "independent", "republican"]).isRequired,
  srcAvatar: PropTypes.string.isRequired,
  stateName: PropTypes.string.isRequired,
}

export default LegislatorProfile
