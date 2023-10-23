import determineIfYes from "./determineIfYes"

function updateVotePayload(payload) {
  const {democratic, independent, republican, tieBreaker, tieBreakerVote, total, voteResult} = payload

  return {
    democratic: {
      yes: democratic.yes,
      no: democratic.no,
      present: democratic.present,
      notVoting: democratic.not_voting,
      isMajorityPosition: determineIfYes(democratic.majority_position),
    },
    independent: {
      yes: independent.yes,
      no: independent.no,
      present: independent.present,
      notVoting: independent.not_voting,
    },
    republican: {
      yes: republican.yes,
      no: republican.no,
      present: republican.present,
      notVoting: republican.not_voting,
      isMajorityPosition: determineIfYes(republican.majority_position),
    },
    tieBreaker,
    tieBreakerVote,
    total: {
      yes: total.yes,
      no: total.no,
      present: total.present,
      notVoting: total.not_voting,
    },
    voteResult,
  }
}

export default updateVotePayload
