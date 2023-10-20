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

const Screen = ({children, isError, isFetching, navBarConfig, renderError, renderFetching, tabBarConfig}) => {
  console.log(isFetching)
  const state = useStoreState((state) => ({
    isDarkMode: state.settings.isDarkMode,
  }))

  // Determine if browser is Safari
  const isSafari = browserName === "Safari" || browserName === "Mobile Safari"

  return (
    <ThemeProvider theme={Theme[state.isDarkMode ? "dark" : "light"]}>
      <OuterDiv hasTabBar={!!tabBarConfig} isFetching={isFetching} isSafari={isSafari}>
        <GlobalStyle />
        {navBarConfig && <NavBar navBarConfig={navBarConfig} />}
        {tabBarConfig && <TabBar isDarkMode={state.isDarkMode} isSafari={isSafari} tabBarConfig={tabBarConfig} />}
        {children}
        {isFetching && <FetchingDiv>{renderFetching()}</FetchingDiv>}
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

const FetchingDiv = styled.div`
  animation: fade-in 0.45s forwards;
  background-color: rgba(255, 255, 255, 0.85);
  bottom: 0;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;

  @keyframes fade-in {
    33% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const OuterDiv = styled(({hasTabBar, isFetching, isSafari, ...props}) => <div {...props} />)`
  background-color: ${(props) => props.theme.color.background.secondary};
  height: ${(props) => props.isFetching && "100vh"};
  min-height: 100vh;
  overflow: ${(props) => props.isFetching && "hidden"};
  padding-bottom: ${(props) =>
    props.hasTabBar && props.isSafari ? props.theme.tabBar.heightSafari : props.theme.tabBar.height}px;
  @media only screen and (min-width: 720px) {
    margin: 0 auto;
    width: 400px;
  }
`

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
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
  renderError: PropTypes.func,
  renderFetching: PropTypes.func,
  tabBarConfig: PropTypes.shape({
    selected: PropTypes.oneOf(["bills", "chambers", "settings", "votes"]),
  }),
}

Screen.defaultProps = {
  isError: false,
  isFetching: false,
  renderError: null,
  renderFetching: null,
  navBarConfig: null,
  tabBarConfig: null,
}

export default Screen
