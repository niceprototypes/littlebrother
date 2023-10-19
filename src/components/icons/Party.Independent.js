import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const PartyIndependentIcon = ({isInverse, size}) => {
  return (
    <Svg isInverse={isInverse} size={size} viewBox="0 0 48 48">
      <g>
        <path
          d="M14.6,35c-0.2,0.8-13.1,1-13.1,3.2c0,0.4,2.1,0.6,2,0.7c-0.1,0.1-2.2,1.4-2,2c0.1,0.2,0.3,0.3,0.7,0.3
	c0.7,0,1.9-0.3,2.8-0.5c-2,1.1-2,1.3-2,1.4c0,0.1,0,0.3,1.1,0.3c1.1,0,2.9-0.2,4.3-0.8c0.4-0.2,0.8-0.4,1.1-0.5
	c0.3-0.2,0.6-0.3,0.9-0.4c2.2,0.1,12.9,1.1,16.6,0.8c1.7-0.1,6-2.6,6.4-2.6c0.2,0,0.5,0,0.7,0.1c1.8,0.5,2.5,2.5,2.5,2.5
	s1.5-0.8,1.6-2.1c0.1-1.5-1.1-3.7-1.9-4.3c-0.9-0.7-3-1.5-3-1.6c0.1-0.4,3.8-8.1,9.2-9.8c4.1-1.3,5.1-3.9,5.4-5
	c0.3-3.2-0.8-5.4-1.7-5.5c-1.1,0-1.1,2-3.3,3.7c0-0.1-2.5-3.6-3.7-3.9c-1-0.2-1.6,4.2-1.7,4.2c-0.2,0-3.4-1.7-4.3-1.7
	c-0.7,0-0.2,3-0.2,3c0,0-1.9-0.3-2.7-0.3c-0.2,0,0.2,1.1-0.5,1.9C29,21.3,14.6,35,14.6,35z"
        />
        <path
          d="M22.4,25c-1.2-0.2-5.9-9.4-6.8-9.8c-4.7-2.3-8.7-6.1-10.9-8.1C4.1,6.5,2.6,4.9,2.6,6c-0.1,1.1,1.3,4.9,1.3,5
	c-0.2,0-2.4-2.5-2.8-2c-0.5,0.7,0.5,3.4,0.6,3.5c0,0-1.9-1.1-1.6-0.3C3,20.2,7.6,26.1,11.9,29c0.5,0.4,2.7,2.2,2.4,3.5L22.4,25z"
        />
      </g>
    </Svg>
  )
}

const Svg = styled(({isInverse, size, ...props}) => <svg {...props} />)`
  fill: ${(props) => props.theme.color.party.independent.primary};
  height: ${(props) => props.theme.avatarSize[props.size]}px;
  width: ${(props) => props.theme.avatarSize[props.size]}px;
`

PartyIndependentIcon.propTypes = {
  isInverse: PropTypes.bool,
  size: PropTypes.oneOf(["large", "medium", "small"]).isRequired,
}

PartyIndependentIcon.defaultProps = {}

export default PartyIndependentIcon
