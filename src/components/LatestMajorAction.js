import PropTypes from "prop-types"
import React from "react"
import TapTarget from "./TapTarget"
import Text from "./Text"
import Ellipsis from "./Ellipsis"
import styled from "styled-components"
import Gutter from "./Gutter"

const LatestMajorAction = ({align, date, message}) => {
  const [isTrimmed, updateIsTrimmed] = React.useState(true)

  const onClick = () => {
    updateIsTrimmed(!isTrimmed)
  }

  return (
    <TapTarget isWide onClick={onClick}>
      <OuterDiv>
        <Gutter all="small">
          <Text align={align} color="content.secondary" fontSize="p2" fontWeight="bold" isBlock>
            <Ellipsis isTrimmed={isTrimmed} message={message} onClick={onClick} />
          </Text>
          {date && <Text fontSize="p2">{date}&nbsp;</Text>}
        </Gutter>
      </OuterDiv>
    </TapTarget>
  )
}

const OuterDiv = styled.div`
  background-color: ${(props) => props.theme.color.background.secondary};
  border-radius: ${(props) => props.theme.borderRadius.medium}px;
`

LatestMajorAction.propTypes = {
  align: PropTypes.oneOf(["center", "left", "right"]).isRequired,
  date: PropTypes.string,
  message: PropTypes.string.isRequired,
}

LatestMajorAction.defaultProps = {
  align: "left",
  date: "",
}

export default LatestMajorAction
