import Joi from "joi"
import stateNames from "../constants/stateNames.json"

function validateVote(data) {
  const schema = Joi.object({
    status: "OK",
    copyright: Joi.string(),
    results: Joi.object({
      votes: Joi.object({
        vote: Joi.object({
          congress: Joi.number(),
          session: Joi.number(),
          chamber: ["House", "Senate"],
          roll_call: Joi.number(),
          source: Joi.string().uri(),
          url: Joi.string().uri(),
          bill: Joi.object({
            bill_id: Joi.string(),
            number: Joi.string(),
            api_uri: Joi.string().uri().empty(null),
            title: Joi.string().empty(null),
            short_title: Joi.string().empty(null),
            latest_action: Joi.string().empty(null),
          }),
          amendment: Joi.object({
            number: Joi.string(),
            api_uri: Joi.string().uri().empty(null),
            sponsor_id: Joi.string().alphanum().empty(null),
            sponsor: Joi.string().empty(null),
            sponsor_uri: Joi.string().uri().empty(null),
            sponsor_party: Joi.string().valid("D", "ID", "R").empty(null),
            sponsor_state: Joi.string()
              .valid(...Object.keys(stateNames))
              .empty(null),
          }),
          nomination: Joi.object({
            nomination_id: Joi.string(),
            number: Joi.string().alphanum(),
            name: Joi.string().empty(""),
            agency: Joi.string().empty(""),
          }),
          question: Joi.string(),
          question_text: Joi.string(),
          description: Joi.string(),
          vote_type: Joi.string(),
          date: Joi.date(),
          time: Joi.string(),
          result: Joi.string(),
          tie_breaker: Joi.string().valid("Vice President of the United States").empty(""),
          tie_breaker_vote: Joi.string().valid("Yea", "Nay").empty(""),
          document_number: Joi.string().empty(""),
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
          }),
          total: Joi.object({
            yes: Joi.number(),
            no: Joi.number(),
            present: Joi.number(),
            not_voting: Joi.number(),
          }),
          positions: Joi.array().items(
            Joi.object({
              member_id: Joi.string().alphanum(),
              name: Joi.string(),
              party: Joi.string().valid("D", "ID", "R"),
              state: Object.keys(stateNames),
              vote_position: ["No", "Not Voting", "Yes"],
              dw_nominate: Joi.number().empty(null),
            })
          ),
        }),
        vacant_seats: Joi.array().items(
          Joi.object({
            state: Object.keys(stateNames),
          })
        ),
      }),
    }),
  })

  const {error} = schema.validate(data)

  return error
}

export default validateVote
