import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const TabBarVotesIcon = ({isColored, isDarkMode}) => {
  return (
    <Svg className={`${isColored && "isColored"} ${isDarkMode && "isDarkMode"}`} viewBox="0 0 24 24">
      <path className="st0" d="M22.8,13.5H1.2c-0.3,0-0.5-0.2-0.5-0.5v-2.6h22.5V13C23.2,13.3,23.1,13.5,22.8,13.5z" />
      <path className="st1" d="M3.5,4.7h17c0.3,0,0.5,0.2,0.5,0.5l2.3,5.2H0.8L3,5.2C3,5,3.2,4.7,3.5,4.7z" />
      <rect className="st2" x="1.9" y="13.5" width="20.3" height="9.8" />
      <line className="st3" x1="6.6" y1="7.5" x2="17.4" y2="7.5" />
      <polygon className="st4" points="14.3,7.5 16.3,2.7 11.6,0.8 8.8,7.5" />
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
      fill: #0f8b91;
    }

    .st1 {
      fill: #68dbe0;
    }

    .st2 {
      fill: #20a9b7;
    }

    .st3 {
      fill: none;
    }

    .st4 {
      fill: #e85757;
    }
  }
`

TabBarVotesIcon.propTypes = {
  isColored: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
}

TabBarVotesIcon.defaultProps = {
  isColored: false,
  isDarkMode: false,
}

export default TabBarVotesIcon
