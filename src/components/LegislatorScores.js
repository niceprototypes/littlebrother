import PropTypes from "prop-types"
import React from "react"
import Card from "./Card"
import LegislatorScore from "./LegislatorScore"
import Spacer from "./Spacer"

const LegislatorScores = ({party, scores}) => {
  const ideology = []
  const loyalty = []

  scores.forEach((score) => {
    if (!!score.ideology.value) {
      ideology.push({
        value: score.ideology.value,
        year: score.year,
      })
    }
    if (!!score.loyalty.value) {
      loyalty.push({
        value: score.loyalty.value,
        year: score.year,
      })
    }
  })

  return (
    <>
      <Card
        description="Uses a two-dimensional data map, with legislators who are ideologically similar being close together."
        title="Ideology"
      >
        <LegislatorScore data={ideology} id="ideology" party={party} />
      </Card>
      <Spacer size="small" />
      <Card
        description="Takes into account how often the legislator votes with their party, and how often they don't vote."
        title="Loyalty"
      >
        <LegislatorScore data={loyalty} id="loyalty" />
      </Card>
    </>
  )
}

LegislatorScores.propTypes = {
  party: PropTypes.oneOf(["D", "I", "R"]).isRequired,
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      cookPvi: PropTypes.shape({}).isRequired,
      ideology: PropTypes.shape({}).isRequired,
      loyalty: PropTypes.shape({}).isRequired,
      year: PropTypes.string.isRequired,
    })
  ).isRequired,
}

LegislatorScores.defaultProps = {}

export default LegislatorScores
