import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const PartyRepublicanIcon = ({isInverse, size}) => {
  return (
    <Svg isInverse={isInverse} size={size} viewBox="0 0 48 48">
      <path d="M19.2,33.3c-2,0.5-4,0.8-6.1,0.9l0.2,10h7L19.2,42L19.2,33.3z" />
      <path
        d="M42.2,33.9c-0.3-2.2-0.4-4.4-0.2-6.6c2-0.1,3.9-0.5,5.8-1.3c0,0,0.5-0.7-0.5-0.7c-1.4,0.2-2.8,0.2-4.2,0.1
		c-4.1-0.5-8-2.2-11.1-4.9c-0.4-0.4-0.4-1-0.1-1.4c0.4-0.4,1-0.4,1.4-0.1c2.6,2.1,5.7,3.6,8.9,4.2c0.3-2.6,0.3-5.2,0.2-7.8
		c-0.2-2.6-1.4-5-3.3-6.7c-1-3.5-4.7-5.5-8.2-4.5c-0.7,0.2-1.3,0.5-1.9,0.9c-1.6,0.8-3.3,1.3-5.1,1.7c-3.2-0.6-6.4-0.8-9.7-0.7
		C8.2,5.9,2.6,9.9,0.7,15.9c0,0.1-0.1,0.2-0.1,0.3c-0.1,0.3-0.1,0.4-0.1,0.5c-0.3,1-0.4,2.1-0.4,3.1c-0.4,5.6,0.3,9.8,1.8,15.2
		l1.5,0c-1.2-3.7-1.5-8.2-1.3-8.4C6,28.2,5.3,44.1,5.3,44.1h6.9l-1.1-2l0-9.8c3.7,0,7.4-0.6,10.8-2c0.5-0.2,1.5-0.7,1.5-0.7
		c4,3,2.9,14.5,2.9,14.5h8.1l-1.4-2.7l-0.2-16.4c1.2,0.6,2.5,1.2,3.9,1.5c0.3,2.7,0.8,5.5,1.5,8.1c0.9,4.3,5.1,7.1,9.4,6.3
		c0.1,0,0.1,0,0.2,0v-3.2c-2.6,0.5-5.1-1.1-5.6-3.7C42.3,34,42.3,34,42.2,33.9z"
      />
    </Svg>
  )
}

const Svg = styled(({isInverse, size, ...props}) => <svg {...props} />)`
  fill: ${(props) => props.theme.color.party.republican[props.isInverse ? "primaryInverse" : "primary"]};
  height: ${(props) => props.theme.avatarSize[props.size]}px;
  width: ${(props) => props.theme.avatarSize[props.size]}px;
`

PartyRepublicanIcon.propTypes = {
  isInverse: PropTypes.bool,
  size: PropTypes.oneOf(["large", "medium", "small"]).isRequired,
}

PartyRepublicanIcon.defaultProps = {
  isInverse: false,
}

export default PartyRepublicanIcon
