import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Text from "./Text"

const TabBarItem = ({icon, isSelected, label, onClick}) => {
  return (
    <OuterDiv isSelected={isSelected} onClick={onClick}>
      {icon}
      <LabelDiv>
        <Text color={isSelected ? "content.primary" : "content.tertiary"} fontSize="p2" fontWeight="bold">
          {label}
        </Text>
      </LabelDiv>
    </OuterDiv>
  )
}

const LabelDiv = styled.div`
  margin-top: 0.2em;
  text-align: center;
`

const OuterDiv = styled(({isSelected, ...props}) => <div {...props} />)`
  width: 20%;

  svg {
    margin-left: auto;
    margin-right: auto;
  }

  img {
    display: block;
    margin: 0 auto;
    width: 26px;
  }
`

TabBarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  isSelected: PropTypes.bool,
  label: PropTypes.oneOf(["Bills", "Chambers", "Settings", "Votes"]).isRequired,
  onClick: PropTypes.func.isRequired,
}

TabBarItem.defaultProps = {
  isSelected: false,
}

export default React.memo(TabBarItem)
