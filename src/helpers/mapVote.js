import updateVotePayload from "./updateVotePayload"
import initializeVotePayload from "./initializeVotePayload"

function mapVote(fetchedVote, storedVote) {
  const {id, vote, vacant_seats: vacantSeats} = fetchedVote

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
  } = vote

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
      vacantSeats,
      voteResult,
    }),
  }

  // Determine if bill should initialize
  const shouldInitialize = !storedVote || storedVote.error || !storedVote.fetchDateTime

  // Initialize vote payload if needed, else update
  if (shouldInitialize) {
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
    result.payload = {
      ...storedVote.payload,
      ...result.payload,
    }
  }

  return result
}

export default mapVote
