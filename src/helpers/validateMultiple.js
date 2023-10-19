import Joi from "joi"
import prepareCustomError from "./prepareCustomError"

function validateMultiple(value, multiple, helpers) {
  const {error: numberError} = Joi.number().validate(value)

  if (numberError) {
    return prepareCustomError(helpers.message, helpers.state.path, numberError)
  }

  const {error: multipleError} = Joi.number().integer().multiple(multiple).validate(value)

  if (multipleError) {
    return prepareCustomError(helpers.message, helpers.state.path, multipleError)
  }
}

export default validateMultiple
