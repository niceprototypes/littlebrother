import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Text from "./Text"

const Ellipsis = ({isTrimmed, message}) => {
  const maxLength = 90

  if (message.length < maxLength) {
    return (
      <Text fontSize="p2" fontWeight="bold">
        {message}
      </Text>
    )
  }

  if (isTrimmed) {
    return (
      <>
        <Text fontSize="p2" fontWeight="bold">
          {message.substring(0, maxLength)}...{" "}
        </Text>
        <Text color="link.primary" fontSize="p2" fontWeight="bold">
          more
        </Text>
      </>
    )
  }

  return (
    <>
      <Text fontSize="p2" fontWeight="bold">
        {message}{" "}
      </Text>
      <Text color="link.primary" fontSize="p2" fontWeight="bold">
        less
      </Text>
    </>
  )
}

const ExpandDiv = styled.div`
  height: 1.375em;
  margin-left: 0.5em;
  padding: 0 0.375em;
  vertical-align: bottom;
`

Ellipsis.propTypes = {
  isTrimmed: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default Ellipsis
