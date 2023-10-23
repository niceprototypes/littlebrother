import api from "../constants/api.json"
import prepareVoteId from "./prepareVoteId"

function prepareApiCall(model, inputs) {
  const isLocal = true

  const urls = {
    bills: isLocal
      ? `${api.local.url}:${api.local.port.bills}/bills${inputs.offset}`
      : `${api.remote.url}/${api.version}/bills/search.json?offset=${inputs.offset}`,
    bill: isLocal
      ? `${api.local.url}:${api.local.port.bill}/${inputs.id}`
      : `${api.remote.url}/${api.version}/${api.congress}/bills/${inputs.slug}.json`,
    legislators: isLocal
      ? `${api.local.url}:${api.local.port.legislators}/${inputs.chamber}`
      : `${api.remote.url}/${api.version}/${api.congress}/${inputs.chamber}/members.json`,
    legislator: isLocal
      ? `${api.local.url}:${api.local.port.legislator}/${inputs.id}`
      : `${api.remote.url}/${api.version}/members/${inputs.id}.json`,
    votes: isLocal
      ? `${api.local.url}:${api.local.port.votes}/${inputs.chamber}-votes${inputs.offset}`
      : `${api.remote.url}/${api.version}/${inputs.chamber}/votes/recent.json?offset=${inputs.offset}`,
    vote: isLocal
      ? `${api.local.url}:${api.local.port.vote}/${prepareVoteId(
          inputs.chamber,
          inputs.congress,
          inputs.session,
          inputs.rollCall
        )}`
      : `${api.remote.url}/${api.version}/${inputs.congress}/${inputs.chamber}/sessions/${inputs.session}/votes/${inputs.rollCall}.json`,
  }

  return {
    method: "get",
    url: urls[model],
    headers: {
      "X-API-Key": api.keys[1],
    },
  }
}

export default prepareApiCall
