import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Flex from "./Flex"
import LegislatorAvatar from "./LegislatorAvatar"
import Text from "./Text"
import PartyBadge from "./PartyBadge"
import Spacer from "./Spacer"

const LegislatorProfile = ({name, party, partyName, size, srcAvatar, stateName, title}) => {
  return (
    <Flex alignItems="center" isWrapped={false}>
      {srcAvatar && (
        <div>
          <LegislatorAvatar partyName={partyName} size={size} src={srcAvatar} />
        </div>
      )}
      <DetailsDiv>
        {title && <Text>{title}</Text>}
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
  size: PropTypes.oneOf(["medium", "small"]).isRequired,
  stateName: PropTypes.string.isRequired,
  title: PropTypes.string,
}

LegislatorProfile.defaultProps = {
  size: "small",
  title: "",
}

export default LegislatorProfile
