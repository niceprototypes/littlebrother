import Joi from "joi"
import prepareCustomError from "./prepareCustomError"

function validateTime(string, helpers) {
  const {error} = Joi.string()
    .regex(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/)
    .validate(string)

  if (error) {
    return prepareCustomError(helpers.message, helpers.state.path, error)
  }
}

export default validateTime
