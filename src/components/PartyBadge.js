import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import preparePartyColor from "../helpers/preparePartyColor"
import Text from "./Text"

const PartyBadge = ({party, size}) => {
  return (
    <OuterDiv party={party} size={size}>
      <InnerDiv />
      <Text
        align="center"
        color="content.primaryInverse"
        fontSize={size === "medium" ? "p2" : "p3"}
        fontWeight="black"
        isBlock
      >
        {party}
      </Text>
    </OuterDiv>
  )
}

const InnerDiv = styled.div`
  bottom: 0;
  left: 0;
  opacity: 0.15;
  position: absolute;
  right: 0;
  top: 0;
`

const OuterDiv = styled(({party, size, ...props}) => <div {...props} />)`
  align-items: center;
  background-color: ${(props) => preparePartyColor(props.party, props.theme)};
  border-radius: 50%;
  display: inline-block;
  height: ${(props) => props.theme.fontSize[props.size === "medium" ? "p1" : "p2"] * props.theme.lineHeight.normal}px;
  justify-content: center;
  margin-right: 0.3em;
  overflow: hidden;
  position: relative;
  vertical-align: text-top;
  width: ${(props) => props.theme.fontSize[props.size === "medium" ? "p1" : "p2"] * props.theme.lineHeight.normal}px;

  ${Text} {
    position: absolute;
    top: 52%;
    left: 52%;
    transform: translate(-50%, -50%);
  }
`

PartyBadge.propTypes = {
  party: PropTypes.oneOf(["D", "I", "R"]).isRequired,
  size: PropTypes.oneOf(["medium", "small"]).isRequired,
}

PartyBadge.defaultProps = {
  size: "medium",
}

export default PartyBadge
