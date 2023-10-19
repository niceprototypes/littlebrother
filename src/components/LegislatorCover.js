import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import legislatorCoverPlaceholderSrc from "../images/placeholders/legislator-cover.png"

const LegislatorCover = ({alt, src}) => {
  return (
    <OuterDiv>
      <img alt={alt} onError={(event) => (event.target.src = legislatorCoverPlaceholderSrc)} src={src} />
    </OuterDiv>
  )
}

const OuterDiv = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  img {
    height: 100%;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
  }
`

LegislatorCover.propTypes = {
  src: PropTypes.string.isRequired,
}

LegislatorCover.defaultProps = {}

export default LegislatorCover
