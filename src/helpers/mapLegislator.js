import initializeLegislatorPayload from "./initializeLegislatorPayload"
import mapLegislatorRole from "./mapLegislatorRole"
import prepareLegislatorImages from "./prepareLegislatorImages"
import updateLegislatorPayload from "./updateLegislatorPayload"

function mapLegislator(fetchedLegislator, storedLegislator) {
  const {
    facebook_account: accountFacebook,
    twitter_account: accountTwitter,
    youtube_account: accountYoutube,
    crp_id: crpId,
    cspan_id: cspanId,
    date_of_birth: dateOfBirth,
    first_name: firstName,
    current_party: party,
    gender,
    geoid: geoId,
    google_entity_id: googleEntityId,
    govtrack_id: govTrackId,
    icpsr_id: icpsrId,
    id,
    in_office: inOffice,
    last_name: lastName,
    last_updated: lastUpdated,
    // member_id: memberId, // Seems to be the same as ID
    middle_name: middleName,
    most_recent_vote: mostRecentVote,
    times_tag: nyTimesTag,
    times_topics_url: nyTimesTopicsUrl,
    roles: _roles,
    rss_url: rssUrl,
    suffix,
    url,
    votesmart_id: voteSmartId,
  } = fetchedLegislator

  // Map roles
  const roles = _roles.map(mapLegislatorRole)

  // Prepare latest role
  const {
    atLarge,
    contactForm,
    cookPvi,
    district,
    dwNominate,
    fax,
    fecCandidateId,
    leadershipRole,
    missedVotes,
    missedVotesPercent,
    nextElection,
    ocdId,
    office,
    phone,
    state,
    seniority,
    title,
    titleShort,
    totalPresent,
    totalVotes,
    votesAgainstPartyPercent,
    votesWithPartyPercent,
  } = roles[0]

  // Prepare result
  const result = {
    payload: updateLegislatorPayload({
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
    }),
  }

  // Determine if bill should initialize
  const shouldInitialize = !storedLegislator || storedLegislator.error || !storedLegislator.fetchDateTime

  // If legislator not stored
  if (shouldInitialize) {
    // Prepare avatar and cover
    const {srcAvatar, srcCover} = prepareLegislatorImages(id)

    // Initialize data
    result.payload = {
      ...result.payload,
      ...initializeLegislatorPayload({
        atLarge,
        contactForm,
        cookPvi,
        crpId,
        cspanId,
        dateOfBirth,
        district,
        fax,
        fecCandidateId,
        firstName,
        gender,
        geoId,
        googleEntityId,
        govTrackId,
        icpsrId,
        id,
        lastName,
        middleName,
        nextElection,
        ocdId,
        party,
        srcAvatar,
        srcCover,
        state,
        suffix,
        title,
        titleShort,
        voteSmartId,
      }),
    }
  } else {
    // Update data
    result.payload = {
      ...storedLegislator.payload,
      ...result.payload,
    }
  }

  return result
}

export default mapLegislator
