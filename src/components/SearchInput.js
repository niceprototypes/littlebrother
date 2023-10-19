import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const SearchInput = ({onChange, placeholder, value, width}) => {
  return (
    <Input
      onChange={(event) => onChange({search: event.target.value})}
      placeholder={placeholder}
      type="search"
      value={value}
      width={width}
    />
  )
}

const Input = styled(({width, ...props}) => <input {...props} />)`
  background-color: ${(props) => props.theme.color.background.primary};
  border: 1px solid ${(props) => props.theme.color.border.primary};
  font-family: inherit;
  padding: ${(props) => props.theme.fontSize.p1 / 2}px ${(props) => props.theme.fontSize.p1 / 1.5}px;
  border-radius: ${(props) => props.theme.borderRadius.small}px;
  width: ${(props) => props.theme.fontSize.p1 * props.width}px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.color.content.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.color.content.tertiary};
  }
`

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  width: PropTypes.number,
}

SearchInput.defaultProps = {
  placeholder: "",
}

export default SearchInput
