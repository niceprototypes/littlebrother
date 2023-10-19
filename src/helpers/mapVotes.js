import prepareVoteId from "./prepareVoteId"

// import validateBillId from "./validateBillId"

function mapVotes(fetchedPayload, storedPayload = {}, storedKeys = []) {
  // Prepare updated keys
  const updatedKeys = [...storedKeys]
  // Prepare updated payload
  const updatedPayload = {...storedPayload}

  // Iterate over fetched payload
  fetchedPayload.forEach((fetchedItem) => {
    // Destructure fetched item
    const {chamber, congress, roll_call, session} = fetchedItem

    // Prepare vote ID
    const id = prepareVoteId(chamber.toLowerCase(), congress, session, roll_call)

    // Determine if fetched item has stored key
    const hasStoredKey = storedKeys.includes(id)
    // Find fetched item in stored payload
    const storedItem = storedPayload[id]

    // If item ID not stored in keys, update
    if (!hasStoredKey) {
      updatedKeys.push(id)
    }

    // Initialize if item is not stored in payload, otherwise update
    if (!storedItem) {
      updatedPayload[id] = mapVotesItem({id, ...fetchedItem})
    } else {
      updatedPayload[id] = mapVotesItem({id, ...fetchedItem}, storedItem)
    }
  })

  return {keys: updatedKeys, payload: updatedPayload}
}

function mapVotesItem(fetchedItem, storedItem) {
  const {
    amendment,
    bill,
    chamber,
    congress,
    date,
    democratic,
    description,
    document_number: documentNumber,
    document_title: documentTitle,
    id,
    independent,
    nomination: _nomination,
    question,
    question_text: questionText,
    republican,
    roll_call: rollCall,
    session,
    source,
    tie_breaker: tieBreaker,
    tie_breaker_vote: tieBreakerVote,
    time,
    total,
    url,
    result: voteResult,
    vote_type: voteType,
    vote_uri: voteUri,
  } = fetchedItem

  // TODO: Get amendment structure
  /*if (Object.keys(amendment).length > 0) {
    console.log(amendment)
    debugger
  }*/

  // Prepare vote payload
  const result = {}

  const nomination = _nomination
    ? {
        nominationId: _nomination.nomination_id,
        number: _nomination.number,
        name: _nomination.name,
        agency: _nomination.agency,
      }
    : {}

  // Initialize vote payload if needed, else update
  if (!storedItem) {
    result.error = ""
    result.fetchDateTime = ""
    result.payload = {
      amendment: {},
      bill: {
        apiUri: bill.api_uri,
        billId: bill.bill_id,
        code: bill.code,
        latestAction: bill.latest_action,
        number: bill.number,
        sponsorId: bill.sponsor_id,
        title: bill.title,
      },
      chamber: chamber.toLowerCase(),
      congress,
      date,
      democratic: {
        yes: democratic.yes,
        no: democratic.no,
        present: democratic.present,
        notVoting: democratic.not_voting,
        isMajorityPosition: determineIfYes(democratic.majority_position),
      },
      description,
      documentNumber,
      documentTitle,
      id,
      independent: {
        yes: independent.yes,
        no: independent.no,
        present: independent.present,
        notVoting: independent.not_voting,
      },
      nomination: {
        agency: nomination.agency,
        name: nomination.name,
        nominationId: nomination.nomination_id,
        number: nomination.number,
      },
      question,
      questionText,
      republican: {
        yes: republican.yes,
        no: republican.no,
        present: republican.present,
        notVoting: republican.not_voting,
        isMajorityPosition: determineIfYes(republican.majority_position),
      },
      rollCall,
      session,
      source,
      tieBreaker,
      tieBreakerVote,
      time,
      total: {
        yes: total.yes,
        no: total.no,
        present: total.present,
        notVoting: total.not_voting,
      },
      url,
      voteResult,
      voteType,
      voteUri,
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

function determineIfYes(value) {
  return value === "Yes"
}

export default mapVotes
