function prepareVoteId(chamber, congress, session, rollCall) {
  return `${chamber}-${congress}-${session}-${rollCall}`
}

export default prepareVoteId
