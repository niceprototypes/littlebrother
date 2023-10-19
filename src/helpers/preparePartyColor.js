function preparePartyColor(party, theme) {
  switch (party) {
    case "D":
      return theme.color.party.democrat.primary
    case "I":
      return theme.color.party.independent.primary
    case "R":
      return theme.color.party.republican.primary
    default:
      return theme.color.content.primary
  }
}

export default preparePartyColor
