import Joi from "joi"
import rules from "../constants/rules.json"
import stateNames from "../constants/stateNames.json"
import validateBillId from "./validateBillId"
import validateNumberString from "./validateNumberString"

function validateBill(data) {
  const schema = Joi.object({
    status: "OK",
    copyright: Joi.string(),
    results: Joi.array().items(
      Joi.object({
        bill_id: Joi.string().custom(validateBillId),
        bill_slug: Joi.string(),
        congress: Joi.string().custom(validateNumberString),
        bill: Joi.string(),
        bill_type: Joi.string(),
        number: Joi.string(),
        bill_uri: Joi.string(),
        title: Joi.string(),
        short_title: Joi.string(),
        sponsor_title: Joi.string(),
        sponsor_id: Joi.string().alphanum(),
        sponsor: Joi.string(),
        sponsor_party: ["D", "I", "R"],
        sponsor_state: Object.keys(stateNames),
        sponsor_uri: Joi.string().uri(),
        gpo_pdf_uri: Joi.string().uri().empty(null),
        congressdotgov_url: Joi.string().uri(),
        govtrack_url: Joi.string().uri(),
        introduced_date: Joi.date(),
        active: Joi.bool(),
        last_vote: Joi.date().empty(null),
        house_passage: Joi.date().empty(null),
        senate_passage: Joi.date().empty(null),
        enacted: Joi.date().empty(null),
        vetoed: Joi.date().empty(null),
        cosponsors: Joi.number(),
        cosponsors_by_party: Joi.object({
          D: Joi.number(),
          ID: Joi.number(),
          R: Joi.number(),
        }),
        withdrawn_cosponsors: Joi.number(),
        primary_subject: Joi.string().empty(""),
        committees: Joi.string().empty(""),
        committee_codes: Joi.array().items(Joi.string()),
        subcommittee_codes: Joi.array().items(Joi.string()),
        latest_major_action_date: Joi.date(),
        latest_major_action: Joi.string(),
        house_passage_vote: Joi.date().empty(null),
        senate_passage_vote: Joi.date().empty(null),
        summary: Joi.string().empty(""),
        summary_short: Joi.string().empty(""),
        cbo_estimate_url: Joi.string().uri().empty(null),
        versions: Joi.array().items(
          Joi.object({
            status: Joi.string(),
            title: Joi.string(),
            url: Joi.string().uri(),
            congressdotgov_url: Joi.string().uri(),
          })
        ),
        actions: Joi.array().items(
          Joi.object({
            id: Joi.number(),
            chamber: rules.chambers,
            action_type: Joi.string(),
            datetime: Joi.string(),
            description: Joi.string(),
          })
        ),
        presidential_statements: Joi.array().items(Joi.string()),
        votes: Joi.array().items(
          Joi.object({
            chamber: rules.chambers,
            date: Joi.date(),
            time: Joi.string(),
            roll_call: Joi.string(),
            question: Joi.string(),
            result: ["Agreed to", "Failed", "Passed"],
            total_yes: Joi.number(),
            total_no: Joi.number(),
            total_not_voting: Joi.number(),
            api_url: Joi.string().uri(),
          })
        ),
      })
    ),
  })

  const {error} = schema.validate(data)

  return error
}

export default validateBill
