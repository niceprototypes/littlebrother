function preparePartyName(party) {
  switch (party) {
    case "D":
      return "democrat"
    case "I":
      return "independent"
    default:
      return "republican"
  }
}

export default preparePartyName
