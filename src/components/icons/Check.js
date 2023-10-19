import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const CheckIcon = ({size}) => {
  return (
    <Svg size={size} viewBox="0 0 24 24">
      <polyline points="23.2,3.7 8.2,20.3 0.8,12 " />
    </Svg>
  )
}

const Svg = styled.svg`
  height: ${(props) => (props.size === "small" ? props.theme.icon.size.small : props.theme.icon.size.medium)}px;
  width: ${(props) => (props.size === "small" ? props.theme.icon.size.small : props.theme.icon.size.medium)}px;

  * {
    fill: transparent;
    stroke: ${(props) => props.theme.color.content.primary};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: ${(props) =>
      props.size === "small" ? props.theme.icon.strokeWidth.small : props.theme.icon.strokeWidth.medium}px;
  }
`

CheckIcon.propTypes = {
  size: PropTypes.oneOf(["medium", "small"]),
}

CheckIcon.defaultProps = {
  size: "medium",
}

export default CheckIcon
