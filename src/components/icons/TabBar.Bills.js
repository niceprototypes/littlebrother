import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const TabBarBillsIcon = ({isColored, isDarkMode}) => {
  return (
    <Svg className={`${isColored && "isColored"} ${isDarkMode && "isDarkMode"}`} viewBox="0 0 24 24">
      <line className="st0" x1="8.7" y1="3.4" x2="15.3" y2="3.4" />
      <path className="st1" d="M12,3.4v4.4c0,0,0.1-0.2,1.2-0.2s1.2,0.2,1.2,0.2V3.4H12z" />
      <path className="st2" d="M9.6,7.8V3.4h4.8v4.4c0,0-0.2-0.2-2.4-0.2S9.6,7.8,9.6,7.8z" />
      <line className="st0" x1="12" y1="3.3" x2="12" y2="0.8" />
      <path className="st1" d="M5.9,16.7c0-5.1,3.5-9.1,7.9-9.1s7.9,4.1,7.9,9.1" />
      <path className="st3" d="M2.4,16.7c0-5.1,4.3-9.1,9.6-9.1s9.6,4.1,9.6,9.1" />
      <line className="st0" x1="0.8" y1="16.7" x2="23.2" y2="16.7" />
      <line className="st0" x1="0.8" y1="23.2" x2="23.2" y2="23.2" />
      <rect className="st1" x="1.7" y="16.7" width="20.7" height="6.6" />
      <rect className="st4" x="8.4" y="16.7" width="14" height="6.6" />
      <rect className="st3" x="1.7" y="16.7" width="20.7" height="6.6" />
      <line className="st0" x1="12" y1="20.6" x2="12" y2="19.3" />
      <line className="st0" x1="8.4" y1="20.6" x2="8.4" y2="19.3" />
      <line className="st0" x1="5.2" y1="20.6" x2="5.2" y2="19.3" />
      <line className="st0" x1="2.4" y1="20.6" x2="2.4" y2="19.3" />
      <line className="st0" x1="15.6" y1="20.6" x2="15.6" y2="19.3" />
      <line className="st0" x1="18.8" y1="20.6" x2="18.8" y2="19.3" />
      <line className="st0" x1="21.6" y1="20.6" x2="21.6" y2="19.3" />
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

  .st1,
  .st4 {
    stroke-width: 0;
  }

  &.isColored {
    * {
      stroke: ${(props) => props.theme.color.content.primary};
    }

    .st0,
    .st2,
    .st3 {
      fill: none;
    }

    .st1 {
      fill: #cadfef;
    }

    .st4 {
      fill: #8eabc1;
    }
  }
`

TabBarBillsIcon.propTypes = {
  isColored: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
}

TabBarBillsIcon.defaultProps = {
  isColored: false,
  isDarkMode: false,
}

export default TabBarBillsIcon
