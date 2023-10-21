import {navigate} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Flex from "./Flex"
import Gutter from "./Gutter"
import Separator from "./Separator"
import BillsIcon from "./icons/TabBar.Bills"
import ChambersIcon from "./icons/TabBar.Chambers"
import SettingsIcon from "./icons/TabBar.Settings"
import VotesIcon from "./icons/TabBar.Votes"
import TabBarItem from "./TabBarItem"

const TabBar = ({isDarkMode, isSafari, tabBarConfig}) => {
  const {selected} = tabBarConfig

  return (
    <OuterDiv>
      <Separator />
      <InnerDiv>
        <Gutter vertical="none">
          <RowFlex alignItems={isSafari ? "center" : "flex-start"} isSafari={isSafari} justifyContent="space-around">
            <TabBarItem
              icon={<BillsIcon isColored={selected === "bills"} isDarkMode={isDarkMode} />}
              isDarkMode={isDarkMode}
              isSelected={selected === "bills"}
              label="Bills"
              onClick={() => navigate("/")}
            />
            <TabBarItem
              icon={<ChambersIcon isColored={selected === "chambers"} isDarkMode={isDarkMode} />}
              isDarkMode={isDarkMode}
              isSelected={selected === "chambers"}
              label="Chambers"
              onClick={() => navigate("/chambers?chamber=senate")}
            />
            <TabBarItem
              icon={<VotesIcon isColored={selected === "votes"} isDarkMode={isDarkMode} />}
              isDarkMode={isDarkMode}
              isSelected={selected === "votes"}
              label="Votes"
              onClick={() => navigate("/votes")}
            />
            <TabBarItem
              icon={<SettingsIcon isColored={selected === "settings"} isDarkMode={isDarkMode} />}
              isDarkMode={isDarkMode}
              isSelected={selected === "settings"}
              label="Settings"
              onClick={() => navigate("/settings")}
            />
          </RowFlex>
        </Gutter>
      </InnerDiv>
    </OuterDiv>
  )
}

const OuterDiv = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 2;
  @media only screen and (min-width: 720px) {
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
  }
`

const InnerDiv = styled.div`
  background-color: ${(props) => props.theme.color.background.primary};
  @media only screen and (min-width: 720px) {
    padding: 0;
  }
`

const RowFlex = styled(({isSafari, ...props}) => <Flex {...props} />)`
  height: ${(props) => (props.isSafari ? props.theme.tabBar.heightSafari : props.theme.tabBar.height)}px;
  padding-top: ${(props) => (props.isSafari ? 0 : props.theme.fontSize.p1)}px;
`

TabBar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  isSafari: PropTypes.bool.isRequired,
  tabBarConfig: PropTypes.shape({
    selected: PropTypes.oneOf(["bills", "chambers", "settings", "votes"]),
  }).isRequired,
}

TabBar.defaultProps = {
  isDarkMode: false,
  isSafari: false,
  tabBarConfig: {},
}

export default React.memo(TabBar)
