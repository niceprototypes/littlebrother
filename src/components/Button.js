import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Text from "./Text"
import Gutter from "./Gutter"

const Button = ({isWide, label, onClick, size, status}) => {
  return (
    <ButtonStyled isWide={isWide} onClick={onClick} size={size} status={status}>
      <Gutter vertical="none">
        <Text
          color={status === "active" ? "content.primaryInverse" : "content.primary"}
          fontSize={size}
          fontWeight="bold"
          isBlock
        >
          {label}
        </Text>
      </Gutter>
    </ButtonStyled>
  )
}

const ButtonStyled = styled(({isWide, size, status, ...props}) => <button {...props} />)`
  background-color: ${(props) => (props.status === "active" ? props.theme.color.link.primary : "transparent")};
  border: ${(props) => (props.status === "active" ? 0 : `1px solid ${props.theme.color.border.secondary}`)};
  border-radius: ${(props) => (props.theme.fontSize[props.size] * 2.5) / 2}px;
  color: ${(props) => props.theme.color.content.primaryInverse};
  font-family: inherit;
  font-size: inherit;
  height: ${(props) => props.theme.fontSize[props.size] * 2.4}px;
  padding: 1px 0 0;
  width: ${(props) => props.isWide && "100%"};
`

Button.propTypes = {
  isWide: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["display", "h1", "h2", "p1", "p2", "p3"]).isRequired,
  status: PropTypes.oneOf(["active", "default", "disabled"]).isRequired,
}

Button.defaultProps = {
  isWide: false,
  label: "",
  size: "p1",
  status: "default",
}

export default Button
