import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Shimmer = ({height, isRounded, isText, lineHeight, width}) => {
  if (isText) {
    return (
      <OuterDiv height={lineHeight} width={width}>
        <InnerDiv height={height} isRounded width="100%" />
      </OuterDiv>
    )
  }
  return <InnerDiv height={height} isRounded={isRounded} width={width} />
}

const InnerDiv = styled.div`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
  background-color: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px auto;
  border-radius: ${(props) => (props.isRounded ? `calc(${props.height} / 2)` : 0)};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  @keyframes placeholderShimmer {
    0% {
      background-position: -468px 0;
    }

    100% {
      background-position: 468px 0;
    }
  }
`

const OuterDiv = styled.div`
  display: inline-block;
  height: ${(props) => props.height};
  vertical-align: top;
  width: ${(props) => props.width};
`

Shimmer.propTypes = {
  height: PropTypes.string,
  isRounded: PropTypes.bool,
  lineHeight: PropTypes.string,
  isText: PropTypes.bool,
  width: PropTypes.string,
}

Shimmer.defaultProps = {
  height: "100%",
  isRounded: false,
  isText: false,
  lineHeight: "100%",
  width: "100%",
}

export default Shimmer
