import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Gutter = styled(({all, bottom, horizontal, left, right, size, top, vertical, ...props}) => <div {...props} />)`
  padding-bottom: ${(props) => preparePadding(props.all, props.vertical, props.bottom, props.theme)}px;
  padding-left: ${(props) => preparePadding(props.all, props.horizontal, props.left, props.theme)}px;
  padding-right: ${(props) => preparePadding(props.all, props.horizontal, props.right, props.theme)}px;
  padding-top: ${(props) => preparePadding(props.all, props.vertical, props.top, props.theme)}px;
`

function preparePadding(all, axis, side, theme) {
  const {gutter} = theme

  if (!gutter || side === "none") {
    return 0
  }
  if (!side) {
    if (axis === "none") {
      return 0
    }
    if (!axis) {
      if (all === "none") {
        return 0
      }
      return gutter[all]
    }
    return gutter[axis]
  }
  return gutter[side]
}

Gutter.propTypes = {
  all: PropTypes.oneOf(["medium", "small", "none"]).isRequired,
  bottom: PropTypes.oneOf(["medium", "small", "none"]),
  horizontal: PropTypes.oneOf(["medium", "small", "none"]),
  left: PropTypes.oneOf(["medium", "small", "none"]),
  right: PropTypes.oneOf(["medium", "small", "none"]),
  size: PropTypes.oneOf(["medium", "small", "none"]),
  top: PropTypes.oneOf(["medium", "small", "none"]),
  vertical: PropTypes.oneOf(["medium", "small", "none"]),
}

Gutter.defaultProps = {
  all: "medium",
  bottom: null,
  horizontal: null,
  left: null,
  right: null,
  top: null,
  vertical: null,
}

export default Gutter
