import Joi from "joi"
import rules from "../constants/rules.json"
import stateNames from "../constants/stateNames.json"
import validateCookPvi from "./validateCookPvi"
import validateNumberString from "./validateNumberString"

function validateLegislators(data) {
  const schema = Joi.object({
    status: "OK",
    copyright: Joi.string(),
    results: Joi.array().items(
      Joi.object({
        congress: Joi.string().custom(validateNumberString),
        chamber: rules.chambers,
        num_results: Joi.number(),
        offset: Joi.number(),
        members: Joi.array().items(
          Joi.object({
            id: Joi.string().alphanum(),
            title: Joi.string(),
            short_title: Joi.string(),
            api_uri: Joi.string().uri(),
            first_name: Joi.string(),
            middle_name: Joi.string().empty(null),
            last_name: Joi.string(),
            suffix: Joi.string().empty(null),
            date_of_birth: Joi.date(),
            gender: ["F", "M"],
            party: ["D", "ID", "R"],
            leadership_role: Joi.string().allow("", null),
            twitter_account: Joi.string().empty(null),
            facebook_account: Joi.string().empty(null),
            youtube_account: Joi.string().empty(null),
            govtrack_id: Joi.string().custom(validateNumberString).empty(null),
            cspan_id: Joi.string().custom(validateNumberString).empty(null),
            votesmart_id: Joi.string().custom(validateNumberString).empty(null),
            icpsr_id: Joi.string().custom(validateNumberString).empty(null),
            crp_id: Joi.string().alphanum().empty(null),
            google_entity_id: Joi.string().empty(null),
            fec_candidate_id: Joi.string().alphanum().empty(""),
            url: Joi.string().uri().empty(""),
            rss_url: Joi.string().uri().allow("", null),
            contact_form: Joi.string().uri().empty(null),
            in_office: Joi.bool(),
            cook_pvi: Joi.string().custom(validateCookPvi).empty(null),
            dw_nominate: Joi.number().empty(null),
            ideal_point: Joi.number().empty(null),
            seniority: Joi.string().custom(validateNumberString),
            next_election: Joi.date().empty(""),
            total_votes: Joi.number().empty(null),
            missed_votes: Joi.number().empty(null),
            total_present: Joi.number().empty(null),
            last_updated: Joi.string(),
            ocd_id: Joi.string(),
            office: Joi.string().empty(null),
            phone: Joi.string().empty(null),
            fax: Joi.string().empty(null),
            state: Object.keys(stateNames),
            stateName: Object.keys(stateNames).map((state) => stateNames[state]),
            district: Joi.string().custom(validateNumberString).allow("", "At-Large"),
            senate_class: Joi.string().custom(validateNumberString).empty(""),
            at_large: Joi.bool(),
            state_rank: Joi.string().valid("junior", "senior").empty(""),
            geoid: Joi.string().custom(validateNumberString),
            lis_id: Joi.string().alphanum().empty(""),
            missed_votes_pct: Joi.number(),
            votes_with_party_pct: Joi.number(),
            votes_against_party_pct: Joi.number(),
          })
        ),
      })
    ),
  })

  const {error} = schema.validate(data)

  return error
}

export default validateLegislators
