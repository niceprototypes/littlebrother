import Joi from "joi"
import billTypes from "../constants/billTypes.json"
import prepareCustomError from "./prepareCustomError"

export function validateBillId(value, helpers) {
  // Split bill ID into slug and congress
  const [slug, congress] = value.split("-")

  // Validate congress
  const {error: congressError} = Joi.number().valid(118).validate(congress)

  if (congressError) {
    return prepareCustomError(helpers.message, helpers.state.path, congressError, "congress")
  }

  const [type, number] = slug.split(/(\d.*)/, 2)

  // Validate number
  const {error: numberError} = Joi.number().validate(number)

  if (numberError) {
    return prepareCustomError(helpers.message, helpers.state.path, numberError, "number")
  }

  // Validate type
  const {error: typeError} = Joi.string()
    .valid(...billTypes.map((billType) => billType.id))
    .validate(type)

  if (typeError) {
    return prepareCustomError(helpers.message, helpers.state.path, typeError, "type")
  }
}

export default validateBillId
