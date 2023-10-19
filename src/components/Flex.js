import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Flex = styled(({alignItems, isWrapped, justifyContent, ...props}) => <div {...props} />)`
  align-items: ${(props) => props.alignItems};
  display: flex;
  flex-wrap: ${(props) => props.isWrapped && "wrap"};
  justify-content: ${(props) => props.justifyContent};
`

Flex.propTypes = {
  alignItems: PropTypes.oneOf(["center", "flex-end", "flex-start"]),
  isWrapped: PropTypes.bool,
  justifyContent: PropTypes.oneOf(["center", "flex-end", "flex-start", "space-around", "space-between"]),
}

Flex.defaultProps = {
  alignItems: "flex-start",
  isWrapped: true,
  justifyContent: "flex-start",
}

export default Flex
