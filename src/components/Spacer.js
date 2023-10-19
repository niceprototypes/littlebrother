import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Spacer = styled(({size, ...props}) => <div {...props} />)`
  height: ${(props) => prepareSize(props.size, props.theme)}px;
  width: ${(props) => prepareSize(props.size, props.theme)}px;
`

function prepareSize(size, theme) {
  switch (size) {
    case "small":
      return theme.gutter.medium / 2
    default:
      return theme.gutter.medium
  }
}

Spacer.propTypes = {
  size: PropTypes.oneOf(["medium", "small"]),
}

Spacer.defaultProps = {
  size: "medium",
}

export default Spacer
