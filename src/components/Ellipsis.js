import PropTypes from "prop-types"
import React from "react"
import LinesEllipsis from "react-lines-ellipsis"
import Text from "./Text"

const Ellipsis = ({isTrimmed, message}) => {
  if (message.length < 20) {
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
          {message.substring(0, 95)}...{" "}
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
        {message}
      </Text>
      <Text color="link.primary" fontSize="p2" fontWeight="bold">
        less
      </Text>
    </>
  )
}

Ellipsis.propTypes = {
  isTrimmed: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onReflow: PropTypes.func.isRequired,
}

export default Ellipsis
