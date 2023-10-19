import PropTypes from "prop-types"
import React from "react"
import LinesEllipsis from "react-lines-ellipsis"
import Text from "./Text"

const Ellipsis = ({isTrimmed, message, onReflow}) => {
  return isTrimmed ? (
    <LinesEllipsis
      basedOn="words"
      component="span"
      ellipsis={
        <>
          ...{" "}
          <Text color="link.primary" fontSize="p2" fontWeight="bold">
            more
          </Text>
        </>
      }
      maxLine="1"
      onReflow={onReflow}
      style={{display: "inline"}}
      text={message}
      trimRight
    />
  ) : (
    <>
      {message}{" "}
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
