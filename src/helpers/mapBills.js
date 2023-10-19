import initializeBillPayload from "./initializeBillPayload"
import updateBillPayload from "./updateBillPayload"
import preparePartyName from "./preparePartyName"

function mapBills(fetchedPayload, storedPayload = {}, storedKeys = []) {
  // Prepare updated keys
  const updatedKeys = [...storedKeys]
  // Prepare updated payload
  const updatedPayload = {...storedPayload}

  // Iterate over fetched payload
  fetchedPayload.forEach((fetchedItem) => {
    // Destructure fetched item
    const {bill_id: id} = fetchedItem

    // Determine if fetched item has stored key (ProPublica API has duplicate bills)
    const hasStoredKey = storedKeys.includes(id)
    // Find fetched item in stored payload
    const storedItem = storedPayload[id]

    // If item ID not stored in keys, update
    if (!hasStoredKey) {
      updatedKeys.push(id)
    }

    // Initialize if item is not stored in payload, otherwise update
    if (!storedItem) {
      updatedPayload[id] = mapBillsItem(fetchedItem)
    } else {
      updatedPayload[id] = mapBillsItem(fetchedItem, storedItem)
    }
  })

  return {keys: updatedKeys, payload: updatedPayload}
}

function mapBillsItem(fetchedItem, storedItem) {
  const {
    // active,
    bill_id: id,
    bill_slug: slug,
    bill_type: type,
    // bill_uri: billUri,
    // committee_codes: committeeCodes,
    // committees,
    // congressdotgov_url: congressDotGovUrl,
    // cosponsors,
    enacted: dateEnacted,
    // govtrack_url: govTrackUrl,
    // gpo_pdf_url: gpoPdfUrl,
    house_passage: datePassedHouse,
    introduced_date: dateIntroduced,
    // last_vote: lastVote,
    latest_major_action: latestMajorAction,
    latest_major_action_date: latestMajorActionDate,
    number,
    // primary_subject: primarySubject,
    senate_passage: datePassedSenate,
    sponsor_id: sponsorId,
    sponsor_name: sponsorName,
    sponsor_party: sponsorParty,
    sponsor_state: sponsorState,
    sponsor_title: sponsorTitle,
    // sponsor_uri: sponsorUri,
    // subcommittee_codes: subcommitteeCodes,
    // summary,
    // summary_short: summaryShort,
    title,
    // short_title: titleShort,
    vetoed: dateVetoed,
  } = fetchedItem

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

  // Initialize bill payload if needed, else update
  if (!storedItem) {
    result.error = ""
    result.fetchDateTime = ""
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
    result.error = storedItem.error
    result.fetchDateTime = storedItem.fetchDateTime
    result.payload = {
      ...storedItem.payload,
      ...result.payload,
    }
  }

  return result
}

export default mapBills
