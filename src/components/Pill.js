import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Flex from "./Flex"
import Text from "./Text"

const Pill = ({children, emoji}) => {
  return (
    <OuterFlex alignItems="center">
      {emoji && <EmojiText isBlock>{emoji}</EmojiText>}
      <LabelText color="content.secondary" fontSize="p2" fontWeight="bold">
        {children}
      </LabelText>
    </OuterFlex>
  )
}

const EmojiText = styled(Text)`
  line-height: ${(props) => props.theme.pillHeight}px;
  margin-right: ${(props) => props.theme.fontSize.p1 / 4}px;
`

const LabelText = styled(Text)`
  line-height: ${(props) => props.theme.pillHeight}px;
`

const OuterFlex = styled(Flex)`
  background-color: ${(props) => props.theme.color.background.secondary};
  border-radius: ${(props) => props.theme.borderRadius.medium}px;
  padding: 0 ${(props) => props.theme.fontSize.p1 / 2}px;
`

Pill.propTypes = {
  children: PropTypes.node.isRequired,
  emoji: PropTypes.string,
}

Pill.defaultProps = {
  emoji: "",
}

export default Pill
