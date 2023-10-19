import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const TabBarChambersIcon = ({isColored, isDarkMode}) => {
  return (
    <Svg className={`${isColored && "isColored"} ${isDarkMode && "isDarkMode"}`} viewBox="0 0 24 24">
      <path className="st0" d="M21.8,3.4v5.8H2.2V3.4H21.8z" />
      <circle className="st1" cx="8.2" cy="2.8" r="2" />
      <path className="st2" d="M5,13.4V7.8C5,6.3,6.2,5,7.8,5h0.9c1.5,0,2.8,1.2,2.8,2.8v5.6C11.4,14.9,5,14.9,5,13.4z" />
      <path className="st3" d="M1.5,9.3h21v6.3h-21V9.3z" />
      <circle className="st1" cx="14.2" cy="4.1" r="3.3" />
      <path
        className="st4"
        d="M8.9,16.4v-4.7c0-2.2,2.1-4,4.6-4h1.4c2.5,0,4.6,1.8,4.6,4v4.7C19.6,18.6,8.9,18.6,8.9,16.4z"
      />
      <path className="st5" d="M23.2,15.6v7.7H0.8v-7.7L23.2,15.6z" />
    </Svg>
  )
}

const Svg = styled.svg`
  height: 24px;
  width: 24px;

  * {
    fill: ${(props) => props.theme.color.background.primary};
    stroke: ${(props) => props.theme.color.content.tertiary};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: 1.5;
  }

  &.isColored {
    * {
      stroke: ${(props) => props.theme.color.content.primary};
    }

    .st0 {
      fill: #af7b6e;
    }

    .st1 {
      fill: #ffa943;
    }

    .st2 {
      fill: #3c9cef;
    }

    .st3 {
      fill: #c68e83;
    }

    .st4 {
      fill: #e85757;
    }

    .st5 {
      fill: #eaa9a0;
    }
  }
`

TabBarChambersIcon.propTypes = {
  isColored: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
}

TabBarChambersIcon.defaultProps = {
  isColored: false,
  isDarkMode: false,
}

export default TabBarChambersIcon
