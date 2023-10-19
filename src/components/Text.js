import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Text = styled(({align, color, fontSize, fontWeight, isAntiAliased, isBlock, lineHeight, type, ...rest}) => (
  <span {...rest} />
))`
  color: ${(props) => prepareColor(props.color, props.theme)};
  display: ${(props) => (props.isBlock ? "block" : "inline")};
  font-size: ${(props) => prepareFontSize(props.fontSize, props.theme)}px;
  font-weight: ${(props) => prepareFontWeight(props.fontWeight, props.theme)};
  line-height: ${(props) => prepareLineHeight(props.lineHeight, props.theme)};
  text-align: ${(props) => props.align};
  -webkit-font-smoothing: ${(props) => props.isAntiAliased && "antialiased"};
  -moz-osx-font-smoothing: ${(props) => props.isAntiAliased && "grayscale"};
`

function prepareColor(color, theme) {
  switch (color) {
    case "content.primaryInverse":
      return theme.color.content.primaryInverse
    case "content.secondary":
      return theme.color.content.secondary
    case "content.secondaryInverse":
      return theme.color.content.secondaryInverse
    case "content.tertiary":
      return theme.color.content.tertiary
    case "content.tertiaryInverse":
      return theme.color.content.tertiaryInverse
    case "link.primary":
      return theme.color.link.primary
    case "link.primaryInverse":
      return theme.color.link.primaryInverse
    case "party.democrat.primary":
      return theme.color.party.democrat.primary
    case "party.independent.primary":
      return theme.color.party.independent.primary
    case "party.republican.primary":
      return theme.color.party.republican.primary
    default:
      return theme.color.content.primary
  }
}

function prepareFontSize(fontSize, theme) {
  switch (fontSize) {
    case "display":
      return theme.fontSize.display
    case "h1":
      return theme.fontSize.h1
    case "h2":
      return theme.fontSize.h2
    case "p2":
      return theme.fontSize.p2
    case "p3":
      return theme.fontSize.p3
    default:
      return theme.fontSize.p1
  }
}

function prepareFontWeight(fontWeight, theme) {
  switch (fontWeight) {
    case "black":
      return theme.fontWeight.black
    case "bold":
      return theme.fontWeight.bold
    default:
      return theme.fontWeight.medium
  }
}

function prepareLineHeight(fontSize, theme) {
  switch (fontSize) {
    case "condensed":
      return theme.lineHeight.condensed
    default:
      return theme.lineHeight.normal
  }
}

Text.propTypes = {
  align: PropTypes.oneOf(["center", "left", "right"]),
  color: PropTypes.oneOf([
    "content.primary",
    "content.primaryInverse",
    "content.secondary",
    "content.secondaryInverse",
    "content.tertiary",
    "content.tertiaryInverse",
    "link.primary",
    "link.primaryInverse",
    "party.democrat.primary",
    "party.independent.primary",
    "party.republican.primary",
  ]),
  fontSize: PropTypes.oneOf(["display", "h1", "h2", "p1", "p2", "p3"]),
  fontWeight: PropTypes.oneOf(["black", "bold", "medium"]),
  isAntiAliased: PropTypes.bool,
  isBlock: PropTypes.bool,
  lineHeight: PropTypes.oneOf(["condensed", "normal"]),
}

Text.defaultProps = {
  align: "left",
  color: "content.primary",
  fontSize: "p1",
  fontWeight: "medium",
  isAntiAliased: true,
  isBlock: false,
  lineHeight: "normal",
}

export default Text
