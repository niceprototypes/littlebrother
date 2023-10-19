import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const StarIcon = ({isColored, size}) => {
  return (
    <Svg className={isColored && "isColored"} size={size} viewBox="0 0 24 24">
      <path d="M12,0.8l3.4,7.5l7.8,1.1l-5.7,5.7l1.4,8.2l-7-3.9l-7,3.9l1.4-8.2L0.8,9.3l7.8-1.1L12,0.8z" />
    </Svg>
  )
}

// TODO: Star color in theme
const Svg = styled(({size, ...props}) => <svg {...props} />)`
  height: ${(props) => (props.size === "small" ? props.theme.icon.size.small : props.theme.icon.size.medium)}px;
  width: ${(props) => (props.size === "small" ? props.theme.icon.size.small : props.theme.icon.size.medium)}px;

  * {
    fill: ${(props) => props.theme.color.background.primary};
    stroke: ${(props) => props.theme.color.border.primary};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: ${(props) =>
      props.size === "small" ? props.theme.icon.strokeWidth.small : props.theme.icon.strokeWidth.medium}px;
  }

  &.isColored {
    * {
      fill: #ffd300;
      stroke: #dab400;
    }
  }
`

StarIcon.propTypes = {
  isColored: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),
}

StarIcon.defaultProps = {
  isColored: false,
  size: "medium",
}

export default StarIcon
