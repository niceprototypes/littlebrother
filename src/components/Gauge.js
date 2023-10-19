import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Spacer from "./Spacer"
import Text from "./Text"

const Gauge = ({color, description, label, value}) => {
  return (
    <OuterDiv>
      <Text>{label}</Text>
      <Spacer />
      <GaugeOuterDiv>
        <GaugeInnerDiv>
          <ColorDiv color={color} />
          <MaskWrapDiv angle={value * (9 / 5)}>
            <MaskCircleDiv />
          </MaskWrapDiv>
          <HoleDiv />
        </GaugeInnerDiv>
        <DataDiv>
          <Text>{value}</Text>
          <Text>{description}</Text>
        </DataDiv>
      </GaugeOuterDiv>
    </OuterDiv>
  )
}

const ColorDiv = styled.div`
  background-image: conic-gradient(from 270deg, ${(props) => props.color});
  border-radius: 50%;
  height: ${(props) => props.theme.gaugeHeight * 2}px;
  left: 0;
  position: absolute;
  top: 0;
  width: ${(props) => props.theme.gaugeHeight * 2}px;
`

const DataDiv = styled.div`
  bottom: -5px;
  left: 0;
  position: absolute;
  right: 0;
`

const GaugeInnerDiv = styled.div`
  height: ${(props) => props.theme.gaugeHeight * 2}px;
  position: relative;
`

const GaugeOuterDiv = styled.div`
  height: ${(props) => props.theme.gaugeHeight}px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: ${(props) => props.theme.gaugeHeight * 2}px;
`

const HoleDiv = styled.div`
  background-color: ${(props) => props.theme.color.background.primary};
  border-radius: 50%;
  height: ${(props) => props.theme.gaugeHeight * 2 - 10}px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.theme.gaugeHeight * 2 - 10}px;
`

const MaskCircleDiv = styled.div`
  background-color: ${(props) => props.theme.color.background.secondary};
  border-radius: 50%;
  height: ${(props) => props.theme.gaugeHeight * 2}px;
  left: 0;
  position: absolute;
  top: 0;
  width: ${(props) => props.theme.gaugeHeight * 2}px;
`

const MaskWrapDiv = styled.div`
  height: ${(props) => props.theme.gaugeHeight}px;
  overflow: hidden;
  position: relative;
  transform: rotate(${(props) => props.angle}deg);
  transform-origin: bottom;
`

const OuterDiv = styled.div`
  text-align: center;
`

const ValueDiv = styled.div``

Gauge.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

Gauge.defaultProps = {}

export default Gauge
