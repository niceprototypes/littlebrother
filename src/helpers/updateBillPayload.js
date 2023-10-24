import moment from "moment"
import billTypes from "../constants/billTypes.json"
import formats from "../constants/formats.json"
import formatDate from "./formatDate"

function updateBillPayload(payload) {
  const {
    dateEnacted: _dateEnacted,
    dateIntroduced: _dateIntroduced,
    datePassedHouse: _datePassedHouse,
    datePassedSenate: _datePassedSenate,
    dateVetoed: _dateVetoed,
    latestMajorAction,
    latestMajorActionDate: _latestMajorActionDate,
    type: typeId,
  } = payload

  const dateEnacted = formatDate(_dateEnacted)
  const dateIntroduced = formatDate(_dateIntroduced)
  const datePassedHouse = formatDate(_datePassedHouse)
  const datePassedSenate = formatDate(_datePassedSenate)
  const dateVetoed = formatDate(_dateVetoed)
  const latestMajorActionDate = formatDate(_latestMajorActionDate)
  const latestMajorActionDateAgo = moment(latestMajorActionDate, formats.dateTime).fromNow()

  // Find bill type
  const billType = billTypes.find((type) => type.id === typeId)

  // Deconstruct bill type
  const {chamber, type} = billType

  // Determine if has force of law
  const hasForceOfLaw = type === "bill" || type === "jointResolution"

  // Initialize chamber statuses
  const statuses = {
    introduction: prepareStatus("introduction", dateIntroduced),
    house: prepareStatus("house", datePassedHouse || ""),
    senate: prepareStatus("senate", datePassedSenate || ""),
    president: prepareStatus("president", dateEnacted || dateVetoed || ""),
  }

  // Prepare ordered statuses
  const statusesOrdered = prepareStatusesOrdered(chamber, type, statuses, latestMajorAction, latestMajorActionDate)

  // Add status label to each status
  const status = statusesOrdered.map((status) => {
    return {
      ...status,
      label: prepareStatusLabel(status.key, !!status.date, hasForceOfLaw, status.isActive, !!dateVetoed),
    }
  })

  return {
    dateEnacted,
    dateIntroduced,
    datePassedHouse,
    datePassedSenate,
    dateVetoed,
    latestMajorAction,
    latestMajorActionDate,
    latestMajorActionDateAgo,
    status,
  }
}

function prepareStatusesOrdered(chamber, type, statuses, latestMajorAction, latestMajorActionDate) {
  // Destructure statuses object
  const {introduction, house, senate, president} = statuses
  // Initialize results
  const results = [introduction]
  // Initialize active index
  let activeIndex = 1

  if (type === "simpleResolution") {
    // Organize chamber statuses based on first chamber
    if (chamber === "house") {
      results.push(house)
    } else {
      results.push(senate)
    }
  } else if (!house.date && !senate.date) {
    // Organize chamber statuses based on first chamber
    if (chamber === "house") {
      results.push(house, senate)
    } else {
      results.push(senate, house)
    }
  } else if (!!house.date && !!senate.date) {
    // Update active index
    activeIndex = 3

    // Convert dates to moments
    const houseMoment = moment(house.date, formats.dateTime)
    const senateMoment = moment(senate.date, formats.dateTime)

    // Diff dates
    const isPassedHouseFirst = houseMoment.diff(senateMoment, "days") > 0

    // Organize chamber statuses based on which chamber passed bill first
    if (isPassedHouseFirst) {
      results.push(house, senate)
    } else {
      results.push(senate, house)
    }
  } else {
    // Update active index
    activeIndex = 2

    // Organize chamber statuses based on which chamber passed bill
    if (!!house.date) {
      results.push(house, senate)
    } else {
      results.push(senate, house)
    }
  }

  if (type === "jointResolution" || type === "bill") {
    if (!!president.date) {
      activeIndex = -1
    }

    results.push(president)
  }

  if (activeIndex > -1) {
    results[activeIndex].isActive = true
    results[activeIndex - 1].actions.push({
      date: latestMajorActionDate,
      message: latestMajorAction,
    })
  } else {
    results[results.length - 1].actions.push({
      date: latestMajorActionDate,
      message: latestMajorAction,
    })
  }

  return results
}

function prepareStatus(key, date) {
  return {
    key,
    date,
    isActive: false,
    actions: [],
  }
}

function prepareStatusLabel(key, hasDate, hasForceOfLaw, isActive, isVetoed) {
  switch (key) {
    case "house":
      if (hasDate) {
        return hasForceOfLaw ? "Passed House" : "Agreed to in House"
      } else {
        return isActive ? "In House" : "To House"
      }
    case "senate":
      if (hasDate) {
        return hasForceOfLaw ? "Passed Senate" : "Agreed to in Senate"
      } else {
        return isActive ? "In Senate" : "To Senate"
      }
    case "president":
      if (hasDate) {
        return isVetoed ? "Vetoed" : "Signed into law"
      } else {
        return isActive ? "With president" : "To President"
      }
    default:
      return "Introduced"
  }
}

export default updateBillPayload
