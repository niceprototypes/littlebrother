import PropTypes from "prop-types"
import React from "react"
import Flex from "./Flex"
import Spacer from "./Spacer"
import Text from "./Text"

const ChamberChart = ({chartSrc, countDemocrats, countIndependents, countRepublicans, countVacancies}) => {
  return (
    <>
      <Spacer />
      <img alt="U.S. Senate seat map" src={chartSrc} />
      <Spacer />
      <Flex justifyContent="space-between">
        {countDemocrats > 0 && (
          <div>
            <Text align="center" color="party.democrat.primary" fontSize="display" fontWeight="bold" isBlock>
              {countDemocrats}
            </Text>
            <Text align="center" fontSize="p2" isBlock lineHeight="condensed">
              Democrats
            </Text>
          </div>
        )}
        {countIndependents > 0 && (
          <div>
            <Text align="center" color="party.independent.primary" fontSize="display" fontWeight="bold" isBlock>
              {countIndependents}
            </Text>
            <Text align="center" fontSize="p2" isBlock lineHeight="condensed">
              Independents
            </Text>
          </div>
        )}
        {countVacancies > 0 && (
          <div>
            <Text align="center" color="content.tertiary" fontSize="display" fontWeight="bold" isBlock>
              {countVacancies}
            </Text>
            <Text align="center" fontSize="p2" isBlock lineHeight="condensed">
              Vacancies
            </Text>
          </div>
        )}
        {countRepublicans > 0 && (
          <div>
            <Text align="center" color="party.republican.primary" fontSize="display" fontWeight="bold" isBlock>
              {countRepublicans}
            </Text>
            <Text align="center" fontSize="p2" isBlock lineHeight="condensed">
              Republicans
            </Text>
          </div>
        )}
      </Flex>
    </>
  )
}

ChamberChart.propTypes = {
  chartSrc: PropTypes.string.isRequired,
  countDemocrats: PropTypes.number,
  countIndependents: PropTypes.number,
  countRepublicans: PropTypes.number,
  countVacancies: PropTypes.number,
}

ChamberChart.defaultProps = {
  countDemocrats: 0,
  countIndependents: 0,
  countRepublicans: 0,
  countVacancies: 0,
}

ChamberChart.defaultProps = {}

export default ChamberChart
