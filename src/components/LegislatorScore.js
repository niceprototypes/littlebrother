import PropTypes from "prop-types"
import React from "react"
import {Area, AreaChart, XAxis, YAxis, ResponsiveContainer} from "recharts"
import styled from "styled-components"
import preparePartyName from "../helpers/preparePartyName"
import Gutter from "./Gutter"

const LegislatorScore = ({data, id, party}) => {
  return (
    <OuterDiv partyName={preparePartyName(party)}>
      <Gutter top="none">
        <ResponsiveContainer height={120} width="100%">
          <AreaChart
            data={data}
            margin={{
              bottom: 18,
              left: -40,
              top: 24,
              right: 18,
            }}
          >
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <LinearGradientStop offset="0%" stopOpacity={0.25} />
                <LinearGradientStop offset="90%" stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis />
            <XAxis dataKey="year" height={4} interval="preserveStart" reversed width={4} />
            <Area
              dataKey="value"
              fill={`url(#${id})`}
              fillOpacity={1}
              isAnimationActive={false}
              stroke="red"
              label={({x, y, stroke, value}) => {
                return (
                  <LabelText x={x} y={y} dy={-8} stroke={stroke} textAnchor="middle">
                    {value}
                  </LabelText>
                )
              }}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Gutter>
    </OuterDiv>
  )
}

const LinearGradientStop = styled.stop``

const LabelText = styled.stop`
  fill: ${(props) => props.theme.color.loyalty.primary};
`

const OuterDiv = styled(({partyName, ...props}) => <div {...props} />)`
  stop {
    stop-color: ${(props) => props.theme.color.party[props.partyName].primaryInverse};
  }

  .recharts-cartesian-axis-line {
    stroke: ${(props) => props.theme.color.border.secondary};
  }

  .recharts-cartesian-axis-tick-line {
    display: none;
  }

  .recharts-area-curve {
    stroke: ${(props) => props.theme.color.party[props.partyName].primary};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2px;
  }

  .recharts-label-list {
    text {
      font-size: ${(props) => props.theme.fontSize.p2}px;
      font-weight: ${(props) => props.theme.fontWeight.bold};
    }
  }

  .recharts-cartesian-axis-tick-value {
    tspan {
      fill: ${(props) => props.theme.color.content.tertiary};
      font-size: ${(props) => props.theme.fontSize.p2}px;
    }
  }

  .recharts-yAxis {
    display: none;
  }
`

LegislatorScore.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      year: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  party: PropTypes.oneOf(["D", "I", "R"]).isRequired,
}

LegislatorScore.defaultProps = {}

export default LegislatorScore
