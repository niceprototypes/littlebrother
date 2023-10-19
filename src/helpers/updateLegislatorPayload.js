import prepareLegislatorScores from "./prepareLegislatorScores"

function updateLegislatorPayload(payload) {
  const {
    accountFacebook,
    accountTwitter,
    accountYoutube,
    dwNominate,
    inOffice,
    lastUpdated,
    leadershipRole,
    missedVotes,
    missedVotesPercent,
    ocdId,
    office,
    phone,
    roles,
    rssUrl,
    seniority,
    title,
    totalPresent,
    totalVotes,
    url,
    votesAgainstPartyPercent,
    votesWithPartyPercent,
  } = payload

  return {
    accountFacebook,
    accountTwitter,
    accountYoutube,
    dwNominate,
    inOffice,
    lastUpdated,
    leadershipRole,
    missedVotes,
    missedVotesPercent,
    ocdId,
    office,
    phone,
    rssUrl,
    scores: prepareLegislatorScores(roles),
    seniority,
    title,
    totalPresent,
    totalVotes,
    url,
    votesAgainstPartyPercent,
    votesWithPartyPercent,
  }
}

export default updateLegislatorPayload
