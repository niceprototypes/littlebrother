import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Flex from "./Flex"
import TapTarget from "./TapTarget"
import Text from "./Text"

const NavBar = ({tabs}) => {
  return (
    <Flex justifyContent="center">
      {tabs.map((tab) => {
        if (tab.onClick) {
          return (
            <TapTarget key={tab.label} onClick={tab.onClick}>
              <TabText
                color={tab.isActive ? "content.primaryInverse" : "content.primary"}
                fontWeight="bold"
                isActive={tab.isActive}
                isBlock
              >
                {tab.label}
              </TabText>
            </TapTarget>
          )
        }
        return (
          <TabText
            color={tab.isActive ? "content.primaryInverse" : "content.primary"}
            fontWeight="bold"
            isActive={tab.isActive}
            isBlock
            key={tab.label}
          >
            {tab.label}
          </TabText>
        )
      })}
    </Flex>
  )
}

const TabText = styled(({isActive, ...props}) => <Text {...props} />)`
  background-color: ${(props) =>
    props.isActive ? props.theme.color.background.primaryInverse : props.theme.color.background.primary};
  border-radius: ${(props) => props.theme.navBar.innerHeight / 2}px;
  line-height: ${(props) => props.theme.navBar.innerHeight}px;
  padding: 0 1em;
`

NavBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      isActive: PropTypes.bool,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
}

NavBar.defaultProps = {
  isSticky: false,
  navBarConfig: {},
  tabs: [],
}

export default React.memo(NavBar)
