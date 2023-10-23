import determineIfYes from "./determineIfYes"
import prepareVoteId from "./prepareVoteId"
import initializeVotePayload from "./initializeVotePayload"
import updateVotePayload from "./updateVotePayload"

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
    // vote_uri: voteUri,
  } = fetchedItem

  const nomination = _nomination
    ? {
        nominationId: _nomination.nomination_id,
        number: _nomination.number,
        name: _nomination.name,
        agency: _nomination.agency,
      }
    : {}

  // Prepare vote payload
  const result = {
    payload: updateVotePayload({
      democratic,
      independent,
      republican,
      tieBreaker,
      tieBreakerVote,
      total,
      vacantSeats: [],
      voteResult,
    }),
  }

  // Initialize vote payload if needed, else update
  if (!storedItem) {
    result.error = ""
    result.fetchDateTime = ""
    result.payload = {
      ...result.payload,
      ...initializeVotePayload({
        amendment,
        bill,
        chamber,
        congress,
        date,
        description,
        documentNumber,
        documentTitle,
        id,
        nomination,
        question,
        questionText,
        rollCall,
        session,
        source,
        time,
        url,
        voteType,
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

export default mapVotes
