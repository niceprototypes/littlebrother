import Joi from "joi"
import stateNames from "../constants/stateNames.json"
import validateBillId from "./validateBillId"
import validateMultiple from "./validateMultiple"

function validateBills(data) {
  const schema = Joi.object({
    status: "OK",
    copyright: Joi.string(),
    results: Joi.array().items(
      Joi.object({
        num_results: 20,
        offset: Joi.number().custom((value, helpers) => validateMultiple(value, 20, helpers)),
        bills: Joi.array().items(
          Joi.object({
            bill_id: Joi.string().custom(validateBillId),
            bill_slug: Joi.string(),
            bill_type: Joi.string(),
            number: Joi.string(),
            bill_uri: Joi.string(),
            title: Joi.string(),
            short_title: Joi.string(),
            sponsor_title: Joi.string(),
            sponsor_id: Joi.string().alphanum(),
            sponsor_name: Joi.string(),
            sponsor_state: Object.keys(stateNames),
            sponsor_party: ["D", "I", "R"],
            sponsor_uri: Joi.string().uri(),
            gpo_pdf_uri: Joi.string().uri().empty(null),
            congressdotgov_url: Joi.string().uri(),
            govtrack_url: Joi.string().uri(),
            introduced_date: Joi.date(),
            active: Joi.bool().empty(null),
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
            committees: Joi.string().empty(""),
            committee_codes: Joi.array().items(Joi.string().alphanum()),
            subcommittee_codes: Joi.array().items(Joi.string().alphanum()),
            primary_subject: Joi.string().empty(""),
            summary: Joi.string().empty(""),
            summary_short: Joi.string().empty(""),
            latest_major_action_date: Joi.date(),
            latest_major_action: Joi.string(),
          })
        ),
      })
    ),
  })

  const {error} = schema.validate(data)

  return error
}

export default validateBills
