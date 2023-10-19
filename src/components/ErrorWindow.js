import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Button from "./Button"
import Gutter from "./Gutter"
import Spacer from "./Spacer"
import Text from "./Text"

const ErrorWindow = ({error, buttonLabel, onClickButton}) => {
  return (
    <OuterDiv>
      <Gutter vertical="none">
        <InnerDiv>
          <Gutter horizontal="none">
            <Gutter>
              <Text fontWeight="bold">{error}</Text>
              <Spacer />
              <Button label={buttonLabel} onClick={onClickButton} />
            </Gutter>
          </Gutter>
        </InnerDiv>
      </Gutter>
    </OuterDiv>
  )
}

const InnerDiv = styled.div`
  background-color: ${(props) => props.theme.color.background.primary};
`

const OuterDiv = styled.div`
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
`

ErrorWindow.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired,
}

export default ErrorWindow
