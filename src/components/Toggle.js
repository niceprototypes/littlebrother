import PropTypes from "prop-types"
import ReactToggle from "react-toggle"
import "react-toggle/style.css"
import React from "react"

const Toggle = ({isSelected, onChange}) => {
  return <ReactToggle defaultChecked={isSelected} onChange={onChange} />
}

Toggle.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

Toggle.defaultProps = {}

export default Toggle
