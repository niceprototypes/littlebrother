import React from "react"
import styled from "styled-components"

const BillStatusIsNotStartedIcon = () => {
  return (
    <Svg viewBox="0 0 16 16">
      <circle className="st0" cx="8" cy="8" r="6.9" />
    </Svg>
  )
}

const Svg = styled(({size, ...props}) => <svg {...props} />)`
  height: ${(props) => props.theme.icon.size.small}px;
  width: ${(props) => props.theme.icon.size.small}px;

  * {
    fill: ${(props) => props.theme.color.content.primaryInverse};
    stroke: ${(props) => props.theme.color.content.tertiary};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: ${(props) => props.theme.icon.strokeWidth.small}px;
  }

  .st0 {
    fill: ${(props) => props.theme.color.background.primary};
    stroke: #86929d;
    stroke-width: 2.25;
    stroke-miterlimit: 10;
  }
`

export default BillStatusIsNotStartedIcon
