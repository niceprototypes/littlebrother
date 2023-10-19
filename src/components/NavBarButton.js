import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Chevron from "./icons/Chevron"

const NavBarButton = ({children}) => {
  return <OuterDiv>{children}</OuterDiv>
}

const OuterDiv = styled.div`
  height: 24px;
  width: 24px;
  svg {
    display: block;
    height: 100%;
  }
`

NavBarButton.propTypes = {
  children: PropTypes.node.isRequired,
}

NavBarButton.defaultProps = {}

export default NavBarButton
