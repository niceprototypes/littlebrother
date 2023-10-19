import Joi from "joi"
import prepareCustomError from "./prepareCustomError"

function validateNumberString(string, helpers) {
  const {error} = Joi.string().regex(/^\d+$/).validate(string)

  if (error) {
    return prepareCustomError(helpers.message, helpers.state.path, error)
  }
}

export default validateNumberString
