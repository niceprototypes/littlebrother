import {useStoreActions, useStoreState} from "easy-peasy"
import PropTypes from "prop-types"
import React from "react"
import {browserName} from "react-device-detect"
import {Toaster} from "react-hot-toast"
import styled, {createGlobalStyle, ThemeProvider} from "styled-components"
import avenirBlackWOFF from "../fonts/avenir-bold.woff"
import avenirBlackWOFF2 from "../fonts/avenir-bold.woff2"
import avenirMediumWOFF from "../fonts/avenir-medium.woff"
import avenirMediumWOFF2 from "../fonts/avenir-medium.woff2"
import avenirBoldWOFF from "../fonts/avenir-semibold.woff"
import avenirBoldWOFF2 from "../fonts/avenir-semibold.woff2"
import Theme from "../theme"
import NavBar from "./NavBar"
import Spacer from "./Spacer"
import TabBar from "./TabBar"

const Screen = ({children, navBarConfig, tabBarConfig}) => {
  const state = useStoreState((state) => ({
    isDarkMode: state.settings.isDarkMode,
  }))

  // Determine if browser is Safari
  const isSafari = browserName === "Safari" || browserName === "Mobile Safari"

  return (
    <ThemeProvider theme={Theme[state.isDarkMode ? "dark" : "light"]}>
      <OuterDiv hasTabBar={!!tabBarConfig} isSafari={isSafari}>
        <GlobalStyle />
        {navBarConfig && <NavBar navBarConfig={navBarConfig} />}
        {tabBarConfig && <TabBar isDarkMode={state.isDarkMode} isSafari={isSafari} tabBarConfig={tabBarConfig} />}
        {children}
        <Spacer size="small" />
        <Toaster />
      </OuterDiv>
    </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url(${avenirMediumWOFF2}) format('woff2'),
    url(${avenirMediumWOFF}) format('woff');
    font-weight: ${(props) => props.theme.fontWeight.medium};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url(${avenirBoldWOFF2}) format('woff2'),
    url(${avenirBoldWOFF}) format('woff');
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Avenir Next LT Pro';
    src: url(${avenirBlackWOFF2}) format('woff2'),
    url(${avenirBlackWOFF}) format('woff');
    font-weight: ${(props) => props.theme.fontWeight.black};
    font-style: normal;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Avenir Next LT Pro", "Helvetica Neue", "Lato", sans-serif;
    font-feature-settings: "kern", "liga", "clig", "calt";
    font-kerning: normal;
    font-size: ${(props) => props.theme.fontSize.p1}px;
    line-height: ${(props) => props.theme.lineHeight.normal};
    margin: 0;
    overscroll-behavior: contain;
    word-wrap: break-word;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    @media only screen and (min-width: 720px) {
      background-color: #2e2e35;
    }
  }


  strong {
    font-weight: ${(props) => props.theme.black};
  }

  svg {
    display: block;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`

const OuterDiv = styled(({hasTabBar, isSafari, ...props}) => <div {...props} />)`
  background-color: ${(props) => props.theme.color.background.secondary};
  min-height: 100vh;
  padding-bottom: ${(props) =>
    props.hasTabBar && props.isSafari ? props.theme.tabBar.heightSafari : props.theme.tabBar.height}px;
  @media only screen and (min-width: 720px) {
    margin: 0 auto;
    width: 400px;
  }
`

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  navBarConfig: PropTypes.shape({
    goBack: PropTypes.func,
    isFollowing: PropTypes.bool,
    onClickFollow: PropTypes.func,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        isActive: PropTypes.bool,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
      })
    ),
  }),
  tabBarConfig: PropTypes.shape({
    selected: PropTypes.oneOf(["bills", "chambers", "settings", "votes"]),
  }),
}

Screen.defaultProps = {
  navBarConfig: null,
  tabBarConfig: null,
}

export default Screen
