// import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Fetching = () => {
  return (
    <OuterDiv>
      <InnerDiv />
    </OuterDiv>
  )
}

export const InnerDiv = styled.div`
  animation: rotate 1s linear infinite;
  border: 3px solid ${(props) => props.theme.color.content.tertiary};
  border-radius: 50%;
  height: 48px;
  width: 48px;

  &::after {
    border: 3px solid;
    border-color: ${(props) => props.theme.color.party.republican.primary} transparent
      ${(props) => props.theme.color.party.democrat.primary} transparent;
    border-radius: 50%;
    box-sizing: border-box;
    content: "";
    height: 60px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const OuterDiv = styled.div`
  display: inline-block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`

// Fetching.propTypes = {}

export default Fetching
