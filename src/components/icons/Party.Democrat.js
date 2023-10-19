import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const PartyDemocratIcon = ({isInverse, size}) => {
  return (
    <Svg isInverse={isInverse} size={size} viewBox="0 0 48 48">
      <path
        className="st0"
        d="M47.3,13.4c-1.6-1.9-3.2-3.9-4.8-5.8c-0.3-0.3-0.4-0.6-0.4-1.1c0.1-1.4,0.8-5.1,0-5.5c-0.6-0.2-1.8,1.5-2.1,2
		c-1.2,1.8-2.7,2.3-4.8,2.1C32.9,5,31,6,29.6,7.8c-1,1.2-1.8,2.6-2.7,3.9c-0.9,1.3-1.7,2.6-2.7,3.8c-0.6,0.8-1.5,1.1-2.6,1
		c-1.2-0.1-2.5-0.2-3.7-0.3c-2.3-0.2-7.1-0.8-7.9-0.8c-9.1-0.6-12.1,5.4-7.7,20c0.8,0,0.9,0,2,0c0,0-2.7-8.8,0-6.9
		C7.4,30.6,5.9,41.1,5.9,44c0,1-0.1,2.1-0.1,3.1C5.7,47.7,6,48,6.6,48c0.6,0,3.7,0,4.3,0l-1-2.6c0.5-2.6,0.8-3.6,1.4-6.2
		c0.4-2,0.9-4.1,1.4-6.1c0.2-0.9,0.6-1.2,1.5-0.9c0.2,0.1,0.4,0.1,0.6,0.2c1.5,0.2,3,0.6,4.5,0.7c2.9,0.2,5.8-0.2,8.7-0.7
		c0.7-0.1,1.2,0,1.5,0.7c0.6,1.2,1.2,2.4,1.7,3.7c1.2,3.3,1.6,6.8,1.8,10.3c0,0.5,0.3,0.8,0.7,0.8c0.7,0.1,4.1,0.1,4.8,0.1l-1.7-2.5
		c0-3.9-0.1-7,0-10.9c0.2-5.8,1.2-11.5,3.1-17.1c0.3-0.9,0.8-1.1,1.6-0.7c0.9,0.4,1.7,0.8,2.6,1.2c0.8,0.4,1.4,0.3,1.9-0.4
		c0.5-0.7,1-1.4,1.5-2.1C47.9,14.8,47.9,14.1,47.3,13.4z"
      />
      <path className="st0" d="M35.9,4c0,0,0.2-4,0.9-4c0.8,0,1.6,2.7,1.6,2.7S37.6,3.8,35.9,4z" />
    </Svg>
  )
}

const Svg = styled(({isInverse, size, ...props}) => <svg {...props} />)`
  fill: ${(props) => props.theme.color.party.democrat[props.isInverse ? "primaryInverse" : "primary"]};
  height: ${(props) => props.theme.avatarSize[props.size]}px;
  width: ${(props) => props.theme.avatarSize[props.size]}px;
`

PartyDemocratIcon.propTypes = {
  isInverse: PropTypes.bool,
  size: PropTypes.oneOf(["large", "medium", "small"]).isRequired,
}

PartyDemocratIcon.defaultProps = {
  isInverse: false,
}

export default PartyDemocratIcon
