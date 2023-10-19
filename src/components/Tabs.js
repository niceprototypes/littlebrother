import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import {Tab, Tabs as ReactTabs, TabList, TabPanel} from "react-tabs"

const Tabs = ({children, tabs, TabsWrapper}) => {
  return (
    <OuterDiv>
      <ReactTabs>
        <TabsWrapper>
          <TabList>
            {tabs.map((tab, index) => {
              return <Tab key={index}>{tab.tab}</Tab>
            })}
          </TabList>
        </TabsWrapper>
        {children}
        {tabs.map((tab, index) => {
          return <TabPanel key={index}>{tab.panel}</TabPanel>
        })}
      </ReactTabs>
    </OuterDiv>
  )
}

const OuterDiv = styled.div`
  ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
  }

  .react-tabs__tab[aria-selected="true"] {
    font-weight: bold;
  }
`

Tabs.propTypes = {
  children: PropTypes.node,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      selected: PropTypes.bool,
      panel: PropTypes.node.isRequired,
      tab: PropTypes.node.isRequired,
    })
  ),
  TabsWrapper: PropTypes.func,
}

Tabs.defaultProps = {
  children: null,
  tabs: [],
}

export default Tabs
