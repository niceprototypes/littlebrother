import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import PartyDemocratIcon from "./icons/Party.Democrat"
import PartyIndependentIcon from "./icons/Party.Independent"
import PartyRepublicanIcon from "./icons/Party.Republican"

const LegislatorAvatar = ({partyName, size, src}) => {
  const [is404, updateIs404] = React.useState(false)

  if (is404) {
    return (
      <OuterDiv partyName="independent" size={size}>
        <InnerDiv />
        <IconDiv>
          {partyName === "democrat" ? (
            <PartyDemocratIcon isInverse size={size} />
          ) : partyName === "independent" ? (
            <PartyIndependentIcon isInverse size={size} />
          ) : (
            <PartyRepublicanIcon isInverse size={size} />
          )}
        </IconDiv>
      </OuterDiv>
    )
  }

  return (
    <OuterDiv partyName={partyName} size={size}>
      <img alt="TODO" onError={() => updateIs404(true)} src={src} />
    </OuterDiv>
  )
}

const IconDiv = styled(({size, ...props}) => <div {...props} />)`
  height: ${(props) => props.theme.avatarSize[props.size] / 2}px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.theme.avatarSize[props.size] / 2}px;
`

const InnerDiv = styled.div`
  bottom: 0;
  left: 0;
  opacity: 0.15;
  position: absolute;
  right: 0;
  top: 0;
`

const OuterDiv = styled(({partyName, size, ...props}) => <div {...props} />)`
  background-color: ${(props) => props.theme.color.background.primaryInverse};
  border-radius: 50%;
  display: inline-block;
  height: ${(props) => props.theme.avatarSize[props.size] * 1.75}px;
  overflow: hidden;
  position: relative;
  vertical-align: top;
  width: ${(props) => props.theme.avatarSize[props.size] * 1.75}px;

  img {
    height: 100%;
    vertical-align: top;
    width: 100%;
  }
`

LegislatorAvatar.propTypes = {
  partyName: PropTypes.oneOf(["democrat", "independent", "republican"]).isRequired,
  size: PropTypes.oneOf(["large", "medium", "small"]),
  src: PropTypes.string.isRequired,
}

LegislatorAvatar.defaultProps = {
  size: "small",
}

export default LegislatorAvatar
