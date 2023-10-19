import Joi from "joi"
import api from "../constants/api.json"
import rules from "../constants/rules.json"
import validateBillId from "./validateBillId"
import validateMultiple from "./validateMultiple"
import validateNumberString from "./validateNumberString"
import validateTime from "./validateTime"

function validateVotes(data) {
  const schema = Joi.object({
    status: "OK",
    copyright: Joi.string(),
    results: Joi.object({
      chamber: rules.chambers,
      offset: Joi.number().custom((value, helpers) => validateMultiple(value, 20, helpers)),
      num_results: 20,
      votes: Joi.array().items(
        Joi.object({
          congress: api.congress,
          chamber: rules.chambers,
          session: Joi.number(),
          roll_call: Joi.number(),
          source: Joi.string().uri(),
          url: Joi.string().uri(),
          vote_uri: Joi.string().uri(),
          bill: Joi.object({
            bill_id: Joi.string().custom(validateBillId),
            number: Joi.string(),
            code: Joi.string().alphanum(),
            sponsor_id: Joi.string().alphanum(),
            api_uri: Joi.string().uri(),
            title: Joi.string(),
            latest_action: Joi.string(),
          }),
          amendment: Joi.object({}),
          nomination: Joi.object({
            nomination_id: Joi.string(),
            number: Joi.string().alphanum(),
            name: Joi.string().empty(""),
            agency: Joi.string().empty(""),
          }),
          question: Joi.string(),
          question_text: Joi.string(),
          description: Joi.string().empty(""),
          vote_type: rules.voteTypes,
          date: Joi.date(),
          time: Joi.string().custom(validateTime),
          result: Joi.string(),
          tie_breaker: Joi.string().valid("Vice President of the United States").empty(""),
          tie_breaker_vote: Joi.string().valid("Yea", "Nay").empty(""),
          document_number: Joi.string().custom(validateNumberString).empty(""),
          document_title: Joi.string().empty(""),
          democratic: Joi.object({
            yes: Joi.number(),
            no: Joi.number(),
            present: Joi.number(),
            not_voting: Joi.number(),
            majority_position: ["Yes", "No"],
          }),
          republican: Joi.object({
            yes: Joi.number(),
            no: Joi.number(),
            present: Joi.number(),
            not_voting: Joi.number(),
            majority_position: ["Yes", "No"],
          }),
          independent: Joi.object({
            yes: Joi.number(),
            no: Joi.number(),
            present: Joi.number(),
            not_voting: Joi.number(),
            majority_position: ["Yes", "No"],
          }),
          total: Joi.object({
            yes: Joi.number(),
            no: Joi.number(),
            present: Joi.number(),
            not_voting: Joi.number(),
            majority_position: ["Yes", "No"],
          }),
        })
      ),
    }),
  })

  const {error} = schema.validate(data)

  return error
}

export default validateVotes
