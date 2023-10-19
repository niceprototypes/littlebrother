import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Text from "./Text"
import Gutter from "./Gutter"

const Button = ({isWide, label, onClick}) => {
  return (
    <ButtonStyled isWide={isWide} onClick={onClick}>
      <Gutter vertical="none">
        <Text color="content.primaryInverse" fontWeight="bold">
          {label}
        </Text>
      </Gutter>
    </ButtonStyled>
  )
}

const ButtonStyled = styled(({isWide, ...props}) => <button {...props} />)`
  background-color: ${(props) => props.theme.color.link.primary};
  border: 0;
  border-radius: 24px;
  color: ${(props) => props.theme.color.content.primaryInverse};
  font-family: inherit;
  font-size: inherit;
  height: 48px;
  padding: 0;
  width: ${(props) => props.isWide && "100%"};
`

Button.propTypes = {
  isWide: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  isWide: false,
}

export default Button
