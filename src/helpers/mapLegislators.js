import initializeLegislatorPayload from "./initializeLegislatorPayload"
import prepareLegislatorImages from "./prepareLegislatorImages"
import updateLegislatorPayload from "./updateLegislatorPayload"

function mapLegislators(fetchedPayload, storedPayload, storedKeys) {
  // Prepare updated keys
  const updatedKeys = [...storedKeys]
  // Prepare updated payload
  const updatedPayload = {...storedPayload}

  // Iterate over fetched payload
  fetchedPayload.forEach((fetchedItem) => {
    // Destructure fetched item
    const {id} = fetchedItem

    // Determine if fetched item has stored key
    const hasStoredKey = storedKeys.includes(id)

    // Determine if fetched item is stored
    const storedItem = storedPayload[id]

    // If item ID not stored in keys, update
    if (!hasStoredKey) {
      updatedKeys.push(id)
    }

    // Initialize if item is not stored in payload, otherwise update
    if (!storedItem) {
      updatedPayload[id] = mapLegislatorsItem(fetchedItem)
    } else {
      updatedPayload[id] = {
        ...updatedPayload[id],
        ...mapLegislatorsItem(fetchedItem, storedItem),
      }
    }
  })

  return {keys: updatedKeys, payload: updatedPayload}
}

function mapLegislatorsItem(fetchedItem, storedItem) {
  const {
    at_large: atLarge,
    facebook_account: accountFacebook,
    twitter_account: accountTwitter,
    youtube_account: accountYoutube,
    // api_uri: apiUri, // Not needed since ID is used to generate this
    contact_form: contactForm,
    cook_pvi: cookPvi,
    crp_id: crpId,
    cspan_id: cspanId,
    date_of_birth: dateOfBirth,
    district,
    dw_nominate: dwNominate,
    fax,
    fec_candidate_id: fecCandidateId,
    first_name: firstName,
    gender,
    geoid: geoId,
    google_entity_id: googleEntityId,
    govtrack_id: govTrackId,
    icpsr_id: icpsrId,
    id,
    // ideal_point: idealPoint, // null for all values
    in_office: inOffice,
    last_name: lastName,
    last_updated: lastUpdated,
    leadership_role: leadershipRole,
    middle_name: middleName,
    missed_votes: missedVotes,
    missed_votes_pct: missedVotesPercent,
    next_election: nextElection,
    ocd_id: ocdId,
    office,
    party,
    phone,
    rss_url: rssUrl,
    // seniority,
    state,
    suffix,
    title,
    short_title: titleShort,
    total_present: totalPresent,
    total_votes: totalVotes,
    url,
    votes_against_party_pct: votesAgainstPartyPercent,
    votes_with_party_pct: votesWithPartyPercent,
    votesmart_id: voteSmartId,
  } = fetchedItem

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
      roles: [],
      rssUrl,
      title,
      totalPresent,
      totalVotes,
      url,
      votesAgainstPartyPercent,
      votesWithPartyPercent,
    }),
  }

  if (!storedItem) {
    // Prepare legislator images
    const {srcAvatar, srcCover} = prepareLegislatorImages(id)

    // Initialize data
    result.error = ""
    result.fetchDateTime = ""
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
    result.error = storedItem.error
    result.fetchDateTime = storedItem.fetchDateTime
    result.payload = {
      ...storedItem.payload,
      ...result.payload,
    }
  }

  return result
}

export default mapLegislators
