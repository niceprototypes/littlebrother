function prepareVoteId(congress, session, rollCall) {
  return `${congress}_${session}_${rollCall}`
}

export default prepareVoteId
