// import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import legislatorAvatarPlaceholderSrc from "../images/placeholders/legislator-avatar.svg"
import preparePartyColor from "../helpers/preparePartyColor"

const BillAvatar = ({src}) => {
  return (
    <OuterDiv>
      <img alt="TODO" onError={(event) => (event.target.src = legislatorAvatarPlaceholderSrc)} src={src} />
    </OuterDiv>
  )
}

export const OuterDiv = styled.div`
  background-image: radial-gradient(
    farthest-corner at 100% 100%,
    ${(props) => preparePartyColor(props.party, props.theme)} 0%,
    ${(props) => preparePartyColor(props.party, props.theme)} 100%
  );
  border: 3px solid white;
  border-radius: 50%;
  height: 72px;
  overflow: hidden;
  width: 72px;

  img {
    height: 100%;
    vertical-align: top;
    width: 100%;
  }
`

BillAvatar.propTypes = {}

export default BillAvatar
