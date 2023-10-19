import React from "react"
import styled from "styled-components"

const BillStatusIsCompletedIcon = () => {
  return (
    <Svg viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6.9" />
      <polyline className="st0" points="10.7,6 7.1,10 5.3,8 " />
    </Svg>
  )
}

const Svg = styled(({size, ...props}) => <svg {...props} />)`
  height: ${(props) => props.theme.icon.size.small}px;
  width: ${(props) => props.theme.icon.size.small}px;

  * {
    fill: ${(props) => props.theme.color.content.primary};
    stroke: ${(props) => props.theme.color.content.primary};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: ${(props) => props.theme.icon.strokeWidth.small}px;
  }

  .st0 {
    stroke: ${(props) => props.theme.color.content.primaryInverse};
  }
`

export default BillStatusIsCompletedIcon
