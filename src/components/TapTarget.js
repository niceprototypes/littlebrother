import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const TapTarget = ({children, isWide, onClick}) => {
  return (
    <ButtonStyled isWide={isWide} onClick={onClick}>
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled(({isWide, ...props}) => <button {...props} />)`
  background-color: transparent;
  border: 0;
  color: inherit;
  display: block;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  padding: 0;
  text-align: inherit;
  width: ${(props) => props.isWide && "100%"};
`

TapTarget.propTypes = {
  children: PropTypes.node.isRequired,
  isWide: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

TapTarget.defaultProps = {
  isWide: false,
}

export default TapTarget
