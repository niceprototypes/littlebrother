import React from "react"
import styled from "styled-components"

const BillStatusIsActiveIcon = () => {
  return (
    <Svg viewBox="0 0 16 16">
      <circle className="st0" cx="8" cy="8" r="6.9" />
      <circle className="st1" cx="8" cy="8" r="2.4" />
    </Svg>
  )
}

const Svg = styled(({size, ...props}) => <svg {...props} />)`
  height: ${(props) => props.theme.icon.size.small}px;
  stroke: ${(props) => props.theme.color.content.primary};
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  stroke-width: ${(props) => props.theme.icon.strokeWidth.small}px;
  width: ${(props) => props.theme.icon.size.small}px;

  .st0 {
    fill: ${(props) => props.theme.color.content.primaryInverse};
  }

  .st1 {
    fill: ${(props) => props.theme.color.content.primary};
  }
`

export default BillStatusIsActiveIcon
