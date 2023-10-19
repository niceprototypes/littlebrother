import Joi from "joi"
import rules from "../constants/rules.json"
import stateNames from "../constants/stateNames.json"
import validateCookPvi from "./validateCookPvi"
import validateNumberString from "./validateNumberString"

function validateLegislator(data) {
  const schema = Joi.object({
    status: "OK",
    copyright: Joi.string(),
    results: Joi.array().items(
      Joi.object({
        id: Joi.string(),
        member_id: Joi.string(),
        first_name: Joi.string(),
        middle_name: Joi.string().empty(null),
        last_name: Joi.string(),
        suffix: Joi.string().empty(null),
        date_of_birth: Joi.date(),
        gender: ["F", "M"],
        url: Joi.string().uri().empty(""),
        times_topics_url: Joi.string().uri().empty(""),
        times_tag: Joi.string().empty(""),
        govtrack_id: Joi.string().custom(validateNumberString).empty(null),
        cspan_id: Joi.string().custom(validateNumberString).empty(null),
        votesmart_id: Joi.string().custom(validateNumberString).empty(null),
        icpsr_id: Joi.string().custom(validateNumberString).empty(null),
        twitter_account: Joi.string().empty(null),
        facebook_account: Joi.string().empty(null),
        youtube_account: Joi.string().empty(null),
        crp_id: Joi.string().alphanum().empty(null),
        google_entity_id: Joi.string().empty(null),
        rss_url: Joi.string().uri().allow("", null),
        in_office: Joi.bool(),
        current_party: ["D", "ID", "R"],
        most_recent_vote: Joi.date(),
        last_updated: Joi.string(),
        roles: Joi.array().items(
          Joi.object({
            congress: Joi.string().custom(validateNumberString),
            chamber: rules.chambers,
            title: Joi.string(),
            short_title: Joi.string(),
            state: Object.keys(stateNames),
            party: ["D", "I", "R"],
            leadership_role: Joi.string().allow("", null),
            fec_candidate_id: Joi.string().alphanum().empty(""),
            seniority: Joi.string().custom(validateNumberString),
            district: Joi.string().custom(validateNumberString).allow("", "At-Large"),
            at_large: Joi.bool(),
            ocd_id: Joi.string(),
            start_date: Joi.date(),
            end_date: Joi.date(),
            office: Joi.string().empty(null),
            phone: Joi.string().empty(null),
            fax: Joi.string().empty(null),
            contact_form: Joi.string().empty(null),
            cook_pvi: Joi.string().custom(validateCookPvi).empty(null),
            dw_nominate: Joi.number().empty(null),
            ideal_point: Joi.number().empty(null),
            next_election: Joi.date().empty(""),
            total_votes: Joi.number().empty(null),
            missed_votes: Joi.number().empty(null),
            total_present: Joi.number().empty(null),
            senate_class: Joi.string().custom(validateNumberString).empty(""),
            state_rank: Joi.string().valid("junior", "senior").empty(""),
            lis_id: Joi.string().alphanum().empty(""),
            bills_sponsored: Joi.number(),
            bills_cosponsored: Joi.number(),
            missed_votes_pct: Joi.number(),
            votes_with_party_pct: Joi.number(),
            votes_against_party_pct: Joi.number(),
            committees: Joi.array().items(
              Joi.object({
                name: Joi.string(),
                code: Joi.string().alphanum(),
                api_uri: Joi.string().uri(),
                side: ["majority", "minority"],
                title: ["Chair", "Member", "Ranking Member", "Representative"],
                rank_in_party: Joi.number().empty(null),
                begin_date: Joi.date().empty(""),
                end_date: Joi.date().empty(""),
              })
            ),
            subcommittees: Joi.array().items(
              Joi.object({
                name: Joi.string(),
                code: Joi.string().alphanum(),
                parent_committee_id: Joi.string().alphanum(),
                api_uri: Joi.string().uri(),
                side: ["majority", "minority"],
                title: ["Chair", "Member", "Ranking Member", "Representative"],
                rank_in_party: Joi.number().empty(null),
                begin_date: Joi.date().empty(""),
                end_date: Joi.date().empty(""),
              })
            ),
          })
        ),
      })
    ),
  })

  const {error} = schema.validate(data)

  return error
}

export default validateLegislator
