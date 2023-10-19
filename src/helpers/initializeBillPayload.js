import analyzeTitle from "./analyzeTitle"
import prepareLegislatorImages from "./prepareLegislatorImages"
import prepareStateName from "./prepareStateName"

function initializeBillPayload(payload) {
  const {id, slug, number, sponsorId, sponsorName, sponsorParty, sponsorPartyName, sponsorState, sponsorTitle, title} =
    payload

  // Analyze bill title
  const {cover, tags} = analyzeTitle(title)

  return {
    congress: id.split("-")[1],
    id,
    number,
    slug,
    sponsorName,
    sponsorId,
    sponsorParty,
    sponsorPartyName,
    sponsorState,
    sponsorTitle,
    sponsorStateName: prepareStateName(sponsorState),
    srcAvatar: prepareLegislatorImages(sponsorId).srcAvatar,
    srcCover: cover,
    tags,
    title,
  }
}

export default initializeBillPayload
