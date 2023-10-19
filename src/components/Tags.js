import PropTypes from "prop-types"
import React from "react"
import decodeEmoji from "../helpers/decodeEmoji"
import Flex from "./Flex"
import Pill from "./Pill"
import TapTarget from "./TapTarget"
import styled from "styled-components"

const Tags = ({isShowingAll, tags}) => {
  const prepareEmoji = (tag) => (tag.emoji ? decodeEmoji(tag.emoji, tag.isFlag) : "")

  if (!isShowingAll && tags.length > 2) {
    return (
      <Flex>
        <PillDiv>
          <TapTarget onClick={() => console.log(tags[0].root)}>
            <Pill emoji={prepareEmoji(tags[0])}>{tags[0].root}</Pill>
          </TapTarget>
        </PillDiv>
        <PillDiv>
          <TapTarget onClick={() => console.log(`${tags.length - 1} more`)}>
            <Pill>{`${tags.length - 1} more`}</Pill>
          </TapTarget>
        </PillDiv>
      </Flex>
    )
  }

  return (
    <Flex>
      {tags.map((tag) => (
        <PillDiv key={tag.root}>
          <TapTarget onClick={() => console.log(tag.root)}>
            <Pill emoji={prepareEmoji(tag)}>{tag.root}</Pill>
          </TapTarget>
        </PillDiv>
      ))}
    </Flex>
  )
}

const PillDiv = styled.div`
  &:not(:last-of-type) {
    margin-right: ${(props) => props.theme.gutter.small}px;
  }
`

Tags.propTypes = {
  isShowingAll: PropTypes.bool,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      emoji: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.string]).isRequired,
      root: PropTypes.string.isRequired,
    })
  ).isRequired,
}

Tags.defaultProps = {
  isShowingAll: true,
}

export default Tags
