import initializeBillPayload from "./initializeBillPayload"
import updateBillPayload from "./updateBillPayload"
import preparePartyName from "./preparePartyName"

function mapBill(fetchedBill, storedBill) {
  const {
    bill_id: id,
    bill_slug: slug,
    bill_type: type,
    enacted: dateEnacted,
    house_passage: datePassedHouse,
    introduced_date: dateIntroduced,
    latest_major_action: latestMajorAction,
    latest_major_action_date: latestMajorActionDate,
    number,
    senate_passage: datePassedSenate,
    sponsor_id: sponsorId,
    sponsor: sponsorName,
    sponsor_party: sponsorParty,
    sponsor_state: sponsorState,
    sponsor_title: sponsorTitle,
    title,
    vetoed: dateVetoed,
    // ...rest
  } = fetchedBill

  // TODO: Account for remaining keys
  // console.log(rest)

  // Prepare bill payload
  const result = {
    payload: updateBillPayload({
      dateEnacted,
      dateIntroduced,
      datePassedHouse,
      datePassedSenate,
      dateVetoed,
      latestMajorAction,
      latestMajorActionDate,
      type,
    }),
  }

  // Determine if bill should initialize
  const shouldInitialize = !storedBill || storedBill.error || !storedBill.fetchDateTime

  // Initialize bill payload if needed, else update
  if (shouldInitialize) {
    result.payload = {
      ...result.payload,
      ...initializeBillPayload({
        id,
        slug,
        number,
        sponsorId,
        sponsorName,
        sponsorParty,
        sponsorPartyName: preparePartyName(sponsorParty),
        sponsorState,
        sponsorTitle,
        title,
      }),
    }
  } else {
    result.payload = {
      ...storedBill.payload,
      ...result.payload,
    }
  }

  return result
}

export default mapBill
