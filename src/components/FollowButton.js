import PropTypes from "prop-types"
import React from "react"
import Flex from "./Flex"
import Gutter from "./Gutter"
import TapTarget from "./TapTarget"
import StarIcon from "./icons/Star"

const FollowButton = ({isFollowing, onClickFollow}) => {
  return (
    <Flex alignItems="center">
      <TapTarget onClick={onClickFollow}>
        <Gutter all="small">
          <StarIcon isColored={isFollowing} size="small" />
        </Gutter>
      </TapTarget>
    </Flex>
  )
}

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  onClickFollow: PropTypes.func.isRequired,
}

FollowButton.defaultProps = {}

export default FollowButton
