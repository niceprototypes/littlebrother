import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Flex from "./Flex"
import Text from "./Text"
import Button from "./Button"
import Spacer from "./Spacer"

const NavBar = ({tabs}) => {
  return (
    <Flex justifyContent="center">
      {tabs.map((tab, index) => {
        if (tab.onClick) {
          return (
            <Flex key={tab.label}>
              <Button label={tab.label} onClick={tab.onClick} size="p2" status={tab.isActive ? "active" : "default"} />
              {index < tabs.length - 1 && <Spacer size="small" />}
            </Flex>
          )
        }
        return (
          <TabFlex key={tab.label}>
            <Text fontWeight="bold">{tab.label}</Text>
            {tabs.length - 1 < index && <Spacer size="small" />}
          </TabFlex>
        )
      })}
    </Flex>
  )
}

const TabFlex = styled(Flex)`
  padding-top: 0.25em;
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
