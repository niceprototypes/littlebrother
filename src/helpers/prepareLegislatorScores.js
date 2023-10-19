import moment from "moment"

function prepareLegislatorScores(roles) {
  return roles.map(({cookPvi, dwNominate, missedVotesPercent, startDate, votesWithPartyPercent}) => {
    return {
      year: `'${moment(startDate).format("YY")}`,
      cookPvi: calculateCookPviScore(cookPvi),
      ideology: calculateIdeologyScore(dwNominate),
      loyalty: calculateLoyaltyScore(votesWithPartyPercent, missedVotesPercent),
    }
  })
}

function calculateCookPviScore(cookPvi) {
  const score = {
    description: null,
    party: null,
    value: null,
  }

  if (!cookPvi) {
    return score
  }

  const [party, pvi] = cookPvi.split("+")

  const value = parseInt(pvi)

  score.description = prepareCookPviDescription(value, party)
  score.party = party
  score.value = value

  return score
}

function calculateIdeologyScore(dwNominate) {
  // Initialize score object
  const score = {
    description: null,
    isLeft: null,
    value: null,
  }

  // If no DW nominate score
  if (!dwNominate) {
    return score
  }

  // Determine if leaning left
  const isLeft = dwNominate < 0

  // Calculate ideology value
  const ideologyValue = isLeft ? dwNominate * -1 : dwNominate

  // Calculate display value
  const value = Math.round((ideologyValue + 1) * 50)

  score.description = prepareIdeologyDescription(value, isLeft)
  score.isLeft = isLeft
  score.value = value

  return score
}

function calculateLoyaltyScore(votesWithPartyPercent, missedVotesPercent) {
  const score = {
    description: null,
    value: null,
  }

  if (!votesWithPartyPercent === null || !missedVotesPercent === null) {
    return score
  }

  const value = Math.round((votesWithPartyPercent * (100 - missedVotesPercent)) / 100)

  score.description = prepareLoyaltyDescription(value)
  score.value = value

  return score
}

function prepareCookPviDescription(value, party) {
  const isLeft = party === "D"

  if (value >= 15) {
    return isLeft ? "Solid D" : "Solid R"
  } else if (value >= 5) {
    return isLeft ? "Competitive D" : "Competitive R"
  } else {
    return "Highly competitive"
  }
}

function prepareIdeologyDescription(value, isLeft) {
  if (value < 20) {
    return isLeft ? "Far right" : "Far left"
  } else if (value < 40) {
    return isLeft ? "Leans right" : "Leans left"
  } else if (value < 60) {
    return "Centrist"
  } else if (value < 80) {
    return isLeft ? "Leans left" : "Leans right"
  } else {
    return isLeft ? "Far left" : "Far right"
  }
}

function prepareLoyaltyDescription(value) {
  if (value < 20) return "Very disloyal"
  else if (value < 40) return "Somewhat disloyal"
  else if (value < 60) return "Neutral"
  else if (value < 80) return "Somewhat loyal"
  else return "Very loyal"
}

export default prepareLegislatorScores
