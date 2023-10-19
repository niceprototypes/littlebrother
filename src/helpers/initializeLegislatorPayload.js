import prepareParty from "./prepareParty"
import preparePartyName from "./preparePartyName"
import prepareStateName from "./prepareStateName"

function initializeLegislatorPayload(payload) {
  const {
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
    party: _party,
    srcAvatar,
    srcCover,
    state,
    suffix,
    title,
    titleShort,
    voteSmartId,
  } = payload

  const party = prepareParty(_party)

  return {
    atLarge,
    contactForm,
    cookPvi,
    crpId,
    cspanId,
    dateOfBirth,
    displayName: `${titleShort} ${firstName} ${middleName || ""} ${lastName}`,
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
    partyName: preparePartyName(party),
    srcAvatar,
    srcCover,
    state,
    stateName: prepareStateName(state),
    suffix,
    title,
    voteSmartId,
  }
}

export default initializeLegislatorPayload
