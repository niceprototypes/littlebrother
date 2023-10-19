import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const ChevronIcon = ({isColored, size}) => {
  return (
    <Svg className={isColored && "isColored"} size={size} viewBox="0 0 24 24">
      <polyline points="16.5,3 7.5,12 16.5,21 " />
    </Svg>
  )
}

const Svg = styled(({size, ...props}) => <svg {...props} />)`
  height: ${(props) => (props.size === "small" ? props.theme.icon.size.small : props.theme.icon.size.medium)}px;
  width: ${(props) => (props.size === "small" ? props.theme.icon.size.small : props.theme.icon.size.medium)}px;

  * {
    fill: none;
    stroke: ${(props) => props.theme.color.content.tertiary};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: ${(props) =>
      props.size === "small" ? props.theme.icon.strokeWidth.small : props.theme.icon.strokeWidth.medium}px;
  }

  &.isColored {
    * {
      stroke: ${(props) => props.theme.color.content.primary};
    }
  }
`

ChevronIcon.propTypes = {
  isColored: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),
}

ChevronIcon.defaultProps = {
  isColored: false,
  size: "medium",
}

export default ChevronIcon
