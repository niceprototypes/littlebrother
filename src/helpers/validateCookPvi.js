import Joi from "joi"
import validateNumberString from "./validateNumberString"
import prepareCustomError from "./prepareCustomError"

export function validateCookPvi(string, helpers) {
  const indexOfPlus = string.indexOf("+")

  if (indexOfPlus < 0) {
    return prepareCustomError(
      helpers.message,
      helpers.state.path,
      '"value" must have one of the following structures ["D+0", "R+50"]'
    )
  }

  const [party, pvi] = string.split("+")

  const {error: partyError} = Joi.string().valid("D", "ID", "R").validate(party)

  if (partyError) {
    return prepareCustomError(helpers.message, helpers.state.path, partyError, "party")
  }

  const {error: pviError} = Joi.string().custom(validateNumberString).validate(pvi)

  if (pviError) {
    return prepareCustomError(helpers.message, helpers.state.path, pvi, "PVI")
  }
}

export default validateCookPvi
