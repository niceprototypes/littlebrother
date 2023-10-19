function mapLegislatorCommittee(committee) {
  const {api_uri, begin_date, code, end_date, name, parent_committee_id, rank_in_party, side, title} = committee

  return {
    apiUri: api_uri,
    code,
    endDate: end_date,
    name,
    parentCommitteeId: parent_committee_id || "",
    partyRank: rank_in_party,
    side,
    startDate: begin_date,
    title,
  }
}

export default mapLegislatorCommittee
